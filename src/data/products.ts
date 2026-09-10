import type { Product, ProductBundle } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "react-noldan",
    title: "React bilan noldan sayt qurish",
    description:
      "React va TypeScript asosida noldan real loyihalar qurishni o'rganasiz. Nazariya emas — component arxitekturasidan tortib, tayyor saytni internetga chiqarishgacha bo'lgan yo'l bosqichma-bosqich, amaliy misollar bilan tushuntiriladi.",
    audience: "JavaScript asoslarini biladigan, lekin hali real loyiha qurmagan boshlang'ich va o'rta darajadagi dasturchilar uchun.",
    scope: [
      "React va TypeScript asoslari",
      "Component arxitekturasi va state boshqaruvi",
      "Amaliy loyiha: resort sayt (landing)",
      "Amaliy loyiha: mini-startup sayti",
      "Responsive dizayn va deploy qilish",
    ],
    size: "35-40 sahifa, 6 bob",
    format: "PDF",
    price: 29999,
  },
  {
    id: "birinchi-mijoz",
    title: "Frilanser sifatida birinchi mijozni qanday topish",
    description:
      "O'zbekiston bozorida frilanser sifatida ishni qanday boshlash, mijozlarni qayerdan topish va ular bilan qanday muloqot qilishni bilmay qiynalayotganlar uchun amaliy gid. Real taklif namunalari va narx qo'yish strategiyalari ilova qilingan.",
    audience: "Birinchi mijozini hali topa olmagan yangi frilanserlar va o'z narxini qanday belgilashni bilmaydiganlar uchun.",
    scope: [
      "Mijoz qidirish manbalari (O'zbekiston va xalqaro)",
      "Taklif (proposal) yozish",
      "Narx qo'yish strategiyalari",
      "Muzokara va birinchi muloqot skriptlari",
      "Keyingi buyurtmalarni ta'minlash",
    ],
    size: "28-32 sahifa, 5 bob",
    format: "PDF",
    price: 29999,
  },
  {
    id: "startup-validatsiya",
    title: "Startup g'oyasini noldan qanday tekshirish",
    description:
      "Har qanday g'oyani pul va vaqt sarflashdan oldin qanday tekshirish kerakligini o'rgatuvchi qo'llanma. G'oyadan birinchi MVP'gacha bo'lgan barcha validatsiya bosqichlari amaliy misollar bilan tushuntiriladi.",
    audience: "O'z startup g'oyasini boshlashdan oldin sinab ko'rmoqchi bo'lgan tashabbuskorlar va kichik jamoalar uchun.",
    scope: [
      "G'oyani shakllantirish va muammoni aniqlash",
      "Bozor va raqobatni tahlil qilish",
      "Mijozlar bilan intervyu o'tkazish",
      "MVP qurish va birinchi foydalanuvchilarni jalb qilish",
      "Validatsiya natijalarini baholash",
    ],
    size: "32-36 sahifa, 6 bob",
    format: "PDF",
    price: 29999,
  },
];

export const PRODUCT_BUNDLE: ProductBundle = {
  title: "Barcha qo'llanmalar to'plami",
  description: "Uchala qo'llanmani birga oling — kod yozishdan tortib, mijoz topish va g'oyani tekshirishgacha.",
  originalPrice: 89997,
  price: 59999,
  discountPercent: 33,
};
