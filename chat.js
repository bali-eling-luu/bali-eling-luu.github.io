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

  /* ---------- logika jawaban ---------- */
  function cariItem(t) {
    var best = null;
    var bestScore = 0;
    ITEM.forEach(function (it) {
      var kandidat = [it.nama].concat(it.alias || []);
      kandidat.forEach(function (k) {
        var kn = norm(k);
        if (!kn) return;
        var skor = 0;
        if (t.indexOf(kn) !== -1) skor = kn.length;
        if (skor > bestScore) {
          bestScore = skor;
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
      if (t.indexOf(nama) !== -1 || t.indexOf(k) !== -1) ditemukan = k;
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
        if (cn && t.indexOf(cn) !== -1) skor = Math.max(skor, cn.length);
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
  function jawab(t) {
    var t2 = norm(t);
    if (!t2) return { html: esc(SAPAAN.halo), chips: sapaChips() };

    if (/^(hai|halo|hi|pagi|siang|sore|malam|assalamualaikum)\b/.test(t2)) {
      return { html: esc(SAPAAN.halo), chips: sapaChips() };
    }
    if (/(makasih|terima kasih|thanks|thx|tengkyu)/.test(t2)) {
      return { html: esc(SAPAAN.makasih), chips: sapaChips() };
    }
    if (/(siapa kamu|siapa kamu|kamu siapa|nama kamu|fungsi kamu)/.test(t2)) {
      return {
        html:
          "Saya <strong>Eling</strong>, asisten digital Bali Eling Luu. " +
          "Saya membantu menjelaskan jenis sampah, cara memilah, dan penanganannya — " +
          "jawaban diambil dari panduan resmi di website ini.",
        chips: sapaChips(),
      };
    }

    var item = cariItem(t2);
    if (item) return { html: kartuItem(item), chips: sapaChips() };

    var topik = cariTopik(t2);
    if (topik) return { html: kartuTopik(topik), chips: sapaChips() };

    var kat = cariKategori(t2);
    if (kat) return { html: kartuKategori(kat), chips: sapaChips() };

    // fallback
    var chips = KATEGORI_KEYS.map(function (k) {
      return KATEGORI[k].nama;
    });
    return {
      html:
        esc(SAPAAN.default) +
        '<div class="eling-chips">' +
        chips
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
        "</div>",
      chips: [],
    };
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
    typing(function () {
      var r = jawab(teks);
      bubble(r.html, "bot");
      chipsKe(r.chips);
    });
  }

  function bukaChat(prompt) {
    panel.classList.add("buka");
    floating.setAttribute("aria-expanded", "true");
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

    // tombol mengambang
    floating = el("button", "eling-fab");
    floating.type = "button";
    floating.id = "eling-fab";
    floating.setAttribute("aria-label", "Buka asisten sampah");
    floating.setAttribute("aria-expanded", "false");
    floating.setAttribute("aria-controls", "eling-panel");
    floating.innerHTML =
      '<img src="assets/logo/logo-mark.png" alt="" aria-hidden="true">' +
      '<span class="eling-fab-badge">1</span>';

    // panel
    panel = el("div", "eling-panel");
    panel.id = "eling-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Asisten sampah");

    panel.innerHTML =
      '<div class="eling-head">' +
      '<img src="assets/logo/logo-mark.png" alt="" aria-hidden="true">' +
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
      a.setAttribute("href", "#panduan");
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
