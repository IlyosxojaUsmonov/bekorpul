# Sarfla

"Hech narsa" sotadigan hazil-mutoyibali sayt — React + TypeScript + Vite asosida.

## Ishga tushirish

```bash
npm install
npm run dev
```

## InPAY

To'lovlar inPAY vidjeti orqali amalga oshiriladi. `widget.js` `index.html` ichida bir marta ulanadi, summa esa inPAY serverida saqlanadi. Har bir tarif kartasida tegishli `inpay-button` tokeni ko'rsatiladi.

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
