/**
 * Bali Eling Luu — Eco Action & Gamifikasi Palemahan + Lapor Luu (Bali Smart Society)
 */

(function () {
  "use strict";

  // Default Daily Quests (Tantangan Harian)
  const DEFAULT_QUESTS = [
    {
      id: "quest-1",
      judul: "Pilah Canang & Sisa Banten",
      deskripsi: "Pisahkan bunga & janur dari plastik pembungkus semut serta koin sesari.",
      xp: 30,
      kategori: "Organik & Budaya",
      ikon: ""
    },
    {
      id: "quest-2",
      judul: "Tolak Kantong Plastik Sekali Pakai",
      deskripsi: "Gunakan tas kain belanja sendiri saat berbelanja di pasar atau minimarket.",
      xp: 25,
      kategori: "Pergub 97/2018",
      ikon: ""
    },
    {
      id: "quest-3",
      judul: "Bawa Tumbler Air Minum Sendiri",
      deskripsi: "Hindari membeli air mineral gelas/botol plastik sekali pakai hari ini.",
      xp: 20,
      kategori: "Pencegahan Residu",
      ikon: ""
    },
    {
      id: "quest-4",
      judul: "Pindai 1 Sampah dengan Eling AI",
      deskripsi: "Gunakan AI Waste Scanner untuk memahami cara pengelolaan sampah di sekitarmu.",
      xp: 30,
      kategori: "Edukasi Cerdas",
      ikon: ""
    },
    {
      id: "quest-5",
      judul: "Simpan & Padatkan Kardus/Plastik",
      deskripsi: "Kumpulkan anorganik bersih untuk disetorkan ke Bank Sampah banjar.",
      xp: 35,
      kategori: "Ekonomi Sirkular",
      ikon: ""
    }
  ];

  // Sampel Laporan Komunitas Default
  const DEFAULT_REPORTS = [
    {
      id: "rep-001",
      judul: "Tumpukan Sampah Plastik di Muara Tukad Badung",
      lokasi: "Pemogan, Denpasar Selatan",
      kategori: "Saluran Air / Sungai",
      tanggal: "Hari ini, 09.30 WITA",
      status: "Diteruskan ke DLHK",
      statusClass: "bg-amber-100 text-amber-800",
      pelapor: "Wayan S.",
      deskripsi: "Terdapat tumpukan sampah plastik sachet dan ranting menghambat aliran air dekat jembatan."
    },
    {
      id: "rep-002",
      judul: "Sampah Pesisir Pantai Pasca Gelombang",
      lokasi: "Pantai Kedonganan, Kuta",
      kategori: "Sampah Pantai",
      tanggal: "Kemarin, 16.15 WITA",
      status: "Dalam Penanganan Banjar",
      statusClass: "bg-blue-100 text-blue-800",
      pelapor: "Made A.",
      deskripsi: "Kiriman sampah laut menepi di pasir. Dikoordinasikan dengan aksi bersih pantai warga."
    },
    {
      id: "rep-003",
      judul: "Pembuangan Sampah Liar Pinggir Jalan",
      lokasi: "Gatot Subroto Barat, Denpasar",
      kategori: "Tumpukan Liar",
      tanggal: "2 hari lalu",
      status: "Selesai Ditertibkan",
      statusClass: "bg-emerald-100 text-emerald-800",
      pelapor: "Ketut L.",
      deskripsi: "Warga liar menaruh kantong sampah di trotoar. Sudah diangkut armada TPS3R setempat."
    }
  ];

  // Helper State LocalStorage (P0: mulai dari 0 — bukan angka demo)
  function getStoredState() {
    return {
      xp: parseInt(localStorage.getItem("eling_total_xp") || "0", 10),
      streak: parseInt(localStorage.getItem("eling_streak_days") || "0", 10),
      completedQuests: JSON.parse(localStorage.getItem("eling_completed_quests") || '[]'),
      reports: JSON.parse(localStorage.getItem("eling_community_reports") || JSON.stringify(DEFAULT_REPORTS))
    };
  }

  // Escape HTML untuk input pengguna (P0: cegah XSS di Lapor Luu)
  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function getLevelInfo(xp) {
    if (xp >= 350) {
      return { level: 3, gelar: "Ksatria Palemahan Bali", badge: "Lv3", nextXp: 500, progres: 85 };
    } else if (xp >= 150) {
      return { level: 2, gelar: "Satria Palemahan", badge: "Lv2", nextXp: 350, progres: Math.min(100, Math.round(((xp - 150) / 200) * 100)) };
    } else {
      return { level: 1, gelar: "Krama Peduli", badge: "Lv1", nextXp: 150, progres: Math.min(100, Math.round((xp / 150) * 100)) };
    }
  }

  // Render Widget Gamifikasi Palemahan di Dashboard
  function renderGamifikasiDashboard() {
    const container = document.getElementById("gamifikasiPalemahan");
    if (!container) return;

    const state = getStoredState();
    const lvl = getLevelInfo(state.xp);
    const completedCount = state.completedQuests.length;

    container.innerHTML = `
      <div class="rounded-3xl border border-line bg-white p-6 shadow-sm space-y-6">
        
        <!-- Header Profil & Level -->
        <div class="flex items-center justify-between pb-5 border-b border-line">
          <div class="flex items-center gap-3.5">
            <span class="grid h-14 w-14 place-items-center rounded-2xl bg-primary/12 text-2xl shadow-inner">
              <span class="h-7 w-7 grid place-items-center rounded-full bg-primary text-white text-xs font-black">Lv</span>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base font-extrabold text-forest">${lvl.gelar}</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-primary text-white">Lvl ${lvl.level}</span>
              </div>
              <p class="text-xs text-muted mt-0.5">${state.xp} XP Palemahan • Menuju Level Berikutnya (${lvl.nextXp} XP)</p>
            </div>
          </div>

          <div class="text-right">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs">
              <span class="font-black">Streak</span>
              <span>${state.streak} Hari Berturut</span>
            </span>
          </div>
        </div>

        <!-- Progress Bar Level -->
        <div class="space-y-1.5">
          <div class="flex justify-between text-xs font-bold text-muted">
            <span>Progres Kehormatan Palemahan</span>
            <span>${lvl.progres}%</span>
          </div>
          <div class="w-full h-3 rounded-full bg-cream overflow-hidden border border-line">
            <div class="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500 rounded-full" style="width: ${lvl.progres}%"></div>
          </div>
        </div>

        <!-- Daftar Tantangan Harian -->
        <div>
          <div class="flex items-center justify-between mb-3.5">
            <div>
              <h4 class="text-sm font-extrabold text-forest">Tantangan Harian Hari Ini</h4>
              <p class="text-xs text-muted">Selesaikan aksi untuk mengumpulkan poin kontribusi</p>
            </div>
            <span class="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
              ${completedCount} / ${DEFAULT_QUESTS.length} Selesai
            </span>
          </div>

          <div class="space-y-2.5">
            ${DEFAULT_QUESTS.map(q => {
              const done = state.completedQuests.includes(q.id);
              return `
                <div class="flex items-start justify-between gap-3 p-3.5 rounded-2xl border transition ${done ? 'bg-cream/60 border-line text-muted' : 'bg-white border-line hover:border-primary'}">
                  <div class="flex items-start gap-3">
                    <span class="text-xl mt-0.5">${q.ikon}</span>
                    <div>
                      <p class="text-xs font-bold ${done ? 'line-through text-muted' : 'text-forest'}">${q.judul}</p>
                      <p class="text-[11px] leading-tight text-muted mt-0.5">${q.deskripsi}</p>
                    </div>
                  </div>
                  <button type="button" class="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition ${done ? 'bg-emerald-100 text-emerald-800 cursor-default' : 'bg-primary text-white hover:bg-forest shadow-sm'}" onclick="toggleQuest('${q.id}', ${q.xp})">
                    ${done ? '✓ Tuntas' : `+${q.xp} XP`}
                  </button>
                </div>
              `;
            }).join("")}
          </div>
        </div>

      </div>
    `;
  }

  // Toggle checklist quest
  window.toggleQuest = function(questId, xpValue) {
    const state = getStoredState();
    const idx = state.completedQuests.indexOf(questId);
    
    if (idx === -1) {
      state.completedQuests.push(questId);
      state.xp += xpValue;
      localStorage.setItem("eling_completed_quests", JSON.stringify(state.completedQuests));
      localStorage.setItem("eling_total_xp", state.xp.toString());
      renderGamifikasiDashboard();
      alert(`Bagus sekali! Kamu menyelesaikan tantangan dan mendapatkan +${xpValue} XP Palemahan.`);
    }
  };

  // Render Modul Lapor Luu (Partisipasi Warga)
  function renderLaporLuuSection() {
    const container = document.getElementById("laporLuuSection");
    if (!container) return;

    const state = getStoredState();

    container.innerHTML = `
      <div class="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm space-y-8">
        
        <!-- Header & Form Lapor -->
        <div class="grid lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-5 space-y-3">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-danger/10 text-danger border border-danger/20">
              Bali Smart Society
            </span>
            <h3 class="text-2xl font-extrabold text-forest tracking-tight">
              Lapor Tumpukan Sampah Liar
            </h3>
            <p class="text-xs sm:text-sm text-muted leading-relaxed">
              Temukan sampah meluap di pantai, got tersumbat, atau tumpukan liar di pinggir jalan Bali? Laporkan langsung bersama titik koordinat agar dapat ditindaklanjuti komunitas & petugas.
            </p>
            <div class="p-4 rounded-2xl bg-cream border border-line text-xs text-ink/80 space-y-1.5">
              <p class="font-bold text-forest"> Prinsip Keterbukaan & Integritas:</p>
              <p>Laporan yang masuk akan dikurasi dan dipetakan ke komunitas relawan banjar terdekat demi keasrian alam Bali.</p>
            </div>
          </div>

          <!-- Form Input -->
          <form id="formLaporLuu" class="lg:col-span-7 bg-cream p-5 sm:p-6 rounded-2xl border border-line space-y-4" onsubmit="return false;">
            <div>
              <label for="laporJudul" class="block text-xs font-bold text-forest mb-1">Judul Masalah / Kejadian</label>
              <input type="text" id="laporJudul" placeholder="Contoh: Tumpukan sampah plastik di muara sungai" class="w-full text-xs sm:text-sm p-3 rounded-xl border border-line bg-white focus:outline-none focus:border-primary" required>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div>
                <label for="laporKategori" class="block text-xs font-bold text-forest mb-1">Kategori Lokasi</label>
                <select id="laporKategori" class="w-full text-xs sm:text-sm p-3 rounded-xl border border-line bg-white focus:outline-none focus:border-primary">
                  <option value="Sampah Pantai">Sampah Pantai / Pesisir</option>
                  <option value="Tumpukan Liar">Tumpukan Liar Pinggir Jalan</option>
                  <option value="Saluran Air / Sungai">Saluran Air / Sungai</option>
                  <option value="Tempat Sampah Meluap">Tempat Sampah Meluap</option>
                </select>
              </div>

              <div>
                <label for="laporLokasi" class="block text-xs font-bold text-forest mb-1">Wilayah / Nama Jalan</label>
                <input type="text" id="laporLokasi" placeholder="Misal: Sanur, Denpasar Selatan" class="w-full text-xs sm:text-sm p-3 rounded-xl border border-line bg-white focus:outline-none focus:border-primary" required>
              </div>
            </div>

            <div>
              <label for="laporDeskripsi" class="block text-xs font-bold text-forest mb-1">Keterangan Tambahan</label>
              <textarea id="laporDeskripsi" rows="3" placeholder="Jelaskan kondisi tumpukan sampah secara ringkas..." class="w-full text-xs sm:text-sm p-3 rounded-xl border border-line bg-white focus:outline-none focus:border-primary" required></textarea>
            </div>

            <button type="submit" id="btnSubmitLapor" class="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-danger text-white hover:bg-red-700 transition shadow-md shadow-danger/20 flex items-center justify-center gap-2">
              <span> Kirim Laporan Publik (+50 XP)</span>
            </button>
          </form>
        </div>

        <!-- Feed Laporan Komunitas Terkini -->
        <div class="pt-6 border-t border-line space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-extrabold text-forest">Feed Laporan Warga Terkini</h4>
            <span class="text-xs text-muted">${state.reports.length} Laporan Tercatat</span>
          </div>

          <div id="listLaporanWarga" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${state.reports.map(r => `
              <div class="p-4 rounded-2xl border border-line bg-white space-y-2 shadow-xs text-left">
                <div class="flex items-center justify-between gap-2">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${r.statusClass}">
                    ${r.status}
                  </span>
                  <span class="text-[10px] text-muted">${r.tanggal}</span>
                </div>
                <h5 class="text-xs font-bold text-forest leading-snug">${esc(r.judul)}</h5>
                <p class="text-[11px] text-muted leading-relaxed">${esc(r.deskripsi)}</p>
                <div class="pt-2 border-t border-line/60 flex items-center justify-between text-[11px] text-muted font-medium">
                  <span> ${esc(r.lokasi)}</span>
                  <span class="text-forest font-bold">Oleh ${esc(r.pelapor)}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    `;

    // Event kirim laporan
    const form = document.getElementById("formLaporLuu");
    if (form) {
      form.addEventListener("submit", () => {
        const judul = document.getElementById("laporJudul").value;
        const kat = document.getElementById("laporKategori").value;
        const lokasi = document.getElementById("laporLokasi").value;
        const deskripsi = document.getElementById("laporDeskripsi").value;

        const newRep = {
          id: "rep-" + Date.now(),
          judul: judul,
          lokasi: lokasi,
          kategori: kat,
          tanggal: "Baru saja",
          status: "Diterima (Proses Verifikasi)",
          statusClass: "bg-amber-100 text-amber-800",
          pelapor: "Anda (Warga)",
          deskripsi: deskripsi
        };

        state.reports.unshift(newRep);
        state.xp += 50;
        localStorage.setItem("eling_community_reports", JSON.stringify(state.reports.slice(0, 15)));
        localStorage.setItem("eling_total_xp", state.xp.toString());

        alert("Sukses! Laporanmu telah dipublikasikan di feed Bali Smart Society dan kamu mendapatkan +50 XP!");
        renderLaporLuuSection();
        renderGamifikasiDashboard();
      });
    }
  }

  // Init
  window.initEcoAction = function() {
    renderGamifikasiDashboard();
    renderLaporLuuSection();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.initEcoAction);
  } else {
    window.initEcoAction();
  }

})();
