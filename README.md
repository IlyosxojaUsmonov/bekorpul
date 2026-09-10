# Sarfla

"Hech narsa" sotadigan hazil-mutoyibali sayt — React + TypeScript + Vite asosida.

## Ishga tushirish

```bash
npm install
npm run dev
```

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
  components/   — UI qismlari (Nav, Hero, Pricing, CheckoutModal, ...)
  data/plans.ts — tariflar, kartalar, ilovalar ro'yxati (shu yerdan tahrirlang)
  hooks/        — localStorage statistika, nusxalash, ilovadan qaytishni aniqlash
  utils.ts      — yordamchi funksiyalar (nusxalash, ilova ochish)
  styles/global.css — barcha uslublar (yorug'/qorong'i tema tokenlar bilan)
```

## Kartalarni/tariflarni o'zgartirish

`src/data/plans.ts` faylida:
- `PAY_CARDS` — Uzcard/Humo raqamlaringiz
- `PLANS` — tariflar va narxlar
- `PAY_APPS` — Payme/Click ilovalarining Play Store paket nomlari

## Muhim eslatma: to'lovlar haqida

Bu sayt **backend'siz** ishlaydi. Shu sababli:

- "Bu qurilmada N marta sotib olingan" hisoblagichi faqat shu brauzerga tegishli — barcha tashrif buyuruvchilar uchun umumiy/haqiqiy statistika emas.
- Karta raqami nusxalanadi va Payme/Click ilovasi ochiladi (Android'da ilovaning haqiqiy paket nomi orqali to'g'ridan-to'g'ri ochishga urinadi), lekin **to'lov miqdorini avtomatik kiritib bo'lmaydi** — buni foydalanuvchi ilova ichida qo'lda kiritadi.

Agar avtomatik summa bilan haqiqiy checkout (masalan, "Biznes tarifini bosdim — Payme'da 59 000 so'm tayyor chiqdi") kerak bo'lsa, bu Payme/Click bilan rasmiy merchant (kassa) shartnomasi tuzish, yuridik shaxs (YaTT/MChJ) ochish va ularning checkout API'siga ulanadigan backend server yozishni talab qiladi — bu alohida, kattaroq loyiha.
