/* Bali Eling Luu — Statistik sampah Provinsi Bali
   ---------------------------------------------------------------
   Semua angka di bawah ini diambil dari sumber publik, bukan karangan:
   • SIPSN (Sistem Informasi Pengelolaan Sampah Nasional), Kementerian
     Lingkungan Hidup — data 2024, diperbarui Februari 2025.
   • Rapat koordinasi pembinaan percepatan pengelolaan sampah Provinsi
     Bali, Denpasar, 26 Agustus 2025 (Sekda Bali & DKLH Provinsi Bali).
   • UPTD Pengelolaan Sampah DKLH Provinsi Bali, Workshop Jurnalistik
     Gerakan Bali Bebas Sampah, 26 Juli 2025.
   Angka bisa berubah tiap tahun. Rujuk SIPSN bila perlu angka terbaru.
   --------------------------------------------------------------- */

const STATISTIK = {
  /* Kartu angka utama yang tampil di halaman depan */
  utama: [
    {
      angka: "3.436",
      satuan: "ton/hari",
      judul: "Timbulan sampah Bali",
      ket: "Rata-rata 2024 — setara sekitar 1,25 juta ton per tahun.",
    },
    {
      angka: "29%",
      satuan: "",
      judul: "Sampah yang terkelola",
      ket: "Sekitar 916 ton/hari. Target nasional 51,21% — sisanya masih liar.",
    },
    {
      angka: "> 60%",
      satuan: "",
      judul: "Berupa sampah organik",
      ket: "Sisa makanan, daun, ranting. Sebagian besar masih bisa dikompos di rumah.",
    },
    {
      angka: "17%",
      satuan: "",
      judul: "Berupa sampah plastik",
      ket: "Penyumbang sampah anorganik terbesar di Bali.",
    },
  ],

  /* Sebaran timbulan per kabupaten/kota, ton per hari */
  sebaran: [
    { kabupaten: "Kota Denpasar", ton: 1005 },
    { kabupaten: "Kabupaten Gianyar", ton: 562 },
    { kabupaten: "Kabupaten Badung", ton: 547 },
  ],

  sumber:
    "Sumber: SIPSN Kementerian Lingkungan Hidup (data 2024, diperbarui Februari 2025) " +
    "dan rapat koordinasi pengelolaan sampah Provinsi Bali, Denpasar, 26 Agustus 2025.",
};

/* Bangun HTML kartu statistik untuk halaman depan */
function kartuStatistik() {
  var s = STATISTIK;
  if (!s || !s.utama || !s.utama.length) return "";

  var html = s.utama
    .map(function (k) {
      return (
        '<li class="rounded-2xl border border-line bg-white p-4 sm:p-5">' +
        '<p class="text-[26px] font-extrabold leading-none tracking-tight text-forest sm:text-3xl">' +
        k.angka +
        (k.satuan
          ? ' <span class="text-[13px] font-bold text-primary sm:text-base">' + k.satuan + "</span>"
          : "") +
        "</p>" +
        '<p class="mt-2 text-[12.5px] font-bold text-ink sm:text-[13.5px]">' + k.judul + "</p>" +
        '<p class="mt-1 text-[11.5px] leading-relaxed text-muted sm:text-[12.5px]">' + k.ket + "</p>" +
        "</li>"
      );
    })
    .join("");

  var bars = s.sebaran
    .map(function (r) {
      var pct = Math.round((r.ton / 1005) * 100);
      return (
        '<li class="flex items-center gap-3">' +
        '<span class="w-36 shrink-0 text-[12px] font-medium text-ink sm:w-44 sm:text-[13px]">' +
        r.kabupaten +
        "</span>" +
        '<span class="h-2.5 flex-1 overflow-hidden rounded-full bg-line">' +
        '<span class="block h-full rounded-full bg-primary" style="width:' + pct + '%"></span>' +
        "</span>" +
        '<span class="w-20 shrink-0 text-right text-[12px] font-bold text-forest sm:w-24 sm:text-[13px]">' +
        r.ton.toLocaleString("id-ID") +
        " ton<span class=\"font-normal text-muted\">/hari</span></span>" +
        "</li>"
      );
    })
    .join("");

  return (
    '<div class="mt-12 border-t border-line pt-10 lg:mt-16 lg:pt-12">' +
    '<div class="max-w-2xl">' +
    '<p class="text-xs font-bold uppercase tracking-[0.18em] text-terra">Dalam Angka</p>' +
    '<h3 class="mt-2 text-[20px] font-extrabold tracking-tight text-forest sm:text-2xl">' +
    "Sampah Bali Hari Ini</h3>" +
    "</div>" +
    '<ul class="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">' + html + "</ul>" +
    '<div class="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">' +
    '<p class="text-[13px] font-bold text-forest sm:text-[15px]">Timbulan per wilayah</p>' +
    '<ul class="mt-3 space-y-2.5">' + bars + "</ul>" +
    '<p class="mt-4 text-[11px] leading-relaxed text-muted sm:text-[12px]">' + s.sumber + "</p>" +
    "</div></div>"
  );
}
