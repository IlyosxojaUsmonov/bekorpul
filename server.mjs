import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(
    import.meta.url));

try {
    const envText = await fs.readFile(path.join(root, ".env"), "utf8");
    for (const line of envText.split(/\r?\n/)) {
        const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
        if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
} catch {
    // Environment variables may be supplied by the hosting platform instead.
}

const port = Number(process.env.PORT || 8787);
const publicOrigin = process.env.PUBLIC_ORIGIN || "https://sarfla.uz";
const merchantId = process.env.INPAY_MERCHANT_ID;
const merchantToken = process.env.INPAY_MERCHANT_TOKEN;
const apiBase = "https://inpay.uz/api/v1";
let bearerCache = null;
const ordersPath = path.join(root, "data", "orders.json");
const privateFiles = {
    "react-noldan": path.join(root, "private", "products", "react-noldan.pdf"),
};
const products = {
    "bepul": { amount: 1099, description: "Bepul tarifi" },
    "start": { amount: 1599, description: "Start tarifi" },
    "biznes": { amount: 5999, description: "Biznes tarifi" },
    "maksimal": { amount: 9999, description: "Maksimal tarifi" },
    "premium": { amount: 14999, description: "Premium tarifi" },
    "react-noldan": { amount: 29999, description: "React bilan noldan sayt qurish" },
};

if (!merchantId || !merchantToken) {
    console.warn("INPAY_MERCHANT_ID va INPAY_MERCHANT_TOKEN .env orqali berilishi kerak.");
}

async function readOrders() {
    try {
        return JSON.parse(await fs.readFile(ordersPath, "utf8"));
    } catch {
        return {};
    }
}

async function writeOrders(orders) {
    await fs.mkdir(path.dirname(ordersPath), { recursive: true });
    await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
}

function requireMerchantConfig() {
    if (!merchantId || !merchantToken) {
        throw new Error("INPAY_MERCHANT_ID va INPAY_MERCHANT_TOKEN sozlanmagan");
    }
}

async function jsonBody(request) {
    let body = "";
    for await (const chunk of request) body += chunk;
    if (body.length > 100000) throw new Error("Request body too large");
    return body ? JSON.parse(body) : {};
}

function sendJson(response, status, payload) {
    response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(payload));
}

async function inpayRequest(url, options = {}) {
    const response = await fetch(url, options);
    const text = await response.text();
    let payload;
    try {
        payload = JSON.parse(text);
    } catch {
        payload = { raw: text };
    }
    if (payload.success === false || payload.ok === false) {
        throw new Error(`inPAY error: ${JSON.stringify(payload)}`);
    }
    if (!response.ok) throw new Error(`inPAY ${response.status}: ${JSON.stringify(payload)}`);
    return payload;
}

async function getBearerToken() {
    requireMerchantConfig();
    if (bearerCache && bearerCache.expiresAt > Date.now()) return bearerCache.token;
    const query = new URLSearchParams({
        merchant_id: merchantId,
        merchant_token: merchantToken,
    });
    const payload = await inpayRequest(`${apiBase}/authorization/?${query}`);
    const token = payload.bearer_token || payload.token || (payload.data && payload.data.bearer_token);
    if (!token) throw new Error("inPAY authorization javobida bearer token topilmadi");
    bearerCache = { token, expiresAt: Date.now() + 23 * 60 * 60 * 1000 };
    return token;
}

async function getVerifiedTransaction(orderId) {
    const bearerToken = await getBearerToken();
    return inpayRequest(`${apiBase}/transactions/?order_id=${encodeURIComponent(orderId)}`, {
        headers: { Authorization: `Bearer ${bearerToken}` },
    });
}

async function createPayment(productId, request) {
    const product = products[productId];
    if (!product) throw new Error("Noma'lum mahsulot");
    const orderId = crypto.randomUUID();
    const callbackUrl = `${publicOrigin}/api/payments/webhook`;
    const returnUrl = `${publicOrigin}/api/payments/return?order_id=${encodeURIComponent(orderId)}`;
    const bearerToken = await getBearerToken();
    const payload = await inpayRequest(`${apiBase}/create/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${bearerToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            merchant_id: merchantId,
            token: merchantToken,
            amount: product.amount,
            description: product.description,
            callback_url: callbackUrl,
            return_url: returnUrl,
            client_ip: request.socket.remoteAddress,
        }),
    });
    const checkoutUrl = payload.pay_url || payload.url || payload.checkout_url ||
        (payload.data && (payload.data.pay_url || payload.data.url));
    const remoteOrderId = payload.order_id || (payload.data && payload.data.order_id);
    if (!checkoutUrl || !remoteOrderId) throw new Error("inPAY checkout javobida order_id yoki url topilmadi");

    const orders = await readOrders();
    orders[remoteOrderId] = {
        productId,
        amount: product.amount,
        status: "pending",
        createdAt: new Date().toISOString(),
        localOrderId: orderId,
    };
    await writeOrders(orders);
    return checkoutUrl;
}

async function handleWebhook(request, response) {
    const payload = await jsonBody(request);
    const orderId = String(payload.order_id || "");
    const orders = await readOrders();
    const order = orders[orderId];
    const amount = Number(payload.amount);

    if (!order || amount !== order.amount) {
        sendJson(response, 400, { ok: false });
        return;
    }

    if (order.status === "paid") {
        sendJson(response, 200, { ok: true });
        return;
    }

    if (String(payload.status).toLowerCase() !== "success") {
        sendJson(response, 200, { ok: true });
        return;
    }

    const transaction = await getVerifiedTransaction(orderId);
    const verifiedStatus = transaction.status || (transaction.data && transaction.data.status);
    const verifiedAmount = Number(transaction.amount || (transaction.data && transaction.data.amount));
    if (verifiedStatus !== "success" || verifiedAmount !== order.amount) {
        sendJson(response, 400, { ok: false });
        return;
    }

    order.status = "paid";
    order.transactionId = payload.transaction_id;
    order.paidAt = new Date().toISOString();
    await writeOrders(orders);
    sendJson(response, 200, { ok: true });
}

async function handleReturn(request, response, url) {
    const localOrderId = url.searchParams.get("order_id");
    const orders = await readOrders();
    const order = Object.values(orders).find((item) => item.localOrderId === localOrderId);
    if (!order || order.status !== "paid") {
        sendJson(response, 403, { error: "To'lov tasdiqlanmadi. Fayl berilmaydi." });
        return;
    }

    const filePath = privateFiles[order.productId];
    try {
        const file = await fs.readFile(filePath);
        response.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${order.productId}.pdf"`,
            "Cache-Control": "private, no-store",
        });
        response.end(file);
    } catch {
        sendJson(response, 503, { error: "PDF resurs serverga joylanmagan." });
    }
}

const server = http.createServer(async(request, response) => {
    const url = new URL(request.url, publicOrigin);
    try {
        if (request.method === "POST" && url.pathname === "/api/payments/create") {
            const body = await jsonBody(request);
            const checkoutUrl = await createPayment(body.productId, request);
            sendJson(response, 200, { pay_url: checkoutUrl });
            return;
        }
        if (request.method === "POST" && url.pathname === "/api/payments/webhook") {
            await handleWebhook(request, response);
            return;
        }
        if (request.method === "GET" && url.pathname === "/api/payments/return") {
            await handleReturn(request, response, url);
            return;
        }
        sendJson(response, 404, { error: "Not found" });
    } catch (error) {
        console.error(error);
        sendJson(response, 500, {
            error: error instanceof Error ? error.message : "To'lov serverida xatolik yuz berdi.",
        });
    }
});

server.listen(port, () => console.log(`Payment server listening on :${port}`));