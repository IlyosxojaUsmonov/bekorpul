import { jsPDF, GState } from "jspdf";
import { formatSom } from "../utils";
import type { CertLevel } from "../types";

const SERIAL_KEY = "sarfla_cert_serial";
const PENDING_KEY = "sarfla_pending_cert";

function nextSerial(): number {
  const raw = localStorage.getItem(SERIAL_KEY);
  const n = raw ? parseInt(raw, 10) + 1 : 1;
  localStorage.setItem(SERIAL_KEY, String(n));
  return n;
}

type RGB = [number, number, number];

interface Palette {
  bg: RGB;
  panel: RGB;
  ink: RGB;
  accent: RGB;
  accentDeep: RGB;
}

const PALETTES: Record<Exclude<CertLevel, "none">, Palette> = {
  digital: { bg: [255, 255, 255], panel: [248, 248, 249], ink: [24, 27, 31], accent: [96, 101, 109], accentDeep: [60, 64, 70] },
  silver: { bg: [251, 251, 252], panel: [243, 244, 246], ink: [24, 27, 31], accent: [150, 156, 163], accentDeep: [104, 110, 118] },
  gold: { bg: [253, 250, 239], panel: [247, 240, 219], ink: [46, 34, 11], accent: [181, 138, 42], accentDeep: [132, 98, 27] },
  notarial: { bg: [253, 249, 235], panel: [247, 238, 213], ink: [46, 34, 11], accent: [173, 128, 35], accentDeep: [122, 88, 22] },
};

function setFill(doc: jsPDF, c: RGB) {
  doc.setFillColor(c[0], c[1], c[2]);
}
function setDraw(doc: jsPDF, c: RGB) {
  doc.setDrawColor(c[0], c[1], c[2]);
}
function setText(doc: jsPDF, c: RGB) {
  doc.setTextColor(c[0], c[1], c[2]);
}

function drawWatermark(doc: jsPDF, w: number, h: number, accent: RGB) {
  doc.saveGraphicsState();
  doc.setGState(new GState({ opacity: 0.045 }));
  setText(doc, accent);
  doc.setFont("times", "bold");
  doc.setFontSize(92);
  doc.text("SARFLA", w / 2, h / 2 + 8, { align: "center", angle: 27 });
  doc.restoreGraphicsState();
}

/** Kichik radial "rozetka" — burchak medalyoni. */
function drawCornerRosette(doc: jsPDF, cx: number, cy: number, accent: RGB, elaborate: boolean) {
  setDraw(doc, accent);
  doc.setLineWidth(0.5);
  doc.circle(cx, cy, elaborate ? 4.6 : 3.4);
  if (elaborate) {
    doc.setLineWidth(0.25);
    doc.circle(cx, cy, 2.6);
    setFill(doc, accent);
    doc.circle(cx, cy, 0.7, "F");
    doc.setLineWidth(0.3);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const r1 = 5.6;
      const r2 = 7.4;
      doc.line(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    }
  } else {
    setFill(doc, accent);
    doc.circle(cx, cy, 0.9, "F");
  }
}

/** Sarlavha yonidagi kichik bezak chizig'i. `dir` matndan uzoqlashish tomoni: -1 chapga, +1 o'ngga. */
function drawFlourish(doc: jsPDF, x: number, y: number, accent: RGB, dir: -1 | 1) {
  setDraw(doc, accent);
  doc.setLineWidth(0.45);
  doc.lines([[dir * 6, -2.5, dir * 11, 2.5, dir * 16, 0]], x, y, [1, 1], "S", false);
  setFill(doc, accent);
  doc.circle(x + dir * 16, y, 0.7, "F");
}

function drawBorder(doc: jsPDF, w: number, h: number, level: Exclude<CertLevel, "none">) {
  const { accent, accentDeep } = PALETTES[level];
  const outer = 10;
  const elaborate = level === "gold" || level === "notarial";
  const weight = level === "digital" ? 0.5 : level === "silver" ? 1 : 1.6;

  setDraw(doc, accentDeep);
  doc.setLineWidth(weight);
  doc.rect(outer, outer, w - outer * 2, h - outer * 2);

  setDraw(doc, accent);
  doc.setLineWidth(0.3);
  doc.rect(outer + 3, outer + 3, w - (outer + 3) * 2, h - (outer + 3) * 2);

  if (level !== "digital") {
    doc.setLineWidth(0.25);
    doc.rect(outer + 4.6, outer + 4.6, w - (outer + 4.6) * 2, h - (outer + 4.6) * 2);
  }

  const corners: Array<[number, number]> = [
    [outer + 3, outer + 3],
    [w - outer - 3, outer + 3],
    [outer + 3, h - outer - 3],
    [w - outer - 3, h - outer - 3],
  ];
  for (const [cx, cy] of corners) drawCornerRosette(doc, cx, cy, accent, elaborate);
}

function drawSignature(doc: jsPDF, x: number, y: number, ink: RGB) {
  setDraw(doc, ink);
  doc.setLineWidth(0.35);
  doc.lines(
    [
      [3, -5, 6.5, 5, 10, -3],
      [3, -3.5, 6.5, 4, 9.5, 0.5],
      [2.5, 3, 5, -4, 7.5, 1.2],
    ],
    x,
    y,
    [1, 1],
    "S",
    false
  );
}

/** Umumiy muhr — barcha pullik darajalar uchun, notarial'da lentali. Qaytaradi: muhrning eng past nuqtasi (y). */
function drawSeal(doc: jsPDF, cx: number, cy: number, level: Exclude<CertLevel, "none">): number {
  const { accent, accentDeep, ink, panel } = PALETTES[level];
  const r = level === "notarial" ? 12 : level === "gold" ? 11 : level === "silver" ? 9.5 : 8;

  if (level === "notarial") {
    setFill(doc, accent);
    doc.triangle(cx - r * 0.5, cy + r * 0.55, cx - r * 0.12, cy + r * 0.55, cx - r * 0.42, cy + r * 1.3, "F");
    doc.triangle(cx + r * 0.5, cy + r * 0.55, cx + r * 0.12, cy + r * 0.55, cx + r * 0.42, cy + r * 1.3, "F");
  }

  setFill(doc, level === "digital" ? [255, 255, 255] : panel);
  setDraw(doc, accentDeep);
  doc.setLineWidth(1);
  doc.circle(cx, cy, r, "FD");
  doc.setLineWidth(0.3);
  doc.circle(cx, cy, r - 2.2);

  setText(doc, ink);
  doc.setFont("times", "bolditalic");
  doc.setFontSize(level === "digital" ? 6 : 7.2);
  const label =
    level === "notarial" ? "NOTARIAL" : level === "gold" ? "OLTIN" : level === "silver" ? "KUMUSH" : "SARFLA";
  doc.text(label, cx, cy - 1.4, { align: "center" });
  doc.setFont("times", "italic");
  doc.setFontSize(5.4);
  doc.text(level === "digital" ? "sertifikat" : "(hazil)", cx, cy + 3.8, { align: "center" });

  return level === "notarial" ? cy + r * 1.3 : cy + r;
}

export interface CertificateInput {
  recipientName: string;
  certLevel: CertLevel;
  amount: number | null;
  per: string;
  planName: string;
  giftFrom?: string;
  giftTelegram?: string;
}

/** Barcha tarif/sovg'a xaridlari uchun bitta umumiy PDF sertifikat generatori. */
export function generateCertificate(input: CertificateInput): void {
  if (input.certLevel === "none") return;

  const level = input.certLevel;
  const palette = PALETTES[level];

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const cx = w / 2;

  setFill(doc, palette.bg);
  doc.rect(0, 0, w, h, "F");
  drawWatermark(doc, w, h, palette.accent);
  drawBorder(doc, w, h, level);

  // brand mark, top-left
  setText(doc, palette.ink);
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text("Sarfla", 22, 26);
  doc.setFont("times", "normal");
  doc.setFontSize(7.5);
  doc.text("®", 22 + doc.getTextWidth("Sarfla") + 1.5, 22.3);

  // tariff pill, top-center
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  const pillLabel = `${input.planName} tarifi`.toUpperCase();
  const pillTextW = doc.getTextWidth(pillLabel);
  const pillW = pillTextW + 14;
  const pillH = 7;
  setFill(doc, palette.accentDeep);
  doc.roundedRect(cx - pillW / 2, 15, pillW, pillH, pillH / 2, pillH / 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.text(pillLabel, cx, 15 + pillH / 2 + 1.4, { align: "center" });

  // title with flourishes
  setText(doc, palette.ink);
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  const titleText = "RASMIY SERTIFIKAT";
  const titleCharSpace = 1.4;
  doc.setCharSpace(titleCharSpace);
  doc.text(titleText, cx, 46, { align: "center" });
  doc.setCharSpace(0);
  const titleRawWidth = doc.getTextWidth(titleText) + titleCharSpace * (titleText.length - 1);
  const titleHalf = titleRawWidth / 2 + 9;
  drawFlourish(doc, cx - titleHalf, 41, palette.accent, -1);
  drawFlourish(doc, cx + titleHalf, 41, palette.accent, 1);

  // "presented to" caption
  doc.setFont("times", "italic");
  doc.setFontSize(10.5);
  setText(doc, palette.accentDeep);
  doc.text("ushbu hujjat quyidagi shaxsga taqdim etiladi", cx, 56, { align: "center" });

  // recipient name — the centerpiece
  doc.setFont("times", "bolditalic");
  let nameSize = 30;
  doc.setFontSize(nameSize);
  const maxNameWidth = w - 90;
  while (doc.getTextWidth(input.recipientName) > maxNameWidth && nameSize > 16) {
    nameSize -= 1;
    doc.setFontSize(nameSize);
  }
  setText(doc, palette.ink);
  doc.text(input.recipientName, cx, 72, { align: "center" });

  const nameHalf = Math.min(doc.getTextWidth(input.recipientName) / 2 + 8, w / 2 - 30);
  setDraw(doc, palette.accent);
  doc.setLineWidth(0.4);
  doc.line(cx - nameHalf, 77, cx - 6, 77);
  doc.line(cx + 6, 77, cx + nameHalf, 77);
  setFill(doc, palette.accent);
  doc.circle(cx, 77, 1.1, "F");

  // body
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  setText(doc, palette.ink);
  const amountLabel = input.amount === null ? "noma'lum miqdorda" : `${formatSom(input.amount)} so'm`;
  const bodyText = `Yuqoridagi shaxs tomonidan ${amountLabel} pul BEKORGA sarflanganini ushbu hujjat rasman tasdiqlaydi.`;
  const bodyLines = doc.splitTextToSize(bodyText, w - 110);
  doc.text(bodyLines, cx, 90, { align: "center" });

  let y = 90 + bodyLines.length * 6.6 + 6;
  doc.setFont("times", "italic");
  doc.setFontSize(10.5);
  doc.text("Tabriklaymiz — siz hech narsa yutmadingiz.", cx, y, { align: "center" });
  y += 10;

  if (input.giftTelegram) {
    doc.setFont("times", "normal");
    doc.setFontSize(9.5);
    const fromLabel = input.giftFrom ? input.giftFrom : "Kimdir";
    const giftLine = `Sizga ${fromLabel} tomonidan hech narsa sovg'a qilindi — ${input.giftTelegram} orqali ulashildi.`;
    const giftLines = doc.splitTextToSize(giftLine, w - 120);
    doc.text(giftLines, cx, y, { align: "center" });
    y += giftLines.length * 5.2;
  }

  // footer rule
  const footRuleY = h - 54;

  // ornamental rule filling the gap between the body and the footer
  const midY = (y + footRuleY) / 2 + 4;
  setDraw(doc, palette.accent);
  doc.setLineWidth(0.25);
  doc.line(cx - 46, midY, cx - 10, midY);
  doc.line(cx + 10, midY, cx + 46, midY);
  setFill(doc, palette.accent);
  doc.circle(cx - 6, midY, 0.8, "F");
  doc.circle(cx, midY, 1.1, "F");
  doc.circle(cx + 6, midY, 0.8, "F");

  setDraw(doc, palette.accent);
  doc.setLineWidth(0.3);
  doc.line(22, footRuleY, w - 22, footRuleY);

  // footer: signature (left) — seal (center) — serial/date (right)
  const footY = footRuleY + 8;

  doc.line(24, footY + 9, 62, footY + 9);
  drawSignature(doc, 30, footY + 5, palette.ink);
  setText(doc, palette.ink);
  doc.setFont("times", "italic");
  doc.setFontSize(7.5);
  doc.text("Imzo (norasmiy)", 43, footY + 13.5, { align: "center" });

  const sealBottom = drawSeal(doc, cx, footY + 5, level);

  const serial = nextSerial();
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  setText(doc, palette.ink);
  doc.text(`# ${String(serial).padStart(4, "0")}`, w - 24, footY + 4, { align: "right" });
  doc.setFont("times", "italic");
  doc.setFontSize(7.5);
  doc.text("seriya raqami", w - 24, footY + 8.5, { align: "right" });
  doc.setFont("courier", "normal");
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString("uz-UZ"), w - 24, footY + 15, { align: "right" });

  // disclaimer — always clear of the seal/ribbon, always inside the innermost border line
  const innerBorderY = h - 14.6;
  const disclaimerY = Math.min(Math.max(h - 15, sealBottom + 5), innerBorderY - 3);
  doc.setFont("times", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(140, 140, 140);
  doc.text(
    "Ushbu sertifikat hech qanday qiymatga ega emas va hech qayerda ishlatib bo'lmaydi.",
    cx,
    disclaimerY,
    { align: "center" }
  );

  const safeName = input.recipientName.trim().replace(/\s+/g, "-").toLowerCase() || "sertifikat";
  doc.save(`sarfla-sertifikat-${safeName}-${serial}.pdf`);
}

/** To'lov Payme'ga o'tkazilganda ma'lumot saqlab qo'yiladi — foydalanuvchi qaytganda shundan PDF chiqariladi. */
export function storePendingCertificate(input: CertificateInput): void {
  localStorage.setItem(PENDING_KEY, JSON.stringify(input));
}

export function consumePendingCertificate(): CertificateInput | null {
  const raw = localStorage.getItem(PENDING_KEY);
  if (!raw) return null;
  localStorage.removeItem(PENDING_KEY);
  try {
    return JSON.parse(raw) as CertificateInput;
  } catch {
    return null;
  }
}
