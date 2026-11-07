@extends('layouts.app')

@php
    $jenisTempat = [
        [
            'nama' => 'Bank Sampah',
            'warna' => '#17803D',
            'terima' => ['Plastik', 'Kertas', 'Kardus', 'Logam'],
            'cara' => 'Sampah anorganik dicatat per kilogram, lalu ditukar uang atau tabungan. Biasanya dikelola koperasi, PKK, atau komunitas warga.',
            'caraCari' => 'Tanya di balai banjar, kelurahan, atau kantor desa setempat.',
        ],
        [
            'nama' => 'TPS 3R (Reduce, Reuse, Recycle)',
            'warna' => '#17803D',
            'terima' => ['Organik', 'Anorganik', 'Residu'],
            'cara' => 'Mengolah sampah di tempat: organik dijadikan kompos, anorganik dipilah lalu dijual. Biasanya dikelola pemerintah desa atau kelurahan.',
            'caraCari' => 'Umumnya ada di setiap kelurahan — tanyakan lokasi TPS 3R terdekat.',
        ],
        [
            'nama' => 'Drop Box Sampah B3',
            'warna' => '#D64545',
            'terima' => ['Baterai', 'Lampu', 'Elektronik kecil', 'Obat kadaluarsa'],
            'cara' => 'Khusus sampah berbahaya dan beracun. Jangan pernah dicampur sampah rumah tangga — ia meracuni tanah dan air.',
            'caraCari' => 'Sering tersedia di apotek, kantor pemerintah, atau toko elektronik.',
        ],
        [
            'nama' => 'TPS Terpadu',
            'warna' => '#6B7A70',
            'terima' => ['Organik', 'Anorganik', 'Residu'],
            'cara' => 'Tempat penampungan sementara sebelum diangkut ke TPA. Pilah dulu di rumah sebelum menitipkan sampah di sini.',
            'caraCari' => 'Biasanya ada di tiap banjar atau perumahan.',
        ],
        [
            'nama' => 'Pengepul / Loak',
            'warna' => '#D9A441',
            'terima' => ['Plastik', 'Logam', 'Kardus', 'Kaca'],
            'cara' => 'Membeli anorganik yang masih bernilai jual. Cocok untuk volume besar seperti botol, kaleng, dan kardus hasil usaha atau acara.',
            'caraCari' => 'Biasanya berkeliling atau punya ruko di pinggir jalan besar.',
        ],
        [
            'nama' => 'Komunitas Daur Ulang',
            'warna' => '#14532D',
            'terima' => ['Plastik', 'Kain', 'Elektronik'],
            'cara' => 'Kelompok warga yang mengolah sampah menjadi produk baru. Sebagian menerima setoran kecil dari rumah tangga.',
            'caraCari' => 'Cari lewat akun media sosial lingkungan di daerahmu, atau kegiatan di balai banjar.',
        ],
    ];
@endphp

@section('title', 'Dashboard — Bali Eling Luu')

@section('description', 'Dashboard pengguna Bali Eling Luu: dampak harian, lokasi terdekat, dan tips memilah sampah.')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-28 pt-8 sm:pb-24 lg:pb-16 lg:pt-12">
    <!-- ===== SAMBUTAN ===== -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div class="flex items-center gap-4">
            <span class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-primary/12 ring-2 ring-white sm:h-16 sm:w-16" aria-hidden="true">
                <svg viewBox="0 0 64 64" class="h-full w-full">
                    <circle cx="32" cy="32" r="32" fill="#DCEBD9"/>
                    <circle cx="32" cy="25" r="11" fill="#1E3A2A"/>
                    <path d="M12 60c2-13 10-19 20-19s18 6 20 19" fill="#1E3A2A"/>
                    <circle cx="28" cy="24" r="1.6" fill="#DCEBD9"/>
                    <circle cx="36" cy="24" r="1.6" fill="#DCEBD9"/>
                    <path d="M28 30c2 1.6 6 1.6 8 0" stroke="#DCEBD9" stroke-width="1.6" fill="none" stroke-linecap="round"/>
                </svg>
            </span>
            <div class="min-w-0">
                <h1 class="text-[22px] font-extrabold leading-tight tracking-tight text-forest sm:text-3xl">Halo, {{ auth()->user()?->name ?? 'Putu' }}!</h1>
                <p class="mt-0.5 text-[12.5px] text-muted sm:text-sm">Yuk lanjutkan aksi pelestarian alam Bali hari ini.</p>
            </div>
        </div>

        <div>
            <button type="button" onclick="if(typeof openBaliElingScannerSafe==='function')openBaliElingScannerSafe()" class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-xs font-extrabold text-white shadow-md shadow-primary/25 transition hover:bg-forest active:scale-[0.98] sm:w-auto sm:text-sm">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-18h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2"/><circle cx="12" cy="12" r="3"/></svg>
                <span>Scan Sampah Sekarang (AI)</span>
            </button>
        </div>
    </div>

    <!-- ===== GAMIFIKASI PALEMAHAN & DAILY QUESTS ===== -->
    <div id="gamifikasiPalemahan" class="mt-7"></div>

    <!-- ===== STATISTIK BACKEND ===== -->
    @if($stats)
        <section class="mt-7" aria-labelledby="stats-judul">
            <h2 id="stats-judul" class="text-[13px] font-bold uppercase tracking-wide text-muted">Statistik Akunmu (Backend)</h2>
            <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div class="rounded-2xl border border-line bg-white p-4">
                    <p class="text-[11px] font-bold uppercase tracking-wide text-muted">Total Pengajuan</p>
                    <p class="mt-1 text-2xl font-extrabold text-forest">{{ $stats['total'] }}</p>
                </div>
                <div class="rounded-2xl border border-line bg-white p-4">
                    <p class="text-[11px] font-bold uppercase tracking-wide text-muted">Pending</p>
                    <p class="mt-1 text-2xl font-extrabold text-forest">{{ $stats['pending'] }}</p>
                </div>
                <div class="rounded-2xl border border-line bg-white p-4">
                    <p class="text-[11px] font-bold uppercase tracking-wide text-muted">Terverifikasi</p>
                    <p class="mt-1 text-2xl font-extrabold text-forest">{{ $stats['approved'] }}</p>
                </div>
                <div class="rounded-2xl border border-line bg-white p-4">
                    <p class="text-[11px] font-bold uppercase tracking-wide text-muted">XP Balance</p>
                    <p class="mt-1 text-2xl font-extrabold text-forest">{{ $stats['xp'] }}</p>
                </div>
                <div class="rounded-2xl border border-line bg-white p-4">
                    <p class="text-[11px] font-bold uppercase tracking-wide text-muted">Level</p>
                    <p class="mt-1 text-2xl font-extrabold text-forest">{{ $stats['level'] }}</p>
                    <p class="text-xs text-muted">{{ $stats['levelTitle'] }}</p>
                </div>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
                <a href="{{ route('challenges.index') }}" class="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-forest">Lihat Tantangan</a>
                <a href="{{ route('riwayat') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Riwayat Aksi</a>
                <a href="{{ route('rewards.index') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Eling Rewards</a>
                <a href="{{ route('profil.edit') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Edit Profil</a>
            </div>
        </section>
    @endif

    <!-- ===== GRID ===== -->
    <div class="mt-7 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-8">
        <div class="contents lg:col-span-5 lg:flex lg:flex-col lg:gap-6">
            <!-- Dampak -->
            <section class="order-1" aria-labelledby="dampak-judul">
                <div class="grad-dampak rounded-2xl p-5 text-white shadow-lg shadow-forest/15 sm:p-7">
                    <h2 id="dampak-judul" class="text-[13px] font-bold uppercase tracking-wide text-white/80">Dampakmu Hari Ini</h2>
                    <div class="mt-5 grid grid-cols-2 divide-x divide-white/20">
                        <div class="pr-4">
                            <p id="statBerat" class="text-[26px] font-extrabold leading-none sm:text-4xl">3.2 kg</p>
                            <p class="mt-2 text-[11.5px] text-white/80 sm:text-sm">Sampah terpilah</p>
                        </div>
                        <div class="pl-5">
                            <p id="statHari" class="text-[26px] font-extrabold leading-none sm:text-4xl">12</p>
                            <p class="mt-2 text-[11.5px] text-white/80 sm:text-sm">Hari berkontribusi</p>
                        </div>
                    </div>
                    <a href="{{ route('home') }}#peta" class="mt-6 inline-flex items-center gap-1.5 text-[12px] font-bold text-white/90 underline-offset-4 hover:underline sm:text-sm">
                        Titip sampah di lokasi terdekat
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </a>
                </div>
            </section>

            <!-- Tips hari ini -->
            <section class="order-3" aria-labelledby="tips-judul">
                <div class="rounded-2xl border border-line bg-white p-5 sm:p-6">
                    <div class="flex gap-3.5">
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/12" aria-hidden="true">
                            <svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                        </span>
                        <div>
                            <p id="tips-judul" class="text-[13.5px] font-bold text-forest sm:text-base">Tips Hari Ini</p>
                            <p id="tipHariIni" class="mt-1 text-[12.5px] leading-relaxed text-muted sm:text-sm">Memuat tips…</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Jenis tempat penerima sampah -->
        <section id="lokasi" class="order-2 lg:col-span-7 lg:col-start-6 lg:row-start-1" aria-labelledby="lokasi-judul">
            <h2 id="lokasi-judul" class="text-[18px] font-extrabold tracking-tight text-forest sm:text-2xl">Ke Mana Sampahmu Pergi?</h2>
            <p class="mt-1.5 text-[12.5px] leading-relaxed text-muted sm:text-[13.5px]">
                Enam jenis tempat yang menerima sampah. Nama, layanan, dan jam buka
                tiap daerah berbeda — cari yang paling dekat denganmu.
            </p>

            <ul id="daftarTempat" class="mt-4 space-y-3">
                @foreach ($jenisTempat as $tempat)
                    <li class="rounded-2xl border border-line bg-white p-4 sm:p-5">
                        <div class="flex items-start gap-3">
                            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11" style="background: {{ $tempat['warna'] }}1f" aria-hidden="true"></span>
                            <div class="min-w-0 flex-1">
                                <p class="text-[13.5px] font-bold text-forest sm:text-base">{{ $tempat['nama'] }}</p>
                                <p class="mt-1 text-[12px] leading-relaxed text-muted sm:text-[13px]">{{ $tempat['cara'] }}</p>
                                <ul class="mt-2.5 flex flex-wrap gap-1.5">
                                    @foreach ($tempat['terima'] as $terima)
                                        <li class="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-forest sm:text-[11px]">{{ $terima }}</li>
                                    @endforeach
                                </ul>
                                <p class="mt-2.5 text-[11.5px] leading-relaxed sm:text-[12.5px]"><strong class="text-forest">Cara menemukan:</strong> {{ $tempat['caraCari'] }}</p>
                            </div>
                        </div>
                    </li>
                @endforeach
            </ul>

            <p class="mt-5 rounded-2xl border border-line bg-cream px-5 py-4 text-[12px] leading-relaxed text-muted sm:text-[13px]">
                <strong class="text-ink">Situs ini tidak menampilkan nama usaha tertentu.</strong>
                Jam buka, layanan, dan tarif tiap tempat bisa berubah sewaktu-waktu.
                Tanyakan langsung ke balai banjar, kelurahan, atau kantor desa di
                daerahmu untuk mengetahui lokasi yang masih beroperasi.
            </p>
        </section>
    </div>
</main>

@include('partials.public-footer')

@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection

@push('styles')
<style>
    .grad-dampak {
        background: linear-gradient(120deg, #14532d 0%, #17803d 55%, #1f9a4e 100%);
    }
</style>
@endpush

@push('scripts')
@php
    $jsv = static fn (string $file): int => filemtime(public_path($file));
@endphp
<script>
    window.BALI_MODEL_BASE = @json(asset('model') . '/');

    window.openBaliElingScannerSafe = function () {
        if (typeof window.openBaliElingScanner === 'function') return window.openBaliElingScanner();
        if (typeof window.openScanner === 'function') return window.openScanner();
        console.warn('Fungsi AI Scanner belum ditemukan. Periksa public/js/ai_scanner.js.');
        alert('Fitur AI Scanner belum tersedia. Periksa file ai_scanner.js.');
    };
</script>
<script src="{{ asset('js/data_sampah.js') }}?v={{ $jsv('js/data_sampah.js') }}"></script>
<script src="{{ asset('js/data_lokasi.js') }}?v={{ $jsv('js/data_lokasi.js') }}"></script>
<script src="{{ asset('js/data_lokasi_peta.js') }}?v={{ $jsv('js/data_lokasi_peta.js') }}"></script>
<script src="{{ asset('js/peta.js') }}?v={{ $jsv('js/peta.js') }}"></script>
<script src="{{ asset('model/model_config.js') }}?v={{ $jsv('model/model_config.js') }}"></script>
<script src="{{ asset('js/ai_scanner.js') }}?v={{ $jsv('js/ai_scanner.js') }}"></script>
<script src="{{ asset('js/eco_action.js') }}?v={{ $jsv('js/eco_action.js') }}"></script>
<script src="{{ asset('js/chat.js') }}?v={{ $jsv('js/chat.js') }}"></script>
<script>
    (function () {
        function angka(key, fallback) {
            var v = localStorage.getItem(key);
            return v === null ? fallback : v;
        }
        var berat = document.getElementById('statBerat');
        var hari = document.getElementById('statHari');
        if (berat) berat.textContent = angka('eling.berat', '3.2') + ' kg';
        if (hari) hari.textContent = angka('eling.hari', '12');
        var tip = document.getElementById('tipHariIni');
        if (tip && typeof tipsHariIni === 'function') tip.textContent = tipsHariIni();
    })();
</script>
@endpush
