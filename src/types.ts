/** Sertifikat dizayni darajasi. "none" bo'lsa — PDF chiqarilmaydi. */
export type CertLevel = "none" | "digital" | "silver" | "gold" | "notarial";

export interface Plan {
  id: string;
  name: string;
  /** Narx so'mda. `null` bo'lsa — foydalanuvchi o'zi kiritadigan (Korporativ) tarif. */
  price: number | null;
  per: string;
  inpayToken?: string;
  desc: string;
  free?: boolean;
  popular?: boolean;
  feats: string[];
  certLevel: CertLevel;
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
