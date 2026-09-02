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
}

export interface PayCard {
  label: string;
  holder: string;
  number: string; // faqat raqamlar, nusxalash uchun
  displayNumber: string; // bo'shliqlar bilan, ko'rsatish uchun
}
