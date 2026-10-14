# Bali Eling Luu 🌿

Website edukasi pemilahan sampah dan pelestarian lingkungan di Bali.
Dibangun dengan **HTML + Tailwind CSS (CDN) + JavaScript vanilla** — tanpa backend, tanpa build step, gratis di-hosting statis.

> Tagline: *Jaga Alam, Lestarikan Bali.*

---

## Fitur

- **Splash screen** — foto alam Bali + logo, otomatis fade ke halaman utama
- **Hero pencarian** — cari jenis sampah atau pilih kategori
- **4 kategori sampah** — Organik, Anorganik, Residu, B3/Khusus
- **6 tips lingkungan**
- **4 artikel lengkap** (`artikel.html?id=…`) — pemilahan, wisata, pantai, B3; teks asli di `data_artikel.js` + halaman arsip
- **Asisten Eling** — chat bot lokal yang menjawab pertanyaan seputar jenis sampah, cara memilah, dan penanganannya
- **Panduan Memilah** (`panduan.html`) — 4 kartu kategori + langkah praktis, tampilan app-like dengan bottom nav
- **Detail Jenis Sampah** (`edukasi.html`) — pengertian, contoh, cara menangani; 4 kategori dalam satu halaman lewat parameter `?jenis=`
- **Dashboard Pengguna** (`dashboard.html`) — sambutan, statistik dampak harian, tips harian,
  dan 6 jenis tempat penerima sampah
- **Responsive** — desktop 1440px & mobile 390px; bottom nav hanya di mobile

## Struktur

```
Bali Eling Luu/
├── index.html        # Halaman utama (splash, hero, section, footer)
├── panduan.html      # Panduan memilah + 4 kartu kategori
├── edukasi.html      # Detail jenis sampah (?jenis=organik|anorganik|residu|b3)
├── dashboard.html    # Dashboard pengguna
├── data_lokasi.js    # 6 jenis tempat penerima sampah + tips harian
├── data_artikel.js   # Isi 4 artikel (paragraf, tabel, catatan)
├── artikel.html      # Arsip & halaman baca artikel
├── data_statistik.js # Statistik sampah Bali + sumbernya
├── data_sampah.js    # Basis pengetahuan: 4 kategori, 30 item, 7 topik
├── chat.js           # UI & logika asisten Eling
└── assets/
    ├── photo01..05.jpeg          # foto alam & budaya Bali
    ├── foto-jenis-sampah/        # foto contoh tiap kategori
    │   ├── organik.jpeg
    │   ├── anorganik.jpeg
    │   ├── residu.jpeg
    │   └── b3.jpeg
    └── logo/
        ├── logo-mark.png
        ├── logo-tulisan.png
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

## Sumber data

Agar situs ini bisa dipercaya, angka dan lokasi yang ditampilkan diambil dari
sumber publik — bukan karangan:

**Statistik** (`data_statistik.js`, tampil di `index.html` bagian "Mengapa Kita
Harus Peduli?"):

| Angka | Nilai | Sumber |
|---|---|---|
| Timbulan sampah Bali | 3.436 ton/hari | SIPSN Kementerian Lingkungan Hidup (data 2024) |
| Sampah terkelola | 29% (≈916 ton/hari) | Rapat koordinasi pengelolaan sampah Bali, 26 Agustus 2025 |
| Target nasional | 51,21% | idem |
| Komposisi | >60% organik, 17% plastik | UPTD Pengelolaan Sampah DKLH Provinsi Bali, Juli 2025 |
| Sebaran | Denpasar 1.005, Gianyar 562, Badung 547 ton/hari | idem |

**Jenis tempat penerima sampah** (`data_lokasi.js`, tampil di `dashboard.html`):

Situs ini **sengaja tidak menampilkan nama usaha atau alamat tertentu**.
Jam buka, layanan, dan tarif tiap tempat berubah sewaktu-waktu dan berbeda
antardaerah. Yang ditampilkan adalah *jenis* tempatnya — Bank Sampah, TPS 3R,
Drop Box B3, TPS Terpadu, Pengepul, dan Komunitas Daur Ulang — beserta cara
menemukannya di daerah masing-masing (tanya balai banjar, kelurahan, kantor desa).

Kalau kelak butuh direktori lokasi nyata, tambahkan terpisah — jangan menimpa
`JENIS_TEMPAT`, karena bagian "Cara menemukan" bergantung pada formatnya.


## Catatan teknis (jangan dilepas)

`KATEGORI`, `ARTIKEL`, dan `JENIS_TEMPAT` adalah objek/array biasa. Objek biasa
**mewarisi** `__proto__`, `toString`, `constructor`, dll. dari
`Object.prototype`. Maka cek seperti `if (!KATEGORI[param])` akan menganggap
kunci-kunci warisan itu "valid" dan merusak halaman.

Pernah terjadi: `edukasi.html?jenis=__proto__` menghasilkan halaman penuh
teks `undefined`. Karena itu `edukasi.html` dan `chat.js` memakai
`kategoriValid()` / `katValid()` berbasis
`Object.prototype.hasOwnProperty.call(...)`. Jangan ganti kembali dengan cek
truthiness biasa.

Bottom nav juga sudah distandarkan seragam di 5 halaman
(Beranda → Jenis Sampah → Lokasi → Artikel). Kalau menambah halaman baru,
salin pola nav dari `panduan.html`, jangan tulis ulang sendiri.

## Catatan

Konten edukasi (definisi kategori, contoh, cara penanganan) disusun sebagai panduan umum.
Selalu rujuk ketentuan dan fasilitas pengelolaan sampah setempat — terutama untuk sampah B3.

## Lisensi

Digunakan untuk keperluan edukasi dan portofolio.
