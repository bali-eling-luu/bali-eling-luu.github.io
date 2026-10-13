/* Bali Eling Luu — Data lokasi & tips (contoh, tanpa API) */

const LOKASI = [
  {
    nama: "Bank Sampah Sekar Sari",
    kategori: "bank sampah",
    jarak: 1.2,
    jam: "05.00 – 15.00",
    buka: true,
    jenis: ["Plastik", "Kertas", "Kaca"],
    alamat: "Jl. Raya Mas Ubud, Gianyar",
    telepon: "0361-97712",
    catatan: "Menerima kemasan bersih dan kardus lipat.",
  },
  {
    nama: "TPS 3R Banjar Belang",
    kategori: "tps",
    jarak: 2.4,
    jam: "06.00 – 17.00",
    buka: true,
    jenis: ["Organik", "Anorganik", "Residu"],
    alamat: "Jl. Belang, Denpasar Selatan",
    telepon: "0361-88234",
    catatan: "Ada fasilitas composting untuk sampah organik.",
  },
  {
    nama: "Drop Box B3 Apotek Sudirman",
    kategori: "umum",
    jarak: 3.1,
    jam: "08.00 – 20.00",
    buka: true,
    jenis: ["B3", "Elektronik"],
    alamat: "Jl. Prof. Dr. Ida Bagus Mantra, Denpasar",
    telepon: "0361-44556",
    catatan: "Khusus baterai, lampu, dan obat kadaluarsa.",
  },
  {
    nama: "Bank Sampah Melati",
    kategori: "bank sampah",
    jarak: 4.6,
    jam: "07.00 – 13.00",
    buka: false,
    jenis: ["Plastik", "Logam", "Kardus"],
    alamat: "Jl. Melati No. 12, Sanur",
    telepon: "0361-28890",
    catatan: "Buka hari kerja saja. Setoran dicatat per kilogram.",
  },
  {
    nama: "TPS Terpadu Batubulan",
    kategori: "tps",
    jarak: 6.3,
    jam: "05.30 – 16.00",
    buka: true,
    jenis: ["Organik", "Residu"],
    alamat: "Jl. Denpasar – Gianyar, Batubulan",
    telepon: "0361-62100",
    catatan: "Pengangkutan residu setiap Selasa dan Jumat.",
  },
  {
    nama: "Kolektif Daur Ulang Sesetan",
    kategori: "umum",
    jarak: 8.0,
    jam: "09.00 – 16.00",
    buka: true,
    jenis: ["Plastik", "Kain", "Elektronik"],
    alamat: "Jl. Sesetan, Denpasar Barat",
    telepon: "0812-3344-5566",
    catatan: "Kelompok warga, menerima setoran kecil menengah.",
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

/* Lokasi terdekat (urut jarak), opsional difilter jenis sampah */
function lokasiTerdekat(jumlah, jenis) {
  var list = LOKASI.slice();
  if (jenis) {
    list = list.filter(function (l) {
      return l.jenis.some(function (j) {
        return j.toLowerCase().indexOf(String(jenis).toLowerCase()) !== -1;
      });
    });
  }
  list.sort(function (a, b) {
    return a.jarak - b.jarak;
  });
  return jumlah ? list.slice(0, jumlah) : list;
}
