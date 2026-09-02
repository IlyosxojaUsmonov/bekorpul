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

export interface PayApp {
  name: string;
  /** Ilova o'rnatilmagan bo'lsa ochiladigan veb-sahifa. */
  webUrl: string;
  /** Android'da ilovani to'g'ridan-to'g'ri ochish uchun Google Play paket nomi. */
  androidPackage: string;
}
