import type { Product } from "../types";

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
];
