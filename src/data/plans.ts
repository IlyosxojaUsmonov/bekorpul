import type { Plan, PayCard, PayApp } from "../types";

export const PLANS: Plan[] = [
  {
    id: "bepul",
    name: "Bepul",
    price: 0,
    per: "/oy",
    desc: "Sinab ko'rish uchun",
    free: true,
    feats: ["Standart hajmda hech narsa", "Reklamasiz emas", "Sertifikatsiz"],
  },
  {
    id: "start",
    name: "Start",
    price: 19000,
    per: "/oy",
    desc: "Shaxsiy foydalanish uchun",
    feats: ["Kengaytirilgan hech narsa", "Raqamli sertifikat", "Email orqali javobsizlik"],
  },
  {
    id: "biznes",
    name: "Biznes",
    price: 59000,
    per: "/oy",
    desc: "O'sib borayotgan hech narsa uchun",
    popular: true,
    feats: ["Cheksiz hech narsa", "Oltin ramkali sertifikat", "Shaxsiy menejer (band)", "Ustuvor yo'qlik"],
  },
  {
    id: "korp",
    name: "Korporativ",
    price: null,
    per: "",
    desc: "Yirik kompaniyalar uchun",
    feats: ["Cheksiz hech narsa, VIP", "Notarial (hazil) sertifikat", "Narxni o'zingiz belgilang"],
  },
];

export const PAY_CARDS: PayCard[] = [
  {
    label: "UZCARD",
    holder: "Ilyosxoja Usmonov",
    number: "5614683516161965",
    displayNumber: "5614 6835 1616 1965",
  },
  {
    label: "HUMO",
    holder: "Ilyosxoja Usmonov",
    number: "9860600431639035",
    displayNumber: "9860 6004 3163 9035",
  },
];

// Play Store'dagi rasmiy ro'yxatlardan tekshirilgan paket nomlari:
// payme - to'lov va o'tkazmalar -> uz.dida.payme
// Click SuperApp -> air.com.ssdsoftwaresolutions.clickuz
export const PAY_APPS: PayApp[] = [
  { name: "Payme", webUrl: "https://payme.uz", androidPackage: "uz.dida.payme" },
  { name: "Click", webUrl: "https://click.uz", androidPackage: "air.com.ssdsoftwaresolutions.clickuz" },
];

export const COMPARE_ROWS: Array<{ feature: string; values: string[] }> = [
  { feature: "Hech narsa hajmi", values: ["Standart", "Kengaytirilgan", "Cheksiz", "Cheksiz"] },
  { feature: "Sertifikat", values: ["—", "Raqamli", "Oltin ramka", "Notarial (hazil)"] },
  { feature: "Menejer", values: ["—", "Email (javobsiz)", "Shaxsiy (band)", "VIP (mavjud emas)"] },
  { feature: "Bekor qilish", values: ["Istalgan vaqt", "Istalgan vaqt", "Istalgan vaqt", "Istalgan vaqt"] },
];

export const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "Buni sotib olsam, nima olaman?",
    a: "Hech narsa. Boshida shunday va'da qilgandik va va'damizda turibmiz.",
  },
  {
    q: "Pulni qaytarib bera olasizmi?",
    a: "Yo'q — sotib olgan narsangizni (hech narsani) qaytarib bo'lmaydi.",
  },
  {
    q: "Bu haqiqiy loyihami?",
    a: "To'lov haqiqiy, kartalar haqiqiy. Mahsulot esa — e'lon qilganimizdek — yo'q.",
  },
];

export const FOOTER_JOKES: Record<string, string> = {
  contact: "Aloqa uchun hech kim javob bermaydi, lekin urinib ko'ring.",
  terms: "Shartlar juda oddiy: pul sizdan, hech narsa bizdan.",
};
