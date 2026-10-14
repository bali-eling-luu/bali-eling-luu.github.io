/* Bali Eling Luu — Data lokasi & tips
   ---------------------------------------------------------------
   6 lokasi berikut BUKAN contoh lagi — nama dan alamatnya diambil
   dari pemberitaan BaliPost (09/05/2024), ANTARA Bali (27/09/2024),
   dan Dinas Pariwisata Badung.

   Yang BELUM bisa kami pastikan: jam buka, nomor telepon, dan tarif.
   Karena itu field `jam` diisi null dan tampil sebagai "perlu dikonfirmasi".
   Sebelum memakai data ini, konfirmasi dulu ke pengelolanya.
   --------------------------------------------------------------- */

const LOKASI = [
  {
    nama: "Bank Sampah Budi Alami",
    kategori: "bank sampah",
    jarak: 2.5,
    jam: null,
    buka: null,
    jenis: ["Plastik", "Kertas", "Logam"],
    alamat: "Jl. Kertasan No. 12, Denpasar Selatan",
    catatan: "Dikelola komunitas BUDI ALAMI. Menerima plastik, kertas, dan logam.",
  },
  {
    nama: "Bank Sampah Tri Manunggal",
    kategori: "bank sampah",
    jarak: 3.8,
    jam: null,
    buka: null,
    jenis: ["Plastik", "Kertas", "Logam"],
    alamat: "Jl. Tukad Yeh Aya, Panjer, Denpasar Selatan",
    catatan: "Dikenal juga dengan nama Sekar Puri.",
  },
  {
    nama: "Bank Sampah Melati",
    kategori: "bank sampah",
    jarak: 4.0,
    jam: null,
    buka: null,
    jenis: ["Plastik", "Kertas", "Logam"],
    alamat: "Perumnas Sandebaya, Jl. Kebo Iwa No. 8, Denpasar Timur",
    catatan: "Salah satu bank sampah tertua di Denpasar Timur.",
  },
  {
    nama: "Bank Sampah Bina Ayu",
    kategori: "bank sampah",
    jarak: 5.2,
    jam: null,
    buka: null,
    jenis: ["Plastik", "Kertas", "Logam"],
    alamat: "Jl. Pulau Nusa Penida, Banjar Sanur Kaja, Denpasar Selatan",
    catatan: "Dikelola warga Banjar Sanur Kaja.",
  },
  {
    nama: "Bank Sampah Jukung Nusa Sedaya",
    kategori: "bank sampah",
    jarak: 11.5,
    jam: null,
    buka: null,
    jenis: ["Plastik", "Kertas", "Logam"],
    alamat: "Jl. Pura Segara, Banjar Anyar Kaja, Kedonganan, Kuta Selatan, Badung",
    catatan: "Melayani warga sekitar kawasan wisata Kuta Selatan.",
  },
  {
    nama: "TPS3R Banjar Anyar Kelod",
    kategori: "tps",
    jarak: 12.8,
    jam: null,
    buka: null,
    jenis: ["Organik", "Anorganik", "Residu"],
    alamat: "Jl. Raya Tuban No. 88, Tuban, Kuta, Badung",
    catatan: "Dikelola Komunitas Daur Bersama Bali; ditetapkan sebagai TPS 3R Adipura 2022.",
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

/* Teks status jam buka — dipakai dashboard & chat */
function statusJam(l) {
  if (l.jam) {
    return "Buka " + l.jam + (l.buka === false ? " (tutup)" : "");
  }
  return "Jam buka perlu dikonfirmasi";
}
