/* Bali Eling Luu — Link afiliasi (SEMUA link di file ini saja)
   ---------------------------------------------------------------
   BERAPA BESAR KOMISINYA? (angka nyata, bukan perkiraan kosong)
   Program afiliasi Shopee Indonesia memberi komisi kecil:
   - Basic Partnership (kreator baru) : 1% per transaksi, maks Rp10.000
   - Premium Partnership              : 2% per transaksi, maks Rp20.000
     (naik setelah mencapai Rp5 juta penjualan dalam 3 bulan)
   - Lewat jaringan seperti ACCESSTRADE (per 15 Sep 2025):
     Non-KOL direct 3,5% / indirect 1,5%
     Tier 1         5% / 1%
     Tier 2        10% / 2%
     (maks Rp11.500–Rp35.000 per transaksi)
   - Tambahan Komisi XTRA dari toko, tanpa batas maksimum.
     Standar rekomendasi Shopee: FMCG & fashion 8–10%,
     lifestyle 6–8%, elektronik 2–6%.

   Artinya, dengan komisi 1–2%, botol stainless seharga Rp80.000
   hanya menghasilkan Rp800–Rp1.600 per pembelian. Affiliate bukan
   penghasilan utama — jalankan bersama listing & sponsor.

   ---------------------------------------------------------------
   CARA PAKAI:
   1. Daftar program afiliasi (Shopee Affiliate / Tokopedia Affiliate /
      atau lewat ACCESSTRADE untuk rate yang lebih tinggi).
   2. Tempel link milikmu ke kolom `url` di bawah. Jangan ubah `id`-nya.
   3. Semua halaman otomatis pakai link baru — tidak perlu buka HTML.
   ---------------------------------------------------------------
   Catatan: atribut rel="nofollow sponsored" sudah dipasang otomatis
   oleh artikel.html supaya Google tidak menganggapnya sebagai link biasa. */

const AFILIASI = {
  botol: {
    nama: "Botol minum isi ulang stainless 750 ml",
    kenapa: "Satu botol dipakai ulang bisa menggantikan ratusan botol sekali pakai.",
    url: "https://s.shopee.co.id/GANTI_ID_AFILIASI",
    label: "Lihat di Shopee",
  },
  tas_belanja: {
    nama: "Tas belanja lipat serbaguna",
    kenapa: "Muat di saku celana, dipakai untuk oleh-oleh dan jajan.",
    url: "https://s.shopee.co.id/GANTI_ID_AFILIASI",
    label: "Lihat di Shopee",
  },
  sedotan: {
    nama: "Set sedotan stainless + sikat pembersih",
    kenapa: "Menggantikan puluhan sedotan plastik per bulan.",
    url: "https://s.shopee.co.id/GANTI_ID_AFILIASI",
    label: "Lihat di Shopee",
  },
  komposter: {
    nama: "Ember kompos takakura / komposter rumahan",
    kenapa: "Solusi sampah dapur di rumah sempit, tanpa lahan.",
    url: "https://s.shopee.co.id/GANTI_ID_AFILIASI",
    label: "Lihat di Shopee",
  },
  wadah_pilah: {
    nama: "Set wadah pilah sampah 3 warna + label",
    kenapa: "Memudahkan seluruh anggota keluarga ikut memilah.",
    url: "https://s.shopee.co.id/GANTI_ID_AFILIASI",
    label: "Lihat di Shopee",
  },
  kotak_baterai: {
    nama: "Kotak penyimpanan baterai & elektronik kecil",
    kenapa: "Menyimpan B3 sementara dengan aman, jauh dari jangkauan anak.",
    url: "https://s.shopee.co.id/GANTI_ID_AFILIASI",
    label: "Lihat di Shopee",
  },
};

/* Bangun HTML kartu rekomendasi produk. ids = array kunci AFILIASI */
function kartuRekomendasi(ids) {
  if (!ids || !ids.length) return "";
  var html = [];
  for (var i = 0; i < ids.length; i++) {
    var p = AFILIASI[ids[i]];
    if (!p) continue;
    html.push(
      '<a href="' + p.url + '" target="_blank" rel="nofollow sponsored noopener" ' +
      'class="group flex items-center gap-3.5 rounded-2xl border border-line bg-white p-4 transition hover:border-primary/40 hover:shadow-md">' +
      '<span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/12" aria-hidden="true">' +
      '<svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg></span>' +
      '<span class="min-w-0 flex-1">' +
      '<span class="block text-[13.5px] font-bold text-forest group-hover:text-primary transition">' + p.nama + "</span>" +
      '<span class="mt-0.5 block text-[11.5px] leading-snug text-muted">' + p.kenapa + "</span>" +
      "</span>" +
      '<span class="shrink-0 text-[11px] font-bold text-primary">' + p.label + " →</span></a>"
    );
  }
  if (!html.length) return "";
  return (
    '<section class="mt-12 rounded-2xl border border-line bg-cream p-5 sm:p-7">' +
    '<h2 class="text-[17px] font-extrabold tracking-tight text-forest sm:text-xl">Rekomendasi alat</h2>' +
    '<p class="mt-1 text-[12.5px] text-muted sm:text-sm">Beberapa barang yang memudahkan praktik di artikel ini. ' +
    '<span class="text-[11px]">(Link afiliasi — kami dapat komisi kecil tanpa biaya tambahan untuk kamu.)</span></p>' +
    '<div class="mt-4 space-y-3">' + html.join("") + "</div></section>"
  );
}
