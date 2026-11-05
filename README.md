# DICKY Web Profile

Homepage personal berbahasa Indonesia untuk memperkenalkan fokus Dicky di web development dan automasi AI. Konten proyek yang belum dikonfirmasi ditandai untuk ditinjau pemilik.

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka alamat lokal yang dicetak oleh Vite. Build produksi: `npm run build`; preview hasil build: `npm run preview`.

## Struktur

- `src/main.tsx`: halaman, miniatur UI hero, preloader, animasi GSAP, navigasi anchor.
- `src/styles.css`: layout responsif, visual, focus state, dan reduced-motion.
- `index.html`: shell dokumen dan metadata.

Stack: React + TypeScript + Vite untuk halaman satu layar yang ringan dan bertipe, serta GSAP + ScrollTrigger karena brief meminta timeline hero dan reveal scroll tanpa mengunci scrolling. Tidak ada backend, database, autentikasi, Three.js, atau scene Office 3D.

Preloader berjalan sekali per sesi, tanpa progress palsu, dapat dilewati, dan tidak dijalankan bila reduced motion aktif. Kartu hero adalah elemen DOM/CSS. Project text dan status kontribusi memerlukan validasi Dicky sebelum publikasi; kontak langsung belum disediakan, gunakan profil GitHub sementara.
