@extends('layouts.app')

@section('title', 'Bali Eling Luu — Jaga Alam, Lestarikan Bali')

@section('body_class', 'locked bg-cream font-sans text-ink')

@section('content')
{{-- SPLASH SCREEN --}}
<div id="splash" class="splash" role="status" aria-label="Memuat">
    <img class="splash-bg" src="{{ asset('assets/photo01.webp') }}" alt="" aria-hidden="true">
    <div class="splash-veil"></div>
    <div class="splash-inner">
        <img class="splash-logo" src="{{ asset('assets/logo/logo-tulisan.webp') }}" alt="Bali Eling Luu">
        <p class="splash-tag text-sm font-semibold tracking-[0.22em] text-deep/70">JAGA ALAM, LESTARIKAN BALI</p>
        <div class="splash-bar"><i></i></div>
    </div>
</div>

<div id="app">
    {{-- HEADER / NAVIGASI UTAMA --}}
    <header class="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
        <nav class="mx-auto flex max-w-shell items-center justify-between gap-4 px-5 py-3.5" aria-label="Navigasi utama">
            <a href="#beranda" class="flex shrink-0 items-center gap-2.5">
                <img src="{{ asset('assets/logo/logo-mark.webp') }}" alt="" aria-hidden="true" class="h-9 w-9 object-contain">
                <span class="leading-none">
                    <span class="block text-[15px] font-extrabold text-forest">Bali Eling Luu</span>
                    <span class="mt-0.5 block text-[10px] font-medium text-muted">Dari Sampah, Untuk Bali</span>
                </span>
            </a>

            {{-- Menu desktop --}}
            <ul class="hidden items-center gap-3 text-xs font-semibold text-muted xl:flex 2xl:gap-4 2xl:text-sm">
                <li><a class="link-underline whitespace-nowrap transition hover:text-primary" href="#beranda">Beranda</a></li>
                <li><a class="link-underline whitespace-nowrap transition hover:text-primary" href="#artikel">Artikel</a></li>
                <li><a class="link-underline whitespace-nowrap transition hover:text-primary" href="{{ url('/dashboard') }}">Dashboard</a></li>
                <li><button type="button" onclick="openBaliElingScannerSafe()" class="whitespace-nowrap font-bold text-primary transition hover:text-forest">AI Scanner</button></li>
                <li><a class="link-underline whitespace-nowrap transition hover:text-primary" href="#peta">Eco Map</a></li>
                <li><a class="link-underline whitespace-nowrap transition hover:text-primary" href="#lapor">Lapor Luu</a></li>
                <li><a class="link-underline whitespace-nowrap transition hover:text-primary" href="{{ route('panduan') }}">Panduan Sampah</a></li>
            </ul>

            {{-- Tombol menu mobile/tablet --}}
            <button type="button" id="menuBtn" aria-label="Buka menu" aria-expanded="false" aria-controls="menu" class="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white text-forest transition hover:border-primary xl:hidden">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
        </nav>

        {{-- Menu mobile/tablet --}}
        <ul id="menu" class="hidden space-y-1 border-t border-line bg-cream px-5 py-3 text-sm font-medium text-muted xl:hidden">
            <li><a class="block rounded-lg px-3 py-2.5 font-bold text-forest transition hover:bg-white" href="#beranda">Beranda</a></li>
            <li><a class="block rounded-lg px-3 py-2.5 transition hover:bg-white hover:text-primary" href="#artikel">Artikel</a></li>
            <li><a class="block rounded-lg px-3 py-2.5 transition hover:bg-white hover:text-primary" href="{{ url('/dashboard') }}">Dashboard</a></li>
            <li><button type="button" onclick="openBaliElingScannerSafe(); closeMobileMenu()" class="block w-full rounded-lg px-3 py-2.5 text-left font-bold text-primary transition hover:bg-white">AI Scanner</button></li>
            <li><a class="block rounded-lg px-3 py-2.5 transition hover:bg-white hover:text-primary" href="#peta">Eco Map</a></li>
            <li><a class="block rounded-lg px-3 py-2.5 transition hover:bg-white hover:text-primary" href="#lapor">Lapor Luu</a></li>
            <li><a class="block rounded-lg px-3 py-2.5 transition hover:bg-white hover:text-primary" href="{{ route('panduan') }}">Panduan Sampah</a></li>
        </ul>
    </header>

    <main id="beranda">
        {{-- HERO --}}
        <section class="relative overflow-hidden">
            <img class="hero-photo" src="{{ asset('assets/photo03.webp') }}" alt="Pura tradisional di kaki Gunung Agung dikelilingi persawahan hijau">
            <div class="hero-veil"></div>
            <div class="relative mx-auto max-w-shell px-5 pb-16 pt-14 sm:pb-24 sm:pt-20">
                <div class="max-w-2xl">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3.5 py-1.5 text-xs font-extrabold text-forest ring-1 ring-primary/25"><span class="h-2 w-2 rounded-full bg-primary"></span>AI-Powered Environmental Action Platform</span>
                        <span class="hidden text-[11px] font-bold uppercase tracking-wider text-terra-deep sm:inline-block">Bali Smart Society</span>
                    </div>
                    <h1 class="mt-4 text-[2.2rem] font-extrabold leading-[1.12] tracking-tight text-forest sm:text-5xl lg:text-6xl">Dari Kesadaran Menjadi Tindakan Nyata untuk Bali.</h1>
                    <p class="mt-4 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">Pindai sampahmu dengan AI Vision cerdas, dapatkan rekomendasi pemilahan sesuai tradisi &amp; regulasi Bali, serta temukan TPS3R dan Bank Sampah terdekat.</p>
                    <div class="mt-7 flex flex-wrap items-center gap-3">
                        <button type="button" onclick="openBaliElingScannerSafe()" class="flex items-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-primary/30 transition hover:bg-forest active:scale-[0.98] sm:text-base">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-18h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2"/><circle cx="12" cy="12" r="3"/></svg>
                            <span>Scan Sampah Sekarang (AI)</span>
                        </button>
                        <a href="#peta" class="flex items-center gap-2 rounded-2xl border border-line bg-white/95 px-6 py-4 text-sm font-bold text-forest shadow-sm transition hover:border-primary hover:text-primary sm:text-base">🗺️ Cari TPS3R / Bank Sampah</a>
                    </div>
                    <div class="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
                        <span class="rounded-full border border-line bg-cream px-3 py-1">🌿 Tri Hita Karana (Palemahan)</span>
                        <span class="rounded-full border border-line bg-cream px-3 py-1">📜 Pergub Bali No. 47 &amp; 97</span>
                        <span class="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800">🎯 Menuju Bali 100% Memilah 2026</span>
                    </div>
                    <div class="mt-8 border-t border-line/70 pt-6">
                        <p class="mb-3 text-xs font-bold uppercase tracking-wider text-muted">Atau cari nama sampah langsung:</p>
                        <form id="panduan" class="space-y-3" aria-label="Cari jenis sampah" onsubmit="return false;">
                            <div class="grid gap-2 sm:grid-cols-12">
                                <div class="relative sm:col-span-7">
                                    <svg class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                                    <label for="q" class="sr-only">Cari jenis sampah</label>
                                    <input id="q" class="field !py-3 pl-12 text-sm" type="search" placeholder="Contoh: canang, botol aqua, kardus..." autocomplete="off">
                                </div>
                                <div class="relative sm:col-span-5">
                                    <label for="kat" class="sr-only">Pilih kategori</label>
                                    <select id="kat" class="field appearance-none !py-3 pr-11 text-sm"><option value="">Semua Kategori</option><option value="organik">Organik</option><option value="anorganik">Anorganik</option><option value="residu">Residu</option><option value="b3">B3 / Sampah Khusus</option></select>
                                    <svg class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        {{-- MENGAPA PEDULI --}}
        <section class="mx-auto max-w-shell px-5 py-16 sm:py-24">
            <div class="grid items-center gap-10 lg:grid-cols-2">
                <div class="order-2 lg:order-1">
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Mengapa Penting</p>
                    <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Mengapa Kita Harus Peduli?</h2>
                    <p class="mt-5 leading-relaxed text-muted">Kebersihan lingkungan menentukan kesehatan, kenyamanan, dan keindahan tempat kita tinggal. Dengan memilah sampah dari sumbernya, mengurangi plastik sekali pakai, dan tidak membuang sampah sembarangan, kita ikut menjaga ekosistem Bali tetap sehat.</p>
                    <ul class="mt-7 space-y-3 text-sm text-ink">
                        <li class="flex gap-3"><span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">✓</span>Memilah sampah dari rumah</li>
                        <li class="flex gap-3"><span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">✓</span>Mengurangi plastik sekali pakai</li>
                        <li class="flex gap-3"><span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">✓</span>Tidak meninggalkan sampah di pantai dan sungai</li>
                    </ul>
                </div>
                <div class="order-1 lg:order-2"><img src="{{ asset('assets/photo04.webp') }}" alt="Canang sari di tepi pantai Bali saat matahari terbenam" class="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-forest/10"></div>
            </div>
            <div id="statistikBali" class="mt-12"></div>
        </section>

        {{-- KATEGORI SAMPAH --}}
        <section id="kategori" class="border-y border-line bg-white py-16 sm:py-24">
            <div class="mx-auto max-w-shell px-5">
                <div class="max-w-2xl"><p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Panduan Sampah</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Kenali Jenis Sampah</h2><p class="mt-4 text-muted">Empat kategori utama yang perlu kamu pahami sebelum memilah.</p></div>
                <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <article class="flex flex-col rounded-2xl border border-line bg-cream p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/10"><span class="grid h-12 w-12 place-items-center rounded-xl bg-primary/12 text-2xl" aria-hidden="true">🍂</span><h3 class="mt-4 text-lg font-bold text-forest">Organik</h3><p class="mt-1.5 text-sm leading-relaxed text-muted">Sampah yang mudah terurai secara alami.</p><p class="mt-3 text-xs text-muted"><strong class="text-ink">Contoh:</strong> daun, sisa makanan.</p><a href="{{ url('/edukasi?jenis=organik') }}" class="mt-5 inline-block text-sm font-bold text-primary hover:underline">Pelajari →</a></article>
                    <article class="flex flex-col rounded-2xl border border-line bg-cream p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/10"><span class="grid h-12 w-12 place-items-center rounded-xl bg-terra/15 text-2xl" aria-hidden="true">♻️</span><h3 class="mt-4 text-lg font-bold text-forest">Anorganik</h3><p class="mt-1.5 text-sm leading-relaxed text-muted">Material yang berpotensi didaur ulang.</p><p class="mt-3 text-xs text-muted"><strong class="text-ink">Contoh:</strong> botol plastik, kaleng.</p><a href="{{ url('/edukasi?jenis=anorganik') }}" class="mt-5 inline-block text-sm font-bold text-primary hover:underline">Pelajari →</a></article>
                    <article class="flex flex-col rounded-2xl border border-line bg-cream p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/10"><span class="grid h-12 w-12 place-items-center rounded-xl bg-muted/10 text-2xl" aria-hidden="true">🗑️</span><h3 class="mt-4 text-lg font-bold text-forest">Residu</h3><p class="mt-1.5 text-sm leading-relaxed text-muted">Tidak dapat diproses lewat jalur daur ulang yang tersedia.</p><p class="mt-3 text-xs text-muted"><strong class="text-ink">Contoh:</strong> tisu bekas, pembalut.</p><a href="{{ url('/edukasi?jenis=residu') }}" class="mt-5 inline-block text-sm font-bold text-primary hover:underline">Pelajari →</a></article>
                    <article class="flex flex-col rounded-2xl rounded-2xl border border-terra/45 bg-terra/12 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/10"><span class="grid h-12 w-12 place-items-center rounded-xl bg-terra/25 text-2xl" aria-hidden="true">⚠️</span><h3 class="mt-4 text-lg font-bold text-forest">B3 / Khusus</h3><p class="mt-1.5 text-sm leading-relaxed text-muted">Perlu penanganan khusus, jangan dicampur sampah biasa.</p><p class="mt-3 text-xs text-muted"><strong class="text-ink">Contoh:</strong> baterai, lampu tertentu.</p><a href="{{ url('/edukasi?jenis=b3') }}" class="mt-5 inline-block text-sm font-bold text-primary hover:underline">Pelajari →</a></article>
                </div>
                <p class="mt-8 rounded-xl border border-line bg-cream px-5 py-4 text-xs leading-relaxed text-muted"><strong class="text-ink">Catatan:</strong> Tidak semua barang dalam satu kategori bisa langsung didaur ulang. Selalu ikuti ketentuan dan fasilitas pengelolaan sampah setempat.</p>
            </div>
        </section>

        {{-- BALI ECO MAP --}}
        <section id="peta" class="border-b border-line bg-cream/70 py-16 sm:py-24">
            <div class="mx-auto max-w-shell px-5">
                <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div class="max-w-2xl"><span class="inline-block rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-extrabold text-forest">Solusi Geospasial Nyata</span><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Bali Eco Map: Ke Mana Sampahmu Pergi?</h2><p class="mt-3 text-sm leading-relaxed text-muted sm:text-base">Peta interaktif sebaran fasilitas TPS 3R, Bank Sampah unit, dan Drop Box B3 terverifikasi di Bali. Temukan tempat terdekat dari rumahmu dan langsung dapatkan rute Google Maps.</p></div>
                    <div class="shrink-0"><button type="button" id="btnLokasiSaya" class="flex items-center gap-2 rounded-xl bg-forest px-5 py-3 text-xs font-bold text-white shadow-md shadow-forest/15 transition hover:bg-deep active:scale-[0.98] sm:text-sm">📍 Cari Fasilitas Dekat Saya</button></div>
                </div>
                <div class="mt-8 grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm sm:grid-cols-12">
                    <div class="sm:col-span-4"><label for="filterPetaKab" class="mb-1 block text-xs font-bold text-forest">Pilih Kabupaten / Kota</label><select id="filterPetaKab" class="w-full rounded-xl border border-line bg-cream p-2.5 text-xs focus:border-primary focus:outline-none sm:text-sm"><option value="semua">Semua Wilayah Bali</option><option value="Denpasar">Kota Denpasar</option><option value="Badung">Kabupaten Badung</option><option value="Gianyar">Kabupaten Gianyar</option><option value="Tabanan">Kabupaten Tabanan</option><option value="Klungkung">Kabupaten Klungkung</option><option value="Bangli">Kabupaten Bangli</option><option value="Buleleng">Kabupaten Buleleng</option><option value="Jembrana">Kabupaten Jembrana</option><option value="Karangasem">Kabupaten Karangasem</option></select></div>
                    <div class="sm:col-span-4"><label for="filterPetaKat" class="mb-1 block text-xs font-bold text-forest">Jenis Fasilitas</label><select id="filterPetaKat" class="w-full rounded-xl border border-line bg-cream p-2.5 text-xs focus:border-primary focus:outline-none sm:text-sm"><option value="semua">Semua Fasilitas</option><option value="tps3r">TPS 3R (Kompos &amp; Daur Ulang)</option><option value="bank_sampah">Bank Sampah (Uang/Tabungan)</option><option value="b3">Drop Box Limbah B3</option><option value="toss">TOSS (Tempat Olah Sampah Setempat)</option></select></div>
                    <div class="sm:col-span-4"><label for="inputCariPeta" class="mb-1 block text-xs font-bold text-forest">Cari Kata Kunci</label><input type="search" id="inputCariPeta" placeholder="Misal: Dalung, Sanur, Kertalangu..." class="w-full rounded-xl border border-line bg-cream p-2.5 text-xs focus:border-primary focus:outline-none sm:text-sm"></div>
                </div>
                <div class="mt-6 grid items-start gap-6 lg:grid-cols-12">
                    <div class="relative z-10 h-[420px] overflow-hidden rounded-3xl border border-line shadow-sm sm:h-[500px] lg:col-span-7" id="baliEcoMap"></div>
                    <div class="h-[420px] space-y-3 overflow-y-auto pr-1 sm:h-[500px] lg:col-span-5" id="petaListFasilitas"></div>
                </div>
            </div>
        </section>

        {{-- LAPOR LUU --}}
        <section id="lapor" class="border-b border-line bg-white py-16 sm:py-24"><div class="mx-auto max-w-shell px-5" id="laporLuuSection"></div></section>

        {{-- TIPS --}}
        <section id="tips" class="mx-auto max-w-shell px-5 py-16 sm:py-24">
            <div class="max-w-2xl"><p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Tips Lingkungan</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Langkah Kecil, Dampak Besar</h2></div>
            <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <li class="rounded-2xl border border-line bg-white p-6"><h3 class="font-bold text-forest">Bawa botol &amp; tas sendiri</h3><p class="mt-2 text-sm leading-relaxed text-muted">Kebiasaan paling sederhana untuk mengurangi sampah plastik.</p></li>
                <li class="rounded-2xl border border-line bg-white p-6"><h3 class="font-bold text-forest">Kurangi plastik sekali pakai</h3><p class="mt-2 text-sm leading-relaxed text-muted">Pilih kemasan yang bisa digunakan ulang atau diisi ulang.</p></li>
                <li class="rounded-2xl border border-line bg-white p-6"><h3 class="font-bold text-forest">Pilah dari sumbernya</h3><p class="mt-2 text-sm leading-relaxed text-muted">Pisahkan organik, anorganik, residu, dan B3 di rumah.</p></li>
                <li class="rounded-2xl border border-line bg-white p-6"><h3 class="font-bold text-forest">Jangan tinggalkan sampah</h3><p class="mt-2 text-sm leading-relaxed text-muted">Bawa pulang sampahmu dari pantai, sungai, dan tempat wisata.</p></li>
                <li class="rounded-2xl border border-line bg-white p-6"><h3 class="font-bold text-forest">Hormati alam &amp; tempat suci</h3><p class="mt-2 text-sm leading-relaxed text-muted">Berperilaku sesuai kesakralan tempat yang dikunjungi.</p></li>
                <li class="rounded-2xl border border-line bg-white p-6"><h3 class="font-bold text-forest">Gunakan kembali</h3><p class="mt-2 text-sm leading-relaxed text-muted">Manfaatkan barang yang masih layak sebelum membeli baru.</p></li>
            </ul>
        </section>

        {{-- ARTIKEL --}}
        <section id="artikel" class="border-t border-line bg-white py-16 sm:py-24">
            <div class="mx-auto max-w-shell px-5">
                <div class="flex flex-wrap items-end justify-between gap-4"><div><p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Artikel</p><h2 class="mt-3 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Cerita dan Inspirasi untuk Bali</h2></div><a href="{{ url('/artikel') }}" class="text-sm font-bold text-primary hover:underline">Lihat semua →</a></div>
                <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <article class="group overflow-hidden rounded-2xl border border-line bg-cream"><div class="aspect-video overflow-hidden bg-line/60"><img src="{{ asset('assets/foto-jenis-sampah/organik.webp') }}" alt="Tumpukan canang sari dan sisa organik" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"></div><div class="p-5"><span class="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold text-primary">Pemilahan</span><h3 class="mt-3 font-bold leading-snug text-forest transition group-hover:text-primary">Cara Memilah Sampah di Rumah</h3><p class="mt-2 text-sm leading-relaxed text-muted">Langkah praktis memisahkan sampah tanpa ribet.</p><a href="{{ url('/artikel#memilah-di-rumah') }}" class="mt-4 inline-block text-sm font-bold text-primary hover:underline">Baca Selengkapnya</a></div></article>
                    <article class="group overflow-hidden rounded-2xl border border-line bg-cream"><div class="aspect-video overflow-hidden bg-line/60"><img src="{{ asset('assets/photo02.webp') }}" alt="Jalur setapak di tengah persawahan Bali" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"></div><div class="p-5"><span class="rounded-full bg-terra/20 px-3 py-1 text-[11px] font-bold text-forest">Wisata</span><h3 class="mt-3 font-bold leading-snug text-forest transition group-hover:text-primary">Mengurangi Sampah Plastik Saat Berwisata</h3><p class="mt-2 text-sm leading-relaxed text-muted">Checklist sederhana sebelum berangkat.</p><a href="{{ url('/artikel#kurangi-plastik-saat-berwisata') }}" class="mt-4 inline-block text-sm font-bold text-primary hover:underline">Baca Selengkapnya</a></div></article>
                    <article class="group overflow-hidden rounded-2xl border border-line bg-cream"><div class="aspect-video overflow-hidden bg-line/60"><img src="{{ asset('assets/photo05.webp') }}" alt="Pantai dan tebing dengan pura di tepi laut" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"></div><div class="p-5"><span class="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold text-primary">Pantai</span><h3 class="mt-3 font-bold leading-snug text-forest transition group-hover:text-primary">Menjaga Kebersihan Pantai Bali</h3><p class="mt-2 text-sm leading-relaxed text-muted">Peran kecil pengunjung untuk ekosistem pesisir.</p><a href="{{ url('/artikel#jaga-kebersihan-pantai') }}" class="mt-4 inline-block text-sm font-bold text-primary hover:underline">Baca Selengkapnya</a></div></article>
                    <article class="group overflow-hidden rounded-2xl border border-line bg-cream"><div class="aspect-video overflow-hidden bg-line/60"><img src="{{ asset('assets/foto-jenis-sampah/b3.webp') }}" alt="Layar monitor lawas dan botol kimia di semak" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"></div><div class="p-5"><span class="rounded-full bg-terra/20 px-3 py-1 text-[11px] font-bold text-forest">B3</span><h3 class="mt-3 font-bold leading-snug text-forest transition group-hover:text-primary">Mengenal Sampah B3 dan Penanganannya</h3><p class="mt-2 text-sm leading-relaxed text-muted">Kenapa baterai dan lampu tak boleh sembarangan.</p><a href="{{ url('/artikel#mengenal-sampah-b3') }}" class="mt-4 inline-block text-sm font-bold text-primary hover:underline">Baca Selengkapnya</a></div></article>
                </div>
            </div>
        </section>

        {{-- TENTANG KAMI --}}
        <section id="tentang" class="mx-auto max-w-shell px-5 py-16 sm:py-24">
            <div class="relative overflow-hidden rounded-3xl bg-forest px-6 py-14 sm:px-14"><div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" aria-hidden="true"></div><div class="relative"><p class="text-xs font-bold uppercase tracking-[0.18em] text-terra">Tentang Kami</p><h2 class="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">Jaga Alam, Lestarikan Bali.</h2><p class="mt-5 max-w-2xl leading-relaxed text-cream/80">Bali Eling Luu adalah <strong class="text-terra">AI-Powered Environmental Action Platform</strong> — platform digital cerdas yang menghubungkan edukasi, pemilahan sampah, komunitas desa adat, direktori fasilitas lingkungan, dan aksi nyata dalam satu ekosistem terpadu. Dari kesadaran menjadi tindakan nyata untuk Bali.</p><p class="mt-3 max-w-2xl text-sm leading-relaxed text-cream/70">Berlandaskan filosofi kearifan lokal <em>Tri Hita Karana</em> (Palemahan — keharmonisan manusia dengan alam semesta) serta implementasi <strong>Pergub Bali No. 47/2019</strong> &amp; <strong>Pergub Bali No. 97/2018</strong>.</p><div class="mt-8 flex flex-wrap gap-3"><button type="button" onclick="openBaliElingScannerSafe()" class="rounded-xl bg-terra px-6 py-3.5 text-sm font-bold text-forest shadow-md transition hover:bg-terra/80">📷 Coba AI Scanner</button><a href="#peta" class="rounded-xl bg-cream px-6 py-3.5 text-sm font-bold text-forest shadow-md transition hover:bg-white">🗺️ Buka Eco Map Bali</a><a href="{{ url('/dashboard') }}" class="rounded-xl border border-cream/40 px-6 py-3.5 text-sm font-bold text-cream transition hover:bg-cream/10">📊 Dashboard Aksi &amp; Poin</a></div></div></div>
        </section>

        {{-- BOTTOM NAV MOBILE --}}
        <nav class="fixed bottom-0 left-0 z-40 w-full border-t border-line bg-white/95 backdrop-blur lg:hidden" aria-label="Navigasi bawah">
            <ul class="mx-auto grid max-w-shell grid-cols-5">
                <li><a href="#beranda" class="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-bold text-primary"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>Beranda</a></li>
                <li><button type="button" onclick="openBaliElingScannerSafe()" class="flex w-full flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold text-terra-deep"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/><circle cx="12" cy="12" r="3"/></svg>Scan AI</button></li>
                <li><a href="#peta" class="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold text-muted hover:text-primary"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>Eco Map</a></li>
                <li><a href="#lapor" class="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold text-muted hover:text-primary"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Lapor</a></li>
                <li><a href="{{ url('/dashboard') }}" class="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold text-muted hover:text-primary"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M16 21v-6M8 21v-4M12 21V9M3 3v18h18"/></svg>Aksi</a></li>
            </ul>
        </nav>
    </main>

    {{-- FOOTER --}}
    <footer class="border-t border-line bg-white pb-16 lg:pb-0">
        <div class="mx-auto grid max-w-shell gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div><div class="flex items-center gap-2.5"><img src="{{ asset('assets/logo/logo-mark.webp') }}" alt="" aria-hidden="true" class="h-10 w-10 object-contain"><span class="text-base font-extrabold text-forest">Bali Eling Luu</span></div><p class="mt-4 text-sm leading-relaxed text-muted">AI-Powered Environmental Action Platform — dari kesadaran menjadi tindakan nyata untuk pelestarian lingkungan Bali.</p></div>
            <nav aria-label="Navigasi footer"><p class="text-sm font-bold text-ink">Navigasi Utama</p><ul class="mt-4 space-y-2.5 text-sm text-muted"><li><a class="hover:text-primary" href="#beranda">Beranda</a></li><li><button type="button" onclick="openBaliElingScannerSafe()" class="text-left font-semibold hover:text-terra-deep">📷 AI Waste Scanner</button></li><li><a class="hover:text-primary" href="#peta">🗺️ Bali Eco Map (TPS3R &amp; Bank Sampah)</a></li><li><a class="hover:text-primary" href="{{ url('/panduan') }}">Panduan Sampah</a></li><li><a class="hover:text-primary" href="#lapor">📢 Lapor Luu (Aduan Warga)</a></li><li><a class="hover:text-primary" href="{{ url('/dashboard') }}">📊 Dashboard &amp; Aksi Palemahan</a></li></ul></nav>
            <div><p class="text-sm font-bold text-ink">Rujukan Regulasi &amp; Data</p><ul class="mt-4 space-y-2.5 text-sm text-muted"><li><a class="hover:text-primary" href="https://dlh.baliprov.go.id" target="_blank" rel="noopener">Dinas Lingkungan Hidup Bali</a></li><li><a class="hover:text-primary" href="https://sipsn.menlhk.go.id" target="_blank" rel="noopener">SIPSN — Data Sampah KLHK</a></li><li><span class="block text-xs text-muted">Pergub Bali No. 47/2019 (Pilah Berbasis Sumber)</span></li><li><span class="block text-xs text-muted">Pergub Bali No. 97/2018 (Batasi Sampah Plastik)</span></li></ul></div>
            <div><p class="text-sm font-bold text-ink">Terhubung</p><ul class="mt-4 space-y-2.5 text-sm text-muted"><li><a class="hover:text-primary" href="mailto:halo@balielingluu.id">halo@balielingluu.id</a></li><li class="pt-2"><span class="inline-block rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">Bali Digifest 2026 Ready</span></li></ul></div>
        </div>
        <div class="border-t border-line"><p class="mx-auto max-w-shell px-5 py-5 text-xs text-muted">© 2026 Bali Eling Luu — AI-Powered Environmental Action Platform. Jaga Alam, Lestarikan Bali.</p></div>
    </footer>
</div>
@endsection

@push('styles')
<style>
    html { scroll-behavior: smooth; }
    body { -webkit-font-smoothing: antialiased; }
    .splash { position: fixed; inset: 0; z-index: 100; transition: opacity .7s ease, visibility .7s ease; }
    .splash.hide { opacity: 0; visibility: hidden; }
    .splash-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: slowzoom 6s ease-out both; }
    .splash-veil { position: absolute; inset: 0; background: radial-gradient(ellipse 55% 45% at 50% 45%,rgba(255,255,255,.72),rgba(255,255,255,0) 70%),linear-gradient(180deg,rgba(15,61,34,.18),rgba(15,61,34,.05) 40%,rgba(15,61,34,.35)); }
    .splash-inner { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 24px; text-align: center; }
    .splash-logo { width: min(70vw,340px); height: auto; filter: drop-shadow(0 18px 40px rgba(15,61,34,.28)); animation: pop .8s cubic-bezier(.2,.8,.2,1) both; }
    .splash-tag { margin-top: 26px; animation: rise .6s .35s both; }
    .splash-bar { width: 132px; height: 3px; margin-top: 34px; overflow: hidden; border-radius: 999px; background: rgba(20,83,45,.22); animation: rise .6s .5s both; }
    .splash-bar i { display: block; height: 100%; width: 0; background: #d9a441; animation: load 2s ease-out forwards; }
    @keyframes pop { from { transform: scale(.72); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes rise { from { transform: translateY(14px); opacity: 0; } to { transform: none; opacity: 1; } }
    @keyframes load { to { width: 100%; } }
    @keyframes slowzoom { from { transform: scale(1.08); } to { transform: scale(1); } }
    #app { opacity: 0; transition: opacity .6s ease .15s; }
    #app.show { opacity: 1; }
    body.locked { overflow: hidden; }
    .hero-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 55%; }
    .hero-veil { position: absolute; inset: 0; background: linear-gradient(180deg,rgba(245,242,234,.9) 0%,rgba(245,242,234,.72) 42%,rgba(245,242,234,.4) 72%,rgba(245,242,234,.88) 100%); }
    .field { width: 100%; border-radius: 14px; background: #fff; border: 1px solid #e3e7e1; box-shadow: 0 8px 24px rgba(20,83,45,.08); padding: 15px 18px; font-size: 15px; color: #1e3a2a; transition: border-color .2s,box-shadow .2s; }
    .field::placeholder { color: #9aa79f; }
    .field:focus { outline: none; border-color: #17803d; box-shadow: 0 0 0 4px rgba(23,128,61,.14),0 8px 24px rgba(20,83,45,.08); }
    .link-underline { background-image: linear-gradient(currentColor,currentColor); background-size: 0% 1.5px; background-repeat: no-repeat; background-position: left 100%; transition: background-size .3s ease; }
    .link-underline:hover { background-size: 100% 1.5px; }
    @media (prefers-reduced-motion: reduce) { .splash-logo,.splash-tag,.splash-bar,.splash-bg,.splash-bar i { animation: none !important; } .splash-bg { transform: none; } html { scroll-behavior: auto; } }
</style>
@endpush

@push('scripts')
<script>
    // Helper agar semua tombol scanner aman meskipun file AI belum termuat.
    window.openBaliElingScannerSafe = function () {
        if (typeof window.openBaliElingScanner === 'function') return window.openBaliElingScanner();
        if (typeof window.openBaliElingScanner !== 'function' && typeof window.openScanner === 'function') return window.openScanner();
        console.warn('Fungsi AI Scanner belum ditemukan. Periksa public/js/ai_scanner.js.');
        alert('Fitur AI Scanner belum tersedia. Periksa file ai_scanner.js.');
    };

    window.closeMobileMenu = function () {
        const menu = document.getElementById('menu');
        const btn = document.getElementById('menuBtn');
        if (menu) menu.classList.add('hidden');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    };

    (function () {
        const splash = document.getElementById('splash');
        const app = document.getElementById('app');
        if (!splash || !app) return;
        const logo = splash.querySelector('.splash-logo');
        const bg = splash.querySelector('.splash-bg');
        let closed = false;
        function reveal() {
            if (closed) return;
            closed = true;
            splash.classList.add('hide');
            document.body.classList.remove('locked');
            app.classList.add('show');
            window.setTimeout(() => splash.remove(), 800);
        }
        const start = Date.now();
        const pending = [logo, bg].filter(img => img && !img.complete);
        if (pending.length === 0) {
            window.setTimeout(reveal, 1800);
        } else {
            let left = pending.length;
            pending.forEach(img => {
                const done = () => {
                    left -= 1;
                    if (left === 0) window.setTimeout(reveal, Math.max(0, 1800 - (Date.now() - start)));
                };
                img.addEventListener('load', done, { once: true });
                img.addEventListener('error', done, { once: true });
            });
        }
        window.setTimeout(reveal, 4000);

        const btn = document.getElementById('menuBtn');
        const menu = document.getElementById('menu');
        if (btn && menu) {
            btn.addEventListener('click', function () {
                const isHidden = menu.classList.toggle('hidden');
                btn.setAttribute('aria-expanded', String(!isHidden));
            });
            menu.querySelectorAll('a').forEach(link => link.addEventListener('click', window.closeMobileMenu));
        }
    })();

    // Jalankan setelah file data dan fungsi statistik selesai dimuat.
    window.addEventListener('load', function () {
        const el = document.getElementById('statistikBali');
        if (el && typeof window.kartuStatistik === 'function') {
            el.innerHTML = window.kartuStatistik();
        }
        // Leaflet perlu invalidate ukuran setelah kontainer dan layout tampil.
        window.setTimeout(function () {
            if (window.baliEcoMap && typeof window.baliEcoMap.invalidateSize === 'function') window.baliEcoMap.invalidateSize();
            if (window.map && typeof window.map.invalidateSize === 'function') window.map.invalidateSize();
        }, 500);
    });
</script>

{{-- Urutan file dipertahankan: data terlebih dahulu, kemudian fitur yang menggunakannya. --}}
@php
    $jsv = static fn (string $file): int => filemtime(public_path($file));
@endphp
<script>window.BALI_MODEL_BASE = @json(asset('model') . '/');</script>
<script src="{{ asset('js/data_sampah.js') }}?v={{ $jsv('js/data_sampah.js') }}"></script>
<script src="{{ asset('js/data_statistik.js') }}?v={{ $jsv('js/data_statistik.js') }}"></script>
<script src="{{ asset('js/data_lokasi_peta.js') }}?v={{ $jsv('js/data_lokasi_peta.js') }}"></script>
<script src="{{ asset('js/peta.js') }}?v={{ $jsv('js/peta.js') }}"></script>
<script src="{{ asset('model/model_config.js') }}?v={{ $jsv('model/model_config.js') }}"></script>
<script src="{{ asset('js/ai_scanner.js') }}?v={{ $jsv('js/ai_scanner.js') }}"></script>
<script src="{{ asset('js/eco_action.js') }}?v={{ $jsv('js/eco_action.js') }}"></script>
<script src="{{ asset('js/chat.js') }}?v={{ $jsv('js/chat.js') }}"></script>
@endpush
