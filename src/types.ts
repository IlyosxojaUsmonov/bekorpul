/** Sertifikat dizayni darajasi. "none" bo'lsa — PDF chiqarilmaydi. */
export type CertLevel = "none" | "digital" | "silver" | "gold" | "notarial";

export interface Plan {
  id: string;
  name: string;
  /** Narx so'mda. `null` bo'lsa — foydalanuvchi o'zi kiritadigan (Korporativ) tarif. */
  price: number | null;
  per: string;
  desc: string;
  free?: boolean;
  popular?: boolean;
  feats: string[];
  certLevel: CertLevel;
}

export interface PayCard {
  label: string;
  holder: string;
  number: string; // faqat raqamlar, nusxalash uchun
  displayNumber: string; // bo'shliqlar bilan, ko'rsatish uchun
}

export interface GiftInfo {
  friendName: string;
  /** "@" bilan boshlanadi */
  friendTelegram: string;
  fromName?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  audience: string;
  scope: string[];
  size: string;
  format: string;
  price: number;
}
