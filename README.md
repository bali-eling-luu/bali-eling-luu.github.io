# Bali Eling Luu 🌿

Website edukasi pemilahan sampah dan pelestarian lingkungan di Bali.
Dibangun dengan **HTML + Tailwind CSS (CDN) + JavaScript vanilla** — tanpa backend, tanpa build step, gratis di-hosting statis.

> Tagline: *Jaga Alam, Lestarikan Bali.*

---

## Fitur

- **Splash screen** — foto alam Bali + logo, otomatis fade ke halaman utama
- **Hero pencarian** — cari jenis sampah atau pilih kategori
- **4 kategori sampah** — Organik, Anorganik, Residu, B3/Khusus
- **6 tips lingkungan** & **4 kartu artikel**
- **Asisten Eling** — chat bot lokal yang menjawab pertanyaan seputar jenis sampah, cara memilah, dan penanganannya
- **Panduan Memilah** (`panduan.html`) — 4 kartu kategori + langkah praktis, tampilan app-like dengan bottom nav
- **Detail Jenis Sampah** (`edukasi.html`) — pengertian, contoh, cara menangani; 4 kategori dalam satu halaman lewat parameter `?jenis=`
- **Dashboard Pengguna** (`dashboard.html`) — sambutan, statistik dampak harian, 3 lokasi terdekat, tips harian
- **Responsive** — desktop 1440px & mobile 390px; bottom nav hanya di mobile

## Struktur

```
Bali Eling Luu/
├── index.html        # Halaman utama (splash, hero, section, footer)
├── panduan.html      # Panduan memilah + 4 kartu kategori
├── edukasi.html      # Detail jenis sampah (?jenis=organik|anorganik|residu|b3)
├── dashboard.html    # Dashboard pengguna
├── data_lokasi.js    # Data lokasi contoh + tips harian
├── data_sampah.js    # Basis pengetahuan: 4 kategori, 30 item, 7 topik
├── chat.js           # UI & logika asisten Eling
└── assets/
    ├── photo01.jpeg
    ├── photo02.jpeg
    └── logo/
        ├── logo-mark.png
        ├── Logo&tulisan.png
        └── tulisan.png
```

## Menjalankan

Buka `index.html` langsung di browser, atau jalankan server lokal:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

> Catatan: disarankan lewat server lokal karena `file://` bisa membatasi sebagian fitur browser.

## Cara kerja Asisten Eling

Asisten ini **bukan AI berbasis API** — semua jawaban diambil dari data lokal di `data_sampah.js`,
sehingga tidak butuh API key, tidak ada biaya, dan tetap berjalan offline.

Pencocokan dilakukan berurutan:

1. **Item** — mencocokkan nama & alias (mis. "aqua", "botol mineral" → *Botol plastik*)
2. **Topik** — pertanyaan umum (cara memilah, residu vs B3, bank sampah, dll.)
3. **Kategori** — Organik / Anorganik / Residu / B3
4. **Fallback** — menawarkan pilihan kategori

Menambah pengetahuan baru cukup dengan menambah entri ke object `ITEM` atau `TOPIK`:

```js
{
  nama: "Botol plastik",
  alias: ["botol aqua", "aqua", "pet", "botol mineral"],
  kategori: "anorganik",
  tips: "Bilas, kupas label kalau bisa, lalu masukkan ke plastik daur ulang."
}
```

## Menyesuaikan desain

Warna dan font diatur lewat config Tailwind di bagian `<head>` `index.html`:

```js
colors: {
  primary: "#17803D",   // hijau utama
  forest:  "#14532D",   // hijau tua
  cream:   "#F5F2EA",   // latar krem
  terra:   "#D9A441",   // aksen terakota
  ink:     "#1E3A2A",   // teks utama
  muted:   "#6B7A70",   // teks sekunder
  line:    "#E3E7E1",   // border
}
```

Font: **Plus Jakarta Sans** (Google Fonts).

## Catatan

Konten edukasi (definisi kategori, contoh, cara penanganan) disusun sebagai panduan umum.
Selalu rujuk ketentuan dan fasilitas pengelolaan sampah setempat — terutama untuk sampah B3.

## Lisensi

Digunakan untuk keperluan edukasi dan portofolio.
