/* Bali Eling Luu — Basis pengetahuan sampah (data lokal, tanpa API) */

const KATEGORI = {
  organik: {
    nama: "Organik",
    ikon: "🍂",
    warna: "#17803D",
    ringkas: "Sampah yang mudah terurai secara alami.",
    definisi:
      "Sampah organik adalah sisa makhluk hidup yang dapat terurai secara alami oleh mikroorganisme menjadi kompos atau humus.",
    contoh: [
      "Sisa makanan dan nasi",
      "Daun kering, ranting, rumput",
      "Kulit buah dan sayur",
      "Ampas teh, kopi",
      "Tulang ikan dan daging",
    ],
    penanganan: [
      "Pisahkan dari sampah lain sejak dari sumbernya.",
      "Gunakan wadah tertutup agar tidak berbau.",
      "Olah jadi kompos rumahan atau serahkan ke bank sampah organik.",
      "Hindari mencampur dengan plastik agar proses penguraian tidak terganggu.",
    ],
    peringatan:
      "Sisa makanan berminyak atau bersantan tetap perlu ditangani hati-hati karena bisa menimbulkan bau dan menarik hama.",
  },

  anorganik: {
    nama: "Anorganik",
    ikon: "♻️",
    warna: "#D9A441",
    ringkas: "Material yang berpotensi dipakai ulang atau didaur ulang.",
    definisi:
      "Sampah anorganik berasal dari bahan buatan manusia yang tidak mudah terurai, seperti plastik, kaca, logam, dan kertas.",
    contoh: [
      "Botol dan kemasan plastik",
      "Kaleng minuman dan makanan",
      "Kardus, koran, buku",
      "Botol kaca",
      "Piring dan gelas pecah",
    ],
    penanganan: [
      "Bilas sisa makanan sebelum menaruh kemasan.",
      "Pisahkan per jenis: plastik, kertas, logam, kaca.",
      "Lipat kardus agar hemat tempat.",
      "Serahkan ke bank sampah atau pengepul terdekat.",
    ],
    peringatan:
      "Tidak semua plastik bisa didaur ulang. Plastik bernomor 3 (PVC) dan 7 sering sulit diproses — ikuti ketentuan fasilitas pengelolaan setempat.",
  },

  residu: {
    nama: "Residu",
    ikon: "🗑️",
    warna: "#6B7A70",
    ringkas: "Tidak dapat diproses lewat jalur daur ulang yang tersedia.",
    definisi:
      "Residu adalah sisa sampah yang setelah dipilah tidak dapat didaur ulang lagi, sehingga harus dibuang ke TPA.",
    contoh: [
      "Tisu bekas dan popok",
      "Pembalut dan produk kebersihan",
      "Sikat gigi dan spons",
      "Sedotan plastik kotor",
      "Styrofoam tercampur makanan",
    ],
    penanganan: [
      "Keringkan dulu agar tidak menimbulkan bau.",
      "Bungkus rapat sebelum dibuang.",
      "Gunakan wadah residu khusus di rumah.",
      "Kurangi pemakaian barang sekali pakai agar volume residu mengecil.",
    ],
    peringatan:
      "Residu berarti berakhir di TPA. Semakin banyak residu, semakin cepat kapasitas TPA terpakai.",
  },

  b3: {
    nama: "B3 / Sampah Khusus",
    ikon: "⚠️",
    warna: "#C2410C",
    ringkas: "Perlu penanganan khusus, jangan dicampur sampah biasa.",
    definisi:
      "B3 (Bahan Berbahaya dan Beracun) adalah sampah yang mengandung zat berbahaya sehingga berpotensi mencemari lingkungan atau membahayakan kesehatan.",
    contoh: [
      "Baterai dan aki",
      "Lampu neon dan lampu LED tertentu",
      "Pil dan obat kadaluarsa",
      "Cat, thinner, pestisida",
      "Jarum suntik dan alat kesehatan",
      "Elektronik rusak (HP, kabel)",
    ],
    penanganan: [
      "JANGAN dibakar atau dicampur sampah rumah tangga.",
      "Simpan di wadah tertutup dan jauh dari jangkauan anak.",
      "Serahkan ke drop box B3, apotek, atau kegiatan pengumpulan khusus.",
      "Elektronik rusak: bawa ke pengepul elektronik resmi.",
    ],
    peringatan:
      "B3 bisa mencemari tanah dan air tanah bila dibuang sembarangan. Penanganannya wajib lewat jalur khusus.",
  },
};

/* Item sehari-hari → kategori. alias dipakai untuk pencocokan kata kunci. */
const ITEM = [
  {
    nama: "Botol plastik",
    alias: [
      "botol aqua",
      "aqua",
      "pet",
      "botol minum",
      "gelas plastik",
      "botol mineral",
    ],
    kategori: "anorganik",
    tips: "Bilas, kupas label kalau bisa, lalu masukkan ke plastik daur ulang.",
  },
  {
    nama: "Kardus",
    alias: ["kardus", "cardboard", "box", "kemasan dus"],
    kategori: "anorganik",
    tips: "Lipat agar hemat tempat, jangan buang dalam kondisi basah.",
  },
  {
    nama: "Kaleng",
    alias: ["kaleng", "can", "kaleng minuman", "kaleng sarden", "aluminium"],
    kategori: "anorganik",
    tips: "Kosongkan dan bilas dulu, kaleng aluminium paling bernilai untuk didaur ulang.",
  },
  {
    nama: "Kertas",
    alias: ["kertas", "koran", "buku", "hvs", "majalah"],
    kategori: "anorganik",
    tips: "Jangan campur kertas basah atau berminyak.",
  },
  {
    nama: "Botol kaca",
    alias: ["kaca", "botol kaca", "jar", "botol kecap"],
    kategori: "anorganik",
    tips: "Pisahkan dari sampah lain karena berbahaya bila pecah.",
  },
  {
    nama: "Plastik kemasan",
    alias: [
      "plastik",
      "kresek",
      "plastik belanja",
      "sachet",
      "bungkus snack",
      "micin",
    ],
    kategori: "anorganik",
    tips: "Plastik kotor berminyak sulit didaur ulang — kurangi pemakaian.",
  },
  {
    nama: "Styrofoam",
    alias: ["styrofoam", "gabus", "sterofoam", "boxed water"],
    kategori: "residu",
    tips: "Sering tercampur makanan sehingga sulit diproses. Keringkan dulu.",
  },
  {
    nama: "Sedotan",
    alias: ["sedotan", "straw"],
    kategori: "residu",
    tips: "Barang kecil yang jarang terpilah dengan baik. Kurangi pemakaian.",
  },
  {
    nama: "Tisu bekas",
    alias: ["tisu", "tissue", "tisu bekas", "tisu kotor"],
    kategori: "residu",
    tips: "Sudah terkontaminasi, tidak bisa didaur ulang.",
  },
  {
    nama: "Popok",
    alias: ["popok", " diapers", "popok bayi"],
    kategori: "residu",
    tips: "Bungkus rapat sebelum dibuang agar higienis.",
  },
  {
    nama: "Pembalut",
    alias: ["pembalut", "sanitary", "mens"],
    kategori: "residu",
    tips: "Gulung, bungkus dengan tisu atau kantong kecil.",
  },
  {
    nama: "Sikat gigi",
    alias: ["sikat gigi", "sikat"],
    kategori: "residu",
    tips: "Campuran bulu nilon dan plastik, sulit didaur ulang.",
  },
  {
    nama: "Sisa nasi",
    alias: ["nasi", "sisa makanan", "makanan sisa", "rice"],
    kategori: "organik",
    tips: "Pisahkan dari wadah plastiknya dulu.",
  },
  {
    nama: "Kulit buah",
    alias: ["kulit buah", "kulit pisang", "apel", "pepaya", "buah"],
    kategori: "organik",
    tips: "Cocok untuk kompos rumahan.",
  },
  {
    nama: "Daun kering",
    alias: ["daun", "daun kering", "ranting", "rumput", "gugur"],
    kategori: "organik",
    tips: "Bisa langsung dikomposkan atau dijadikan mulsa.",
  },
  {
    nama: "Ampas kopi",
    alias: ["ampas kopi", "kopi", "ampas teh", "teh"],
    kategori: "organik",
    tips: "Bagus untuk pupuk tanaman atau pengusir nyamuk alami.",
  },
  {
    nama: "Tulang",
    alias: ["tulang", "tulang ikan", "tulang ayam"],
    kategori: "organik",
    tips: "Hancurkan dulu agar cepat terurai.",
  },
  {
    nama: "Baterai",
    alias: ["baterai", "battery", "aki", "batu remot"],
    kategori: "b3",
    tips: "Jangan dibuang ke tempat sampah biasa. Cari drop box B3.",
  },
  {
    nama: "Lampu",
    alias: ["lampu", "lampu neon", "lampu led", "bohlam", "tl"],
    kategori: "b3",
    tips: "Lampu neon mengandung merkuri — bungkus rapat, jangan pecahkan.",
  },
  {
    nama: "Obat",
    alias: ["obat", "pil", "kaplet", "sirup", "obat kadaluarsa"],
    kategori: "b3",
    tips: "Kembalikan ke apotek atau gunakan tempat pengumpulan obat.",
  },
  {
    nama: "Jarum suntik",
    alias: ["jarum suntik", "suntik", "alat medis", "spuit"],
    kategori: "b3",
    tips: "Jangan pegang bagian tajamnya. Serahkan ke fasilitas kesehatan.",
  },
  {
    nama: "Cat",
    alias: ["cat", "thinner", "pelarut", "solven"],
    kategori: "b3",
    tips: "Jangan buang ke selokan — sangat mencemari air.",
  },
  {
    nama: "Pestisida",
    alias: ["pestisida", "obat semut", "racun", "insektisida"],
    kategori: "b3",
    tips: "Simpan wadah aslinya dan serahkan ke petugas pertanian.",
  },
  {
    nama: "Elektronik",
    alias: ["hp", "laptop", "kabel", "charger", "elektronik", "remote", "tv"],
    kategori: "b3",
    tips: "Mengandung logam berat. Serahkan ke pengepul elektronik resmi.",
  },
  {
    nama: "Parfum bekas",
    alias: ["parfum", "spray", "deodoran", "aerosol"],
    kategori: "b3",
    tips: "Wadah bertekanan — jangan dibakar.",
  },
  {
    nama: "Minyak goreng",
    alias: ["minyak goreng", "minyak", "jelantah"],
    kategori: "b3",
    tips: "Jangan dituang ke selokan. Kumpulkan lalu serahkan ke pengepul jelantah.",
  },
  {
    nama: "Sandal / sepatu",
    alias: ["sandal", "sepatu", "karet"],
    kategori: "residu",
    tips: "Bahan campuran sulit dipisahkan. Kurangi, pakai sampai rusak.",
  },
  {
    nama: "Kain / baju lusuh",
    alias: ["kain", "baju", "kain perca", "tekstil"],
    kategori: "anorganik",
    tips: "Masih layak pakai → donasikan. Kalau sudah rusak → residu.",
  },
  {
    nama: "Kompos",
    alias: ["kompos", "pupuk kompos"],
    kategori: "organik",
    tips: "Hasil olahan sampah organik, kembalikan ke tanah.",
  },
  {
    nama: "Bangkai hewan",
    alias: ["bangkai", "hewan mati"],
    kategori: "residu",
    tips: "Bungkus rapat dan hubungi pengelola setempat.",
  },
];

/* Pertanyaan umum → jawaban. cocok: kata kunci pemicu. */
const TOPIK = [
  {
    judul: "Cara memilah sampah di rumah",
    cocok: [
      "cara memilah",
      "memilah di rumah",
      "gimana memilah",
      "bagaimana memilah",
      "tips memilah",
      "mulai memilah",
      "langkah memilah",
    ],
    jawaban:
      "Langkah paling praktis:\n1. Sediakan 3–4 wadah: organik, anorganik, residu (tambah wadah B3).\n2. Pisahkan sejak dari sumber — misalnya kardus langsung dilipat saat barang datang.\n3. Bilas kemasan berminyak sebelum menaruhnya di wadah anorganik.\n4. Keringkan sampah basah supaya tidak berbau.\n5. Jadwalkan pengangkutan: organik → kompos, anorganik → bank sampah, residu → TPA, B3 → drop box.",
  },
  {
    judul: "Bedanya residu dan B3",
    cocok: [
      "bedanya residu",
      "residu dan b3",
      "residu vs b3",
      "perbedaan residu",
      "b3 itu apa",
      "apa itu b3",
      "bahan berbahaya",
    ],
    jawaban:
      "Perbedaan utamanya:\n\n• Residu = sisa yang TIDAK berbahaya, tapi sudah tidak bisa didaur ulang (tisu, popok, styrofoam). Tempatnya: TPA lewat wadah residu.\n\n• B3 = mengandung zat BERBAHAYA/BERACUN (baterai, lampu, obat, jarum suntik). Kalau dibuang biasa bisa mencemari tanah dan air. Tempatnya: drop box B3, apotek, atau fasilitas khusus.\n\nSingkatnya: residu berbahaya bagi kapasitas TPA, B3 berbahaya bagi lingkungan dan kesehatan.",
  },
  {
    judul: "Kenapa B3 bahaya",
    cocok: [
      "kenapa b3",
      "bahaya b3",
      "b3 berbahaya",
      "mencemari",
      "bahaya baterai",
    ],
    jawaban:
      "B3 mengandung logam berat, merkuri, atau zat kimia yang tidak terurai. Bila dibuang bersama sampah biasa:\n• Meresap ke tanah dan mencemari air tanah\n• Masuk ke rantai makanan\n• Membahayakan petugas sampah dan warga sekitar\n\nBaterai misalnya mengandung timbal dan merkuri, lampu neon mengandung merkuri. Penanganannya wajib lewat jalur khusus.",
  },
  {
    judul: "Mengurangi plastik",
    cocok: [
      "kurangi plastik",
      "plastik sekali pakai",
      "gimana kurangi plastik",
      "bawa botol",
      "zero waste",
    ],
    jawaban:
      "Mulai dari 4 kebiasaan ini:\n1. Bawa botol minum dan tas belanja sendiri.\n2. Tolak sedotan dan kantong plastik kalau tidak perlu.\n3. Pilih produk isi ulang daripada kemasan sachet.\n4. Pakai wadah makan sendiri untuk bepergian.\n\nTidak harus sempurna — berkurangnya sedikit plastik tetap berarti bagi Bali.",
  },
  {
    judul: "Membuang sampah di pantai",
    cocok: [
      "pantai",
      "sungai",
      "wisata",
      "jalan-jalan",
      "bepergian",
      "liburan",
      "tempat wisata",
    ],
    jawaban:
      "Saat ke pantai atau tempat wisata:\n• Bawa kantong kecil khusus sampahmu sendiri.\n• Jangan tinggalkan sampah makanan, apalagi plastik — angin laut bisa membawanya ke laut.\n• Pisahkan yang masih bisa dipakai ulang.\n• Kalau tidak menemukan tempat sampah, bawa pulang.\n\nSampah plastik di laut butuh puluhan tahun untuk terurai dan berbahaya bagi biota.",
  },
  {
    judul: "Kompos",
    cocok: [
      "kompos",
      "daur ulang organik",
      "sisa makanan",
      "aduk kompos",
      "bikin kompos",
    ],
    jawaban:
      "Kompos rumahan mudah:\n1. Sediakan wadah berlubang di area teduh.\n2. Campur sampah hijau (sisa makanan, daun) dengan sampah cokelat (ranting, kardus) sekitar 1:2.\n3. Aduk sesekali agar tidak bau.\n4. Jaga kelembapan — jangan terlalu basah.\n5. Dalam 4–8 minggu jadi kompos siap pakai.",
  },
  {
    judul: "Bank sampah",
    cocok: ["bank sampah", "pengepul", "jual sampah", "tukar sampah", "poin"],
    jawaban:
      "Bank sampah menerima sampah anorganik terpilah dan mencatat nilainya dalam buku tabungan.\n\nCara memulai:\n1. Pilah dan bersihkan sampah anorganik di rumah.\n2. Datang ke bank sampah terdekat (biasanya di desa/banjar).\n3. Timbang dan catat nilainya.\n4. Nilainya bisa ditabung atau ditukar barang.\n\nSampah bernilai: botol PET, kaleng aluminium, kardus, kertas, botol kaca.",
  },
];

/* Sapaan & jawaban fallback */
const SAPAAN = {
  halo: "Halo! 👋 Saya Eling, asisten Bali Eling Luu. Tanyakan soal jenis sampah, cara memilah, atau penanganan limbah — saya siap bantu.",
  makasih:
    "Sama-sama! Senang bisa bantu. Kalau ada pertanyaan lain soal sampah, tanya saja. 🌿",
  default:
    "Maaf, saya belum punya data tentang itu. Coba tanyakan salah satu ini:",
};
