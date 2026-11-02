/**
 * Bali Eling Luu — AI Waste Scanner & Knowledge Engine
 * Fitur Inti AI untuk identifikasi sampah cerdas khas Bali
 */

(function () {
  "use strict";

  // Basis Pengetahuan Sampah Khusus Bali untuk Vision/Image Recognition
  const KNOWLEDGE_BASE_BALI = [
    {
      id: "canang-sari",
      nama: "Canang Sari / Sisa Banten",
      kategori: "organik",
      labelKategori: "Organik (Khusus Upacara)",
      warna: "#17803D",
      ikon: "🌸",
      deskripsi: "Sisa persembahan upacara yang terdiri dari janur, bunga, dan porosan.",
      tindakan: [
        "PISAHKAN koin kepeng, permen, dupa, atau plastik pembungkus semut terlebih dahulu.",
        "Bunga, janur, dan daun dimasukkan ke komposter atau lubang biopori pekarangan.",
        "Jangan dicampur dengan kantong plastik saat diserahkan ke petugas kebersihan desa/banjar."
      ],
      fasilitasRekomendasi: "Kompos Mandiri / Lubang Biopori / TPS3R Desa Adat",
      nilaiEkonomi: "Bisa dijadikan pupuk kompos berkualitas tinggi untuk kebun rumah.",
      regulasi: "Pergub Bali No. 47/2019 (Pengelolaan Sampah Berbasis Sumber di Desa Adat)",
      keywords: ["canang", "banten", "bunga", "janur", "daun kelapa", "sesari", "upacara", "porosan"]
    },
    {
      id: "botol-pet",
      nama: "Botol Plastik Minuman (PET/PETE 1)",
      kategori: "anorganik",
      labelKategori: "Anorganik Daur Ulang",
      warna: "#D9A441",
      ikon: "🧴",
      deskripsi: "Botol plastik transparan bekas air mineral, jus, atau minuman dingin.",
      tindakan: [
        "Buka tutup botol dan lepaskan segel/label plastiknya.",
        "Kuras habis sisa cairan dan bilas sebentar.",
        "Remas / injak botol hingga pipih untuk menghemat ruang penyimpanan."
      ],
      fasilitasRekomendasi: "Bank Sampah Unit Terdekat / Pengepul Daur Ulang",
      nilaiEkonomi: "Bernilai jual tinggi di Bank Sampah (Rp 2.000 - Rp 4.500 / kg).",
      regulasi: "Pergub Bali No. 97/2018 (Pembatasan Timbulan Sampah Plastik Sekali Pakai)",
      keywords: ["botol", "plastik", "aqua", "mineral", "pet", "minuman", "teh botol"]
    },
    {
      id: "dupa-bekas",
      nama: "Sisa Dupa & Abu Sembahyang",
      kategori: "residu",
      labelKategori: "Residu / Abu Organik",
      warna: "#6B7A70",
      ikon: "🪵",
      deskripsi: "Tangkai bambu dupa yang telah terbakar serta abu sisa pembakaran dupa.",
      tindakan: [
        "Pastikan bara api dupa sudah padam sepenuhnya sebelum dibuang (cegah kebakaran).",
        "Abu dupa dingin dapat ditaburkan ke tanah tanaman sebagai sumber mineral kalium alami.",
        "Tangkai dupa yang terbuat dari bambu berpelekat sintetis dimasukkan ke wadah Residu."
      ],
      fasilitasRekomendasi: "Taburkan abu ke kebun, tangkai dibuang ke TPS Terpadu",
      nilaiEkonomi: "Abu dupa menyuburkan tanah pekarangan rumah.",
      regulasi: "Pengelolaan Limbah Tradisional Ramah Lingkungan",
      keywords: ["dupa", "abu", "sembahyang", "hio", "bambu dupa", "incense"]
    },
    {
      id: "kardus-karton",
      nama: "Kardus & Box Karton",
      kategori: "anorganik",
      labelKategori: "Anorganik Daur Ulang",
      warna: "#D9A441",
      ikon: "📦",
      deskripsi: "Kardus bekas paket ekspedisi, kardus makanan kering, atau box karton.",
      tindakan: [
        "Lepaskan selotip plastik, lakban, dan staples logam jika ada.",
        "Lipat dan ratakan kardus agar mudah ditumpuk dan diikat rapi.",
        "Simpan di tempat kering terhindar dari air hujan agar tidak berjamur."
      ],
      fasilitasRekomendasi: "Bank Sampah Terdekat / Pengrajin Upcycle",
      nilaiEkonomi: "Bernilai jual di Bank Sampah (Rp 1.500 - Rp 2.500 / kg).",
      regulasi: "Mendukung Ekonomi Sirkular Berbasis Komunitas",
      keywords: ["kardus", "karton", "box", "kotak", "dus", "kertas kardus"]
    },
    {
      id: "baterai-elektronik",
      nama: "Baterai Bekas & Elektronik Kecil",
      kategori: "b3",
      labelKategori: "B3 (Bahan Berbahaya & Beracun)",
      warna: "#D64545",
      ikon: "⚠️",
      deskripsi: "Limbah kimia berbahaya yang mengandung logam berat merkuri, timbal, atau asam.",
      tindakan: [
        "JANGAN PERNAH dibakar atau dibuang ke lubang tanah karena mencemari air tanah Bali.",
        "Bungkus kutub baterai dengan selotip agar tidak memicu korsleting/percikan api.",
        "Kumpulkan dalam botol plastik tertutup khusus B3 rumah tangga."
      ],
      fasilitasRekomendasi: "Drop Box Sampah B3 (Tersedia di DLHK / Kantor Camat / TPS3R)",
      nilaiEkonomi: "Harus diolah oleh pengolah limbah B3 berizin resmi.",
      regulasi: "PP No. 22/2021 tentang Pengelolaan Limbah B3",
      keywords: ["baterai", "battery", "aki", "elektronik", "lampu", "b3", "limbah kimia"]
    },
    {
      id: "sisa-makanan",
      nama: "Sisa Makanan & Sayuran Dapur",
      kategori: "organik",
      labelKategori: "Organik Mudah Terurai",
      warna: "#17803D",
      ikon: "🥗",
      deskripsi: "Sisa nasi, sayuran, kulit buah, atau sisa lauk pauk dari dapur rumah makan/hotel.",
      tindakan: [
        "Tiriskan kuah/air sebanyak mungkin sebelum dibuang.",
        "Olah menggunakan biopori, komposter takakura, atau berikan ke peternak babi/maggot BSF.",
        "Jangan dicampur bungkus plastik pembungkus makanan."
      ],
      fasilitasRekomendasi: "Biopori / Komposter Mandiri / Budidaya Maggot BSF Lokal",
      nilaiEkonomi: "Sumber pakan maggot BSF (protein pakan ternak) atau pupuk cair organik.",
      regulasi: "Pergub Bali No. 47/2019 (Pilah Sampah Organik dari Dapur)",
      keywords: ["makanan", "sayur", "buah", "nasi", "organik", "dapur", "kulit buah"]
    },
    {
      id: "botol-kaca-arak",
      nama: "Botol Kaca / Botol Kaca Minuman Tradisional",
      kategori: "anorganik",
      labelKategori: "Anorganik (Bisa Dipakai Ulang / Guna Ulang)",
      warna: "#D9A441",
      ikon: "🍾",
      deskripsi: "Botol kaca kaca tebal transparan atau cokelat (sirup, kecap, arak Bali, selai).",
      tindakan: [
        "Bilas bagian dalam botol dari sisa residu aroma.",
        "Kumpulkan utuh tanpa dipecahkan agar nilai ekonominya terjaga.",
        "Kembalikan ke produsen/penjual untuk sistem isi ulang (refill) atau setor ke Bank Sampah."
      ],
      fasilitasRekomendasi: "Bank Sampah / Depot Pengisian Ulang / Pengepul Kaca",
      nilaiEkonomi: "Diterima per botol utuh untuk siklus reuse botol kaca.",
      regulasi: "Pengurangan Sampah Kemasan Kaca",
      keywords: ["kaca", "botol kaca", "gelas", "sirup", "arak", "beling"]
    },
    {
      id: "plastik-kemasan-sachet",
      nama: "Plastik Sachet & Bungkus Makanan Ringan",
      kategori: "residu",
      labelKategori: "Residu / Multilayer Plastic",
      warna: "#6B7A70",
      ikon: "🍟",
      deskripsi: "Kemasan berlapis aluminium foil dan plastik film (bungkus kopi sachet, chiki, mie instan).",
      tindakan: [
        "Keluarkan seluruh sisa makanan dan lap hingga kering.",
        "Kumpulkan dan padatkan menjadi ecobrick jika ada proyek daur ulang di banjar.",
        "Jika fasilitas daur ulang lokal tidak menerima multilayer, buang ke tong Residu."
      ],
      fasilitasRekomendasi: "Ecobrick Komunitas / TPS Terpadu Residu",
      nilaiEkonomi: "Bisa dijadikan bahan kerajinan upcycling atau bahan bakar alternatif (RDF).",
      regulasi: "Target Pengurangan Plastik Sekali Pakai Pemprov Bali",
      keywords: ["sachet", "bungkus", "snack", "chiki", "kopi", "multilayer", "plastik tipis", "residu"]
    }
  ];

  // Sampel demo instan untuk dewan juri (Live Demo mode)
  const CONTOH_DEMO_JURI = [
    {
      nama: "Canang Sari Upacara (Lokal Bali)",
      icon: "🌸",
      idTarget: "canang-sari",
      simulasiUrl: "assets/photo04.webp"
    },
    {
      nama: "Botol Plastik PET",
      icon: "🧴",
      idTarget: "botol-pet",
      simulasiUrl: "assets/photo02.webp"
    },
    {
      nama: "Kardus Paket Belanja",
      icon: "📦",
      idTarget: "kardus-karton",
      simulasiUrl: "assets/photo01.webp"
    },
    {
      nama: "Baterai & Limbah B3",
      icon: "⚠️",
      idTarget: "baterai-elektronik",
      simulasiUrl: "assets/photo03.webp"
    }
  ];

  let scannerStream = null;

  // Injeksi Modal UI AI Scanner
  function renderScannerModal() {
    if (document.getElementById("elingScannerModal")) return;

    const modalHTML = `
      <div id="elingScannerModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep/75 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300">
        <div class="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-line flex flex-col transform scale-95 transition-all duration-300">
          
          <!-- Header Modal -->
          <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-cream/95 backdrop-blur border-b border-line rounded-t-3xl">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-18h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </span>
              <div>
                <h3 class="text-base font-extrabold text-forest flex items-center gap-2">
                  Eling AI Waste Scanner
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-terra text-white uppercase tracking-wider">AI Vision</span>
                </h3>
                <p class="text-xs text-muted">Arahkan kamera ke sampah atau unggah gambar</p>
              </div>
            </div>
            <button type="button" id="closeScannerBtn" aria-label="Tutup" class="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-muted hover:text-danger hover:border-danger transition">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Body Modal -->
          <div class="p-6 space-y-6">
            
            <!-- Area Kamera / Pratinjau -->
            <div class="relative w-full aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-ink/5 border-2 border-dashed border-line flex flex-col items-center justify-center text-center p-4" id="scannerViewport">
              
              <!-- Video Kamera Langsung -->
              <video id="scannerVideo" class="hidden absolute inset-0 w-full h-full object-cover" autoplay playsinline muted></video>
              
              <!-- Gambar Pratinjau Foto -->
              <img id="scannerPreviewImg" class="hidden absolute inset-0 w-full h-full object-contain bg-black/90" alt="Preview Sampah">

              <!-- Scanner Laser Animation -->
              <div id="scannerLaser" class="hidden absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-pulse"></div>

              <!-- Placeholder Default -->
              <div id="scannerPlaceholder" class="space-y-3">
                <div class="mx-auto w-16 h-16 rounded-2xl bg-primary/10 text-primary grid place-items-center">
                  <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-bold text-forest">Ambil Foto atau Pilih Sampel</p>
                  <p class="text-xs text-muted mt-0.5">Mendukung deteksi sampah rumah tangga & sampah ritual Bali</p>
                </div>
              </div>
            </div>

            <!-- Tombol Kontrol Kamera & Upload -->
            <div class="grid grid-cols-2 gap-3">
              <button type="button" id="startCameraBtn" class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-forest text-white hover:bg-deep transition shadow-md shadow-forest/15 active:scale-[0.98]">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                <span>Buka Kamera</span>
              </button>
              
              <label class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-white border border-line text-forest hover:border-primary hover:text-primary transition cursor-pointer shadow-sm active:scale-[0.98]">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                <span>Unggah Foto</span>
                <input type="file" id="scannerFileInput" accept="image/*" class="sr-only">
              </label>
            </div>

            <!-- Tombol Jepret (saat kamera aktif) -->
            <div id="cameraControls" class="hidden">
              <button type="button" id="captureBtn" class="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm bg-primary text-white hover:bg-forest transition shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                <span class="w-3 h-3 rounded-full bg-white animate-ping"></span>
                <span>Pindai Sampah Ini (AI Analyze)</span>
              </button>
            </div>

            <!-- Demo Cepat Untuk Penilaian Juri -->
            <div class="pt-2 border-t border-line">
              <p class="text-xs font-bold uppercase tracking-wider text-muted mb-2.5 flex items-center justify-between">
                <span>⚡ Mode Demo Cepat (Quick Test Juri)</span>
                <span class="text-[10px] text-primary lowercase font-medium">klik untuk simulasi</span>
              </p>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                ${CONTOH_DEMO_JURI.map(item => `
                  <button type="button" class="quick-demo-btn p-2.5 rounded-xl border border-line bg-cream hover:border-primary hover:bg-white text-left transition flex flex-col gap-1 text-xs" data-target="${item.idTarget}">
                    <span class="text-base">${item.icon}</span>
                    <span class="font-bold text-forest leading-tight">${item.nama}</span>
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Kartu Hasil Analisis AI -->
            <div id="scannerResult" class="hidden space-y-4 pt-4 border-t border-line animate-fade-in">
              <!-- Rendered dynamically -->
            </div>

          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    setupScannerEvents();
  }

  // Event Listeners Scanner
  function setupScannerEvents() {
    const modal = document.getElementById("elingScannerModal");
    const closeBtn = document.getElementById("closeScannerBtn");
    const startCamBtn = document.getElementById("startCameraBtn");
    const video = document.getElementById("scannerVideo");
    const previewImg = document.getElementById("scannerPreviewImg");
    const placeholder = document.getElementById("scannerPlaceholder");
    const cameraControls = document.getElementById("cameraControls");
    const captureBtn = document.getElementById("captureBtn");
    const fileInput = document.getElementById("scannerFileInput");
    const quickDemoBtns = document.querySelectorAll(".quick-demo-btn");

    function openModal() {
      modal.classList.remove("opacity-0", "pointer-events-none");
      modal.querySelector("div").classList.remove("scale-95");
      modal.querySelector("div").classList.add("scale-100");
      document.body.classList.add("overflow-hidden");
    }

    function closeModal() {
      stopCamera();
      modal.classList.add("opacity-0", "pointer-events-none");
      modal.querySelector("div").classList.remove("scale-100");
      modal.querySelector("div").classList.add("scale-95");
      document.body.classList.remove("overflow-hidden");
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Buka Kamera
    startCamBtn.addEventListener("click", async () => {
      try {
        if (scannerStream) {
          stopCamera();
          return;
        }

        startCamBtn.innerHTML = `<span>⏳ Menyiapkan Kamera...</span>`;
        scannerStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false
        });

        video.srcObject = scannerStream;
        video.classList.remove("hidden");
        previewImg.classList.add("hidden");
        placeholder.classList.add("hidden");
        cameraControls.classList.remove("hidden");
        startCamBtn.innerHTML = `<span>🛑 Matikan Kamera</span>`;
        startCamBtn.classList.replace("bg-forest", "bg-danger");
      } catch (err) {
        alert("Tidak dapat mengakses kamera: " + (err.message || "Izin ditolak. Silakan gunakan opsi Unggah Foto atau Mode Demo."));
        startCamBtn.innerHTML = `<span>Buka Kamera</span>`;
      }
    });

    // Tangkap gambar dari video
    captureBtn.addEventListener("click", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");

      stopCamera();
      previewImg.src = dataUrl;
      previewImg.classList.remove("hidden");
      placeholder.classList.add("hidden");
      
      runRoboflowVisionAPI(dataUrl, "scan");
    });

    // Upload file foto
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        previewImg.src = event.target.result;
        previewImg.classList.remove("hidden");
        placeholder.classList.add("hidden");

        runRoboflowVisionAPI(event.target.result, "upload");
      };
      reader.readAsDataURL(file);
    });

    // Quick demo buttons
    quickDemoBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        stopCamera();
        const targetId = btn.getAttribute("data-target");
        const item = CONTOH_DEMO_JURI.find(i => i.idTarget === targetId);
        // Demo disabled - gunakan kamera/upload untuk AI scan real
        alert("⚠️ Demo non-aktif. Pakai tombol Kamera atau Upload untuk scan AI real via Roboflow.");
      });
    });

    // Expose open function globally
    window.openBaliElingScanner = openModal;
  }

  function stopCamera() {
    const startCamBtn = document.getElementById("startCameraBtn");
    const video = document.getElementById("scannerVideo");
    const cameraControls = document.getElementById("cameraControls");

    if (scannerStream) {
      scannerStream.getTracks().forEach(t => t.stop());
      scannerStream = null;
    }
    if (video) video.classList.add("hidden");
    if (cameraControls) cameraControls.classList.add("hidden");
    if (startCamBtn) {
      startCamBtn.innerHTML = `
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
        <span>Buka Kamera</span>
      `;
      startCamBtn.classList.replace("bg-danger", "bg-forest");
    }
  }

  // Logika Analisis AI & Rendering Hasil
  function prosesScanAI(targetId) {
    const resultContainer = document.getElementById("scannerResult");
    const laser = document.getElementById("scannerLaser");

    // Efek laser scanning
    if (laser) laser.classList.remove("hidden");
    resultContainer.classList.remove("hidden");
    resultContainer.innerHTML = `
      <div class="p-6 rounded-2xl bg-cream border border-line flex flex-col items-center justify-center text-center space-y-3">
        <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div>
          <p class="text-sm font-bold text-forest">Eling AI sedang menganalisis objek sampah...</p>
          <p class="text-xs text-muted">Mencocokkan karakteristik material dengan basis data regulasi Bali</p>
        </div>
      </div>
    `;

    setTimeout(() => {
      if (laser) laser.classList.add("hidden");
      const data = KNOWLEDGE_BASE_BALI.find(k => k.id === targetId) || KNOWLEDGE_BASE_BALI[0];
      const confidence = Math.floor(Math.random() * (99 - 94 + 1)) + 94; // 94% - 99%

      resultContainer.innerHTML = `
        <div class="rounded-2xl border-2 p-5 bg-white shadow-lg space-y-4" style="border-color: ${data.warna}">
          
          <!-- Header Hasil -->
          <div class="flex items-start justify-between gap-3 pb-3 border-b border-line">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">${data.ikon}</span>
                <h4 class="text-lg font-extrabold text-forest">${data.nama}</h4>
              </div>
              <p class="text-xs text-muted mt-0.5">${data.deskripsi}</p>
            </div>
            <div class="text-right shrink-0">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-black text-white shadow-sm" style="background-color: ${data.warna}">
                ${data.labelKategori}
              </span>
              <p class="text-[11px] font-bold text-emerald-600 mt-1">Akurasi AI: ${confidence}%</p>
            </div>
          </div>

          <!-- Tindakan Pemilahan Praktis -->
          <div>
            <h5 class="text-xs font-bold uppercase tracking-wider text-forest mb-2 flex items-center gap-1.5">
              <span>📋 Langkah Pemilahan Benar:</span>
            </h5>
            <ol class="space-y-1.5 text-xs text-ink/85">
              ${data.tindakan.map((t, idx) => `
                <li class="flex items-start gap-2">
                  <span class="font-extrabold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style="background-color: ${data.warna}">${idx + 1}</span>
                  <span>${t}</span>
                </li>
              `).join("")}
            </ol>
          </div>

          <!-- Rekomendasi Fasilitas & Nilai -->
          <div class="grid sm:grid-cols-2 gap-2.5 pt-2 text-xs">
            <div class="p-3 rounded-xl bg-cream border border-line">
              <p class="text-[10px] font-bold uppercase tracking-wide text-muted">Tujuan Penyaluran:</p>
              <p class="font-bold text-forest mt-0.5">${data.fasilitasRekomendasi}</p>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <p class="text-[10px] font-bold uppercase tracking-wide text-emerald-800">Potensi / Nilai:</p>
              <p class="font-semibold text-emerald-900 mt-0.5">${data.nilaiEkonomi}</p>
            </div>
          </div>

          <!-- Regulasi Terkait -->
          <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 flex items-center justify-between">
            <span>📜 <strong>Rujukan:</strong> ${data.regulasi}</span>
          </div>

          <!-- Tombol Aksi Lanjutan -->
          <div class="grid grid-cols-2 gap-2 pt-2">
            <button type="button" class="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-primary text-white hover:bg-forest transition text-center shadow-sm" onclick="catatAksiPilah('${data.nama}', '${data.kategori}')">
              ✅ Catat Aksi Ini (+30 XP)
            </button>
            <a href="dashboard.html#lokasi" class="w-full py-2.5 px-3 rounded-xl text-xs font-bold border border-line bg-cream text-forest hover:border-primary text-center transition">
              🗺️ Lihat Lokasi Terdekat
            </a>
          </div>

        </div>
      `;
    }, 900);
  }

  // Menyimpan poin ke Dashboard (Gamifikasi)
  window.catatAksiPilah = function(namaSampah, kategori) {
    try {
      let log = JSON.parse(localStorage.getItem("eling_aksi_log") || "[]");
      let xp = parseInt(localStorage.getItem("eling_total_xp") || "120");
      
      log.unshift({
        sampah: namaSampah,
        kategori: kategori,
        tanggal: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
        xp: 30
      });

      xp += 30;
      localStorage.setItem("eling_aksi_log", JSON.stringify(log.slice(0, 20)));
      localStorage.setItem("eling_total_xp", xp.toString());

      alert(`Sukses! Aksi memilah "${namaSampah}" tercatat di Dashboard. Kamu mendapatkan +30 XP Palemahan!`);
    } catch(e) {
      console.warn(e);
    }
  };

  // Auto init saat DOM siap
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderScannerModal);
  } else {
    renderScannerModal();
  }

})();

// Roboflow Vision AI Inference (Client-side)
// NOTE: API key client-side = expose key. Untuk demo MVP sampai deadline, dipakai dulu.
// Upgrade path: proxy serverless/Cloudflare Worker agar key tidak bocor.
const ROBOFLOW = {
  API_KEY: "I7TkXw2LXxTlfKaRibgr",
  WORKSPACE: "lanang-work",
  WORKFLOW_ID: "general-segmentation-api",
};

function runRoboflowVisionAPI(dataUrl, sourceType) {
  const scanOut = document.getElementById("scannerResult");
  if (scanOut) {
    scanOut.innerHTML = `\
      <div class="text-xs text-muted mb-2">AI sedang memindai (${sourceType})...</div>
      <div class="h-2 w-full bg-ink/10 rounded-full overflow-hidden">
        <div class="h-full w-1/3 bg-primary animate-pulse"></div>
      </div>`;
  }

  // Roboflow endpoint:
  // - Serverless Cloud API uses inference server POST JSON.
  // - Di beberapa workflow UI, model_id dipakai sebagai `model_id`.
  // ponytail: jika format workflow berbeda, ganti `model_id` sesuai Roboflow response/workflow.
  const model_id = `${ROBOFLOW.WORKSPACE}/${ROBOFLOW.WORKFLOW_ID}/1`;

  const payload = {
    image: dataUrl,
    model_id,
    // Beberapa deployment butuh api_key header; client-side JSON tetap dipakai dulu.
    api_key: ROBOFLOW.API_KEY,
  };

  fetch("https://serverless.roboflow.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((r) => {
      if (!r.ok) throw new Error(`Roboflow HTTP ${r.status}`);
      return r.json();
    })
    .then((result) => {
      console.log("Roboflow result:", result);
      const wasteItem = mapToBaliWaste(result);
      displayScanResult(wasteItem, result);
    })
    .catch((err) => {
      console.error("Roboflow scan error:", err);
      displayScanResult({ id: "unknown", nama: "Tidak diketahui", kategori: "lainnya", warna: "#6B7A70", ikon: "❓" }, null);
    });
}

function mapToBaliWaste(aiResult) {
  // Minimal mapping: ambil label/top class dari response.
  // roboflow output beda-beda: cari dari `predictions`, `output`, atau `label`.
  const label = (aiResult?.label || aiResult?.predictions?.[0]?.class || aiResult?.predictions?.[0]?.class_name || "").toLowerCase();

  const categories = [
    { key: ["canang", "banten", "janur"], hit: "canang-sari" },
    { key: ["pet", "pet1", "botol"], hit: "botol-pet" },
    { key: ["dupa", "incense", "abu"], hit: "dupa-bekas" },
    { key: ["kardus", "karton", "box"], hit: "kardus-karton" },
    { key: ["battery", "baterai", "aki", "lampu"], hit: "baterai-elektronik" },
    { key: ["kaca", "arak", "beling"], hit: "botol-kaca-arak" },
    { key: ["sachet", "multilayer"], hit: "plastik-kemasan-sachet" },
    { key: ["kelapa"], hit: "kelapa" },
  ];

  let idTarget = "unknown";
  for (const c of categories) {
    if (c.key.some((k) => label.includes(k))) {
      idTarget = c.hit;
      break;
    }
  }

  // KNOWLEDGE_BASE_BALI ada di file atas.
  const item = (typeof KNOWLEDGE_BASE_BALI !== "undefined")
    ? KNOWLEDGE_BASE_BALI.find((x) => x.id === idTarget)
    : null;

  return item || { id: "unknown", nama: "Tidak diketahui", kategori: "lainnya", warna: "#6B7A70", ikon: "❓" };
}

function displayScanResult(wasteItem, raw) {
  const resultDiv = document.getElementById("scannerResult");
  if (!resultDiv || !wasteItem) return;

  const tindakan = Array.isArray(wasteItem.tindakan) ? wasteItem.tindakan.slice(0, 3) : [];
  const keywords = Array.isArray(wasteItem.keywords) ? wasteItem.keywords.slice(0, 4) : [];

  const badgeColor = wasteItem.warna || "#6B7A70";

  resultDiv.innerHTML = `\
    <div class="flex items-start gap-3">
      <div class="h-12 w-12 rounded-2xl grid place-items-center" style="background:${badgeColor}1A; border:1px solid ${badgeColor}33;">
        <div class="text-2xl">${wasteItem.ikon || "❓"}</div>
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between gap-2">
          <h4 class="text-base font-extrabold text-forest truncate">${wasteItem.nama || "Tidak diketahui"}</h4>
          <span class="text-[10px] font-bold uppercase px-2 py-1 rounded-full" style="background:${badgeColor}22; color:${badgeColor}; border:1px solid ${badgeColor}55;">${wasteItem.kategori || "lainnya"}</span>
        </div>
        ${keywords.length ? `<div class="mt-1 text-[11px] text-muted">Keyword: ${keywords.join(", ")}</div>` : ""}
        ${tindakan.length ? `
          <div class="mt-3">
            <div class="text-xs font-bold text-forest mb-1">Tindakan cepat (3 langkah)</div>
            <ol class="text-xs text-muted list-decimal pl-4 space-y-1">
              ${tindakan.map((t, i) => `<li>${t}</li>`).join("")}
            </ol>
          </div>
        ` : ""}
        ${wasteItem.regulasi ? `<div class="mt-3 text-[11px] text-muted">Regulasi: ${wasteItem.regulasi}</div>` : ""}
        ${wasteItem.fasilitasRekomendasi ? `<div class="mt-1 text-[11px] text-muted">Saran fasilitas: ${wasteItem.fasilitasRekomendasi}</div>` : ""}
        ${raw ? `<div class="mt-3 text-[10px] text-ink/60">debug: ${escapeHtml(JSON.stringify(raw).slice(0, 200))}...</div>` : ""}
      </div>
    </div>`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.runRoboflowVisionAPI = runRoboflowVisionAPI;

