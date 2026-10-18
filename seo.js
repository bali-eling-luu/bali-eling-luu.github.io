/* Bali Eling Luu — bantuan SEO untuk halaman yang isinya di-render JS.
   Halaman statis (index, panduan, dashboard) sudah punya meta lengkap di HTML,
   jadi tidak memuat file ini.

   Dipakai oleh: artikel.html?id=… dan edukasi.html?jenis=…
   Fungsinya menyesuaikan canonical, Open Graph, dan JSON-LD setelah isi
   halaman jadi — supaya Google mengindeks tiap varian sebagai halaman
   tersendiri, bukan dianggap salinan. */

var SEO = (function () {
  var BASE = "https://bali-eling-luu.github.io";

  /* ganti atribut pada <link> yang sudah ada, atau buat baru */
  function link(rel, href) {
    var l = document.querySelector('link[rel="' + rel + '"]');
    if (!l) {
      l = document.createElement("link");
      l.setAttribute("rel", rel);
      document.head.appendChild(l);
    }
    l.setAttribute("href", href);
  }

  /* isi konten meta berdasarkan name= atau property= */
  function meta(attr, key, content) {
    var m = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute(attr, key);
      document.head.appendChild(m);
    }
    m.setAttribute("content", content);
  }

  /* ganti atau tambah blok JSON-LD ber-id tertentu */
  function ld(id, obj) {
    var lama = document.getElementById(id);
    if (lama) lama.parentNode.removeChild(lama);
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = id;
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }

  /* "14 Oktober 2026" → "2026-10-14" */
  function tanggalISO(teks) {
    var bulan = {
      Januari: "01", Februari: "02", Maret: "03", April: "04", Mei: "05",
      Juni: "06", Juli: "07", Agustus: "08", September: "09",
      Oktober: "10", November: "11", Desember: "12",
    };
    var m = /^(\d{1,2})\s+(\S+)\s+(\d{4})$/.exec((teks || "").trim());
    if (!m) return null;
    var mm = bulan[m[2]];
    if (!mm) return null;
    return m[3] + "-" + mm + "-" + ("0" + m[1]).slice(-2);
  }

  /* terapkan URL + Open Graph untuk halaman berparameter */
  function terapkanURL(halaman, tipe, judul, deskripsi, gambar) {
    var url = BASE + halaman;
    link("canonical", url);
    meta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1");
    meta("property", "og:type", tipe);
    meta("property", "og:url", url);
    meta("property", "og:title", judul);
    meta("property", "og:description", deskripsi);
    meta("property", "og:image", gambar || BASE + "/assets/og-image.jpg");
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", judul);
    meta("name", "twitter:description", deskripsi);
    meta("name", "twitter:image", gambar || BASE + "/assets/og-image.jpg");
  }

  return {
    BASE: BASE,
    link: link,
    meta: meta,
    ld: ld,
    tanggalISO: tanggalISO,
    terapkanURL: terapkanURL,
  };
})();
