/* Bali Eling Luu — Isi artikel (teks asli, tanpa API)
   Cara menambah artikel: salin satu blok di array ARTIKEL, ganti id/judul/isi.
   Halaman: artikel.html?id=<id> */

const ARTIKEL = [
  {
    id: "memilah-di-rumah",
    judul: "Cara Memilah Sampah di Rumah",
    kategori: "Pemilahan",
    foto: "assets/foto-jenis-sampah/organik.webp",
    alt: "Sisa organik berupa canang sari dan daun di halaman pura",
    ringkas: "Langkah praktis memisahkan sampah tanpa ribet, bahkan di rumah sempit.",
    menit: 6,
    tanggal: "14 Oktober 2026",
    penulis: "Tim Bali Eling Luu",
    isi: [
      {
        t: "p",
        v: "Memilah sampah bukan soal sempurna. Yang paling berpengaruh justru keputusan kecil yang diulang setiap hari: sisa nasi masuk wadah organik, botol minum dikosongkan lalu masuk wadah anorganik, baterai bekas tidak ikut terbuang bersama sisa dapur.",
      },
      {
        t: "p",
        v: "Panduan ini ditulis untuk rumah tangga biasa — kos, rumah petak, atau keluarga besar — tanpa alat khusus dan tanpa lahan luas.",
      },

      { t: "h", v: "1. Siapkan 3 sampai 4 wadah" },
      {
        t: "p",
        v: "Jumlah wadah menyesuaikan ruang yang tersedia. Kalau sempit, mulai dari dua dulu: satu untuk organik, satu untuk sisanya. Kalau cukup, gunakan empat:",
      },
      {
        t: "tabel",
        header: ["Wadah", "Isi", "Bahan wadah"],
        baris: [
          ["Organik", "Sisa makanan, daun, kulit buah", "Ember berlubang, tutup rapat"],
          ["Anorganik", "Plastik, kertas, kaleng, kaca", "Kardus atau karung"],
          ["Residu", "Tisu bekas, popok, styrofoam kotor", "Kantong plastik biasa"],
          ["B3", "Baterai, lampu, obat kadaluarsa", "Botol/kaleng tertutup kecil"],
        ],
      },
      {
        t: "catatan",
        judul: "Tips",
        v: "Tidak wajib langsung empat. Rumah yang berhasil memilah biasanya mulai dari dua wadah dan menambah satu per satu setelah kebiasaan terbentuk.",
      },

      { t: "h", v: "2. Kenali empat kategori utama" },
      {
        t: "ul",
        v: [
          "Organik — sisa makhluk hidup yang bisa terurai sendiri: nasi, lauk, daun, ranting, ampas kopi.",
          "Anorganik — bahan buatan yang masih bernilai kalau dipilah: botol plastik, kaleng, kardus, botol kaca.",
          "Residu — sisa yang sudah tidak bisa didaur ulang lagi: tisu bekas, popok, pembalut, styrofoam tercampur makanan.",
          "B3 — bahan berbahaya dan beracun: baterai, lampu neon, obat kadaluarsa, cat, elektronik rusak.",
        ],
      },
      {
        t: "p",
        v: "Yang sering membingungkan adalah kertas bekas makanan. Kertas berminyak atau tercampur nasi sebaiknya masuk residu, bukan anorganik, karena bisa merusak batch daur ulang.",
      },

      { t: "h", v: "3. Lima kebiasaan harian yang mudah dijaga" },
      {
        t: "ol",
        v: [
          "Pisahkan sejak dari sumber. Kardus langsung dilipat saat barang datang, bukan menumpuk dulu di sudut ruangan.",
          "Kosongkan dan bilas kemasan. Sisa sirup atau saus membuat plastik sulit didaur ulang dan menimbulkan bau.",
          "Keringkan sampah basah. Air dari sisa makanan membuat wadah organik cepat berbau dan menarik lalat.",
          "Kumpulkan anorganik di satu tempat khusus. Jangan disebar di beberapa kantong agar mudah diserahkan sekaligus.",
          "Simpan B3 terpisah dan tertutup. Taruh di rak tinggi, jauh dari jangkauan anak.",
        ],
      },

      { t: "h", v: "4. Tiga masalah yang paling sering muncul" },
      {
        t: "h2",
        v: "Wadah organik berbau",
      },
      {
        t: "p",
        v: "Bau datang dari air dan minyak sisa makanan. Solusinya: tiriskan dulu sebelum dibuang, tutup wadah rapat, dan kosongkan setiap 1–2 hari. Taburi sedikit abu sekam atau serbuk gergaji kalau tersedia untuk menyerap kelembapan.",
      },
      { t: "h2", v: "Tidak ada lahan" },
      {
        t: "p",
        v: "Kompos ember atau kompos takakura bisa dipakai di teras atau balkon, dengan bahan organik dan sekam. Kalau tidak memungkinkan, setor sampah organik ke bank sampah organik atau kelompok kompos di banjar setempat.",
      },
      { t: "h2", v: "Satu anggota keluarga belum terbiasa" },
      {
        t: "p",
        v: "Mulai dari diri sendiri tanpa menyalahkan. Tempel label atau stiker warna di tiap wadah supaya tidak perlu diingatkan. Anak-anak biasanya cepat mengikuti kalau diberi tugas memilah yang sederhana.",
      },

      { t: "h", v: "5. Kalau di sekitarmu belum ada bank sampah" },
      {
        t: "p",
        v: "Tidak berarti berhenti memilah. Anorganik yang sudah bersih dan kering bisa disimpan sementara dalam karung, lalu disetorkan saat ada pengepul lewat atau kegiatan pengumpulan di desa/banjar. Kardus dan logam biasanya paling mudah diterima.",
      },
      {
        t: "p",
        v: "Yang perlu dihindari: menumpuk sampah anorganik terlalu lama di rumah tanpa jadwal, karena justru menarik rayap dan menjadi sarang nyamuk kalau tercampur air.",
      },

      {
        t: "catatan",
        judul: "Ingat",
        v: "Memilah sempurna bukan syarat. Sebagian besar manfaat sudah didapat dari memisahkan sampah basah (organik) dari sampah kering — itu satu langkah yang paling besar dampaknya.",
      },
    ],
  },

  {
    id: "kurangi-plastik-saat-berwisata",
    judul: "Mengurangi Sampah Plastik Saat Berwisata",
    kategori: "Wisata",
    foto: "assets/photo05.webp",
    alt: "Pantai dan tebing dengan pura di tepi laut Bali",
    ringkas: "Checklist sederhana sebelum berangkat, supaya pulang tidak membawa puluhan kemasan sekali pakai.",
    menit: 5,
    tanggal: "14 Oktober 2026",
    penulis: "Tim Bali Eling Luu",
    isi: [
      {
        t: "p",
        v: "Satu kunjungan ke objek wisata bisa menghasilkan kemasan dalam jumlah mengejutkan: botol minum, kantong plastik belanja, sedotan, sachet bumbu, kemasan jajan, dan tisu basah. Sebagian besar berakhir di pinggir jalan, di saluran air, atau terbawa angin ke sawah dan pantai.",
      },
      {
        t: "p",
        v: "Kabar baiknya: hampir semua itu bisa dicegah dengan membawa barang sendiri. Tidak perlu sempurna — cukup pilih tiga hal yang paling sering kamu beli saat bepergian.",
      },

      { t: "h", v: "Checklist sebelum berangkat" },
      {
        t: "ul",
        v: [
          "Botol minum isi ulang — paling sering menyelamatkan 2–4 botol plastik per orang per hari.",
          "Tas belanja lipat — ringan, muat di saku, dipakai untuk oleh-oleh dan jajan.",
          "Wadah makan atau kotak lipat — untuk membungkus sisa makanan atau jajan berkuah.",
          "Sedotan logam atau silikon — kalau kamu rutin minum es.",
          "Tas kecil khusus sampah — untuk membawa pulang kemasan yang tidak tersedia tempat sampahnya.",
        ],
      },
      {
        t: "catatan",
        judul: "Mulai dari tiga",
        v: "Pilih tiga barang yang paling sering kamu beli saat jalan. Tiga kebiasaan yang dijaga lebih berguna daripada sepuluh yang cuma dibawa sekali lalu ditinggal di rumah.",
      },

      { t: "h", v: "Saat di lokasi" },
      {
        t: "ol",
        v: [
          "Tolak kantong plastik dengan sopan saat tidak benar-benar perlu. Cukup katakan: “tidak usah kantongnya, Bu.”",
          "Pilih minuman isi ulang atau gelas, bukan botol baru, kalau tersedia.",
          "Jajan dari warung yang memakai daun pisang atau wadah guna ulang kalau ada pilihan.",
          "Makan secukupnya. Sisa makanan yang dibungkus tapi tidak dimakan juga menjadi sampah.",
          "Kalau tidak menemukan tempat sampah, bawa pulang. Meninggalkan sampah di semak bukan pilihan.",
        ],
      },

      { t: "h", v: "Kenali nomor pada plastik" },
      {
        t: "p",
        v: "Di bagian bawah kemasan plastik ada angka kecil di dalam segitiga. Angka itu menandakan jenis polimer dan seberapa mudah plastik tersebut diproses:",
      },
      {
        t: "tabel",
        header: ["Nomor", "Nama", "Contoh"],
        baris: [
          ["1 (PET)", "Mudah didaur ulang", "Botol minum bening"],
          ["2 (HDPE)", "Mudah didaur ulang", "Kemasan sampo, jerigen"],
          ["5 (PP)", "Cukup mudah", "Wadah makanan, tutup botol"],
          ["3 (PVC) & 7 (Other)", "Sulit diproses", "Beberapa kemasan fleksibel"],
        ],
      },
      {
        t: "p",
        v: "Angka 1, 2, dan 5 paling umum diterima bank sampah. Angka 3 dan 7 sering ditolak karena proses daur ulangnya mahal. Bukan berarti boleh dibuang sembarangan — artinya, sebaiknya dikurangi sejak dari pilihan belanja.",
      },

      { t: "h", v: "Setelah kembali dari wisata" },
      {
        t: "ol",
        v: [
          "Kosongkan dan bilas botol serta wadah yang dibawa.",
          "Pilah kemasan oleh-oleh: kardus ke anorganik, sisa makanan ke organik.",
          "Kumpulkan kemasan fleksibel (sachet, bungkus jajan) terpisah — jarang diterima, tapi setidaknya tidak tercampur sampah basah.",
          "Cuci dan keringkan tas belanja serta wadah supaya siap dipakai lagi.",
        ],
      },

      { t: "h", v: "Soal aturan plastik di Bali" },
      {
        t: "p",
        v: "Bali pernah menerbitkan aturan pembatasan plastik sekali pakai (Pergub Bali No. 97 Tahun 2018) yang mengatur kantong plastik, polistirena, dan sedotan plastik. Ketentuan dan penegakannya bisa berubah dari waktu ke waktu, jadi cek aturan terbaru di pemerintah desa/banjar atau dinas terkait sebelum mengandalkannya.",
      },
      {
        t: "p",
        v: "Terlepas dari aturan, keputusan paling berdampak tetap di tangan pengunjung: membawa botol sendiri, menolak kantong, dan membawa pulang sampah yang tidak tertampung.",
      },
    ],
  },

  {
    id: "jaga-kebersihan-pantai",
    judul: "Menjaga Kebersihan Pantai Bali",
    kategori: "Pantai",
    foto: "assets/photo02.webp",
    alt: "Jalur setapak di tengah persawahan menuju kawasan pesisir Bali",
    ringkas: "Peran kecil pengunjung untuk ekosistem pesisir — dari apa yang dibawa sampai apa yang dibawa pulang.",
    menit: 5,
    tanggal: "14 Oktober 2026",
    penulis: "Tim Bali Eling Luu",
    isi: [
      {
        t: "p",
        v: "Pantai bukan hanya tempat wisata. Ia adalah rumah bagi terumbu karang, lamun, penyu, burung pantai, dan ribuan organisme kecil yang menjaga garis pantai tetap stabil. Sampah yang masuk ke laut tidak “hilang” — ia pecah menjadi serpihan semakin kecil, lalu masuk ke rantai makanan.",
      },
      {
        t: "p",
        v: "Sebagian besar sampah pantai di Bali bukan berasal dari orang yang berenang di sana. Ia terbawa angin dari jalan, mengalir lewat selokan dan sungai, lalu terjaring di teluk. Artinya, menjaga pantai dimulai jauh sebelum sampai ke bibir pantai.",
      },

      { t: "h", v: "Dua hal yang paling sering jadi masalah" },
      { t: "h2", v: "Plastik ringan" },
      {
        t: "p",
        v: "Sedotan, tutup botol, kantong, dan bungkus jajan sangat ringan sehingga terbawa angin hanya beberapa meter dari tong sampah. Karena itu, menutup kantong dengan rapat saat dibuang jauh lebih penting daripada jumlah tong sampah yang tersedia.",
      },
      { t: "h2", v: "Sampah yang terbawa air" },
      {
        t: "p",
        v: "Saat hujan, sampah yang menumpuk di saluran dan sungai langsung terbawa ke muara. Ini sebabnya kebersihan selokan di pemukiman ikut menentukan kebersihan pantai beberapa kilometer jauhnya.",
      },

      { t: "h", v: "Yang aman dan tidak aman dibawa ke pantai" },
      {
        t: "tabel",
        header: ["Aman dibawa", "Sebaiknya dihindari"],
        baris: [
          ["Botol minum isi ulang", "Kantong plastik tipis"],
          ["Wadah makan sendiri", "Sedotan plastik"],
          ["Tas kain atau kanvas", "Sachet dan kemasan fleksibel"],
          ["Tisu basah secukupnya", "Botol kaca (risiko pecah)"],
        ],
      },

      { t: "h", v: "Praktik “bawa pulang, bukan tinggalkan”" },
      {
        t: "ol",
        v: [
          "Pungut sampah yang kamu temukan di area tempat dudukmu, meski bukan milikmu.",
          "Bungkus sisa makanan dan bawa pulang kalau tong sampah penuh atau tercampur.",
          "Jangan buang abu rokok ke pasir. Butuh waktu bertahun-tahun untuk terurai dan racunnya meresap ke air.",
          "Jangan memindahkan karang, menginjak terumbu, atau mengambil biota laut sebagai kenang-kenangan.",
          "Ikut kegiatan pikul sampah kalau ada — biasanya diadakan komunitas lokal akhir pekan.",
        ],
      },
      {
        t: "catatan",
        judul: "Soal abu rokok",
        v: "Sedotan memang sering jadi sorotan, tapi puntung rokok justru salah satu sampah paling banyak ditemukan di pantai dunia. Ia mengandung plastik filter dan zat kimia berbahaya, dan tidak boleh ditimbun di pasir.",
      },

      { t: "h", v: "Menjaga saluran air di rumah" },
      {
        t: "p",
        v: "Langkah paling efektif yang sering terlewat: pastikan selokan di sekitar rumah tidak tersumbat sampah plastik. Sampah dari pemukiman yang mengalir ke sungai bisa berakhir di pantai tanpa sepengetahuan siapa pun.",
      },
      {
        t: "ul",
        v: [
          "Jangan buang sampah ke selokan, sungai, atau drainase.",
          "Pungut sampah di saluran depan rumah setidaknya sekali sebulan.",
          "Pisahkan sampah basah supaya tidak menyumbat saluran saat hujan deras.",
        ],
      },

      {
        t: "catatan",
        judul: "Catatan",
        v: "Ketentuan pengelolaan sampah di pesisir bisa berbeda antar daerah. Selalu ikuti aturan setempat dan himbauan petugas atau pengelola objek wisata.",
      },
    ],
  },

  {
    id: "mengenal-sampah-b3",
    judul: "Mengenal Sampah B3 dan Penanganannya",
    kategori: "B3",
    foto: "assets/foto-jenis-sampah/b3.webp",
    alt: "Layar monitor lawas dan botol kimia yang tergeletak di semak",
    ringkas: "Kenapa baterai, lampu, dan obat kadaluarsa tidak boleh ikut terbuang bersama sampah biasa.",
    menit: 6,
    tanggal: "14 Oktober 2026",
    penulis: "Tim Bali Eling Luu",
    isi: [
      {
        t: "p",
        v: "B3 adalah kependekan dari Bahan Berbahaya dan Beracun. Sampah masuk kategori ini kalau mengandung zat yang bisa mencemari tanah dan air, atau membahayakan kesehatan manusia dan petugas sampah — bahkan dalam jumlah kecil.",
      },
      {
        t: "p",
        v: "Yang membuat B3 berbeda: ia tidak bisa “hilang” dengan cara ditimbun. Zat di dalamnya tetap ada dan pelan-pelan meresap ke lingkungan.",
      },

      { t: "h", v: "B3 yang paling sering ada di rumah" },
      {
        t: "ul",
        v: [
          "Baterai AA, AAA, gadget, dan aki — mengandung logam berat seperti timbal dan merkuri.",
          "Lampu neon dan lampu LED tertentu — lampu neon mengandung merkuri dalam jumlah kecil.",
          "Obat dan suplemen kadaluarsa — bisa mencemari air tanah kalau dibuang bersama sampah biasa.",
          "Cat, thinner, pestisida, dan pembersih kimia kuat.",
          "Jarum suntik dan alat kesehatan bekas pakai.",
          "Elektronik rusak: HP, kabel, charger, komputer.",
        ],
      },

      { t: "h", v: "Kenapa tidak boleh dicampur sampah biasa" },
      {
        t: "p",
        v: "Sampah rumah tangga yang dibuang ke TPA akan ditumpuk dan ditimbun. Kalau di dalamnya ada baterai atau lampu pecah, logam berat yang keluar bisa meresap ke tanah lalu ke air tanah. Dari sana, ia masuk ke tanaman, ikan, dan akhirnya ke makanan sehari-hari.",
      },
      {
        t: "p",
        v: "Selain itu, petugas sampah yang memilah tumpukan berisiko terpapar langsung. Baterai yang tertekan truk pengangkut bisa terbakar atau meledak kecil, dan obat yang bocor menyulitkan penanganan seluruh beban sampah.",
      },

      { t: "h", v: "Cara menyimpan sementara di rumah" },
      {
        t: "ol",
        v: [
          "Gunakan wadah tertutup — kaleng bekas atau botol plastik tebal.",
          "Simpan di tempat tinggi dan kering, jauh dari jangkauan anak dan hewan.",
          "Pisahkan jenisnya: baterai kering, lampu, obat, dan elektronik jangan dicampur.",
          "Bungkus lampu dengan kertas atau kardus supaya tidak pecah.",
          "Jangan pernah membakar atau mengubur B3 di halaman.",
        ],
      },
      {
        t: "catatan",
        judul: "Perhatian",
        v: "Jangan simpan baterai bekas bersama koin, klip, atau logam lain dalam satu wadah. Kontak logam bisa memicu panas atau kebocoran.",
      },

      { t: "h", v: "Ke mana menyerahkan" },
      {
        t: "tabel",
        header: ["Jenis B3", "Biasanya diterima di"],
        baris: [
          ["Baterai dan elektronik kecil", "Drop box B3, toko elektronik, pengepul resmi"],
          ["Lampu neon / LED", "Drop box B3, pengumpulan khusus"],
          ["Obat kadaluarsa", "Apotek atau puskesmas"],
          ["Cat, thinner, pestisida", "Dinas terkait atau toko bahan bangunan"],
          ["Jarum suntik", "Fasilitas kesehatan — jangan pegang dengan tangan kosong"],
        ],
      },
      {
        t: "p",
        v: "Jumlah titik pengumpulan B3 masih terbatas. Kalau di daerahmu belum ada, kumpulkan dulu di rumah dalam jumlah aman, lalu tanyakan ke kelurahan, banjar, atau dinas kebersihan setempat soal jadwal pengumpulan.",
      },

      { t: "h", v: "Tiga hal yang jangan dilakukan" },
      {
        t: "ul",
        v: [
          "Jangan dibakar. Asapnya membawa racun yang justru masuk ke udara yang kita hirup.",
          "Jangan dibuang ke sungai, selokan, atau pantai.",
          "Jangan dicampur sampah dapur atau anorganik — merusak seluruh beban sampah dan membahayakan petugas.",
        ],
      },

      {
        t: "catatan",
        judul: "Ringkasnya",
        v: "Residu berbahaya bagi kapasitas TPA. B3 berbahaya bagi lingkungan dan kesehatan. Karena itu penanganannya wajib lewat jalur khusus.",
      },
    ],
  },
];

/* Cari artikel berdasarkan id, kembalikan null kalau tidak ada */
function cariArtikel(id) {
  for (var i = 0; i < ARTIKEL.length; i++) {
    if (ARTIKEL[i].id === id) return ARTIKEL[i];
  }
  return null;
}
