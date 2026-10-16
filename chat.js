/* Bali Eling Luu — Asisten Eling (bot lokal, tanpa API) */
(function () {
  "use strict";

  var KATEGORI_KEYS = ["organik", "anorganik", "residu", "b3"];

  /* CSS asisten — di-inject ke <head>, jadi index.html tidak perlu diubah */
  var CSS_ELING = [
    ".sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}",
    ".eling-fab{position:fixed;right:20px;bottom:20px;z-index:90;height:58px;width:58px;border-radius:999px;background:#fff;border:1px solid #e3e7e1;box-shadow:0 12px 30px rgba(20,83,45,.22);display:grid;place-items:center;cursor:pointer;transition:transform .2s,box-shadow .2s}",
    ".eling-fab:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 16px 36px rgba(20,83,45,.28)}",
    ".eling-fab img{width:34px;height:34px;object-fit:contain}",
    ".eling-fab-badge{position:absolute;top:4px;right:4px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:#17803d;color:#fff;font-size:10px;font-weight:700;line-height:18px;text-align:center}",
    ".eling-panel{position:fixed;right:20px;bottom:90px;z-index:95;width:min(92vw,380px);height:min(70vh,520px);display:flex;flex-direction:column;border-radius:20px;background:#fff;border:1px solid #e3e7e1;box-shadow:0 24px 60px rgba(15,61,34,.25);overflow:hidden;opacity:0;visibility:hidden;transform:translateY(14px) scale(.97);transform-origin:bottom right;transition:opacity .25s ease,transform .25s ease,visibility .25s}",
    ".eling-panel.buka{opacity:1;visibility:visible;transform:none}",
    ".eling-head{display:flex;align-items:center;gap:10px;padding:14px 16px;background:linear-gradient(135deg,#14532d,#17803d);color:#f5f2ea}",
    ".eling-head img{width:34px;height:34px;object-fit:contain;background:#f5f2ea;border-radius:999px;padding:3px}",
    ".eling-head-judul{font-size:14px;font-weight:800;line-height:1.2}",
    ".eling-head-status{font-size:11px;opacity:.85;display:flex;align-items:center;gap:5px}",
    ".eling-head-status span{width:6px;height:6px;border-radius:999px;background:#7ee2a8}",
    ".eling-close{margin-left:auto;width:30px;height:30px;border-radius:999px;background:rgba(255,255,255,.15);color:#fff;font-size:20px;line-height:1;border:0;cursor:pointer;transition:background .2s}",
    ".eling-close:hover{background:rgba(255,255,255,.28)}",
    ".eling-body{flex:1;overflow-y:auto;padding:16px;background:#f5f2ea;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}",
    ".eling-baris{display:flex}.eling-baris.user{justify-content:flex-end}",
    ".eling-bubble{max-width:86%;padding:11px 14px;border-radius:16px;font-size:13.5px;line-height:1.55;color:#1e3a2a;background:#fff;border:1px solid #e3e7e1;border-bottom-left-radius:6px;box-shadow:0 2px 6px rgba(20,83,45,.05)}",
    ".eling-baris.user .eling-bubble{background:#17803d;color:#fff;border-color:#17803d;border-bottom-left-radius:16px;border-bottom-right-radius:6px}",
    ".eling-kartu{margin-top:8px;padding:11px 13px;border-radius:12px;background:#faf8f3;border-left:3px solid #17803d}",
    ".eling-kartu-judul{font-size:13px;font-weight:800;margin-bottom:4px}",
    ".eling-kartu-teks{font-size:12.5px;color:#4b5a51}",
    ".eling-kartu-label{margin-top:8px;margin-bottom:3px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7a70}",
    ".eling-kartu ul{margin:0;padding-left:16px;font-size:12.5px;color:#4b5a51}.eling-kartu li{margin-bottom:2px}",
    ".eling-kartu-peringatan{margin-top:9px;padding:8px 10px;border-radius:9px;background:#fef3e2;color:#92400e;font-size:12px;line-height:1.45}",
    ".eling-ai{border-left:3px solid #d9a441;background:#fffdf6}",
    ".eling-ai-label{display:inline-block;margin-bottom:6px;padding:2px 8px;border-radius:999px;background:#d9a441;color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;vertical-align:middle}",
    ".eling-ai-teks{display:block}",
    ".eling-ai .eling-chips{margin-top:9px}",
    ".eling-ai-aksi{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}",
    ".eling-ai-aksi .eling-ai-btn{margin-top:0}",
    ".eling-ai-aksi .eling-ai-btn-utama{background:#17803d;border-color:#17803d;color:#fff}",
    ".eling-ai-aksi .eling-ai-btn-utama:hover{background:#14532d;border-color:#14532d;color:#fff}",
    ".eling-ai-aksi .eling-ai-btn:disabled{opacity:.6;cursor:default;transform:none}",
    ".eling-typing{display:flex;gap:4px;padding:14px 16px}",
    ".eling-typing i{width:6px;height:6px;border-radius:999px;background:#9aa79f;animation:elingdot 1.1s infinite ease-in-out}",
    ".eling-typing i:nth-child(2){animation-delay:.16s}.eling-typing i:nth-child(3){animation-delay:.32s}",
    "@keyframes elingdot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-4px);opacity:1}}",
    ".eling-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}",
    ".eling-chip{border:1px solid #cdd8d0;background:#fff;color:#17803d;font-size:12px;font-weight:600;padding:7px 11px;border-radius:999px;cursor:pointer;transition:background .2s,border-color .2s,transform .15s}",
    ".eling-chip:hover{background:#17803d;border-color:#17803d;color:#fff;transform:translateY(-1px)}",
    ".eling-foot{display:flex;gap:8px;padding:11px;background:#fff;border-top:1px solid #e3e7e1}",
    ".eling-foot input{flex:1;border:1px solid #e3e7e1;border-radius:999px;padding:10px 15px;font-size:13.5px;color:#1e3a2a;background:#f5f2ea}",
    ".eling-foot input:focus{outline:none;border-color:#17803d;background:#fff}",
    ".eling-send{width:40px;height:40px;flex:none;border-radius:999px;border:0;background:#17803d;color:#fff;display:grid;place-items:center;cursor:pointer;transition:background .2s,transform .15s}",
    ".eling-send:hover{background:#14532d;transform:scale(1.06)}",
    ".eling-send svg{width:18px;height:18px}",
    "@media(max-width:480px){.eling-panel{right:10px;left:10px;bottom:84px;width:auto;height:68vh}.eling-fab{right:14px;bottom:14px}}",
    // halaman dengan bottom nav: tombol & panel digeser ke atas supaya tidak menutupi nav
    ".has-nav-bawah .eling-fab{bottom:88px}",
    ".has-nav-bawah .eling-panel{bottom:158px}",
    "@media(max-width:480px){.has-nav-bawah .eling-fab{right:14px;bottom:78px}.has-nav-bawah .eling-panel{bottom:150px;height:58vh}}",
    "@media(prefers-reduced-motion:reduce){.eling-typing i{animation:none}}",
  ].join("\n");


  /* ---------- util ---------- */
  function norm(s) {
    return (s || "")
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Cocok kata kunci sebagai kata UTUH, bukan potongan di dalam kata lain.
     Tanpa ini, "kacang" akan cocok dengan "kaca" karena memakai indexOf biasa. */
  function adaKata(t, kunci) {
    if (!kunci) return false;
    var i = t.indexOf(kunci);
    while (i !== -1) {
      var sebelum = i === 0 ? " " : t.charAt(i - 1);
      var akhir = i + kunci.length;
      var sesudah = akhir >= t.length ? " " : t.charAt(akhir);
      if (!/[a-z0-9]/.test(sebelum) && !/[a-z0-9]/.test(sesudah)) return true;
      i = t.indexOf(kunci, i + 1);
    }
    return false;
  }

  /* Pertanyaan yang jawabannya tidak ada di basis data lokal —
     harga terkini, waktu, berita, sastra, atau pertanyaan umum.
     Ini dialihkan ke AI, bukan dijawab paksa oleh kartu sampah. */
  function butuhAI(t) {
    return (
      /harga|\bberapa\b|\brupiah|\brp\s?\d|kapan|\bbaru\b|terbaru|berita|hari ini|besok|kemarin|cuaca|jam berapa|pantun|puisi|gurindam|resep|\blagu\b|terjemah/.test(
        t
      )
    );
  }

  /* ---------- logika jawaban ---------- */
  function cariItem(t) {
    var best = null;
    var bestScore = 0;
    ITEM.forEach(function (it) {
      var kandidat = [it.nama].concat(it.alias || []);
      kandidat.forEach(function (k) {
        var kn = norm(k);
        if (!kn) return;
        if (adaKata(t, kn) && kn.length > bestScore) {
          bestScore = kn.length;
          best = it;
        }
      });
    });
    return bestScore >= 3 ? best : null;
  }

  function cariKategori(t) {
    var ditemukan = null;
    KATEGORI_KEYS.forEach(function (k) {
      var kat = KATEGORI[k];
      var nama = norm(kat.nama);
      if (adaKata(t, nama) || adaKata(t, k)) ditemukan = k;
    });
    return ditemukan;
  }

  function cariTopik(t) {
    var best = null;
    var bestScore = 0;
    TOPIK.forEach(function (top) {
      var skor = 0;
      (top.cocok || []).forEach(function (c) {
        var cn = norm(c);
        if (cn && adaKata(t, cn)) skor = Math.max(skor, cn.length);
      });
      if (skor > bestScore) {
        bestScore = skor;
        best = top;
      }
    });
    return bestScore >= 4 ? best : null;
  }

  function kartuKategori(key) {
    var k = KATEGORI[key];
    if (!k) return "";
    return (
      '<div class="eling-kartu" style="border-left-color:' +
      k.warna +
      '">' +
      '<p class="eling-kartu-judul" style="color:' +
      k.warna +
      '">' +
      k.ikon +
      " " +
      esc(k.nama) +
      "</p>" +
      '<p class="eling-kartu-teks">' +
      esc(k.definisi) +
      "</p>" +
      '<p class="eling-kartu-label">Contoh</p><ul>' +
      k.contoh
        .map(function (c) {
          return "<li>" + esc(c) + "</li>";
        })
        .join("") +
      "</ul>" +
      '<p class="eling-kartu-label">Cara menangani</p><ul>' +
      k.penanganan
        .map(function (c) {
          return "<li>" + esc(c) + "</li>";
        })
        .join("") +
      "</ul>" +
      '<p class="eling-kartu-peringatan">⚠️ ' +
      esc(k.peringatan) +
      "</p>" +
      "</div>"
    );
  }

  function kartuItem(it) {
    var k = KATEGORI[it.kategori];
    return (
      "<p><strong>" +
      esc(it.nama) +
      "</strong> termasuk sampah " +
      '<span style="color:' +
      k.warna +
      ';font-weight:700">' +
      esc(k.nama) +
      "</span>.</p>" +
      '<div class="eling-kartu" style="border-left-color:' +
      k.warna +
      '">' +
      '<p class="eling-kartu-judul" style="color:' +
      k.warna +
      '">' +
      k.ikon +
      " " +
      esc(k.nama) +
      "</p>" +
      '<p class="eling-kartu-teks">' +
      esc(it.tips) +
      "</p>" +
      '<p class="eling-kartu-label">Contoh ' +
      esc(k.nama.toLowerCase()) +
      " lain</p><ul>" +
      k.contoh
        .slice(0, 4)
        .map(function (c) {
          return "<li>" + esc(c) + "</li>";
        })
        .join("") +
      "</ul>" +
      "</div>"
    );
  }

  function kartuTopik(top) {
    return (
      '<p class="eling-kartu-judul">' +
      esc(top.judul) +
      "</p>" +
      '<div class="eling-kartu"><p class="eling-kartu-teks">' +
      esc(top.jawaban).replace(/\n/g, "<br>") +
      "</p></div>"
    );
  }

  function sapaChips() {
    var chips = [
      "Botol plastik kategori apa?",
      "Bedanya residu dan B3?",
      "Cara memilah di rumah",
      "Kenapa B3 bahaya?",
    ];
    return chips;
  }

  /* hasilkan jawaban dari satu pertanyaan */
  /* Jawaban dari basis data lokal. Mengembalikan null kalau pertanyaan
     tidak bisa dijawab dengan yakin di sini — artinya harus ke AI. */
  function jawabLokal(t) {
    var t2 = norm(t);
    if (!t2) return { html: esc(SAPAAN.halo), chips: sapaChips() };

    if (/^(hai|halo|hi|pagi|siang|sore|malam|assalamualaikum)\b/.test(t2)) {
      return { html: esc(SAPAAN.halo), chips: sapaChips() };
    }
    if (/(makasih|terima kasih|thanks|thx|tengkyu)/.test(t2)) {
      return { html: esc(SAPAAN.makasih), chips: sapaChips() };
    }
    if (/(siapa kamu|kamu siapa|nama kamu|fungsi kamu)/.test(t2)) {
      return {
        html:
          "Saya <strong>Eling</strong>, asisten digital Bali Eling Luu. " +
          "Saya menjelaskan jenis sampah, cara memilah, dan penanganannya — " +
          "pertanyaan umum di luar itu saya teruskan ke AI.",
        chips: sapaChips(),
      };
    }

    // pertanyaan yang jawabannya tidak ada di basis data → serahkan ke AI
    if (butuhAI(t2)) return null;

    // TOPIK dulu: pertanyaan "gimana/kenapa" lebih cocok dijelaskan panjang,
    // bukan dibalas kartu satu item ("gimana bikin kompos" -> panduan kompos).
    var topik = cariTopik(t2);
    if (topik) return { html: kartuTopik(topik), chips: sapaChips() };

    var item = cariItem(t2);
    if (item) return { html: kartuItem(item), chips: sapaChips() };

    var kat = cariKategori(t2);
    if (kat) return { html: kartuKategori(kat), chips: sapaChips() };

    return null;
  }

  /* KATEGORI mewarisi __proto__/toString/dll. dari Object.prototype,
     jadi kita harus cek kepemilikan sendiri sebelum memakai kuncinya. */
  function katValid(key) {
    return (
      typeof key === "string" &&
      Object.prototype.hasOwnProperty.call(KATEGORI, key)
    );
  }

  /* ---------- ingatan percakapan ---------- */
  var riwayat = []; // {peran:"user"|"assistant", teks:"..."}
  var MODEL_AI = "gemini-3.5-flash-lite";

  /* Pengunjung di tawari AI dulu — pop-up izin Puter tidak muncul diam-diam.
     Dianggap aktif setelah jawaban AI pertama berhasil, lalu disimpan di
     peramban supaya tidak ditanya lagi. */
  var aiIzin = false;
  try {
    aiIzin = localStorage.getItem("eling_ai_izin") === "1";
  } catch (e) {}
  function setujuiAI() {
    aiIzin = true;
    try {
      localStorage.setItem("eling_ai_izin", "1");
    } catch (e) {}
    perbaruiStatus();
  }

  /* Isi baris status di kepala panel, mengikuti apakah AI sudah disetujui. */
  function perbaruiStatus() {
    if (!panel) return;
    var st = panel.querySelector(".eling-head-status");
    if (!st) return;
    st.innerHTML = aiIzin
      ? "<span></span> Dibantu AI — jawab instan untuk topik sampah"
      : "<span></span> Topik sampah dijawab instan · AI opsional";
  }

  var SISTEM = [
    "Kamu adalah Eling, asisten digital situs Bali Eling Luu — situs edukasi",
    "tentang pemilahan dan pengelolaan sampah di Bali, Indonesia.",
    "",
    "Aturan wajib:",
    "1. Selalu jawab dalam bahasa Indonesia yang ramah dan sederhana.",
    "   Pembacanya pelajar dan masyarakat umum.",
    "2. Fokus ke sampah, pemilahan, daur ulang, kompos, dan kebersihan lingkungan.",
    "   Pertanyaan di luar topik: jawab singkat dengan sopan, lalu arahkan kembali",
    "   ke topik sampah.",
    "3. JANGAN mengarang. Kalau tidak yakin soal angka atau fakta, tulis terus terang",
    '   bahwa kamu tidak yakin, lalu sarankan cek ke SIPSN Kementerian Lingkungan',
    "   Hidup atau Dinas Lingkungan Hidup setempat.",
    "4. Untuk sampah B3 (baterai, lampu, obat, elektronik, jarum suntik) selalu",
    "   tekankan jangan dicampur sampah rumah tangga biasa.",
    "5. Jawaban 3-6 kalimat. Pakai daftar bernomor kalau menjelaskan langkah.",
    "6. Tutup dengan menawarkan pertanyaan lanjutan.",
    "7. Kamu Eling — jangan mengaku sebagai ChatGPT, Gemini, Claude, atau model lain.",
    "8. Situs ini murni edukasi: jangan menawarkan jasa, harga produk, atau promosi.",
    "",
    "Konteks data lokal yang sudah diketahui pengguna (sudah dijawab situs ini,",
    "tidak perlu diulang panjang lebar):",
    "4 kategori sampah = Organik, Anorganik, Residu, B3/Khusus.",
  ].join("\n");

  /* Muat Puter.js hanya saat dibutuhkan, supaya bobot halaman tetap ringan. */
  var puterJanji = null;
  function muatPuter() {
    if (window.puter && window.puter.ai) return Promise.resolve(true);
    if (puterJanji) return puterJanji;
    puterJanji = new Promise(function (selesai) {
      var s = document.createElement("script");
      s.src = "https://js.puter.com/v2/";
      s.async = true;
      s.onload = function () {
        var coba = 0;
        (function tunggu() {
          if (window.puter && window.puter.ai) return selesai(true);
          if (++coba > 50) return selesai(false); // ±5 detik
          setTimeout(tunggu, 100);
        })();
      };
      s.onerror = function () {
        selesai(false);
      };
      document.head.appendChild(s);
    });
    return puterJanji;
  }

  function bubbleAI() {
    var wrap = el("div", "eling-baris bot");
    var b = el("div", "eling-bubble eling-ai");
    b.innerHTML =
      '<span class="eling-ai-label">Eling AI</span><span class="eling-ai-teks"></span>';
    wrap.appendChild(b);
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
    return b.querySelector(".eling-ai-teks");
  }

  function tampilAI(span, teks) {
    span.innerHTML = esc(teks).replace(/\n/g, "<br>");
    body.scrollTop = body.scrollHeight;
  }

  function gagalAI(span) {
    span.classList.remove("eling-ai-pakai");
    span.innerHTML =
      "AI belum bisa diakses dari peramban ini. Kamu tetap bisa bertanya soal " +
      "jenis sampah lewat pilihan di bawah, atau buka langsung " +
      '<a href="panduan.html" style="font-weight:700;color:#17803d">Panduan Memilah</a>.' +
      '<div class="eling-chips">' +
      KATEGORI_KEYS.map(function (k) {
        return KATEGORI[k].nama;
      })
        .map(function (c) {
          return (
            '<button type="button" class="eling-chip" data-tanya="' +
            esc(c) +
            '">' +
            esc(c) +
            "</button>"
          );
        })
        .join("") +
      "</div>";
  }

  /* Jalan keluar yang tetap membantu saat AI tidak dipakai / gagal. */
  function fallbackTanpaAI() {
    bubble(
      "Tidak apa-apa. Kamu tetap bisa bertanya soal jenis sampah lewat " +
        'pilihan di bawah, atau buka langsung <a href="panduan.html" style="font-weight:700;color:#17803d">Panduan Memilah</a>.',
      "bot"
    );
    chipsKe(
      KATEGORI_KEYS.map(function (k) {
        return KATEGORI[k].nama;
      })
    );
  }

  /* Tawarkan AI sebelum memanggil Puter, supaya jendela izin tidak muncul
     diam-diam di tengah percakapan. */
  function tawarAI() {
    var wrap = el("div", "eling-baris bot");
    var b = el("div", "eling-bubble eling-ai");
    b.innerHTML =
      '<span class="eling-ai-label">Eling AI</span>' +
      '<span class="eling-ai-teks">Pertanyaan ini di luar materi sampah di situs ini, ' +
      "jadi jawaban datanya tidak ada di basis kami. Eling bisa menjawabnya " +
      "dengan AI gratis — hanya perlu izin sekali saja, sesudahnya tidak " +
      "ditanya lagi.</span>";

    var aksi = el("div", "eling-ai-aksi");

    var ya = el("button", "eling-chip eling-ai-btn eling-ai-btn-utama");
    ya.type = "button";
    ya.textContent = "Aktifkan AI";
    ya.addEventListener("click", function () {
      ya.disabled = true;
      wrap.remove();
      kirimKeAI();
    });

    var tidak = el("button", "eling-chip eling-ai-btn");
    tidak.type = "button";
    tidak.textContent = "Nanti saja";
    tidak.addEventListener("click", function () {
      wrap.remove();
      fallbackTanpaAI();
    });

    aksi.appendChild(ya);
    aksi.appendChild(tidak);
    b.appendChild(aksi);
    wrap.appendChild(b);
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  /* Batasi waktu tiap panggilan AI. Kalau pengguna menutup jendela izin Puter,
     janjinya tidak pernah selesai — tanpa ini balon akan berhenti di "…". */
  function denganBatas(janji, detik) {
    return Promise.race([
      janji,
      new Promise(function (_, tolak) {
        setTimeout(function () {
          tolak(new Error("waktu habis"));
        }, detik * 1000);
      }),
    ]);
  }

  /* Teruskan ke AI sungguhan, lalu tampilkan jawabannya perlahan (streaming). */
  function kirimKeAI() {
    var span = bubbleAI();
    span.textContent = "…";

    // kalau lebih dari 4 dtk belum ada jawaban, beri tahu soal jendela izin
    var petunjuk = setTimeout(function () {
      if (span.textContent.trim() === "…") {
        span.innerHTML =
          "Menghubungi AI…<br><span style='font-size:12px;color:#6b7a70'>" +
          "Kalau muncul jendela izin Puter, selesaikan dulu ya — itu gratis " +
          "dan cukup sekali saja.</span>";
      }
    }, 4000);

    var pesan = [{ role: "system", content: SISTEM }].concat(
      riwayat.slice(-8).map(function (r) {
        return { role: r.peran, content: r.teks };
      })
    );

    muatPuter().then(function (siap) {
      if (!siap) {
        clearTimeout(petunjuk);
        return gagalAI(span);
      }

      function selesai(teks) {
        if (!teks || !teks.trim()) throw new Error("kosong");
        clearTimeout(petunjuk);
        setujuiAI();
        riwayat.push({ peran: "assistant", teks: teks });
        tampilAI(span, teks);
      }

      function gagal() {
        clearTimeout(petunjuk);
        gagalAI(span);
      }

      function tanpaModel() {
        return denganBatas(
          window.puter.ai.chat(pesan, { normalize: true }),
          45
        ).then(function (res) {
          var isi = res && res.message && res.message.content;
          if (Array.isArray(isi)) {
            isi = isi
              .map(function (p) {
                return p && p.text ? p.text : "";
              })
              .join("");
          }
          return isi;
        });
      }

      denganBatas(
        window.puter.ai.chat(pesan, { model: MODEL_AI, stream: true, normalize: true }),
        45
      )
        .then(function (res) {
          if (!res || typeof res[Symbol.asyncIterator] !== "function") {
            throw new Error("bukan stream");
          }
          var teks = "";
          return (async function () {
            for await (var bagian of res) {
              var k = bagian && bagian.text;
              if (k) {
                teks += k;
                clearTimeout(petunjuk);
                tampilAI(span, teks);
              }
            }
            return teks;
          })();
        })
        .then(selesai)
        .catch(function () {
          // mode streaming gagal → coba mode biasa tanpa model khusus
          return tanpaModel().then(selesai);
        })
        .catch(gagal);
    });
  }

  /* ---------- UI ---------- */
  var panel, body, input, btn, floating;

  function bubble(teksHTML, tipe) {
    var wrap = el("div", "eling-baris " + (tipe || "bot"));
    var b = el("div", "eling-bubble", teksHTML);
    wrap.appendChild(b);
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
    return wrap;
  }

  function chipsKe(htmlList) {
    if (!htmlList || !htmlList.length) return;
    var wrap = el("div", "eling-baris bot");
    var c = el("div", "eling-chips");
    htmlList.forEach(function (t) {
      var b = el("button", "eling-chip");
      b.type = "button";
      b.textContent = t;
      b.addEventListener("click", function () {
        kirim(t);
      });
      c.appendChild(b);
    });
    wrap.appendChild(c);
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function typing(cb) {
    var wrap = el("div", "eling-baris bot");
    var b = el("div", "eling-bubble eling-typing");
    b.innerHTML = "<i></i><i></i><i></i>";
    wrap.appendChild(b);
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
    setTimeout(function () {
      wrap.remove();
      cb();
    }, 600);
  }

  function kirim(teks) {
    teks = (teks || input.value).trim();
    if (!teks) return;
    input.value = "";
    bubble(esc(teks), "user");
    riwayat.push({ peran: "user", teks: teks });
    if (riwayat.length > 24) riwayat = riwayat.slice(-24);
    typing(function () {
      var r = jawabLokal(teks);
      if (r) {
        bubble(r.html, "bot");
        chipsKe(r.chips);
        riwayat.push({
          peran: "assistant",
          teks: r.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
        });
        return;
      }
      if (!aiIzin) {
        tawarAI();
        return;
      }
      kirimKeAI();
    });
  }

  function bukaChat(prompt) {
    panel.classList.add("buka");
    floating.setAttribute("aria-expanded", "true");
    perbaruiStatus();
    // panaskan Puter hanya kalau pengunjung sudah setuju, supaya
    // pengunjung baru tidak langsung memuat skrip pihak ketiga
    if (aiIzin) {
      muatPuter();
    }
    if (prompt) {
      kirim(prompt);
    } else {
      input.focus();
    }
  }

  function tutupChat() {
    panel.classList.remove("buka");
    floating.setAttribute("aria-expanded", "false");
  }

  function bangun() {
    if (document.getElementById("eling-panel")) return;

    // CSS asisten di-inject dari sini supaya index.html tidak perlu diubah
    if (!document.getElementById("eling-style")) {
      var st = document.createElement("style");
      st.id = "eling-style";
      st.textContent = CSS_ELING;
      document.head.appendChild(st);
    }

    // kalau halaman punya bottom nav, tombol & panel digeser ke atas
    if (document.querySelector('nav[aria-label="Navigasi bawah"]')) {
      document.documentElement.classList.add("has-nav-bawah");
    }

    // tombol mengambang
    floating = el("button", "eling-fab");
    floating.type = "button";
    floating.id = "eling-fab";
    floating.setAttribute("aria-label", "Buka asisten sampah");
    floating.setAttribute("aria-expanded", "false");
    floating.setAttribute("aria-controls", "eling-panel");
    floating.innerHTML =
      '<img src="assets/logo/logo-mark.webp" alt="" aria-hidden="true">' +
      '<span class="eling-fab-badge">1</span>';

    // panel
    panel = el("div", "eling-panel");
    panel.id = "eling-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Asisten sampah");

    panel.innerHTML =
      '<div class="eling-head">' +
      '<img src="assets/logo/logo-mark.webp" alt="" aria-hidden="true">' +
      "<div><p class='eling-head-judul'>Eling Assistant</p>" +
      "<p class='eling-head-status'><span></span> Siap membantu</p></div>" +
      '<button type="button" class="eling-close" aria-label="Tutup asisten">&times;</button>' +
      "</div>" +
      '<div class="eling-body" id="eling-body"></div>' +
      '<div class="eling-foot">' +
      '<label for="eling-input" class="sr-only">Tanya soal sampah</label>' +
      '<input id="eling-input" type="text" autocomplete="off" placeholder="Tanya soal sampah...">' +
      '<button type="button" class="eling-send" aria-label="Kirim">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' +
      "</button></div>";

    document.body.appendChild(floating);
    document.body.appendChild(panel);

    body = document.getElementById("eling-body");
    input = document.getElementById("eling-input");

    // sapaan awal
    bubble(esc(SAPAAN.halo), "bot");
    chipsKe(sapaChips());

    floating.addEventListener("click", function () {
      if (panel.classList.contains("buka")) tutupChat();
      else bukaChat();
      floating.querySelector(".eling-fab-badge").style.display = "none";
    });
    panel.querySelector(".eling-close").addEventListener("click", tutupChat);
    panel.querySelector(".eling-send").addEventListener("click", function () {
      kirim();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") kirim();
    });

    // chip fallback yang ada data-tanya
    body.addEventListener("click", function (e) {
      var t = e.target.closest("[data-tanya]");
      if (t) kirim(t.getAttribute("data-tanya"));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("buka")) tutupChat();
    });

    // expose
    window.ElingChat = { buka: bukaChat, tutup: tutupChat };
  }

  /* ---------- wiring dari index.html ---------- */
  function wiring() {
    // form search + dropdown
    var form = document.getElementById("panduan");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var q = (document.getElementById("q") || {}).value || "";
        var kat = (document.getElementById("kat") || {}).value || "";
        if (!katValid(kat)) kat = "";
        var tanya;
        if (q.trim() && kat) tanya = q.trim() + " " + KATEGORI[kat].nama;
        else if (q.trim()) tanya = q.trim();
        else if (kat) tanya = KATEGORI[kat].nama;
        else tanya = "";
        bukaChat(tanya || "Halo");
      });
    }

    // tombol "Pelajari →" di kartu kategori
    // dicocokkan lewat teks <h3> di dalam kartu yang sama, jadi tidak butuh atribut khusus
    document.querySelectorAll("a").forEach(function (a) {
      if (!/pelajari/i.test(a.textContent)) return;
      var kartu = a.closest("article") || a.parentElement;
      var judul = kartu ? kartu.querySelector("h3") : null;
      if (!judul) return;
      var key = null;
      var jn = norm(judul.textContent);
      KATEGORI_KEYS.forEach(function (k) {
        if (jn.indexOf(norm(KATEGORI[k].nama)) !== -1 || jn.indexOf(k) !== -1) key = k;
      });
      if (!key) return;
      // kalau sudah ada halaman detail, biarkan link-nya jalan normal
      if (a.getAttribute("href") && a.getAttribute("href").indexOf("edukasi.html") !== -1) return;
      a.setAttribute("href", "edukasi.html?jenis=" + key);
      a.addEventListener("click", function (e) {
        e.preventDefault();
        bukaChat(KATEGORI[key].nama);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bangun();
      wiring();
    });
  } else {
    bangun();
    wiring();
  }
})();
