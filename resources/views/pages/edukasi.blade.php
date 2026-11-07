@extends('layouts.app')

@php
    $semuaKategori = [
        'organik' => [
            'nama' => 'Organik',
            'ikon' => 'Organik',
            'ringkas' => 'Sampah yang mudah terurai secara alami.',
            'definisi' => 'Sampah organik adalah sisa makhluk hidup yang dapat terurai secara alami oleh mikroorganisme menjadi kompos atau humus.',
            'contoh' => [
                'Sisa makanan dan nasi',
                'Daun kering, ranting, rumput',
                'Kulit buah dan sayur',
                'Ampas teh, kopi',
                'Tulang ikan dan daging',
            ],
            'penanganan' => [
                'Pisahkan dari sampah lain sejak dari sumbernya.',
                'Gunakan wadah tertutup agar tidak berbau.',
                'Olah jadi kompos rumahan atau serahkan ke bank sampah organik.',
                'Hindari mencampur dengan plastik agar proses penguraian tidak terganggu.',
            ],
            'peringatan' => 'Sisa makanan berminyak atau bersantan tetap perlu ditangani hati-hati karena bisa menimbulkan bau dan menarik hama.',
            'foto' => asset('assets/foto-jenis-sampah/organik.webp'),
        ],
        'anorganik' => [
            'nama' => 'Anorganik',
            'ikon' => 'Anorganik',
            'ringkas' => 'Material yang berpotensi dipakai ulang atau didaur ulang.',
            'definisi' => 'Sampah anorganik berasal dari bahan buatan manusia yang tidak mudah terurai, seperti plastik, kaca, logam, dan kertas.',
            'contoh' => [
                'Botol dan kemasan plastik',
                'Kaleng minuman dan makanan',
                'Kardus, koran, buku',
                'Botol kaca',
                'Piring dan gelas pecah',
            ],
            'penanganan' => [
                'Bilas sisa makanan sebelum menaruh kemasan.',
                'Pisahkan per jenis: plastik, kertas, logam, kaca.',
                'Lipat kardus agar hemat tempat.',
                'Serahkan ke bank sampah atau pengepul terdekat.',
            ],
            'peringatan' => 'Tidak semua plastik bisa didaur ulang. Plastik bernomor 3 (PVC) dan 7 sering sulit diproses — ikuti ketentuan fasilitas pengelolaan setempat.',
            'foto' => asset('assets/foto-jenis-sampah/anorganik.webp'),
        ],
        'residu' => [
            'nama' => 'Residu',
            'ikon' => 'Residu',
            'ringkas' => 'Tidak dapat diproses lewat jalur daur ulang yang tersedia.',
            'definisi' => 'Residu adalah sisa sampah yang setelah dipilah tidak dapat didaur ulang lagi, sehingga harus dibuang ke TPA.',
            'contoh' => [
                'Tisu bekas dan popok',
                'Pembalut dan produk kebersihan',
                'Sikat gigi dan spons',
                'Sedotan plastik kotor',
                'Styrofoam tercampur makanan',
            ],
            'penanganan' => [
                'Keringkan dulu agar tidak menimbulkan bau.',
                'Bungkus rapat sebelum dibuang.',
                'Gunakan wadah residu khusus di rumah.',
                'Kurangi pemakaian barang sekali pakai agar volume residu mengecil.',
            ],
            'peringatan' => 'Residu berarti berakhir di TPA. Semakin banyak residu, semakin cepat kapasitas TPA terpakai.',
            'foto' => asset('assets/foto-jenis-sampah/residu.webp'),
        ],
        'b3' => [
            'nama' => 'B3 / Sampah Khusus',
            'ikon' => 'B3',
            'ringkas' => 'Perlu penanganan khusus, jangan dicampur sampah biasa.',
            'definisi' => 'B3 (Bahan Berbahaya dan Beracun) adalah sampah yang mengandung zat berbahaya sehingga berpotensi mencemari lingkungan atau membahayakan kesehatan.',
            'contoh' => [
                'Baterai dan aki',
                'Lampu neon dan lampu LED tertentu',
                'Pil dan obat kadaluarsa',
                'Cat, thinner, pestisida',
                'Jarum suntik dan alat kesehatan',
                'Elektronik rusak (HP, kabel)',
            ],
            'penanganan' => [
                'JANGAN dibakar atau dicampur sampah rumah tangga.',
                'Simpan di wadah tertutup dan jauh dari jangkauan anak.',
                'Serahkan ke drop box B3, apotek, atau kegiatan pengumpulan khusus.',
                'Elektronik rusak: bawa ke pengepul elektronik resmi.',
            ],
            'peringatan' => 'B3 bisa mencemari tanah dan air tanah bila dibuang sembarangan. Penanganannya wajib lewat jalur khusus.',
            'foto' => asset('assets/foto-jenis-sampah/b3.webp'),
        ],
    ];

    $topikTerkait = [
        'organik' => 'Cara memilah sampah di rumah',
        'anorganik' => 'Mengurangi plastik',
        'residu' => 'Bedanya residu dan B3',
        'b3' => 'Kenapa B3 bahaya',
    ];

    $key = in_array($jenis ?? null, array_keys($semuaKategori), true) ? $jenis : 'anorganik';
    $k = $semuaKategori[$key];
    $judul = $k['nama'] . ' — Jenis Sampah';
    $topik = $topikTerkait[$key] ?? null;
@endphp

@section('title', $judul . ' — Bali Eling Luu')

@section('description', $k['ringkas'] . ' Pengertian, contoh, dan cara menangani sampah ' . $k['nama'] . '.')

@section('content')
@include('partials.public-header', ['navAktif' => 'edukasi'])

<main class="mx-auto max-w-shell px-5 pb-28 pt-8 sm:pb-24 lg:pb-16 lg:pt-14" id="isi">
    <nav aria-label="Breadcrumb" class="mb-6 hidden text-sm text-muted lg:block">
        <a href="{{ route('home') }}" class="transition hover:text-primary">Beranda</a> /
        <a href="{{ route('panduan') }}" class="transition hover:text-primary">Panduan Sampah</a> /
        <span class="font-semibold text-forest">{{ $k['nama'] }}</span>
    </nav>

    <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-forest">
        <span aria-hidden="true">{{ $k['ikon'] }}</span> Jenis Sampah
    </span>
    <h1 class="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-forest sm:text-4xl lg:text-5xl">{{ $judul }}</h1>

    <!-- Hero card -->
    <div class="mt-6 overflow-hidden rounded-2xl shadow-lg shadow-forest/15 lg:mt-10 lg:flex">
        <div class="h-32 w-full overflow-hidden sm:h-44 lg:h-auto lg:w-[40%] lg:shrink-0">
            <img src="{{ $k['foto'] }}" alt="Foto contoh sampah {{ $k['nama'] }}" class="h-full w-full object-cover" loading="lazy">
        </div>
        <div class="bg-forest px-5 py-5 sm:px-8 sm:py-7 lg:flex lg:flex-1 lg:justify-center">
            <div class="max-w-2xl">
                <h2 class="text-[16px] font-extrabold text-white sm:text-2xl">Apa Itu Sampah {{ $k['nama'] }}?</h2>
                <p class="mt-2 text-[12.5px] leading-relaxed text-white/85 sm:mt-3 sm:text-base">{{ $k['definisi'] }}</p>
            </div>
        </div>
    </div>

    <!-- Konten dua kolom di desktop -->
    <div class="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
        <section aria-labelledby="contoh-judul">
            <h2 id="contoh-judul" class="text-[16px] font-extrabold tracking-tight text-forest sm:text-2xl">Contoh Sampah {{ $k['nama'] }}</h2>
            <ul class="mt-4 space-y-2.5">
                @foreach ($k['contoh'] as $contoh)
                    <li class="flex gap-2.5 text-[12.5px] leading-snug text-muted sm:text-sm">
                        <span class="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-primary text-[9px] font-bold text-white" aria-hidden="true">✓</span>
                        <span>{{ $contoh }}</span>
                    </li>
                @endforeach
            </ul>
        </section>
        <section aria-labelledby="penanganan-judul">
            <h2 id="penanganan-judul" class="text-[16px] font-extrabold tracking-tight text-forest sm:text-2xl">Cara Menanganinya</h2>
            <ol class="mt-4 space-y-3">
                @foreach ($k['penanganan'] as $i => $langkah)
                    <li class="flex gap-3 rounded-xl border border-line bg-white p-3.5 sm:p-4">
                        <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary" aria-hidden="true">{{ $i + 1 }}</span>
                        <p class="pt-0.5 text-[12.5px] leading-relaxed text-muted sm:text-sm">{{ $langkah }}</p>
                    </li>
                @endforeach
            </ol>
        </section>
    </div>

    @if (!empty($k['peringatan']))
        <div class="mt-10 rounded-2xl border border-danger/30 bg-danger/8 p-5 sm:mt-14 sm:p-6">
            <p class="text-[11px] font-bold uppercase tracking-wide text-danger">Perhatian</p>
            <p class="mt-1.5 text-[12.5px] leading-relaxed text-muted sm:text-sm">{{ $k['peringatan'] }}</p>
        </div>
    @endif

    <!-- CTA + topik terkait -->
    <div class="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div class="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 class="text-[18px] font-extrabold tracking-tight text-forest sm:text-2xl">Lanjutkan belajar</h2>
            <p class="mt-2 text-[13px] leading-relaxed text-muted sm:text-sm">Cari tahu lokasi pembuangan untuk jenis sampah ini, atau tanya langsung ke asisten.</p>
            <div class="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="button" id="ctaLokasi"
                        class="w-full rounded-xl bg-primary px-8 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-forest active:scale-[0.99] sm:w-auto">Cari Lokasi Pembuangan</button>
                <a href="{{ route('panduan') }}" class="w-full rounded-xl border border-line bg-white px-8 py-3.5 text-center text-[14px] font-bold text-forest transition hover:border-primary hover:text-primary sm:w-auto">Semua Kategori</a>
            </div>
        </div>

        @if ($topik)
            <div class="rounded-2xl border border-line bg-cream p-6 sm:p-8">
                <p class="text-[12.5px] font-bold text-forest sm:text-base">Baca juga</p>
                <p class="mt-0.5 text-[11.5px] text-muted sm:text-sm">Topik yang sering ditanyakan</p>
                <button type="button" data-topik="{{ $topik }}"
                        class="mt-4 w-full rounded-xl bg-forest px-6 py-3 text-[13px] font-bold text-white transition hover:bg-primary active:scale-[0.99] sm:w-auto sm:px-8 sm:text-sm">{{ $topik }}</button>
            </div>
        @endif
    </div>
</main>

@include('partials.public-footer')

@include('partials.bottom-nav', ['navAktif' => 'edukasi'])
@endsection

@push('scripts')
@php
    $jsv = static fn (string $file): int => filemtime(public_path($file));
@endphp
<script>
    window.BALI_MODEL_BASE = @json(asset('model') . '/');

    window.openBaliElingScannerSafe = function () {
        if (typeof window.openBaliElingScanner === 'function') return window.openBaliElingScanner();
        alert('Fitur AI Scanner belum tersedia.');
    };
</script>
<script src="{{ asset('js/data_sampah.js') }}?v={{ $jsv('js/data_sampah.js') }}"></script>
<script src="{{ asset('model/model_config.js') }}?v={{ $jsv('model/model_config.js') }}"></script>
<script src="{{ asset('js/ai_scanner.js') }}?v={{ $jsv('js/ai_scanner.js') }}"></script>
<script src="{{ asset('js/chat.js') }}?v={{ $jsv('js/chat.js') }}"></script>
<script>
    (function () {
        var cta = document.getElementById('ctaLokasi');
        if (cta) {
            cta.addEventListener('click', function () {
                if (window.ElingChat) window.ElingChat.buka('Lokasi pembuangan {{ $k['nama'] }} terdekat');
            });
        }
        var topikBtn = document.querySelector('[data-topik]');
        if (topikBtn) {
            topikBtn.addEventListener('click', function () {
                if (window.ElingChat) window.ElingChat.buka(topikBtn.getAttribute('data-topik'));
            });
        }
    })();
</script>
@endpush
