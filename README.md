# Sarfla

"Hech narsa" sotadigan hazil-mutoyibali sayt — React + TypeScript + Vite asosida.

## Ishga tushirish

```bash
npm install
npm run dev
```

## InPAY va himoyalangan PDF

To'lov serveri merchant tokenni frontendga chiqarmaydi. `.env.example` nusxasini `.env` qilib, `INPAY_MERCHANT_ID`, `INPAY_MERCHANT_TOKEN` va production `PUBLIC_ORIGIN` qiymatlarini kiriting. Keyin frontend va serverni alohida ishga tushiring:

```bash
npm run server
npm run dev
```

Production'da HTTPS reverse proxy `/api` yo'llarini `server.mjs` ishlayotgan portga uzatishi kerak. InPAY kabinetida callback URL sifatida `https://sarfla.uz/api/payments/webhook` ni, return URL sifatida server yaratadigan URL'larni whitelist qiling.

Sotiladigan PDF'ni `private/products/react-noldan.pdf` nomi bilan joylang. U `public/` ichida bo'lmasligi kerak: server faqat inPAY webhook'i `success` bo'lgan va summa mos kelgan order uchun faylni beradi. `return_url` ma'lumotlari o'zi to'lov isboti sifatida qabul qilinmaydi.

Brauzerda `http://localhost:5173` ochiladi.

## Build (production uchun)

```bash
npm run build
```

Natija `dist/` papkasida chiqadi — bu papkani istalgan static hosting'ga (Netlify, Vercel, GitHub Pages, Cloudflare Pages) yuklash mumkin.

## Domen ulash

`dist/` papkasini hosting'ga yuklagach, o'zingizning `.uz` (yoki boshqa) domeningizni o'sha hosting sozlamalaridan ulaysiz — barcha yirik bepul hosting xizmatlari (Netlify, Vercel, va h.k.) buni "Custom domain" bo'limida qo'llab-quvvatlaydi.

## Loyiha tuzilishi

```
src/
  components/   — UI qismlari (Nav, Hero, Pricing, ProductCard, ...)
  data/plans.ts — tariflar, kartalar, ilovalar ro'yxati (shu yerdan tahrirlang)
  hooks/        — localStorage statistika, nusxalash, ilovadan qaytishni aniqlash
  utils.ts      — yordamchi funksiyalar (nusxalash, ilova ochish)
  styles/global.css — barcha uslublar (yorug'/qorong'i tema tokenlar bilan)
```

## Kartalarni/tariflarni o'zgartirish

`src/data/plans.ts` faylida:

- `PLANS` — tariflar va narxlar
