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
 * Android'da ilovaning asosiy ekranini (LAUNCHER/MAIN activity) paket nomi
 * bo'yicha to'g'ridan-to'g'ri ochadi — bu web-havola (https://payme.uz va
 * hokazo) orqali emas, chunki Payme/Click o'z marketing saytlarini Android
 * App Link sifatida ilovaga bog'lamagan (tekshirildi: shu sabab avvalgi
 * `scheme=https`li intent doim saytga qaytib ketardi). Paket nomi bo'yicha
 * ishga tushirish esa faqat "shu paket o'rnatilganmi"ga qaraydi, shuning
 * uchun ilova o'rnatilgan bo'lsa — ishonchli ochiladi. Navigatsiya
 * `location.href` orqali (top-level) qilinadi, chunki mobil brauzerlar
 * `window.open`ga yuborilgan `intent://` havolalarni ko'pincha e'tiborsiz
 * qoldiradi. Ilova o'rnatilmagan bo'lsa, `browser_fallback_url` orqali
 * veb-sahifaga tushadi. Boshqa platformalarda (iOS, desktop) faqat rasmiy
 * veb-sahifa ochiladi — bu platformalarda tasdiqlangan ochiq deep-link
 * sxemasi yo'q (iOS'da mos custom scheme topilmadi), desktopda esa bu
 * ilovalarning umuman dasturi mavjud emas.
 *
 * Muhim: bu ilovaning faqat bosh ekranini ochadi. Karta-kartaga o'tkazma
 * ekraniga to'g'ridan-to'g'ri o'tish yoki karta raqamini ichkarida
 * avtomatik to'ldirish imkonsiz — Payme'ning o'z hujjatlariga ko'ra ham bu
 * qadam har doim qo'lda bajariladi, chunki buning uchun rasmiy "hamkor"
 * (merchant) shartnomasi va backend integratsiyasi kerak bo'ladi.
 */
export function openPaymentApp(app: PayApp): void {
  if (isAndroid) {
    const intentUrl =
      `intent://#Intent;action=android.intent.action.MAIN;` +
      `category=android.intent.category.LAUNCHER;package=${app.androidPackage};` +
      `S.browser_fallback_url=${encodeURIComponent(app.webUrl)};end`;
    window.location.href = intentUrl;
    return;
  }
  window.open(app.webUrl, "_blank", "noopener");
}
