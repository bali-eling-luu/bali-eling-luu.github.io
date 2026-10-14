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
- **Dashboard Pengguna** (`dashboard.html`) — sambutan, statistik dampak harian, 3 lokasi terdekat, tips harian
- **Kerja Sama & Listing** (`kerja-sama.html`) — 3 paket (listing lokasi, listing UMKM, sponsor artikel),
  formulir pendaftaran, dan FAQ
- **Link afiliasi** — rekomendasi produk di tiap artikel, semua URL dikelola di satu file `afiliasi.js`
- **Responsive** — desktop 1440px & mobile 390px; bottom nav hanya di mobile

## Struktur

```
Bali Eling Luu/
├── index.html        # Halaman utama (splash, hero, section, footer)
├── panduan.html      # Panduan memilah + 4 kartu kategori
├── edukasi.html      # Detail jenis sampah (?jenis=organik|anorganik|residu|b3)
├── dashboard.html    # Dashboard pengguna
├── data_lokasi.js    # 6 lokasi nyata (Denpasar & Badung) + tips harian
├── data_artikel.js   # Isi 4 artikel (paragraf, tabel, catatan)
├── artikel.html      # Arsip & halaman baca artikel
├── kerja-sama.html   # Halaman kerja sama + formulir
├── afiliasi.js       # Daftar link afiliasi (satu-satunya tempat edit)
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

**Lokasi** (`data_lokasi.js`, tampil di `dashboard.html`):

| Nama | Alamat |
|---|---|
| Bank Sampah Budi Alami | Jl. Kertasan No. 12, Denpasar Selatan |
| Bank Sampah Tri Manunggal (Sekar Puri) | Jl. Tukad Yeh Aya, Panjer, Denpasar Selatan |
| Bank Sampah Melati | Perumnas Sandebaya, Jl. Kebo Iwa No. 8, Denpasar Timur |
| Bank Sampah Bina Ayu | Jl. Pulau Nusa Penida, Sanur Kaja, Denpasar Selatan |
| Bank Sampah Jukung Nusa Sedaya | Jl. Pura Segara, Kedonganan, Kuta Selatan, Badung |
| TPS3R Banjar Anyar Kelod | Jl. Raya Tuban No. 88, Tuban, Kuta, Badung |

Rujukan: BaliPost (09/05/2024), ANTARA Bali (27/09/2024), Dinas Pariwisata Badung.

**Yang belum diverifikasi** dan sengaja ditandai apa adanya di situs:
jam buka, nomor telepon, tarif, dan jarak (jarak hanya perkiraan dari pusat
Kota Denpasar). Field `jam` diisi `null` sehingga tampil sebagai
"Jam buka perlu dikonfirmasi".

Sebelum memakai data ini di depan umum, konfirmasi dulu ke pengelola masing-masing.

## Menjalankan monetisasi

### 1. Link afiliasi

Daftar ke program afiliasi (Shopee Affiliate / Tokopedia Affiliate), lalu tempel
link milikmu ke kolom `url` di `afiliasi.js`. Tidak perlu membuka file HTML mana pun —
semua artikel langsung memakai link terbaru.

Setiap link sudah memakai `rel="nofollow sponsored"` supaya tidak dihitung sebagai
link biasa oleh mesin pencari.

Komisi Shopee Affiliate relatif kecil: **1%** (Basic, maks Rp10.000/transaksi)
atau **2%** (Premium). Rincian rate terbaru ada di komentar paling atas
`afiliasi.js`. Karena itu affiliate sebaiknya dijalankan bersama listing dan
sponsor, bukan sebagai satu-satunya sumber pemasukan.

### 2. Formulir kerja sama

Halaman `kerja-sama.html` mengirim formulir ke **Formspree** (gratis, 50 kiriman/bulan).
Ganti `GANTI_ID_FORMSPREE` di dalam tag `<form>` dengan ID milikmu:

1. Daftar di https://formspree.io
2. Buat form baru, salin ID-nya (format: `f/xxxxxxxx`)
3. Buka `kerja-sama.html`, cari `https://formspree.io/f/GANTI_ID_FORMSPREE`

Selama ID belum diganti, form akan memberi pesan error dari Formspree — itu normal.

Kontak alternatif (WhatsApp & email) sudah disiapkan di `<aside>` kanan.
Ganti `62XXXXXXXXXXX` dan `halo@balielingluu.id` dengan milikmu.

## Catatan

Konten edukasi (definisi kategori, contoh, cara penanganan) disusun sebagai panduan umum.
Selalu rujuk ketentuan dan fasilitas pengelolaan sampah setempat — terutama untuk sampah B3.

## Lisensi

Digunakan untuk keperluan edukasi dan portofolio.
