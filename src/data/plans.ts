import type { Plan } from "../types";

export const PLANS: Plan[] = [
  {
    id: "bepul",
    name: "Bepul",
    price: 1099,
    per: "/oy",
    inpayToken: "btn_10166af487a60816185d",
    desc: "Sinab ko'rish uchun",
    feats: ["Standart hajmda sarflash", "Reklamasiz emas", "Sertifikatsiz"],
    certLevel: "none",
  },
  {
    id: "start",
    name: "Start",
    price: 1599,
    per: "/oy",
    inpayToken: "btn_51cb71fddb6eff186140",
    desc: "Shaxsiy foydalanish uchun",
    feats: ["Kengaytirilgan sarflash", "Raqamli sertifikat", "Email orqali javobsizlik"],
    certLevel: "digital",
  },
  {
    id: "biznes",
    name: "Biznes",
    price: 5999,
    per: "/oy",
    inpayToken: "btn_5e9147faab07344dd709",
    desc: "Kichik jamoalar uchun sarflash",
    feats: ["Ko'proq sarflash", "Kumush ramkali sertifikat", "Shaxsiy menejer (band)"],
    certLevel: "silver",
  },
  {
    id: "maksimal",
    name: "Maksimal",
    price: 9999,
    per: "/oy",
    inpayToken: "btn_94c0957c1569ccf1f4e9",
    desc: "O'sib borayotgan sarflash uchun",
    feats: ["Deyarli cheksiz sarflash", "Oltin ramkali sertifikat", "Ustuvor sarflash"],
    certLevel: "gold",
  },
  {
    id: "premium",
    name: "Premium",
    price: 14999,
    per: "/oy",
    inpayToken: "btn_06b17c661dfdaab74eef",
    desc: "Eng dabdabali sarflash uchun",
    popular: true,
    feats: [
      "Cheksiz sarflash, VIP",
      "Notarial (hazil) sertifikat",
      "Shaxsiy menejer (band, lekin VIP band)",
      "Shaxsiylashtirilgan 'Sarflash' sertifikati",
    ],
    certLevel: "notarial",
  },
];

export const GIFT_PLAN: Plan = {
  id: "gift",
  name: "Do'stga sovg'a",
  price: 7999,
  per: "",
  inpayToken: "btn_60a52ee3fea7ac9371d7",
  desc: "Do'stingiz uchun ham pulingizni bekorga sarflang.",
  feats: [],
  certLevel: "digital",
};

export const COMPARE_ROWS: Array<{ feature: string; values: string[] }> = [
  { feature: "Sarflash hajmi", values: ["Standart", "Kengaytirilgan", "Ko'proq", "Deyarli cheksiz", "Cheksiz"] },
  { feature: "Sertifikat", values: ["—", "Raqamli", "Kumush ramka", "Oltin ramka", "Notarial (hazil)"] },
  { feature: "Menejer", values: ["—", "Email (javobsiz)", "Shaxsiy (band)", "Shaxsiy (band)", "VIP (mavjud emas)"] },
  { feature: "Bekor qilish", values: ["Istalgan vaqt", "Istalgan vaqt", "Istalgan vaqt", "Istalgan vaqt", "Istalgan vaqt"] },
];

export const FOOTER_JOKES: Record<string, string> = {
  contact: "Aloqa uchun hech kim javob bermaydi, lekin urinib ko'ring.",
  terms: "Shartlar juda oddiy: pul sizdan, sarflatish bizdan.",
};
