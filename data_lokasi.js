/* Bali Eling Luu — Jenis tempat penerima sampah & tips
   ---------------------------------------------------------------
   Kami TIDAK menampilkan nama usaha tertentu. Alasannya:
   - jam buka dan kontak tiap tempat berubah sewaktu-waktu,
   - layanan tiap daerah berbeda,
   - dan website ini edukasi, bukan direktori bisnis.

   Yang kami ajarkan adalah JENIS tempatnya — supaya kamu tahu harus
   mencari apa di daerahmu sendiri.
   --------------------------------------------------------------- */

const JENIS_TEMPAT = [
  {
    nama: "Bank Sampah",
    ikon: "🏦",
    warna: "#17803D",
    terima: ["Plastik", "Kertas", "Kardus", "Logam"],
    cara:
      "Sampah anorganik dicatat per kilogram, lalu ditukar uang atau tabungan. " +
      "Biasanya dikelola koperasi, PKK, atau komunitas warga.",
    caraCari: "Tanya di balai banjar, kelurahan, atau kantor desa setempat.",
  },
  {
    nama: "TPS 3R (Reduce, Reuse, Recycle)",
    ikon: "♻️",
    warna: "#17803D",
    terima: ["Organik", "Anorganik", "Residu"],
    cara:
      "Mengolah sampah di tempat: organik dijadikan kompos, anorganik dipilah " +
      "lalu dijual. Biasanya dikelola pemerintah desa atau kelurahan.",
    caraCari: "Umumnya ada di setiap kelurahan — tanyakan lokasi TPS 3R terdekat.",
  },
  {
    nama: "Drop Box Sampah B3",
    ikon: "⚠️",
    warna: "#D64545",
    terima: ["Baterai", "Lampu", "Elektronik kecil", "Obat kadaluarsa"],
    cara:
      "Khusus sampah berbahaya dan beracun. Jangan pernah dicampur sampah " +
      "rumah tangga — ia meracuni tanah dan air.",
    caraCari: "Sering tersedia di apotek, kantor pemerintah, atau toko elektronik.",
  },
  {
    nama: "TPS Terpadu",
    ikon: "🗂️",
    warna: "#6B7A70",
    terima: ["Organik", "Anorganik", "Residu"],
    cara:
      "Tempat penampungan sementara sebelum diangkut ke TPA. Pilah dulu di " +
      "rumah sebelum menitipkan sampah di sini.",
    caraCari: "Biasanya ada di tiap banjar atau perumahan.",
  },
  {
    nama: "Pengepul / Loak",
    ikon: "⚖️",
    warna: "#D9A441",
    terima: ["Plastik", "Logam", "Kardus", "Kaca"],
    cara:
      "Membeli anorganik yang masih bernilai jual. Cocok untuk volume besar " +
      "seperti botol, kaleng, dan kardus hasil usaha atau acara.",
    caraCari: "Biasanya berkeliling atau punya ruko di pinggir jalan besar.",
  },
  {
    nama: "Komunitas Daur Ulang",
    ikon: "🤝",
    warna: "#14532D",
    terima: ["Plastik", "Kain", "Elektronik"],
    cara:
      "Kelompok warga yang mengolah sampah menjadi produk baru. Sebagian " +
      "menerima setoran kecil dari rumah tangga.",
    caraCari:
      "Cari lewat akun media sosial lingkungan di daerahmu, atau kegiatan di balai banjar.",
  },
];

const TIPS_HARI_INI = [
  "Jangan lupa bilas botol plastik sebelum didaur ulang, ya!",
  "Kardus yang dilipat rapi menghemat tempat di wadah anorganik.",
  "Pisahkan sampah B3 di rumah — jangan pernah dicampur sampah biasa.",
  "Daun kering dan ranting bisa langsung dikompos, tidak perlu dibuang.",
  "Tisu bekas dan popok termasuk residu, bukan anorganik.",
  "Bawa botol minum sendiri — satu botol dipakai ulang bisa menghemat puluhan botol sekali pakai.",
  "Simpan sampah dapur di wadah tertutup supaya tidak berbau dan menarik hama.",
];

/* Tips yang berubah tiap hari, supaya halaman terasa hidup */
function tipsHariIni() {
  var now = new Date();
  var hariKe = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(now.getFullYear(), 0, 0)) /
      86400000
  );
  return TIPS_HARI_INI[hariKe % TIPS_HARI_INI.length];
}

/* Cari jenis tempat penerima satu kategori sampah tertentu */
function tempatPenerima(jenis) {
  if (!jenis) return JENIS_TEMPAT.slice();
  var j = String(jenis).toLowerCase();
  return JENIS_TEMPAT.filter(function (t) {
    return t.terima.some(function (x) {
      return x.toLowerCase().indexOf(j) !== -1;
    });
  });
}
