/**
 * Bali Eling Luu — AI Waste Scanner & Knowledge Engine (FINAL)
 * Solusi AI Cerdas untuk Identifikasi Sampah Rumah Tangga & Tradisi Bali.
 * Didukung TensorFlow.js MobileNet (On-Device Neural Network) + Visual Heuristik lokal.
 * Fitur final:
 *  - Verifikasi sampah vs bukan sampah
 *  - Skor multi-sinyal: MobileNet + warna + nama file + kualitas foto
 *  - Katalog 24 jenis sampah Bali & rumah tangga dengan spesifikasi
 *    (material, lama terurai, bahaya, wadah, nilai ekonomi, penyaluran)
 *  - Kandidat alternatif transparan + riwayat pindai tersimpan
 *  - Mode telusuri katalog manual saat AI belum yakin
 * Gratis, tanpa API key, berjalan 100% di perangkat pengguna.
 */
(function () {
  "use strict";

  /* ============================================================
   * 1. BASIS PENGETAHUAN — 24 JENIS SAMPAH BALI & RUMAH TANGGA
   * ============================================================ */
  const KNOWLEDGE_BASE_BALI = [
    {
      id: "canang-sari",
      nama: "Canang Sari & Sisa Banten",
      kategori: "organik",
      labelKategori: "Organik (Tradisi Upacara Bali)",
      warna: "#17803D",
      ikon: "🌸",
      deskripsi: "Sisa sarana persembahan upacara: janur, bunga, porosan, dan canang.",
      material: "Janur, bunga gumitir, daun, bambu, porosan",
      waktuUrai: "2–6 minggu",
      bahaya: "Rendah (pisahkan non-organiknya)",
      wadah: "Hijau — Organik",
      tindakan: [
        "PISAHKAN koin kepeng, permen, dupa, atau plastik pembungkus dari rangkaian banten.",
        "Masukkan bunga & janur ke kompos mandiri atau lubang biopori pekarangan.",
        "Jangan dibungkus kresek — serahkan langsung ke petugas kebersihan desa/banjar."
      ],
      fasilitasRekomendasi: "Kompos Mandiri / Biopori / TPS3R Desa Adat",
      nilaiEkonomi: "Jadi pupuk kompos kasgot bernilai tinggi.",
      regulasi: "Pergub Bali No. 47/2019 (Pengelolaan Sampah Berbasis Sumber di Desa Adat)",
      keywords: ["canang", "banten", "bunga", "janur", "daun kelapa", "sesari", "upacara", "porosan", "flower", "bouquet", "daisy", "wreath", "floral"]
    },
    {
      id: "botol-pet",
      nama: "Botol Plastik Minuman (PET / PETE 1)",
      kategori: "anorganik",
      labelKategori: "Anorganik Daur Ulang",
      warna: "#D9A441",
      ikon: "🧴",
      deskripsi: "Botol plastik transparan bekas air mineral, soda, jus, atau teh kemasan.",
      material: "Plastik PET transparan (kode 1)",
      waktuUrai: "450 tahun",
      bahaya: "Rendah",
      wadah: "Kuning — Anorganik",
      tindakan: [
        "Buka tutup, lepaskan segel/labelnya.",
        "Kuras & bilas sisa cairan agar tidak berbau.",
        "Remas hingga pipih untuk hemat ruang."
      ],
      fasilitasRekomendasi: "Bank Sampah Unit / Pengepul Daur Ulang",
      nilaiEkonomi: "Rp 2.500 – Rp 4.500 / kg di Bank Sampah Bali.",
      regulasi: "Pergub Bali No. 97/2018 (Pembatasan Plastik Sekali Pakai)",
      keywords: ["botol", "plastik", "mineral", "aqua", "pet", "bottle", "water bottle", "pop bottle", "plastic bottle"]
    },
    {
      id: "botol-kaca-arak",
      nama: "Botol Kaca & Beling",
      kategori: "anorganik",
      labelKategori: "Anorganik (Guna Ulang / Daur Ulang)",
      warna: "#D9A441",
      ikon: "🍾",
      deskripsi: "Botol kaca sirup, kecap, arak Bali tradisional, atau toples selai.",
      material: "Kaca sodalime (botol guna ulang)",
      waktuUrai: "1.000.000 tahun",
      bahaya: "Sedang — pecahan tajam",
      wadah: "Kuning — Anorganik (pisah dari kaca pecah)",
      tindakan: [
        "Bilas bagian dalam dari sisa minuman.",
        "Kumpulkan dalam kondisi utuh — jangan dipecahkan.",
        "Setorkan ke Bank Sampah / depot pengisian ulang (reuse)."
      ],
      fasilitasRekomendasi: "Bank Sampah Unit / Depot Isi Ulang / Pengepul Kaca",
      nilaiEkonomi: "Bernilai per botol utuh untuk siklus guna ulang.",
      regulasi: "Mendukung Budaya Guna Ulang Ramah Lingkungan",
      keywords: ["kaca", "botol kaca", "arak", "beling", "gelas", "wine bottle", "beer bottle", "flask", "whiskey", "goblet"]
    },
    {
      id: "kaleng-minuman",
      nama: "Kaleng Minuman Aluminium",
      kategori: "anorganik",
      labelKategori: "Anorganik Daur Ulang Logam",
      warna: "#D9A441",
      ikon: "🥫",
      deskripsi: "Kaleng bekas minuman soda, kopi, susu, atau makanan olahan.",
      material: "Aluminium / baja ringan",
      waktuUrai: "80–200 tahun",
      bahaya: "Rendah",
      wadah: "Kuning — Anorganik",
      tindakan: [
        "Kosongkan dan bilas bersih.",
        "Keringkan sebelum disimpan.",
        "Setorkan ke Bank Sampah untuk didaur ulang jadi aluminium baru."
      ],
      fasilitasRekomendasi: "Bank Sampah Unit / Pengepul Logam",
      nilaiEkonomi: "Komoditas daur ulang paling bernilai di Bank Sampah Bali.",
      regulasi: "Ekonomi Sirkular Daur Ulang Logam",
      keywords: ["kaleng", "aluminium", "can", "tin", "soda can", "beer can", "aluminum"]
    },
    {
      id: "kardus-karton",
      nama: "Kardus & Kotak Karton",
      kategori: "anorganik",
      labelKategori: "Anorganik Daur Ulang",
      warna: "#D9A441",
      ikon: "📦",
      deskripsi: "Kardus bekas belanja online, karton makanan kering, atau box paket.",
      material: "Serat kertas karton (corrugated)",
      waktuUrai: "2–6 bulan",
      bahaya: "Rendah (rendah jika kering)",
      wadah: "Kuning — Anorganik",
      tindakan: [
        "Lepaskan selotip, lakban, dan staples.",
        "Lipat & ratakan agar hemat tempat.",
        "Simpan kering — kardus basah jauh lebih sulit didaur ulang."
      ],
      fasilitasRekomendasi: "Bank Sampah Unit / Pengepul Kertas & Karton",
      nilaiEkonomi: "Rp 1.500 – Rp 2.500 / kg.",
      regulasi: "Mendukung Ekonomi Sirkular & Pengurangan Beban TPA Suwung",
      keywords: ["kardus", "karton", "box", "kotak", "dus", "carton", "cardboard", "shipping box"]
    },
    {
      id: "sisa-makanan",
      nama: "Sisa Makanan & Buah",
      kategori: "organik",
      labelKategori: "Organik Mudah Terurai",
      warna: "#17803D",
      ikon: "🥗",
      deskripsi: "Sisa sayuran, nasi, kulit buah, atau ampas makanan rumah tangga & resto.",
      material: "Bahan organik basah",
      waktuUrai: "3 hari – 2 minggu",
      bahaya: "Rendah (bau & hama bila dibiarkan)",
      wadah: "Hijau — Organik",
      tindakan: [
        "Tiriskan kuah/minyak sebelum diproses.",
        "Masukkan ke biopori, komposter komunal banjar, atau pakan maggot BSF.",
        "Jangan campur dengan plastik pembungkus."
      ],
      fasilitasRekomendasi: "Biopori / Komposter Takakura / Budidaya Maggot BSF",
      nilaiEkonomi: "Menghasilkan pupuk POC & protein pakan maggot.",
      regulasi: "Pergub Bali No. 47/2019 (Pilah Sampah Organik dari Dapur)",
      keywords: ["makanan", "sayur", "buah", "nasi", "organik", "dapur", "food", "banana", "orange", "apple", "fruit", "vegetable", "pizza", "bread", "rice"]
    },
    {
      id: "daun-ranting",
      nama: "Daun Kering & Ranting",
      kategori: "organik",
      labelKategori: "Organik Mudah Terurai",
      warna: "#17803D",
      ikon: "🍂",
      deskripsi: "Daun gugur, ranting, dan sisa tanaman pekarangan / taman.",
      material: "Serat tumbuhan kering",
      waktuUrai: "6–12 bulan",
      bahaya: "Rendah",
      wadah: "Hijau — Organik",
      tindakan: [
        "Kumpulkan langsung setelah menyapu pekarangan.",
        "Jadikan mulsa tanaman atau kompos daun.",
        "Hindari membakar — asapnya membahayakan pernapasan."
      ],
      fasilitasRekomendasi: "Kompos Rumah / Mulsa Pekarangan / TPS3R Organik",
      nilaiEkonomi: "Tanah jadi lebih subur & lembap.",
      regulasi: "Pergub Bali No. 47/2019",
      keywords: ["daun", "ranting", "rumput", "kering", "leaf", "branch", "grass"]
    },
    {
      id: "kelapa-batok",
      nama: "Batok Kelapa & Serabut",
      kategori: "organik",
      labelKategori: "Organik Keras (Bisa Diolah)",
      warna: "#17803D",
      ikon: "🥥",
      deskripsi: "Batok/danyuk, serabut, dan daun sisa masak & banten.",
      material: "Tempurung kelapa & serat sabut",
      waktuUrai: "6–24 bulan",
      bahaya: "Rendah",
      wadah: "Hijau — Organik",
      tindakan: [
        "Keringkan batok di matahari — jangan dibakar sembarangan.",
        "Urai serabut jadi cocopeat untuk media tanam.",
        "Salurkan batok kering ke pengrajin arang briket."
      ],
      fasilitasRekomendasi: "Pengrajin Briket Arang Batok / Kompos Banjar",
      nilaiEkonomi: "Arang briket & cocopeat bernilai jual.",
      regulasi: "Pergub Bali No. 47/2019",
      keywords: ["kelapa", "batok", "serabut", "danyuk", "coconut", "wood", "shell"]
    },
    {
      id: "dupa-bekas",
      nama: "Tangkai Dupa & Abu Sisa Sembahyang",
      kategori: "residu",
      labelKategori: "Residu / Abu Organik",
      warna: "#6B7A70",
      ikon: "🪵",
      deskripsi: "Tangkai bambu dupa terbakar & abu sisa persembahyangan.",
      material: "Bambu, serbuk kayu, perekat",
      waktuUrai: "3–6 bulan",
      bahaya: "Rendah (pastikan padam)",
      wadah: "Abu-abu — Residu",
      tindakan: [
        "Pastikan bara dupa padam total.",
        "Abu dingin bisa ditabur ke tanah tanaman.",
        "Tangkai berperekat sintetis masuk wadah Residu."
      ],
      fasilitasRekomendasi: "Abu ke kebun, tangkai ke TPS Terpadu Residu",
      nilaiEkonomi: "Abu menyumbang mineral kalium bagi tanah.",
      regulasi: "Pengelolaan Limbah Tradisional Ramah Lingkungan",
      keywords: ["dupa", "abu", "sembahyang", "hio", "bambu", "incense", "candle", "match", "lighter"]
    },
    {
      id: "plastik-sachet",
      nama: "Plastik Sachet & Kemasan Multilayer",
      kategori: "residu",
      labelKategori: "Residu / Multilayer Plastic",
      warna: "#6B7A70",
      ikon: "🍟",
      deskripsi: "Bungkus biskuit, sachet kopi, bungkus mie instan berlapis foil.",
      material: "Plastik + foil aluminium (multilayer)",
      waktuUrai: "450 tahun",
      bahaya: "Rendah",
      wadah: "Abu-abu — Residu (atau Ecobrick)",
      tindakan: [
        "Keluarkan sisa serpihan, pastikan bagian dalam kering.",
        "Padatkan jadi ecobrick bersama komunitas banjar.",
        "Tanpa ecobrick, masukkan ke wadah khusus Residu."
      ],
      fasilitasRekomendasi: "Bank Sampah Ecobrick / TPS3R bagian Residu",
      nilaiEkonomi: "Bahan ecobrick / RDF (Refuse Derived Fuel).",
      regulasi: "Prioritas Pengurangan Timbulan Sampah Residu Bali",
      keywords: ["sachet", "bungkus", "snack", "chiki", "kopi", "multilayer", "plastic bag", "bag", "wrapper", "packet"]
    },
    {
      id: "kresek-plastik",
      nama: "Kantong Plastik / Kresek",
      kategori: "residu",
      labelKategori: "Residu / Plastik Sekali Pakai",
      warna: "#6B7A70",
      ikon: "🛍️",
      deskripsi: "Kantong kresek tipis sekali pakai dari belanja atau bungkus makanan.",
      material: "Plastik LDPE tipis",
      waktuUrai: "10–20 tahun (pecah jadi mikroplastik)",
      bahaya: "Rendah–Sedang (mikroplastik)",
      wadah: "Abu-abu — Residu",
      tindakan: [
        "Bilas & keringkan bila masih dipakai ulang.",
        "Serahkan ke titik kumpul plastik lunak bila tersedia.",
        "Biasakan bawa tas belanja & botol sendiri."
      ],
      fasilitasRekomendasi: "Titik Kumpul Plastik Lunak / TPS3R Residu",
      nilaiEkonomi: "Nilai turun bila kotor — kurangi pemakaian lebih efektif.",
      regulasi: "Pergub Bali No. 97/2018 (Larangan Plastik Sekali Pakai)",
      keywords: ["kresek", "kantong", "tas plastik", "plastic bag", "bag", "shopping bag"]
    },
    {
      id: "styrofoam",
      nama: "Styrofoam / Gabus",
      kategori: "residu",
      labelKategori: "Residu (Sulit Didaur Ulang)",
      warna: "#6B7A70",
      ikon: "🫧",
      deskripsi: "Kotak styrofoam makanan, kemasan elektronik, atau gabus pengganjal.",
      material: "Polystyrene mengembang (EPS)",
      waktuUrai: "500 tahun",
      bahaya: "Rendah (rapuh, jadi mikroplastik)",
      wadah: "Abu-abu — Residu",
      tindakan: [
        "Istirahatkan dulu — keping-kepingnya gampang tercerab ke makanan.",
        "Simpan kering; serahkan ke pengepul khusus styrofoam bila ada.",
        "Pilih kemasan kertas/bambu untuk gorengan & makanan berkuah."
      ],
      fasilitasRekomendasi: "Pengepul Khusus Styrofoam / TPS3R Residu",
      nilaiEkonomi: "Hampir tidak bernilai komersial kecuali dalam program khusus.",
      regulasi: "Pergub Bali No. 97/2018",
      keywords: ["styrofoam", "sterofoam", "gabus", "foam"]
    },
    {
      id: "sedotan",
      nama: "Sedotan Plastik",
      kategori: "residu",
      labelKategori: "Residu (Item Kecil Sulit Dipilah)",
      warna: "#6B7A70",
      ikon: "🥤",
      deskripsi: "Sedotan sekali pakai dari minuman kemasan / resto.",
      material: "Plastik PP / PE",
      waktuUrai: "200 tahun+",
      bahaya: "Rendah",
      wadah: "Abu-abu — Residu",
      tindakan: [
        "Tolak bila tidak perlu; bawa sedotan stainless/bambu.",
        "Bila terlanjur, buang utuh ke wadah Residu (jangan dicampur anorganik).",
        "Cuci & simpan sedotan guna ulang di tas."
      ],
      fasilitasRekomendasi: "TPS3R Residu",
      nilaiEkonomi: "Tidak ekonomis — kurangi pemakaian.",
      regulasi: "Pergub Bali No. 97/2018",
      keywords: ["sedotan", "straw", "sedotan plastik"]
    },
    {
      id: "sampah-higiene",
      nama: "Tisu, Popok & Pembalut Bekas",
      kategori: "residu",
      labelKategori: "Residu Menular (Higiene)",
      warna: "#6B7A70",
      ikon: "🧻",
      deskripsi: "Tisu bekas, popok bayi, pembalut, dan sejenisnya yang sudah terkontaminasi.",
      material: "Serat selulosa + polimer penyerap",
      waktuUrai: "1–3 tahun",
      bahaya: "Sedang — potensi menular",
      wadah: "Abu-abu — Residu (bungkus rapat)",
      tindakan: [
        "Lipat & bungkus rapat dalam koran/kantong kecil.",
        "Jangan dicuci ulang untuk dipakai lagi.",
        "Buang segera ke wadah Residu terpisah."
      ],
      fasilitasRekomendasi: "TPS3R / TPA bagian Residu",
      nilaiEkonomi: "Tidak dapat didaur ulang.",
      regulasi: "Protokol Higiene Limbah Domestik",
      keywords: ["tisu", "tissue", "popok", "diapers", "pembalut", "sanitary", "toilet", "sampah-higiene", "higiene"]
    },
    {
      id: "sandal-sepatu",
      nama: "Sandal / Sepatu Rusak",
      kategori: "residu",
      labelKategori: "Residu (Bahan Campuran)",
      warna: "#6B7A70",
      ikon: "🩴",
      deskripsi: "Sandal karet, sepatu aus, atau alas kaki campur sol & lem.",
      material: "Karet / EVA + kulit sintetis + lem",
      waktuUrai: "80 tahun",
      bahaya: "Rendah",
      wadah: "Abu-abu — Residu",
      tindakan: [
        "Pakai sampai benar-benar rusak sebelum dibuang.",
        "Donasikan bila masih layak pakai.",
        "Jangan dibakar — asap karet sangat berbahaya."
      ],
      fasilitasRekomendasi: "Donasi / bank sampah sepatu komunitas / TPS3R Residu",
      nilaiEkonomi: "Rendah; manfaat terbesar dari memperpanjang usia pakai.",
      regulasi: "Pengurangan timbulan sampah tekstil & karet",
      keywords: ["sandal", "sepatu", "shoe", "sneaker", "boot", "sandal jepit"]
    },
    {
      id: "baterai-elektronik",
      nama: "Baterai Bekas & Limbah B3",
      kategori: "b3",
      labelKategori: "B3 (Bahan Berbahaya & Beracun)",
      warna: "#C2410C",
      ikon: "🔋",
      deskripsi: "Baterai jam, aki, lampu hemat energi, atau elektronik kecil mengandung logam berat.",
      material: "Pb, Cd, Hg, Li, Ni",
      waktuUrai: "Tidak terurai — mencemari air & tanah",
      bahaya: "Tinggi — LOGAM BERAT",
      wadah: "Merah/Oranye — B3 (kotak khusus)",
      tindakan: [
        "JANGAN dibakar atau ditanam.",
        "Tutup kutub dengan selotip agar tidak korsleting.",
        "Simpan terpisah sampai disetor ke Drop Box B3."
      ],
      fasilitasRekomendasi: "Drop Box B3 (DLHK Bali / Kantor Camat / TPS3R)",
      nilaiEkonomi: "Harus dikelola pengolah B3 berizin KLHK.",
      regulasi: "PP No. 22/2021 tentang Pengelolaan Limbah B3",
      keywords: ["baterai", "battery", "aki", "elektronik", "lampu", "cellular", "mouse", "charger"]
    },
    {
      id: "lampu-neon",
      nama: "Lampu Neon / TL Bekas",
      kategori: "b3",
      labelKategori: "B3 (Mengandung Merkuri)",
      warna: "#C2410C",
      ikon: "💡",
      deskripsi: "Tabung TL, bohlam uap, dan lampu mengandung merkuri.",
      material: "Kaca fosfor + uap merkuri",
      waktuUrai: "Tidak terurai",
      bahaya: "Tinggi — MERKURI",
      wadah: "Merah/Oranye — B3 (bungkus tebal)",
      tindakan: [
        "JANGAN pecahkan & jangan dibuang ke sampah biasa.",
        "Bungkus koran tebal & beri tanda 'B3'.",
        "Serahkan ke Drop Box B3 / DLHK."
      ],
      fasilitasRekomendasi: "Drop Box B3 / DLHK Kabupaten/Kota",
      nilaiEkonomi: "Wajib lewat pengolah B3 berizin.",
      regulasi: "PP No. 22/2021; Konvensi Minamata (merkuri)",
      keywords: ["lampu", "neon", "bohlam", "tl", "bulb", "lamp"]
    },
    {
      id: "obat-kadaluarsa",
      nama: "Obat Kadaluarsa & Sirup",
      kategori: "b3",
      labelKategori: "B3 / Farmasi Berbahaya",
      warna: "#C2410C",
      ikon: "💊",
      deskripsi: "Pil, kapsul, sirup, atau salep kedaluwarsa dan sisa obat.",
      material: "Zat aktif farmasi",
      waktuUrai: "Tidak terurai sempurna",
      bahaya: "Tinggi — merusak air & biota",
      wadah: "Merah/Oranye — B3",
      tindakan: [
        "JANGAN dibuang ke kloset / selokan.",
        "Kembalikan ke apotek / puskesmas terdekat.",
        "Simpan dengan kemasan aslinya."
      ],
      fasilitasRekomendasi: "Apotek / Puskesmas / Drop Box B3",
      nilaiEkonomi: "Harus dimusnahkan lewat jalur resmi.",
      regulasi: "PP No. 22/2021; WHO Pharmaceuticals Waste Guidance",
      keywords: ["obat", "pil", "kaplet", "sirup", "pill", "capsule", "medicine"]
    },
    {
      id: "jelantah",
      nama: "Minyak Goreng Bekas (Jelantah)",
      kategori: "b3",
      labelKategori: "B3 / Limbah Minyak",
      warna: "#C2410C",
      ikon: "🛢️",
      deskripsi: "Sisa minyak goreng dari dapur & usaha makanan.",
      material: "Minyak jelantah (lemak teroksidasi)",
      waktuUrai: "Bertahan di air bertahun-tahun",
      bahaya: "Sedang–Tinggi — mencemari air",
      wadah: "Merah/Oranye — B3 (botol tertutup)",
      tindakan: [
        "JANGAN dituang ke selokan/sungai.",
        "Dinginkan, saring, simpan di botol tertutup.",
        "Serahkan ke pengepul jelantah / bank sampah minyak."
      ],
      fasilitasRekomendasi: "Pengepul Jelantah / Bank Minyak / DLHK",
      nilaiEkonomi: "Bisa jadi biodiesel / sabun — biasanya dibeli per liter.",
      regulasi: "PP No. 22/2021; Larangan buang minyak ke drainase",
      keywords: ["minyak", "jelantah", "oil", "minyak goreng"]
    },
    {
      id: "elektronik-rusak",
      nama: "Elektronik Rusak (HP, Kabel, Mainan)",
      kategori: "b3",
      labelKategori: "E-Waste / B3 Elektronik",
      warna: "#C2410C",
      ikon: "📱",
      deskripsi: "HP, laptop, kabel, charger, mainan elektronik, dan perlengkapan IT rusak.",
      material: "Plastik ABS + logam + timbal + baterai Li",
      waktuUrai: "Ribuan tahun (logam berat awet)",
      bahaya: "Tinggi — timbal & baterai",
      wadah: "Merah/Oranye — B3 Elektronik",
      tindakan: [
        "Jangan bongkar sembarangan bila tidak paham.",
        "Hapus data pribadi sebelum disetor.",
        "Serahkan ke pengepul e-waste resmi / drop box elektronik."
      ],
      fasilitasRekomendasi: "Pengepul E-Waste Resmi / DLHK / Drop Box Elektronik",
      nilaiEkonomi: "Emas & tembaga di dalamnya bernilai bila dikelola resmi.",
      regulasi: "PP No. 22/2021; Permen LHK No. 6/2021 (Sampah Elektronik)",
      keywords: ["elektronik", "hp", "handphone", "laptop", "kabel", "charger", "remote", "cellular", "computer", "television", "tv"]
    },
    {
      id: "jarum-suntik",
      nama: "Jarum Suntik & Alat Medis Tajam",
      kategori: "b3",
      labelKategori: "B3 Medis",
      warna: "#C2410C",
      ikon: "💉",
      deskripsi: "Jarum suntik, spuit bekas, dan alat medis tajam sekali pakai.",
      material: "Plastik + baja tajam",
      waktuUrai: "Tidak terurai",
      bahaya: "Tinggi — risiko infeksi & tusukan",
      wadah: "Kuning berbiohazard / B3",
      tindakan: [
        "Jangan pegang bagian tajamnya.",
        "Masukkan ke wadah kaku bertutup (botol kaca / safety box).",
        "Serahkan ke fasilitas kesehatan / apotek."
      ],
      fasilitasRekomendasi: "Faskes / Apotek / DLHK",
      nilaiEkonomi: "Tidak bernilai — wajib dimusnahkan resmi.",
      regulasi: "PP No. 22/2021; Permenkes Limbah Medis",
      keywords: ["jarum", "suntik", "syringe", "spuit", "medis", "needle"]
    },
    {
      id: "aerosol-spray",
      nama: "Kaleng Aerosol / Spray Bekas",
      kategori: "b3",
      labelKategori: "B3 Bertekanan",
      warna: "#C2410C",
      ikon: "🧴",
      deskripsi: "Parfum, deodoran, hair spray, dan aerosol bertekanan.",
      material: "Kaleng baja + gas propelan (butane)",
      waktuUrai: "80–200 tahun",
      bahaya: "Sedang–Tinggi — mudah meledak bila dipanaskan",
      wadah: "Merah/Oranye — B3",
      tindakan: [
        "JANGAN dibakar/ditusuk/dipanaskan.",
        "Pastikan kosong sebelum dibuang, tapi tetap ke jalur B3.",
        "Simpan tegak di tempat teduh."
      ],
      fasilitasRekomendasi: "Drop Box B3 / DLHK",
      nilaiEkonomi: "Tidak bernilai bila bekas.",
      regulasi: "PP No. 22/2021",
      keywords: ["aerosol", "spray", "parfum", "deodoran", "hair spray"]
    },
    {
      id: "pakaian-lusuh",
      nama: "Pakaian & Kain Lusuh",
      kategori: "anorganik",
      labelKategori: "Tekstil (Anorganik)",
      warna: "#D9A441",
      ikon: "👕",
      deskripsi: "Baju/kaos, kain perca, dan tekstil yang sudah tidak terpakai.",
      material: "Kapas, polyester, campuran sintetis",
      waktuUrai: "3–40 tahun (sintetis paling awet)",
      bahaya: "Rendah",
      wadah: "Kuning — Anorganik (kantong tekstil)",
      tindakan: [
        "Layak pakai → donasikan / tukar tambah.",
        "Sangat lusuh → jadikan lap / keset dulu, baru buang.",
        "Pisahkan dari sampah basah agar tidak berjamur."
      ],
      fasilitasRekomendasi: "Bank Sampah Tekstil / Donasi / TPS3R",
      nilaiEkonomi: "Tekstil bekas masih dibeli pengepul per kg.",
      regulasi: "Ekonomi Sirkular Tekstil",
      keywords: ["pakaian", "baju", "kain", "tekstil", "kaos", "shirt", "clothing", "fabric", "towel"]
    },
    {
      id: "pecahan-kaca",
      nama: "Pecahan Kaca / Beling Tajam",
      kategori: "anorganik",
      labelKategori: "Anorganik (Perhatian Keamanan)",
      warna: "#D9A441",
      ikon: "🔸",
      deskripsi: "Gelas, piring, atau kaca yang pecah.",
      material: "Kaca sodalime",
      waktuUrai: "1.000.000 tahun",
      bahaya: "Sedang — tajam & melukai",
      wadah: "Kuning — Anorganik (wadah kaku bertutup)",
      tindakan: [
        "Jangan biarkan berserakan — kumpulkan dengan sapu & sekop.",
        "Masukkan ke botol/kotak kaku, beri label 'KACA PECAH'.",
        "Serahkan ke Bank Sampah / pengepul kaca terpisah dari botol utuh."
      ],
      fasilitasRekomendasi: "Bank Sampah (wadah kaku) / Pengepul Kaca",
      nilaiEkonomi: "Kaca pecah bersih masih bernilai, tapi lebih rendah dari botol utuh.",
      regulasi: "KESMAS — Pencegahan luka petugas sampah",
      keywords: ["pecah", "beling", "kaca pecah", "broken glass", "shatter"]
    },
    {
      id: "gelas-aros",
      nama: "Gelas Plastik Sekali Pakai (Aros)",
      kategori: "anorganik",
      labelKategori: "Anorganik Daur Ulang (Bila Bersih)",
      warna: "#D9A441",
      ikon: "🥤",
      deskripsi: "Gelas es teh / kopi plastik sekali pakai.",
      material: "Plastik PP / PET tipis",
      waktuUrai: "450 tahun",
      bahaya: "Rendah",
      wadah: "Kuning — Anorganik",
      tindakan: [
        "Kuras & bilas — gelas berminyak sulit didaur ulang.",
        "Tumpuk rapi agar hemat tempat.",
        "Bawa tumbler sendiri lebih baik lagi."
      ],
      fasilitasRekomendasi: "Bank Sampah Unit",
      nilaiEkonomi: "Diterima bila bersih & kering (harga rendah).",
      regulasi: "Pergub Bali No. 97/2018",
      keywords: ["gelas", "aros", "cup", "plastic cup", "es teh", "kopi plastik"]
    }
  ];

  window.KNOWLEDGE_BASE_BALI = KNOWLEDGE_BASE_BALI;

  /* ============================================================
   * 2. STATE
   * ============================================================ */
  let scannerStream = null;
  let tfModel = null;
  let isModelLoading = false;
  let currentScanDataUrl = null;
  let currentScanFileName = null;
  let riwayatPindai = [];

  try { riwayatPindai = JSON.parse(localStorage.getItem("eling_scanner_history") || "[]"); } catch (e) { riwayatPindai = []; }

  /* ============================================================
   * 3. TF.JS — ON-DEMAND LOADING
   *    Prioritas: model khusus Teachable Machine (model/model.json)
   *    Fallback: MobileNet ImageNet umum bila model khusus gagal
   * ============================================================ */
  async function loadTensorFlowModel(onProgress) {
    if (tfModel) return tfModel;
    if (isModelLoading) {
      while (isModelLoading) await new Promise((r) => setTimeout(r, 100));
      return tfModel;
    }
    isModelLoading = true;
    if (onProgress) onProgress("Memuat pustaka TensorFlow.js…");
    try {
      if (!window.tf) await injectScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js");

      // 1) MODEL KHUSUS Teachable Machine (akurat untuk sampah Bali)
      if (onProgress) onProgress("Memuat model sampah khusus Bali…");
      try {
        if (!window.tmImage) {
          await injectScript("https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.5/dist/teachablemachine-image.min.js");
        }
        // path relatif dari index.html (GitHub Pages)
        tfModel = await window.tmImage.load("model/model.json", "model/metadata.json");
        console.log("✅ Teachable Machine model siap (12 kelas sampah Bali).");
        tfModel._isCustom = true;
        return tfModel;
      } catch (e) {
        console.warn("Model khusus gagal, fallback ke MobileNet umum:", e);
      }

      // 2) FALLBACK MobileNet ImageNet
      if (!window.mobilenet) {
        if (onProgress) onProgress("Menyiapkan MobileNet Vision Model…");
        await injectScript("https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js");
      }
      if (onProgress) onProgress("Menginisialisasi neural network…");
      tfModel = await window.mobilenet.load({ version: 2, alpha: 1.0 });
      console.log("✅ TensorFlow MobileNet siap (fallback).");
      return tfModel;
    } catch (err) {
      console.warn("TF CDN bermasalah:", err);
      return null;
    } finally { isModelLoading = false; }
  }

  function injectScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = () => resolve();
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => loadTensorFlowModel());
  } else {
    setTimeout(() => loadTensorFlowModel(), 2500);
  }

  /* ============================================================
   * 4. UTIL MOTOK: warna, kualitas foto, keyword
   * ============================================================ */
  function escapeHTML(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function matchKeyword(text, keywords) {
    if (!text || !keywords) return null;
    for (const kw of keywords) {
      const esc = String(kw).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`\\b${esc}(s|es)?\\b`, "i").test(text)) return kw;
    }
    return null;
  }

  /**
   * Profil warna: kuning/gumitir vs hijau/janur (Canang Sari),
   * plus foto gelap/terang/kabur.
   */
  function analyzeImage(img) {
    const out = {
      hasCeremonyFloral: false,
      yellowPct: 0, greenPct: 0,
      brownPct: 0, bluePct: 0, whitePct: 0,
      brightness: 0.5, sharpness: 0.5, usable: true, qualityNote: ""
    };
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 48; canvas.height = 48;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, 48, 48);
      const data = ctx.getImageData(0, 0, 48, 48).data;
      const total = data.length / 4;
      let yCount = 0, gCount = 0, brCount = 0, blCount = 0, wCount = 0;
      let sum = 0, sum2 = 0;
      const gray = [];
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        sum += lum; sum2 += lum * lum;
        gray.push(lum);
        if (r > 160 && g > 120 && b < 100) yCount++;
        else if (g > r && g > b && g > 70) gCount++;
        else if (r > 90 && r > g && g > b && (r - b) > 40) brCount++;
        else if (b > r && b > g && b > 80) blCount++;
        if (r > 200 && g > 200 && b > 200) wCount++;
      }
      out.yellowPct = yCount / total;
      out.greenPct = gCount / total;
      out.brownPct = brCount / total;
      out.bluePct = blCount / total;
      out.whitePct = wCount / total;
      out.hasCeremonyFloral = out.yellowPct >= 0.015 && out.greenPct >= 0.01;
      const mean = sum / total;
      const variance = Math.max(0, sum2 / total - mean * mean);
      out.brightness = mean;
      out.sharpness = Math.min(1, Math.sqrt(variance) * 4); // 0..1 (rendah = kabur/flat)
      if (mean < 0.15) { out.usable = false; out.qualityNote = "Foto terlalu gelap, pindah ke cahaya yang cukup."; }
      else if (mean > 0.95) { out.usable = false; out.qualityNote = "Foto terlalu terang, hindari lampu sorot langsung."; }
      else if (out.sharpness < 0.18) { out.usable = false; out.qualityNote = "Foto kabur, pegang ponsel lebih stabil & fokuskan ke sampah."; }
    } catch (e) { /* canvas tak bisa dibaca (CORS) — tetap lanjut */ }
    return out;
  }

  /* ============================================================
   * 5. MESIN KLASIFIKASI — Multi-sinyal + verifikasi bukan sampah
   * ============================================================ */

  // Objek yang secara jelas BUKAN sampah (bila model sangat yakin)
  const NON_WASTE_KEYWORDS = [
    "person", "dog", "cat", "bird", "fish", "horse", "cow", "sheep", "pig", "lizard", "snake", "turtle", "spider", "bee", "butterfly", "vehicle", "sports car", "racer", "steam locomotive", "ship", "speedboat", "airplane", "airliner", "helicopter", "bicycle", "mountain bike", "motor scooter", "pickup truck", "laptop", "notebook", "desktop computer", "face", "child", "man", "woman"
  ];

  function buildBelumYakinItem(topClass) {
    return {
      id: "belum-yakin", nama: "Sampah Belum Terdeteksi Yakin", kategori: "lainnya",
      labelKategori: "Perlu Pindai Ulang", warna: "#6B7A70", ikon: "🔎",
      deskripsi: `AI menangkap "${topClass || "objek tidak dikenal"}" tapi belum yakin ini sampah yang mana.`,
      material: "—", waktuUrai: "—", bahaya: "—", wadah: "Hijau/Kuning/Abu-abu (lihat katalog)",
      tindakan: [
        "Pindai lebih dekat — objek mengisi sebagian besar layar.",
        "Pastikan cahaya cukup & latar bersih.",
        "Coba sudut berbeda atau unggah foto galeri.",
        "Bila tetap sulit, telusuri katalog di bawah — pilih jenis sampah secara manual."
      ],
      fasilitasRekomendasi: "Sementara itu: organik → kompos, anorganik → Bank Sampah",
      nilaiEkonomi: "Sampah terpilah tetap bernilai di Bank Sampah Bali.",
      regulasi: "Pergub Bali No. 47/2019 (Pilah Sampah dari Sumbernya)",
      keywords: []
    };
  }

  function buildBukanSampahItem(topClass) {
    return {
      id: "bukan-sampah", nama: "Bukan Sampah", kategori: "bukan",
      labelKategori: "Bukan Limbah", warna: "#17803D", ikon: "🌿",
      deskripsi: `Objek pada foto lebih mirip "${topClass}" — bukan sampah rumah tangga. Tidak perlu dibuang ke tempat sampah.`,
      material: "Benda hidup / kendaraan / barang yang masih dipakai",
      waktuUrai: "—", bahaya: "Tidak ada", wadah: "Jangan dibuang",
      tindakan: [
        "Bila masih berfungsi, simpan / pakai kembali.",
        "Bila hewan — biarkan hidup & jangan diganggu.",
        "Bila ingin dokumentasi, tetap simpan fotonya sebagai edukasi."
      ],
      fasilitasRekomendasi: "Simpan / Gunakan Kembali",
      nilaiEkonomi: "Mengurangi timbulan sampah.",
      regulasi: "Prinsip Reduce (Kurangi) — UU No. 18/2008",
      keywords: []
    };
  }

  /**
   * Skor untuk SETIAP kandidat, bukan sekadar cocok pertama.
   * skor = max Prob MobileNet yang cocok (0..1) + bonus hint/warna
   * Dipakai untuk memilih kandidat terbaik & menampilkan alternatif.
   */
  function scoreCandidates(predictions, filenameHint, visual) {
    const hint = String(filenameHint || "").toLowerCase();
    const preds = Array.isArray(predictions) ? predictions : [];
    const cfg = (typeof window !== "undefined" && window.MODEL_CONFIG) || null;
    const labelToId = cfg && cfg.labelToId ? cfg.labelToId : null;
    const scored = KNOWLEDGE_BASE_BALI.map((item) => {
      let score = 0, matchedVia = "—";
      // Model khusus: cocokkan label Teachable Machine langsung, tanpa keyword
      if (labelToId) {
        for (const p of preds) {
          if (!p || typeof p.probability !== "number" || p.probability < 0.03) continue;
          const cls = String(p.className || "").split(",")[0].trim();
          const mappedId = labelToId[cls];
          if (mappedId === item.id && p.probability > score) {
            score = p.probability;
            matchedVia = cls;
          }
        }
        // Sudah ada sinyal langsung dari model khusus → pakai itu saja
        if (score > 0) return { item, score, matchedVia, raw: score };
      }
      // Fallback keyword MobileNet (bila model khusus gagal)
      // Perhatian: coba dulu cocokkan keyword (fokus pada label langsung), hindari bias umum
      for (const p of preds) {
        if (!p || typeof p.probability !== "number" || p.probability < 0.03) continue;
        if (matchKeyword(String(p.className || "").toLowerCase(), item.keywords)) {
          if (p.probability > score) { score = p.probability; matchedVia = p.className.split(",")[0]; }
        }
      }
      // Hint nama file (bonus kecil, bukan penentu utama)
      if (hint && matchKeyword(hint, item.keywords)) {
        score += 0.25;
        matchedVia = `nama file "${hint}"`;
      }
      // Spesialisasi warna Canang
      if (item.id === "canang-sari" && visual && visual.hasCeremonyFloral) {
        score += 0.30;
        matchedVia = "profil warna bunga & janur";
      }
      if (item.id === "botol-pet" && visual && visual.bluePct > 0.08 && visual.whitePct > 0.05 && score > 0) {
        score += 0.08;
      }
      return { item, score, matchedVia, raw: Math.max(...preds.filter(p => p && matchKeyword(String(p.className || "").toLowerCase(), item.keywords)).map(p => p.probability), 0) };
    }).sort((a, b) => b.score - a.score);
    return scored;
  }

  function mapPredictionsToBaliWaste(predictions, filenameHint, visual) {
    const scored = scoreCandidates(predictions, filenameHint, visual);
    const best = scored[0];
    const preds = Array.isArray(predictions) ? predictions : [];
    const topClass = preds[0]?.className ? preds[0].className.split(",")[0] : "objek tidak dikenal";
    const topProb = typeof preds[0]?.probability === "number" ? preds[0].probability : 0;
    // P0: ambang naik untuk model khusus (0.45) — jangan paksa sampah bila model tidak yakin.
    // Model 12 kelas tanpa kelas non-waste bisa memaksa objek luar kelas; ambang ini mekanisme unknown.
    const cfg = (typeof window !== "undefined" && window.MODEL_CONFIG) || null;
    const minScore = cfg && cfg.minConfidence ? cfg.minConfidence : 0.18;

    // Verifikasi BUKAN SAMPAH — hanya bila model sangat yakin itu makhluk/kendaraan hidup
    const isNonWastePred = preds.some(p => p && p.probability >= 0.35 && matchKeyword(String(p.className || "").toLowerCase(), NON_WASTE_KEYWORDS));
    if (isNonWastePred && best.score < minScore) {
      return {
        item: buildBukanSampahItem(topClass),
        topClass, confidence: Math.round(topProb * 100),
        status: "bukan-sampah",
        candidates: scored.slice(0, 3),
        why: `Model yakin ini "${topClass}" (${Math.round(topProb * 100)}%) dan tidak ada sinyal sampah yang cukup.`
      };
    }

    if (best.score >= minScore) {
      // P0: confidence = raw softmax model (bukan skor bonus) — tampil sebagai keyakinan, bukan akurasi.
      const rawProb = best.raw > 0 ? best.raw : best.score;
      const conf = Math.min(99, Math.round(rawProb * 100));
      const alternatif = scored.slice(1, 4).filter(c => c.score > 0.08);
      return {
        item: best.item,
        topClass: best.matchedVia || topClass,
        confidence: conf,
        status: conf >= 70 ? "yakin" : (conf >= 50 ? "cukup" : "rendah"),
        candidates: alternatif,
        why: `Keyakinan model: "${best.matchedVia}" ${conf}% (softmax, bukan jaminan akurasi).`
      };
    }

    return {
      item: buildBelumYakinItem(topClass),
      topClass, confidence: null,
      status: "belum-yakin",
      candidates: scored.slice(0, 3).filter(c => c.score > 0.03),
      why: `Tidak ada kandidat sampah dengan skor cukup. Top: "${topClass}" (${Math.round(topProb * 100)}%).`
    };
  }

  /* ============================================================
   * 6. MODAL UI & EVENT
   * ============================================================ */
  function renderScannerModal() {
    if (document.getElementById("elingScannerModal")) return;

    const modalHTML = `
      <div id="elingScannerModal" class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-deep/80 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300">
        <div class="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-line flex flex-col transform scale-95 transition-all duration-300">

          <div class="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-white/95 backdrop-blur border-b border-line rounded-t-3xl">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-18h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2"/><circle cx="12" cy="12" r="3"/></svg>
              </span>
              <div>
                <h3 class="text-base font-extrabold text-forest">Eling AI Waste Scanner <span class="ml-1 align-middle text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider border border-emerald-300">Final</span></h3>
                <p class="text-xs text-muted">Verifikasi sampah vs bukan • jenis • spesifikasi • wadah & penanganan</p>
              </div>
            </div>
            <button type="button" id="closeScannerBtn" aria-label="Tutup" class="grid h-9 w-9 place-items-center rounded-full border border-line bg-cream text-muted hover:text-danger hover:border-danger transition">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="p-5 sm:p-6 space-y-5">

            <!-- Alur 3 langkah -->
            <div class="grid grid-cols-3 gap-2 text-[11px] font-bold text-center text-muted">
              <div class="rounded-xl bg-cream border border-line py-2 px-1"><span class="text-forest">1.</span> Foto sampah<br><span class="font-semibold text-[10px]">dekat & terang</span></div>
              <div class="rounded-xl bg-cream border border-line py-2 px-1"><span class="text-forest">2.</span> AI verifikasi<br><span class="font-semibold text-[10px]">sampah / bukan</span></div>
              <div class="rounded-xl bg-cream border border-line py-2 px-1"><span class="text-forest">3.</span> Lihat spesifikasi<br><span class="font-semibold text-[10px]">wadah & penanganan</span></div>
            </div>

            <!-- Viewport + bingkai kamera -->
            <div class="relative w-full aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-ink/5 border-2 border-dashed border-line flex flex-col items-center justify-center text-center p-4" id="scannerViewport">
              <video id="scannerVideo" class="hidden absolute inset-0 w-full h-full object-cover" autoplay playsinline muted></video>
              <img id="scannerPreviewImg" class="hidden absolute inset-0 w-full h-full object-contain bg-black/90" alt="Preview Sampah">
              <div id="scannerLaser" class="hidden absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_18px_#10b981] animate-pulse z-10"></div>
              <!-- Sudut bingkai -->
              <div class="pointer-events-none absolute inset-3 z-20 hidden" id="framingGuide">
                <span class="absolute left-0 top-0 h-6 w-6 border-l-[3px] border-t-[3px] border-white/90 rounded-tl-md"></span>
                <span class="absolute right-0 top-0 h-6 w-6 border-r-[3px] border-t-[3px] border-white/90 rounded-tr-md"></span>
                <span class="absolute left-0 bottom-0 h-6 w-6 border-l-[3px] border-b-[3px] border-white/90 rounded-bl-md"></span>
                <span class="absolute right-0 bottom-0 h-6 w-6 border-r-[3px] border-b-[3px] border-white/90 rounded-br-md"></span>
                <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-white bg-black/50 rounded-full px-2.5 py-1">Posisikan sampah di sini</span>
              </div>

              <div id="scannerPlaceholder" class="space-y-3">
                <div class="mx-auto w-16 h-16 rounded-2xl bg-primary/10 text-primary grid place-items-center">
                  <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div>
                  <p class="text-sm font-bold text-forest">Arahkan Kamera atau Unggah Foto</p>
                  <p class="text-xs text-muted mt-0.5 max-w-xs mx-auto">AI mengenali 25 jenis sampah Bali — dari canang, botol, hingga limbah B3 — serta memverifikasi bila objek bukan sampah.</p>
                </div>
                <ul class="text-[11px] text-muted text-left max-w-xs mx-auto space-y-1">
                  <li>✓ Sampah mengisi sebagian besar layar</li>
                  <li>✓ Cahaya cukup & latar polos</li>
                </ul>
              </div>
            </div>

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

            <div id="cameraControls" class="hidden">
              <button type="button" id="captureBtn" class="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm bg-primary text-white hover:bg-forest transition shadow-lg shadow-primary/25 flex items-center justify-center gap-2 active:scale-[0.98]">
                <span class="w-3 h-3 rounded-full bg-white animate-ping"></span><span>📸 Pindai Sampah Ini Sekarang</span>
              </button>
            </div>

            <div class="pt-3 border-t border-line">
              <button type="button" id="scanNowBtn" class="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm bg-primary text-white hover:bg-forest transition shadow-lg shadow-primary/25 flex items-center justify-center gap-2 active:scale-[0.98]">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-18h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2"/><circle cx="12" cy="12" r="3"/></svg>
                <span>🤖 Pindai dengan AI</span>
              </button>
              <p class="text-[11px] text-muted text-center mt-1.5">Neural network berjalan di perangkat kamu — cepat, gratis, & privat. Opsional: seret & letakkan foto ke area kamera.</p>
            </div>

            <!-- Cari manual -->
            <div class="rounded-2xl border border-line bg-cream/60 p-3">
              <label class="text-xs font-bold text-forest" for="scannerManualInput">🔍 Tidak sempat foto? Ketik nama barangnya:</label>
              <div class="flex gap-2 mt-2">
                <input id="scannerManualInput" type="text" placeholder="mis. botol aqua, canang, kardus, baterai…" class="flex-1 rounded-xl border border-line px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                <button type="button" id="scannerManualBtn" class="rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-white hover:bg-deep">Cek</button>
              </div>
              <div id="scannerManualResults" class="mt-2 flex flex-wrap gap-1.5"></div>
            </div>

            <!-- Hasil -->
            <div id="scannerResult" class="hidden space-y-4 pt-3 border-t border-line"></div>

            <!-- Riwayat -->
            <div id="scannerHistoryWrap" class="hidden pt-1">
              <p class="text-[11px] font-bold uppercase tracking-wider text-muted">Terakhir dipindai</p>
              <div id="scannerHistory" class="mt-2 flex flex-wrap gap-1.5"></div>
            </div>

            <!-- Katalog -->
            <div class="pt-3 border-t border-line">
              <div class="flex items-center justify-between gap-2 mb-2">
                <h4 class="text-xs font-extrabold uppercase tracking-wider text-forest">📂 Telusuri Semua Jenis Sampah</h4>
                <span class="text-[10px] text-muted">ketuk untuk detailnya</span>
              </div>
              <div id="scannerCatalog" class="grid grid-cols-3 sm:grid-cols-4 gap-2"></div>
            </div>

          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    renderCatalog();
    renderHistory();
    setupScannerEvents();
  }

  function renderCatalog() {
    const el = document.getElementById("scannerCatalog");
    if (!el) return;
    el.innerHTML = KNOWLEDGE_BASE_BALI.map((it) => `
      <button type="button" data-cat-id="${it.id}" class="rounded-xl border border-line bg-white hover:border-primary hover:shadow-md transition p-2.5 text-left group">
        <div class="text-lg">${it.ikon}</div>
        <p class="text-[11px] font-bold text-forest leading-tight mt-1">${it.nama}</p>
        <p class="text-[10px] font-semibold" style="color:${it.warna}">${it.labelKategori}</p>
      </button>
    `).join("");
    el.querySelectorAll("[data-cat-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = KNOWLEDGE_BASE_BALI.find((x) => x.id === btn.dataset.catId);
        if (!item) return;
        renderHasilPindai(item, {
          aiLabel: item.nama,
          confidence: null,
          status: "katalog",
          why: "Dilihat dari katalog manual.",
          candidates: [],
          quality: null
        });
      });
    });
  }

  function renderHistory() {
    const wrap = document.getElementById("scannerHistoryWrap");
    const el = document.getElementById("scannerHistory");
    if (!wrap || !el) return;
    if (!riwayatPindai.length) { wrap.classList.add("hidden"); return; }
    wrap.classList.remove("hidden");
    el.innerHTML = riwayatPindai.map((r, i) => `
      <button type="button" data-hist="${i}" class="rounded-full border border-line bg-white hover:border-primary px-2.5 py-1 text-[11px] font-semibold text-forest transition">${r.ikon} ${escapeHTML(r.nama)}</button>
    `).join("");
    el.querySelectorAll("[data-hist]").forEach((b) => {
      b.addEventListener("click", () => {
        const r = riwayatPindai[parseInt(b.dataset.hist, 10)];
        if (!r) return;
        const item = KNOWLEDGE_BASE_BALI.find((x) => x.id === r.id) || buildBelumYakinItem(r.nama);
        renderHasilPindai(item, {
          aiLabel: r.aiLabel || item.nama,
          confidence: r.confidence ?? null,
          status: r.status || "katalog",
          why: `Dari riwayat pindai ${r.tanggal || ""}.`,
          candidates: [],
          quality: null
        });
      });
    });
  }

  function saveToHistory(item, meta) {
    try {
      riwayatPindai = riwayatPindai.filter((r) => r.id !== item.id);
      riwayatPindai.unshift({
        id: item.id, nama: item.nama, ikon: item.ikon,
        aiLabel: meta.aiLabel, confidence: meta.confidence, status: meta.status,
        tanggal: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
      });
      riwayatPindai = riwayatPindai.slice(0, 8);
      localStorage.setItem("eling_scanner_history", JSON.stringify(riwayatPindai));
      renderHistory();
    } catch (e) {}
  }

  /* ============================================================
   * 7. EVENTS
   * ============================================================ */
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
    const scanNowBtn = document.getElementById("scanNowBtn");
    const framing = document.getElementById("framingGuide");
    const viewport = document.getElementById("scannerViewport");
    const manualInput = document.getElementById("scannerManualInput");
    const manualBtn = document.getElementById("scannerManualBtn");
    const manualResults = document.getElementById("scannerManualResults");

    function openModal() {
      modal.classList.remove("opacity-0", "pointer-events-none");
      const card = modal.querySelector(":scope > div");
      card.classList.remove("scale-95"); card.classList.add("scale-100");
      document.body.classList.add("overflow-hidden");
      loadTensorFlowModel();
    }
    function closeModal() {
      stopCamera();
      modal.classList.add("opacity-0", "pointer-events-none");
      const card = modal.querySelector(":scope > div");
      card.classList.remove("scale-100"); card.classList.add("scale-95");
      document.body.classList.remove("overflow-hidden");
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    startCamBtn.addEventListener("click", async () => {
      try {
        if (scannerStream) { stopCamera(); return; }
        startCamBtn.innerHTML = `<span>⏳ Membuka Kamera…</span>`;
        scannerStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        video.srcObject = scannerStream;
        video.classList.remove("hidden");
        previewImg.classList.add("hidden");
        placeholder.classList.add("hidden");
        if (framing) framing.classList.remove("hidden");
        cameraControls.classList.remove("hidden");
        startCamBtn.innerHTML = `<span>🛑 Tutup Kamera</span>`;
        startCamBtn.classList.replace("bg-forest", "bg-red-600");
      } catch (err) {
        console.warn(err);
        alert("Tidak dapat mengakses kamera: " + (err.message || "Izin ditolak. Silakan gunakan 'Unggah Foto'."));
        startCamBtn.innerHTML = `<span>Buka Kamera</span>`;
      }
    });

    function captureFrame() {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.9);
    }

    captureBtn.addEventListener("click", () => {
      const dataUrl = captureFrame();
      stopCamera();
      currentScanDataUrl = dataUrl; currentScanFileName = null;
      previewImg.src = dataUrl;
      previewImg.classList.remove("hidden");
      placeholder.classList.add("hidden");
      runAIImageAnalysis(previewImg, null);
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      stopCamera();
      const reader = new FileReader();
      reader.onload = (ev) => {
        currentScanDataUrl = ev.target.result;
        currentScanFileName = file.name;
        previewImg.src = currentScanDataUrl;
        previewImg.classList.remove("hidden");
        placeholder.classList.add("hidden");
        previewImg.onload = () => runAIImageAnalysis(previewImg, file.name);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    });

    // Drag & drop
    ["dragenter", "dragover"].forEach((ev) => viewport.addEventListener(ev, (e) => { e.preventDefault(); viewport.classList.add("border-primary"); }));
    ["dragleave", "drop"].forEach((ev) => viewport.addEventListener(ev, (e) => { e.preventDefault(); viewport.classList.remove("border-primary"); }));
    viewport.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      if (!dt || !dt.files || !dt.files.length) return;
      const file = dt.files[0];
      if (!file.type.startsWith("image/")) return;
      stopCamera();
      const reader = new FileReader();
      reader.onload = (ev) => {
        currentScanDataUrl = ev.target.result;
        currentScanFileName = file.name;
        previewImg.src = currentScanDataUrl;
        previewImg.classList.remove("hidden");
        placeholder.classList.add("hidden");
        previewImg.onload = () => runAIImageAnalysis(previewImg, file.name);
      };
      reader.readAsDataURL(file);
    });

    scanNowBtn.addEventListener("click", () => {
      const hasImage = previewImg && previewImg.src && !previewImg.classList.contains("hidden") && previewImg.complete && previewImg.naturalWidth > 0;
      if (!hasImage) {
        alert("Belum ada foto. Silakan 'Buka Kamera' atau 'Unggah Foto' dulu, lalu tekan Pindai dengan AI.");
        return;
      }
      runAIImageAnalysis(previewImg, currentScanFileName);
    });

    // Cari manual
    function doManualSearch() {
      const q = (manualInput.value || "").toLowerCase().trim();
      if (!q) { manualResults.innerHTML = ""; return; }
      const hits = KNOWLEDGE_BASE_BALI.filter((it) => {
        return matchKeyword(q, it.keywords) || it.nama.toLowerCase().includes(q) || it.deskripsi.toLowerCase().includes(q);
      });
      if (!hits.length) {
        manualResults.innerHTML = `<p class="text-xs text-muted">Tidak menemukan "${escapeHTML(q)}" di katalog. Coba kata lain: botol, kardus, canang, baterai, styrofoam…</p>`;
        return;
      }
      manualResults.innerHTML = hits.map((it) => `
        <button type="button" data-mid="${it.id}" class="rounded-full border border-line bg-white hover:border-primary px-3 py-1.5 text-xs font-bold text-forest transition">${it.ikon} ${it.nama}</button>
      `).join("");
      manualResults.querySelectorAll("[data-mid]").forEach((b) => {
        b.addEventListener("click", () => {
          const item = KNOWLEDGE_BASE_BALI.find((x) => x.id === b.dataset.mid);
          if (!item) return;
          renderHasilPindai(item, { aiLabel: item.nama, confidence: null, status: "manual", why: `Hasil pencarian manual untuk "${q}".`, candidates: [], quality: null });
          document.querySelector("#scannerResult").scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      });
    }
    manualBtn.addEventListener("click", doManualSearch);
    manualInput.addEventListener("keydown", (e) => { if (e.key === "Enter") doManualSearch(); });

    window.openBaliElingScanner = openModal;
    window.bukaScanner = openModal;
  }

  function stopCamera() {
    const startCamBtn = document.getElementById("startCameraBtn");
    const video = document.getElementById("scannerVideo");
    const cameraControls = document.getElementById("cameraControls");
    const framing = document.getElementById("framingGuide");
    if (scannerStream) { scannerStream.getTracks().forEach((t) => t.stop()); scannerStream = null; }
    if (video) video.classList.add("hidden");
    if (cameraControls) cameraControls.classList.add("hidden");
    if (framing) framing.classList.add("hidden");
    if (startCamBtn) {
      startCamBtn.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg><span>Buka Kamera</span>`;
      startCamBtn.classList.replace("bg-red-600", "bg-forest");
    }
  }

  /* ============================================================
   * 8. ANALISIS & RENDER HASIL
   * ============================================================ */
  async function runAIImageAnalysis(imgElement, hintText) {
    const resultDiv = document.getElementById("scannerResult");
    const laser = document.getElementById("scannerLaser");
    if (laser) laser.classList.remove("hidden");
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
      <div class="p-6 rounded-2xl bg-cream/70 border border-line flex flex-col items-center justify-center text-center space-y-3">
        <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div>
          <p class="text-sm font-extrabold text-forest" id="aiStatusText">Eling AI sedang memindai objek sampah…</p>
          <p class="text-xs text-muted mt-0.5">Verifikasi sampah vs bukan • jenis • spesifikasi • wadah</p>
        </div>
      </div>
    `;
    const statusEl = document.getElementById("aiStatusText");

    try {
      if (statusEl) statusEl.textContent = "Menjalankan neural network vision…";
      const model = await loadTensorFlowModel((s) => { if (statusEl) statusEl.textContent = s; });

      let predictions = [];
      if (model && imgElement.complete && imgElement.naturalWidth > 0) {
        // Model khusus Teachable Machine: predict() langsung
        if (model._isCustom && typeof model.predict === "function") {
          const raw = await model.predict(imgElement);
          predictions = raw.slice().sort((a, b) => b.probability - a.probability);
        } else {
          predictions = await model.classify(imgElement, 5);
        }
      }

      if (statusEl) statusEl.textContent = "Menganalisis warna & kualitas foto…";
      const visual = analyzeImage(imgElement);

      if (statusEl) statusEl.textContent = "Mencocokkan ke katalog sampah Bali…";
      const mapped = mapPredictionsToBaliWaste(predictions, hintText, visual);

      setTimeout(() => {
        if (laser) laser.classList.add("hidden");
        renderHasilPindai(mapped.item, {
          aiLabel: mapped.topClass,
          confidence: mapped.confidence,
          status: mapped.status,
          why: mapped.why,
          candidates: mapped.candidates || [],
          quality: visual
        });
        saveToHistory(mapped.item, { aiLabel: mapped.topClass, confidence: mapped.confidence, status: mapped.status });
      }, 400);

    } catch (err) {
      console.warn("AI fallback:", err);
      if (laser) laser.classList.add("hidden");
      const offlineItem = buildBelumYakinItem("model AI tidak tersedia");
      offlineItem.nama = "AI Sedang Tidak Tersedia";
      offlineItem.ikon = "⚠️"; offlineItem.warna = "#C2410C";
      offlineItem.labelKategori = "Gagal Menjalankan AI";
      offlineItem.deskripsi = "Neural network gagal dimuat (koneksi CDN bermasalah). Gunakan katalog manual di bawah untuk tetap memilah.";
      renderHasilPindai(offlineItem, { aiLabel: "Model Load Error", confidence: null, status: "offline", why: "CDN TensorFlow tidak bisa diakses.", candidates: [], quality: null });
    }
  }

  function confidenceBadge(status, confidence) {
    // P0: label jujur — softmax confidence model, bukan akurasi lapangan.
    if (status === "yakin") return `<span class="text-emerald-700 font-black">● Keyakinan Model ${confidence}%</span>`;
    if (status === "cukup") return `<span class="text-amber-700 font-black">● Keyakinan Model ${confidence}% (sedang)</span>`;
    if (status === "rendah") return `<span class="text-orange-700 font-black">● Keyakinan Model ${confidence}% (rendah)</span>`;
    if (status === "bukan-sampah") return `<span class="text-emerald-700 font-black">● Bukan Sampah — ${confidence}%</span>`;
    if (status === "katalog" || status === "manual") return `<span class="text-muted font-black">● Info Katalog</span>`;
    return `<span class="text-amber-700 font-black">● Belum Yakin — ambil foto lebih dekat</span>`;
  }

  function renderHasilPindai(data, meta = {}) {
    const container = document.getElementById("scannerResult");
    if (!container) return;
    const confidence = meta.confidence ?? null;
    const status = meta.status || "katalog";
    const aiLabel = meta.aiLabel || data.nama;
    const why = meta.why || "";
    const candidates = meta.candidates || [];
    const quality = meta.quality;
    const verdict =
      status === "bukan-sampah" ? { teks: "✅ Bukan Sampah — aman, jangan dibuang", bg: "bg-emerald-600" } :
      status === "belum-yakin" || status === "offline" ? { teks: "🔎 Belum yakin — perlu pindai ulang / pilih manual", bg: "bg-amber-500" } :
      { teks: "♻️ Sampah terdeteksi — ini cara memilahnya", bg: "bg-primary" };

    const spec = [
      { label: "Material", value: data.material || "—" },
      { label: "Lama Terurai", value: data.waktuUrai || "—" },
      { label: "Tingkat Bahaya", value: data.bahaya || "—" },
      { label: "Wadah", value: data.wadah || data.labelKategori }
    ];

    container.classList.remove("hidden");
    container.innerHTML = `
      <div class="rounded-2xl border-2 p-4 sm:p-5 bg-white shadow-xl space-y-4 animate-fade-in" style="border-color:${data.warna}">

        <div class="${verdict.bg} text-white text-xs sm:text-sm font-extrabold rounded-xl px-3 py-2 text-center">${verdict.teks}</div>

        ${quality && quality.qualityNote ? `<p class="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">📸 Tips foto: ${escapeHTML(quality.qualityNote)}</p>` : ""}

        <div class="flex items-start justify-between gap-3 pb-3 border-b border-line">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-2xl sm:text-3xl">${data.ikon}</span>
              <div>
                <h4 class="text-base sm:text-lg font-black text-forest leading-tight">${data.nama}</h4>
                <p class="text-[11px] text-muted mt-0.5">AI Class: <strong class="text-forest">${escapeHTML(aiLabel)}</strong></p>
                ${why ? `<p class="text-[11px] text-muted mt-0.5">${escapeHTML(why)}</p>` : ""}
              </div>
            </div>
            <p class="text-xs text-ink/80 mt-2 leading-relaxed">${data.deskripsi}</p>
            ${candidates.length ? `
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span class="text-[10px] font-bold text-muted uppercase tracking-wide w-full">Alternatif AI:</span>
                ${candidates.map(c => `<span class="text-[11px] font-semibold rounded-full border border-line bg-cream px-2 py-0.5">${c.item.ikon} ${c.item.nama} (${Math.round(c.score * 100)}%)</span>`).join("")}
              </div>
            ` : ""}
          </div>
          <div class="text-right shrink-0">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-black text-white shadow-sm" style="background-color:${data.warna}">${data.labelKategori}</span>
            <p class="text-[11px] mt-1">${confidenceBadge(status, confidence)}</p>
            ${confidence != null ? `<div class="mt-1.5 h-2 w-24 ml-auto rounded-full bg-line overflow-hidden"><div class="h-full rounded-full" style="width:${confidence}%;background-color:${data.warna}"></div></div>` : ""}
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          ${spec.map(s => `<div class="rounded-xl border border-line bg-cream/60 p-2.5"><p class="font-bold uppercase tracking-wide text-muted text-[10px]">${s.label}</p><p class="font-bold text-forest mt-0.5 leading-tight">${s.value}</p></div>`).join("")}
        </div>

        <div>
          <h5 class="text-xs font-bold uppercase tracking-wider text-forest mb-2">📋 Langkah Penanganan Benar:</h5>
          <ol class="space-y-1.5 text-xs text-ink/90">
            ${data.tindakan.map((t, i) => `<li class="flex items-start gap-2"><span class="font-extrabold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style="background-color:${data.warna}">${i + 1}</span><span>${t}</span></li>`).join("")}
          </ol>
        </div>

        <div class="grid sm:grid-cols-2 gap-2.5 pt-1 text-xs">
          <div class="p-3 rounded-xl bg-cream border border-line">
            <p class="text-[10px] font-bold uppercase tracking-wide text-muted">Tujuan Penyaluran:</p>
            <p class="font-bold text-forest mt-0.5">${data.fasilitasRekomendasi}</p>
          </div>
          <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <p class="text-[10px] font-bold uppercase tracking-wide text-emerald-800">Potensi / Nilai Ekonomi:</p>
            <p class="font-semibold text-emerald-900 mt-0.5">${data.nilaiEkonomi}</p>
          </div>
        </div>

        <div class="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
          <span>📜</span><span><strong>Rujukan:</strong> ${data.regulasi}</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <button type="button" class="py-2.5 px-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-forest transition text-center shadow-md shadow-primary/20" onclick="catatAksiPilah('${data.id}', '${escapeHTML(data.nama).replace(/'/g, "&#039;")}', '${data.kategori}')">✅ Catat (+30 XP)</button>
          <button type="button" id="salinHasilBtn" class="py-2.5 px-2 rounded-xl text-xs font-bold border border-line bg-cream text-forest hover:border-primary">📋 Salin Hasil</button>
          <a href="index.html#peta" onclick="document.getElementById('closeScannerBtn').click()" class="py-2.5 px-2 rounded-xl text-xs font-bold border border-line bg-cream text-forest hover:border-primary text-center flex items-center justify-center">🗺️ Cari TPS3R</a>
          <button type="button" id="pindaiLagiBtn" class="py-2.5 px-2 rounded-xl text-xs font-bold border border-line bg-white text-forest hover:border-primary">🔄 Pindai Lagi</button>
        </div>
      </div>
    `;

    // aksi tombol baru
    const salinBtn = document.getElementById("salinHasilBtn");
    if (salinBtn) {
      salinBtn.addEventListener("click", () => {
        const text = `${data.ikon} ${data.nama} — ${data.labelKategori}\nMaterial: ${data.material} | Lama terurai: ${data.waktuUrai} | Bahaya: ${data.bahaya} | Wadah: ${data.wadah}\nPenyaluran: ${data.fasilitasRekomendasi}\nLangkah: ${data.tindakan.join(" ")}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => alert("Hasil pindai tersalin ✅")).catch(() => prompt("Salin hasil berikut:", text));
        } else { prompt("Salin hasil berikut:", text); }
      });
    }
    const againBtn = document.getElementById("pindaiLagiBtn");
    if (againBtn) {
      againBtn.addEventListener("click", () => {
        container.classList.add("hidden");
        container.innerHTML = "";
        document.getElementById("scannerViewport").scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }

    container.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Gamifikasi — kompatibel dengan signature lama (katalog / hasil)
  window.catatAksiPilah = function (a, b, c) {
    // menerima (id, nama, kategori) atau (nama, kategori)
    let nama = b, kategori = c;
    if (!c && b && typeof b === "string" && !a.length > 2) { nama = a; kategori = b; }
    // normalisasi: bila argumen pertama adalah id (panjang pendek, slug), pakai nama kedua
    if (typeof a === "string" && KNOWLEDGE_BASE_BALI.some((x) => x.id === a) && typeof b === "string" && b.length > 3) {
      nama = b; kategori = c || (KNOWLEDGE_BASE_BALI.find((x) => x.id === a)?.kategori || kategori);
    }
    try {
      let log = JSON.parse(localStorage.getItem("eling_aksi_log") || "[]");
      let xp = parseInt(localStorage.getItem("eling_total_xp") || "120", 10);
      log.unshift({
        sampah: nama,
        kategori: kategori,
        tanggal: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
        xp: 30
      });
      xp += 30;
      localStorage.setItem("eling_aksi_log", JSON.stringify(log.slice(0, 20)));
      localStorage.setItem("eling_total_xp", xp.toString());
      alert(`Sukses! Aksi memilah "${nama}" tercatat. Kamu dapat +30 XP Palemahan! 🌿`);
    } catch (e) { console.warn(e); }
  };

  /* ============================================================
   * 9. INIT
   * ============================================================ */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderScannerModal);
  } else {
    renderScannerModal();
  }

  // expose untuk testing manual
  window.ElingScanner = {
    KB: KNOWLEDGE_BASE_BALI,
    analyzeImage,
    scoreCandidates,
    mapPredictionsToBaliWaste
  };

})();
