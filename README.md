# Bali Eling Luu 🌿
### AI-Powered Environmental Action Platform — Solver for Bali

Platform digital berbasis Artificial Intelligence (AI) yang menghubungkan edukasi pemilahan sampah, pengenalan sampah budaya & rumah tangga via AI Vision, direktori geospasial TPS3R/Bank Sampah se-Bali, dan aksi nyata masyarakat.

> **Tagline:** *Dari Kesadaran Menjadi Tindakan Nyata untuk Bali.*  
> **Tema Kompetisi:** *AI Web Innovation Challenge — Bali Digifest 2026 (Build with AI, Solver for Bali)*  
> **Bidang:** Bali Smart Society, UMKM & Bisnis Lingkungan, Pendidikan.

---

## 🚀 Fitur Unggulan & Pilar Inovasi

### 1. AI Waste Scanner (Fitur Inti AI Vision)
- **Deteksi Kamera & Upload Gambar:** Memindai sampah langsung dari kamera smartphone atau unggahan galeri foto.
- **Model Khusus 13 Kelas (Teachable Machine):** `model/model.json` + `weights.bin` (2.1 MB) — Canang Sari, Botol PET, Botol Kaca Arak, Kaleng, Kardus, Sisa Makanan, Daun & Ranting, Kresek, Plastik Sachet, Styrofoam, Sampah Higiene, Baterai B3, Bukan Sampah. Fallback ke MobileNet ImageNet bila model gagal dimuat.
- **Keyakinan Model, Bukan Akurasi Klaim:** Angka yang tampil adalah softmax confidence model (0-99%), bukan akurasi lapangan yang divalidasi. Ambang keyakinan 45% dipakai sebagai mekanisme *unknown*; bila model yakin bukan-sampah, banner hijau ditampilkan (bukan dipaksa sampah).
- **Langkah Tindakan & Wadah Warna:** Panduan praktis pemilahan + klasifikasi wadah warna sesuai kategori Bali.
- **Penyaluran Fasilitas Terdekat:** Langsung merekomendasikan apakah material harus disalurkan ke Kompos Mandiri, TPS3R, atau Bank Sampah terdekat.
- **Katalog Manual 25 Jenis:** Telusuri & cari manual tanpa foto tetap tersedia.

### 2. Bali Eco Map (Solusi Geospasial Interaktif)
- **Peta Interaktif Leaflet.js & OpenStreetMap:** 100% open-source, ringan, cepat, tanpa biaya API key Google Maps.
- **Basis Data 18 Titik, 9 Kabupaten/Kota:** TPS 3R (12), Bank Sampah (4), TOSS (1), Drop Box B3 (1) di Denpasar, Badung, Gianyar, Tabanan, Klungkung, Bangli, Buleleng, Jembrana, dan Karangasem. 13 titik ditandai terverifikasi bawaan proyek (belum audit independen), 5 titik baru berstatus *Belum diverifikasi — konfirmasi jadwal*.
- **Filter Wilayah & Kategori:** Pengguna dapat menyaring berdasarkan Kabupaten/Kota dan jenis penerimaan sampah.
- **Rute Google Maps Langsung:** Tiap pin dilengkapi tombol langsung membuka petunjuk arah navigasi Google Maps.
- **Deteksi Lokasi Pengguna (Geolocation):** Menemukan fasilitas pengolahan sampah dalam radius terdekat dari lokasi perangkat.

### 3. Eco Action & Gamifikasi "Palemahan" (Habit Building & Retensi)
- **Tantangan Harian (Daily Quests):** Misi pemilahan sampah harian berlandaskan kearifan lokal **Tri Hita Karana (Palemahan)**.
- **Sistem Level & Lencana Kehormatan:** Peningkatan level dari *Krama Peduli*, *Satria Palemahan*, hingga *Pahlawan Asri Bali*.
- **Streak Tracker (🔥):** Menghitung keaktifan hari memilah berturut-turut untuk mendorong retensi kunjungan harian.
- **Penyimpanan Persisten:** Log aktivitas dan poin tersimpan otomatis di browser (`localStorage`).

### 4. Lapor Luu (Partisipasi Warga — Bali Smart Society)
- **Pelaporan Sampah Liar:** Warga dan wisatawan dapat melaporkan titik tumpukan sampah pantai, got tersumbat, atau timbulan liar di jalanan Bali.
- **Feed Komunitas Transparan:** Status penanganan publik yang jelas (*Diterima*, *Diteruskan ke DLHK*, *Dalam Penanganan Banjar*, *Selesai*).

### 5. Eling AI Assistant (Regulasi & Budaya Bali)
- **Pengetahuan Regulasi Daerah:** Memahami **Pergub Bali No. 97/2018** (Pembatasan Plastik Sekali Pakai), **Pergub Bali No. 47/2019** (Pengelolaan Sampah Berbasis Sumber di Desa Adat), serta target **Bali 100% Memilah Sampah 1 Juli 2026**.
- **Panduan Santun:** Menjawab dengan pemahaman adat Bali serta ramah bagi wisatawan mancanegara.

---

## 📂 Struktur File Proyek

```
Bali Eling Luu/
├── index.html           # Landing page utama (Hero AI Scanner, Bali Eco Map, Lapor Luu, Tips)
├── dashboard.html       # Dashboard pengguna (Gamifikasi Palemahan, Daily Quests, Log Dampak)
├── panduan.html         # Panduan komprehensif 4 kategori sampah
├── edukasi.html         # Detail materi edukasi sampah (?jenis=organik|anorganik|residu|b3)
├── artikel.html         # Artikel mendalam pelestarian lingkungan
├── ai_scanner.js        # Engine AI Waste Scanner, UI modal, kamera, dan analitik vision
├── data_lokasi_peta.js  # Database titik koordinat TPS3R, Bank Sampah, Drop Box B3 se-Bali
├── peta.js              # Inisialisasi peta Leaflet.js, custom pin, popup rute, dan filter
├── eco_action.js        # Logika Gamifikasi Palemahan, Quests, XP, dan formulir Lapor Luu
├── data_sampah.js       # Basis data sampah (termasuk canang, banten, dupa, kelapa, regulasi)
├── chat.js              # Logika Asisten Eling AI (Local Rules + Puter.js fallback)
├── data_statistik.js    # Data statistik timbulan sampah Bali (SIPSN & Pemprov Bali)
├── data_artikel.js      # Konten artikel edukasi
└── assets/              # Foto budaya, alam Bali, dan aset logo
```

---

## 🛠️ Cara Menjalankan Secara Lokal

Buka terminal di direktori proyek dan jalankan:

```bash
python3 -m http.server 8000
```

Buka peramban di `http://localhost:8000`.

---

## 🏆 Kesiapan Kompetisi (Competition Readiness Checklist)

- [x] **AI sebagai Fitur Inti:** AI Waste Scanner & Asisten Lingkungan berbasis aturan & vision.
- [x] **Kesesuaian Tema Solver for Bali:** Mengatasi sampah upacara, pariwisata, dan mendukung Pergub 47 & 97.
- [x] **Solusi Nyata Geospasial:** Peta interaktif fasilitas TPS3R dan Bank Sampah riil di Bali.
- [x] **Retensi Pengguna:** Daily Quests, streak harian, dan sistem lencana adat Palemahan.
- [x] **Mobile Responsive:** 100% responsif di layar ponsel cerdas (viewport 375px - 430px) hingga desktop.


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
├── seo.js            # bantuan SEO halaman yang isinya diisi JS
├── robots.txt        # izin perayapan + arah ke sitemap
├── sitemap.xml       # 13 URL untuk mesin telusur
├── favicon.ico       # ikon tab (16/32/48/64 px)
└── assets/
    ├── og-image.jpg                # kartu Open Graph 1200×630
    ├── photo01..05.webp          # foto alam & budaya Bali
    ├── foto-jenis-sampah/        # foto sampul tiap artikel
    │   ├── organik.webp
    │   ├── anorganik.webp
    │   ├── residu.webp
    │   └── b3.webp
    └── logo/
        ├── logo-mark.webp
        ├── logo-tulisan.webp
        └── apple-touch-icon.png   # 180×180 untuk iOS
```

## Menjalankan

Buka `index.html` langsung di browser, atau jalankan server lokal:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

> Catatan: disarankan lewat server lokal karena `file://` bisa membatasi sebagian fitur browser.

## Cara kerja Asisten Eling

Asisten memakai pendekatan **hibrida**: basis pengetahuan lokal lebih dulu,
baru AI sungguhan untuk sisanya.

```
pertanyaan
   │
   ├─ 1. Sapaan / terima kasih / "siapa kamu"  → jawaban tetap
   │
   ├─ 2. butuhAI()?  harga, berapa, kapan, pantun, berita, dll.
   │        └─ ya → lompat ke 5
   │
   ├─ 3. TOPIK   → "gimana bikin kompos", "residu vs B3", "bank sampah"
   ├─ 4. ITEM / KATEGORI → kartu spesifik ("botol plastik" → Anorganik)
   │        └─ tidak ketemu → lompat ke 5
   │
   ├─ 5. AI sudah disetujui sebelumnya?  (`eling_ai_izin` di peramban)
   │        ├─ ya  → langsung ke 6
   │        └─ belum → tawarkan dulu:  [Aktifkan AI]  [Nanti saja]
   │                      ├─ Aktifkan → 6  (pop-up izin baru muncul di sini)
   │                      └─ Nanti    → jawaban lokal: kartu kategori + panduan
   │
   └─ 6. AI sungguhan (Puter.js) — streaming, dengan ingatan 8 langkah terakhir
            ├─ sukses → izin disimpan, tidak ditawari lagi
            └─ gagal  → pesan fallback + pilihan kategori
```

**Mengapa lokal dulu:** instan, gratis, tanpa login, dan tidak mungkin mengarang.
Khusus untuk situs edukasi soal sampah, jawaban yang salah soal cara memilah B3
jauh lebih berbahaya daripada jawaban yang terbatas.

**Mengapa AI untuk sisanya:** pertanyaan seperti harga jual terkini, pantun, atau
"yang tadi aku tanya apa" tidak ada di basis data. Inilah satu-satunya tempat
`puter.ai.chat()` dipanggil.

### Yang perlu diketahui soal AI (Puter.js)

- **Opt-in, bukan pop-up diam-diam.** Pengunjung baru tidak langsung diminta izin —
  dia ditawari dulu lewat kartu **[Aktifkan AI] [Nanti saja]**. Jendela login Puter
  baru muncul setelah dia sendiri yang menekan tombolnya. Ini bukan sekadar sopan;
  juga teknis: `puter.ai.chat()` harus dipanggil dari respons klik pengguna
  supaya browser tidak memblokir jendelanya.
- **Tanpa API key, tanpa backend** — skrip dimuat dari `https://js.puter.com/v2/`,
  hanya setelah disetujui. Pengunjung yang tidak memakai AI tidak memuat
  skrip pihak ketiga sama sekali.
- **Masuk akun Puter** (Google / Microsoft / Apple / email) diminta sekali saja,
  gratis, lalu disimpan di peramban (`eling_ai_izin`) dan tidak ditanya lagi.
  Tidak ada mode tamu.
- Kalau pop-up ditutup atau diblokir, panggilan dibatasi **45 detik per percobaan**
  lalu jatuh ke pesan fallback + pilihan kategori. Tidak akan menggantung.
- Jawaban AI diberi label **"Eling AI"** supaya pembaca tahu itu bukan data resmi situs.

### Menambah pengetahuan lokal

Menambah entri ke `ITEM` atau `TOPIK` di `data_sampah.js` membuat pertanyaan itu
dijawab instan tanpa perlu menyentuh AI:

```js
{
  nama: "Botol plastik",
  alias: ["botol aqua", "aqua", "pet", "botol mineral"],
  kategori: "anorganik",
  tips: "Bilas, kupas label kalau bisa, lalu masukkan ke plastik daur ulang."
}
```

## SEO & indeks mesin telusur

Supaya situs muncul saat dicari di Google, semua ini ikut ter-commit:

| Berkas | Isi |
|---|---|
| `robots.txt` | izinkan semua perayap + arahkan ke sitemap |
| `sitemap.xml` | **13 URL** — 5 halaman, 4 artikel, 4 varian `edukasi.html?jenis=` |
| `favicon.ico` | dibuat dari `logo-mark.webp` (16/32/48/64 px) |
| `assets/og-image.jpg` | kartu Open Graph 1200×630 (foto Bali + judul) |
| `seo.js` | bantuan untuk halaman yang isinya diisi JS |

### Meta di tiap halaman

Lima halaman statis sudah punya lengkap di HTML-nya:
`canonical`, `robots`, `og:*` (type/site_name/locale/title/description/url/image),
`twitter:card`, serta favicon & apple-touch-icon.

### Structured data (JSON-LD)

- **`index.html`** — `Organization` + `WebSite`
- **`panduan.html`** — `ItemList` 4 jenis sampah
- **`dashboard.html`** — `WebPage` + `BreadcrumbList`
- **`artikel.html?id=…`** — `Article` + `BreadcrumbList`, diisi JS setelah artikel tampil
- **`edukasi.html?jenis=…`** — `Article` + `BreadcrumbList`, diisi JS

> **Kenapa dibantu JS:** artikel & jenis sampah diisi dari data, jadi
> tanpa bantuan ini Google hanya melihat satu URL untuk keempat artikel.
> `seo.js` menyesuaikan `canonical`, `og:url`, dan JSON-LD per varian.
> **Catatan:** perayap media sosial (WhatsApp/Facebook) tidak menjalankan JS,
> jadi tautan artikel tetap memakai pratinjau umum halaman.

**Sengaja tidak dipasang:** `SearchAction` di `WebSite` — kotak pencarian
situs ini berjalan lewat JS tanpa parameter URL, jadi menuliskannya di
structured data akan berbohong dan bisa membuat Google menandai data itu tidak valid.

### Yang masih perlu dilakukan manual

1. Daftar di **[Google Search Console](https://search.google.com/search-console)** — metode termudah **HTML tag** (salin meta tag ke `<head>` `index.html`) atau **DNS TXT record**.
2. Tambahkan properti `https://bali-eling-luu.github.io/`, verifikasi.
3. Menuju **Sitemaps** → masukkan `sitemap.xml` → **Kirim**.
4. Ulangi di **[Bing Webmaster Tools](https://www.bing.com/webmasters)** (otomatis mencakup DuckDuckGo).

Setelah itu pakai **URL Inspection** di GSC untuk meminta pengindeksan
segera pada halaman pertama.

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


## Gambar (format WebP)

Seluruh gambar disimpan sebagai **WebP**, bukan JPEG/PNG. Total aset turun dari
**9,3 MB menjadi 1,2 MB (-87%)** sehingga halaman tidak lambat dimuat.

Aturan ukuran yang sudah dipakai — jangan diubah sembarangan:

| Aset | Dimensi | Ditampilkan |
|---|---|---|
| `photo01..05` | 768 × 1376 | latar splash/hero, kartu `aspect-video` |
| `foto-jenis-sampah/*` | lebar 800 | kartu artikel (~282px di desktop) |
| `logo-mark` | 128 × 128 | header `h-9 w-9` (36px) |
| `logo-tulisan` | lebar 680 | splash `min(70vw, 340px)` |

Kalau menambah gambar baru: ekspor langsung ke WebP (misal `cwebp -q 75`),
ukurkan sesuai tabel di atas, dan jangan menaruh file JPEG/PNG di `assets/` —
semua referensi memakai akhiran `.webp`.
