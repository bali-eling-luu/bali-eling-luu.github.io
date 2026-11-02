/**
 * Bali Eling Luu — Database Fasilitas Pengelolaan Sampah Bali (Bali Eco Map)
 * Data titik koordinat nyata Bank Sampah, TPS3R, TOSS & Drop Box B3 di Bali
 */

const FASILITAS_BALI = [
  // KOTA DENPASAR
  {
    id: "dps-01",
    nama: "TPS 3R Desa Pemecutan Kaja",
    kabupaten: "Denpasar",
    kecamatan: "Denpasar Utara",
    kategori: "tps3r",
    kategoriLabel: "TPS 3R (Kompos & Pilah)",
    warna: "#17803D",
    alamat: "Jl. Sutomo No. 112, Pemecutan Kaja, Denpasar Utara",
    lat: -8.6385,
    lng: 115.2078,
    jamBuka: "Senin - Sabtu: 07.00 - 15.00 WITA",
    terima: ["Organik (Kompos)", "Anorganik", "Residu Terpilah"],
    pengelola: "Pemerintah Desa Pemecutan Kaja & KSM",
    telepon: "0812-3891-xxxx",
    terverifikasi: true,
    deskripsi: "Mengolah sisa makanan dan canang menjadi kompos organik berkualitas untuk ruang hijau desa."
  },
  {
    id: "dps-02",
    nama: "TPS 3R Kesiman Kertalangu",
    kabupaten: "Denpasar",
    kecamatan: "Denpasar Timur",
    kategori: "tps3r",
    kategoriLabel: "TPS 3R (Kompos & Pilah)",
    warna: "#17803D",
    alamat: "Kawasan Desa Budaya Kertalangu, Jl. Bypass Ngurah Rai",
    lat: -8.6432,
    lng: 115.2534,
    jamBuka: "Setiap Hari: 06.30 - 14.00 WITA",
    terima: ["Organik", "Anorganik", "Canang Upacara"],
    pengelola: "BUMDes Kertalangu",
    telepon: "0819-9943-xxxx",
    terverifikasi: true,
    deskripsi: "Percontohan pengelolaan sampah berbasis sumber terpadu dan pembibitan tanaman."
  },
  {
    id: "dps-03",
    nama: "Bank Sampah Tegeh Sari",
    kabupaten: "Denpasar",
    kecamatan: "Denpasar Barat",
    kategori: "bank_sampah",
    kategoriLabel: "Bank Sampah (Tabungan)",
    warna: "#D9A441",
    alamat: "Banjar Tegeh Sari, Jl. Gunung Batur, Padangsambian Kaja",
    lat: -8.6510,
    lng: 115.1850,
    jamBuka: "Minggu ke-1 & ke-3: 08.00 - 12.00 WITA",
    terima: ["Plastik PET", "Kardus", "Kertas", "Aluminium/Kaleng", "Minyak Jelantah"],
    pengelola: "Komunitas Warga Banjar Tegeh Sari",
    telepon: "0857-3712-xxxx",
    terverifikasi: true,
    deskripsi: "Menerima tabungan sampah anorganik yang dikonversi ke saldo kas atau tabungan emas."
  },
  {
    id: "dps-04",
    nama: "Drop Box Sampah B3 DLHK Denpasar",
    kabupaten: "Denpasar",
    kecamatan: "Denpasar Barat",
    kategori: "b3",
    kategoriLabel: "Drop Box Limbah B3",
    warna: "#D64545",
    alamat: "Kantor Dinas LHK Kota Denpasar, Jl. Majapahit No. 1",
    lat: -8.6650,
    lng: 115.2150,
    jamBuka: "Senin - Jumat: 08.00 - 15.30 WITA",
    terima: ["Baterai Bekas", "Lampu TL/Neon", "Limbah Elektronik Kecil", "Kemasan Pestisida"],
    pengelola: "DLHK Kota Denpasar",
    telepon: "(0361) 223333",
    terverifikasi: true,
    deskripsi: "Titik resmi penyerahan limbah berbahaya dan beracun dari rumah tangga sebelum dimusnahkan."
  },
  {
    id: "dps-05",
    nama: "Bank Sampah Pelita Kedaton",
    kabupaten: "Denpasar",
    kecamatan: "Denpasar Timur",
    kategori: "bank_sampah",
    kategoriLabel: "Bank Sampah (Tabungan)",
    warna: "#D9A441",
    alamat: "Banjar Kedaton, Desa Kesiman Petilan",
    lat: -8.6534,
    lng: 115.2410,
    jamBuka: "Sabtu & Minggu: 08.30 - 13.00 WITA",
    terima: ["Botol Plastik", "Kardus", "Buku Bekas", "Logam"],
    pengelola: "Krama Banjar Kedaton & PKK",
    telepon: "0813-3765-xxxx",
    terverifikasi: true,
    deskripsi: "Aktif melayani penimbangan sampah anorganik warga untuk menunjang iuran banjar."
  },

  // KABUPATEN BADUNG
  {
    id: "bdg-01",
    nama: "Bank Sampah Bhineka Nusa Kauh",
    kabupaten: "Badung",
    kecamatan: "Kuta Utara",
    kategori: "bank_sampah",
    kategoriLabel: "Bank Sampah Unit Terbaik",
    warna: "#D9A441",
    alamat: "Perumahan Bhineka Nusa Kauh, Dalung, Kuta Utara",
    lat: -8.6210,
    lng: 115.1765,
    jamBuka: "Sabtu: 08.00 - 12.00 WITA",
    terima: ["Plastik", "Kardus", "Kaleng", "Kaca Botol"],
    pengelola: "Pengurus Lingkungan Dalung & Ibu-ibu PKK",
    telepon: "0812-4681-xxxx",
    terverifikasi: true,
    deskripsi: "Role model bank sampah perumahan di Badung dengan pencatatan digital saldo sampah."
  },
  {
    id: "bdg-02",
    nama: "TPS 3R Mengwitani",
    kabupaten: "Badung",
    kecamatan: "Mengwi",
    kategori: "tps3r",
    kategoriLabel: "TPS 3R Terpadu",
    warna: "#17803D",
    alamat: "Jl. Raya Mengwitani, Mengwi, Kabupaten Badung",
    lat: -8.5478,
    lng: 115.1732,
    jamBuka: "Senin - Sabtu: 07.00 - 14.30 WITA",
    terima: ["Organik (Daun & Banten)", "Anorganik", "Residu"],
    pengelola: "Pemerintah Desa Mengwitani",
    telepon: "0878-6012-xxxx",
    terverifikasi: true,
    deskripsi: "Sentra pemrosesan residu upacara dan pengolahan pupuk organik di kawasan Badung Utara."
  },
  {
    id: "bdg-03",
    nama: "TPS 3R Seminyak Clean",
    kabupaten: "Badung",
    kecamatan: "Kuta",
    kategori: "tps3r",
    kategoriLabel: "TPS 3R Kawasan Wisata",
    warna: "#17803D",
    alamat: "Jl. Sunset Road Gg. Merpati, Seminyak, Kuta",
    lat: -8.6923,
    lng: 115.1682,
    jamBuka: "Setiap Hari: 06.00 - 17.00 WITA",
    terima: ["Plastik Restoran/Hotel", "Organik Dapur", "Kardus Kemasan"],
    pengelola: "Desa Adat Seminyak",
    telepon: "0811-3829-xxxx",
    terverifikasi: true,
    deskripsi: "Mengelola sampah industri pariwisata (villa, restoran, kafe) di kawasan Seminyak-Kuta."
  },
  {
    id: "bdg-04",
    nama: "TPS 3R Jimbaran Asri",
    kabupaten: "Badung",
    kecamatan: "Kuta Selatan",
    kategori: "tps3r",
    kategoriLabel: "TPS 3R & Pakan Ternak",
    warna: "#17803D",
    alamat: "Jl. Kampus Unud, Jimbaran, Kuta Selatan",
    lat: -8.7890,
    lng: 115.1640,
    jamBuka: "Senin - Sabtu: 07.00 - 15.00 WITA",
    terima: ["Organik", "Anorganik Kering", "Minyak Jelantah"],
    pengelola: "Koperasi Lingkungan Jimbaran",
    telepon: "0819-1634-xxxx",
    terverifikasi: true,
    deskripsi: "Dilengkapi fasilitas budidaya maggot BSF untuk menghabiskan sampah organik basah."
  },

  // KABUPATEN GIANYAR
  {
    id: "gyr-01",
    nama: "Sentra Kompos & TPS 3R Temesi",
    kabupaten: "Gianyar",
    kecamatan: "Gianyar",
    kategori: "tps3r",
    kategoriLabel: "Pusat Daur Ulang Terpadu",
    warna: "#17803D",
    alamat: "Desa Temesi, Kecamatan Gianyar",
    lat: -8.5432,
    lng: 115.3456,
    jamBuka: "Senin - Sabtu: 07.30 - 15.00 WITA",
    terima: ["Sampah Organik Skala Besar", "Anorganik", "Kaca Botol"],
    pengelola: "Yayasan Temesi Bersih & Pemdes",
    telepon: "(0361) 948123",
    terverifikasi: true,
    deskripsi: "Pelopor pengolahan kompos berbasis CDM di Bali yang telah beroperasi selama belasan tahun."
  },
  {
    id: "gyr-02",
    nama: "Rumah Kompos Padangtegal Ubud",
    kabupaten: "Gianyar",
    kecamatan: "Ubud",
    kategori: "tps3r",
    kategoriLabel: "Pengelolaan Kompos Komunitas",
    warna: "#17803D",
    alamat: "Jl. Wenara Wana (Monkey Forest), Padangtegal, Ubud",
    lat: -8.5189,
    lng: 115.2635,
    jamBuka: "Setiap Hari: 07.00 - 16.00 WITA",
    terima: ["Organik Upacara", "Organik Wisatawan", "Anorganik Terpilah"],
    pengelola: "Desa Adat Padangtegal",
    telepon: "0812-3901-xxxx",
    terverifikasi: true,
    deskripsi: "Contoh sukses desa adat mandiri sampah yang mengolah 80%+ sampahnya tanpa lari ke TPA."
  },

  // KABUPATEN KLUNGKUNG
  {
    id: "klk-01",
    nama: "TOSS Center Karangdadi Klungkung",
    kabupaten: "Klungkung",
    kecamatan: "Klungkung",
    kategori: "toss",
    kategoriLabel: "TOSS (Tempat Olah Sampah Setempat)",
    warna: "#14532D",
    alamat: "Dusun Karangdadi, Desa Kusamba, Klungkung",
    lat: -8.5520,
    lng: 115.4180,
    jamBuka: "Senin - Sabtu: 07.00 - 16.00 WITA",
    terima: ["Organik", "Anorganik", "Residu Dibuat Pelet"],
    pengelola: "DLHKP Kabupaten Klungkung",
    telepon: "(0366) 21123",
    terverifikasi: true,
    deskripsi: "Inovasi unggulan Bali: Tempat Olah Sampah Setempat menjadi bahan bakar briket pelet biomassa."
  },

  // KABUPATEN TABANAN
  {
    id: "tbn-01",
    nama: "TPS 3R Tabanan Mandiri Asri",
    kabupaten: "Tabanan",
    kecamatan: "Tabanan",
    kategori: "tps3r",
    kategoriLabel: "TPS 3R Kota",
    warna: "#17803D",
    alamat: "Dajan Peken, Kecamatan Tabanan",
    lat: -8.5412,
    lng: 115.1245,
    jamBuka: "Senin - Sabtu: 07.30 - 14.00 WITA",
    terima: ["Organik", "Anorganik", "Kardus"],
    pengelola: "Kelurahan Dajan Peken",
    telepon: "0877-6123-xxxx",
    terverifikasi: true,
    deskripsi: "Melayani pemilahan sampah perkotaan Tabanan dengan sistem jemput terpilah."
  }
];

// Helper untuk filter data
function filterFasilitasBali(kabupaten = "semua", kategori = "semua") {
  return FASILITAS_BALI.filter(f => {
    const matchKab = kabupaten === "semua" || f.kabupaten.toLowerCase() === kabupaten.toLowerCase();
    const matchKat = kategori === "semua" || f.kategori.toLowerCase() === kategori.toLowerCase();
    return matchKab && matchKat;
  });
}
