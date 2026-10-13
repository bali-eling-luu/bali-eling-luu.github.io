/* Bali Eling Luu — Asisten Eling (bot lokal, tanpa API) */
(function () {
  "use strict";

  var KATEGORI_KEYS = ["organik", "anorganik", "residu", "b3"];

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
    document.querySelectorAll("a[data-kategori]").forEach(function (a, i) {
      var key = KATEGORI_KEYS[i] || a.getAttribute("data-kategori");
      a.setAttribute("href", "javascript:void(0)");
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
