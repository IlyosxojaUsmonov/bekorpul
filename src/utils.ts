import type { PayApp } from "./types";

export function formatSom(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Eski brauzerlar yoki xavfsiz bo'lmagan kontekst uchun zaxira usul
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
}

const isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

/**
 * To'lov ilovasini ochishga urinadi.
 *
 * Android'da bu ilovaning Google Play'dagi haqiqiy paket nomidan foydalanib
 * `intent://` orqali ilovani to'g'ridan-to'g'ri ochishga urinadi (ilova
 * o'rnatilgan bo'lsa) va o'rnatilmagan bo'lsa avtomatik ravishda veb-sahifaga
 * (yoki brauzer orqali Play Store'ga) qaytadi. Boshqa platformalarda
 * (iOS, desktop) faqat rasmiy veb-sahifa ochiladi — chunki bu ilovalar
 * o'sha platformalar uchun tekshirilgan/hujjatlashtirilgan chuqur havola
 * (deep link) sxemasini ochiq e'lon qilmagan.
 *
 * Muhim: bu faqat ilovani ochadi. Miqdor yoki karta raqamini ilova ichida
 * avtomatik to'ldirib bo'lmaydi — buning uchun Payme/Click bilan rasmiy
 * "hamkor" (merchant) shartnomasi va backend integratsiyasi kerak bo'ladi.
 */
export function openPaymentApp(app: PayApp): void {
  if (isAndroid) {
    const host = app.webUrl.replace(/^https?:\/\//, "");
    const intentUrl =
      `intent://${host}#Intent;scheme=https;package=${app.androidPackage};` +
      `S.browser_fallback_url=${encodeURIComponent(app.webUrl)};end`;
    window.open(intentUrl, "_blank");
    return;
  }
  window.open(app.webUrl, "_blank", "noopener");
}
