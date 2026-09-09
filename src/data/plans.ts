import type { Plan, PayCard } from "../types";

export const PLANS: Plan[] = [
  {
    id: "bepul",
    name: "Bepul",
    price: 1099,
    per: "/oy",
    desc: "Sinab ko'rish uchun",
    feats: ["Standart hajmda hech narsa", "Reklamasiz emas", "Sertifikatsiz"],
    certLevel: "none",
  },
  {
    id: "start",
    name: "Start",
    price: 1599,
    per: "/oy",
    desc: "Shaxsiy foydalanish uchun",
    feats: ["Kengaytirilgan hech narsa", "Raqamli sertifikat", "Email orqali javobsizlik"],
    certLevel: "digital",
  },
  {
    id: "biznes",
    name: "Biznes",
    price: 5999,
    per: "/oy",
    desc: "Kichik jamoalar uchun hech narsa",
    feats: ["Ko'proq hech narsa", "Kumush ramkali sertifikat", "Shaxsiy menejer (band)"],
    certLevel: "silver",
  },
  {
    id: "maksimal",
    name: "Maksimal",
    price: 9999,
    per: "/oy",
    desc: "O'sib borayotgan hech narsa uchun",
    feats: ["Deyarli cheksiz hech narsa", "Oltin ramkali sertifikat", "Ustuvor yo'qlik"],
    certLevel: "gold",
  },
  {
    id: "premium",
    name: "Premium",
    price: 14999,
    per: "/oy",
    desc: "Eng dabdabali hech narsa uchun",
    popular: true,
    feats: [
      "Cheksiz hech narsa, VIP",
      "Notarial (hazil) sertifikat",
      "Shaxsiy menejer (band, lekin VIP band)",
      "Shaxsiylashtirilgan 'Hech narsa' sertifikati",
    ],
    certLevel: "notarial",
  },
];

export const GIFT_PLAN: Plan = {
  id: "gift",
  name: "Do'stga sovg'a",
  price: 7999,
  per: "",
  desc: "Do'stingiz uchun ham pulingizni bekorga sarflang.",
  feats: [],
  certLevel: "digital",
};

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

export const COMPARE_ROWS: Array<{ feature: string; values: string[] }> = [
  { feature: "Hech narsa hajmi", values: ["Standart", "Kengaytirilgan", "Ko'proq", "Deyarli cheksiz", "Cheksiz"] },
  { feature: "Sertifikat", values: ["—", "Raqamli", "Kumush ramka", "Oltin ramka", "Notarial (hazil)"] },
  { feature: "Menejer", values: ["—", "Email (javobsiz)", "Shaxsiy (band)", "Shaxsiy (band)", "VIP (mavjud emas)"] },
  { feature: "Bekor qilish", values: ["Istalgan vaqt", "Istalgan vaqt", "Istalgan vaqt", "Istalgan vaqt", "Istalgan vaqt"] },
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
