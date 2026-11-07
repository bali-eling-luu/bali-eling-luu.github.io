@extends('layouts.app')

@section('title', 'Panduan Sampah — Bali Eling Luu')

@section('description', 'Empat jenis utama sampah yang perlu kamu kenali beserta pengaruh dan pengolahannya.')

@section('content')
@include('partials.public-header', ['navAktif' => 'panduan'])

<main class="mx-auto max-w-shell px-5 pb-28 pt-8 sm:pb-24 lg:pb-16 lg:pt-14">
    <!-- ===== JUDUL ===== -->
    <div class="max-w-3xl">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-forest">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 20c0-5 2.5-7.5 7-8.5-.8 5-3.5 7.5-7 8.5Z"/><path d="M11 20V9"/><path d="M9 6.5 11 4l2 2.5"/></svg>
            Panduan Memilah
        </span>

        <h1 class="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-forest sm:text-4xl lg:text-5xl">
            Pilah Sampah dengan Benar
        </h1>
        <p class="mt-3 text-[13.5px] leading-relaxed text-muted sm:text-base">
            Empat jenis utama sampah yang perlu kamu kenali beserta pengaruh dan pengolahannya.
        </p>
    </div>

    <!-- ===== 4 KATEGORI ===== -->
    <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-12 lg:grid-cols-4">
        <a href="{{ route('edukasi', ['jenis' => 'organik']) }}" class="group flex flex-col rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-forest/10 sm:p-6">
            <img src="{{ asset('assets/foto-jenis-sampah/organik.webp') }}"
                 alt="Canang sari dan sisa organik di halaman pura"
                 loading="lazy"
                 class="mb-4 h-24 w-full rounded-xl object-cover sm:h-32">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-primary/12 text-xl sm:h-12 sm:w-12 sm:text-2xl" aria-hidden="true">Organik</span>
            <h2 class="mt-3 text-[15px] font-bold text-forest sm:mt-4 sm:text-lg">Organik</h2>
            <p class="mt-1 text-[11.5px] leading-snug text-muted sm:mt-1.5 sm:text-sm sm:leading-relaxed">Daun, sisa makanan, kertas</p>
            <span class="mt-3 inline-flex w-fit rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold text-forest sm:text-xs">Mengurai</span>
            <p class="mt-2 text-[11px] text-muted sm:mt-3 sm:text-xs">→ Masuk kompos</p>
            <span class="mt-auto pt-4 text-[12px] font-bold text-primary group-hover:underline sm:pt-5 sm:text-sm">Pelajari →</span>
        </a>

        <a href="{{ route('edukasi', ['jenis' => 'anorganik']) }}" class="group flex flex-col rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-forest/10 sm:p-6">
            <img src="{{ asset('assets/foto-jenis-sampah/anorganik.webp') }}"
                 alt="Tumpukan botol dan sampah plastik di pantai"
                 loading="lazy"
                 class="mb-4 h-24 w-full rounded-xl object-cover sm:h-32">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-terra/15 text-xl sm:h-12 sm:w-12 sm:text-2xl" aria-hidden="true">Anorganik</span>
            <h2 class="mt-3 text-[15px] font-bold text-forest sm:mt-4 sm:text-lg">Anorganik</h2>
            <p class="mt-1 text-[11.5px] leading-snug text-muted sm:mt-1.5 sm:text-sm sm:leading-relaxed">Botol, kaleng, kertas</p>
            <span class="mt-3 inline-flex w-fit rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold text-forest sm:text-xs">Daur ulang</span>
            <p class="mt-2 text-[11px] text-muted sm:mt-3 sm:text-xs">→ Bank sampah</p>
            <span class="mt-auto pt-4 text-[12px] font-bold text-primary group-hover:underline sm:pt-5 sm:text-sm">Pelajari →</span>
        </a>

        <a href="{{ route('edukasi', ['jenis' => 'b3']) }}" class="group flex flex-col rounded-2xl border border-danger/30 bg-white p-4 transition hover:-translate-y-1 hover:border-danger/50 hover:shadow-lg hover:shadow-forest/10 sm:p-6">
            <img src="{{ asset('assets/foto-jenis-sampah/b3.webp') }}"
                 alt="Layar monitor lawas dan botol kimia — sampah B3"
                 loading="lazy"
                 class="mb-4 h-24 w-full rounded-xl object-cover sm:h-32">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-danger/15 text-xl sm:h-12 sm:w-12 sm:text-2xl" aria-hidden="true">B3</span>
            <h2 class="mt-3 text-[15px] font-bold text-forest sm:mt-4 sm:text-lg">B3 / Berbahaya</h2>
            <p class="mt-1 text-[11.5px] leading-snug text-muted sm:mt-1.5 sm:text-sm sm:leading-relaxed">Baterai, lampu, obat</p>
            <span class="mt-3 inline-flex w-fit rounded-full bg-danger px-2.5 py-1 text-[10px] font-bold text-white sm:text-xs">Beracun</span>
            <p class="mt-2 text-[11px] text-muted sm:mt-3 sm:text-xs">→ Dropbox khusus</p>
            <span class="mt-auto pt-4 text-[12px] font-bold text-primary group-hover:underline sm:pt-5 sm:text-sm">Pelajari →</span>
        </a>

        <a href="{{ route('edukasi', ['jenis' => 'residu']) }}" class="group flex flex-col rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-forest/10 sm:p-6">
            <img src="{{ asset('assets/foto-jenis-sampah/residu.webp') }}"
                 alt="Sampah residu berserakan di tepi pantai"
                 loading="lazy"
                 class="mb-4 h-24 w-full rounded-xl object-cover sm:h-32">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-muted/10 text-xl sm:h-12 sm:w-12 sm:text-2xl" aria-hidden="true">Residu</span>
            <h2 class="mt-3 text-[15px] font-bold text-forest sm:mt-4 sm:text-lg">Residu</h2>
            <p class="mt-1 text-[11.5px] leading-snug text-muted sm:mt-1.5 sm:text-sm sm:leading-relaxed">Styrofoam, tisu, pembalut</p>
            <span class="mt-3 inline-flex w-fit rounded-full bg-muted/15 px-2.5 py-1 text-[10px] font-bold text-ink sm:text-xs">Tidak terurai</span>
            <p class="mt-2 text-[11px] text-muted sm:mt-3 sm:text-xs">→ Lingkungan TPA</p>
            <span class="mt-auto pt-4 text-[12px] font-bold text-primary group-hover:underline sm:pt-5 sm:text-sm">Pelajari →</span>
        </a>
    </div>

    <!-- ===== LANGKAH PRAKTIS ===== -->
    <div class="mt-12 lg:mt-20">
        <div class="max-w-3xl">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Praktik</p>
            <h2 class="mt-2 text-[18px] font-extrabold tracking-tight text-forest sm:text-3xl">Langkah Praktis Hari Ini</h2>
        </div>

        <ul class="mt-6 grid gap-3 sm:gap-5 md:grid-cols-3">
            <li class="flex gap-3 rounded-2xl border border-line bg-white p-4 sm:p-6">
                <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-white" aria-hidden="true">✓</span>
                <div>
                    <p class="text-[13.5px] font-bold text-forest sm:text-base">Pilah dari rumah</p>
                    <p class="mt-1 text-[12px] leading-relaxed text-muted sm:mt-1.5 sm:text-sm">Pisahkan organik, anorganik, residu, dan B3 di tempatnya.</p>
                </div>
            </li>
            <li class="flex gap-3 rounded-2xl border border-line bg-white p-4 sm:p-6">
                <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-white" aria-hidden="true">✓</span>
                <div>
                    <p class="text-[13.5px] font-bold text-forest sm:text-base">Bilas kemasan</p>
                    <p class="mt-1 text-[12px] leading-relaxed text-muted sm:mt-1.5 sm:text-sm">Kemasan kotor mengurangi nilai daur ulang.</p>
                </div>
            </li>
            <li class="flex gap-3 rounded-2xl border border-line bg-white p-4 sm:p-6">
                <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-white" aria-hidden="true">✓</span>
                <div>
                    <p class="text-[13.5px] font-bold text-forest sm:text-base">Cari bank sampah</p>
                    <p class="mt-1 text-[12px] leading-relaxed text-muted sm:mt-1.5 sm:text-sm">Serahkan sampah anorganik ke bank sampah atau TPS3R terdekat.</p>
                </div>
            </li>
        </ul>
    </div>

    <!-- ===== CTA + CATATAN ===== -->
    <div class="mt-12 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div class="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 class="text-[18px] font-extrabold tracking-tight text-forest sm:text-2xl">Siap memilah?</h2>
            <p class="mt-2 text-[13px] leading-relaxed text-muted sm:text-sm">
                Temukan bank sampah atau TPS terdekat dari rumahmu, atau tanya langsung ke Asisten Eling.
            </p>
            <div class="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="button" id="ctaLokasi"
                        class="w-full rounded-xl bg-primary px-8 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-forest active:scale-[0.99] sm:w-auto">
                    Cari Bank Sampah / TPS Terdekat
                </button>
                <button type="button" id="ctaTanya"
                        class="w-full rounded-xl border border-line bg-white px-8 py-3.5 text-[14px] font-bold text-forest transition hover:border-primary hover:text-primary sm:w-auto">
                    Tanya Asisten Eling
                </button>
            </div>
        </div>

        <p class="rounded-2xl border border-line bg-cream px-5 py-5 text-[12.5px] leading-relaxed text-muted sm:text-sm">
            <strong class="text-ink">Catatan:</strong> Tidak semua barang dalam satu
            kategori bisa langsung didaur ulang. Selalu ikuti ketentuan dan fasilitas
            pengelolaan sampah setempat.
        </p>
    </div>
</main>

@include('partials.public-footer')

@include('partials.bottom-nav', ['navAktif' => 'panduan'])
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
        var ctaLokasi = document.getElementById('ctaLokasi');
        if (ctaLokasi) {
            ctaLokasi.addEventListener('click', function () {
                if (window.ElingChat) window.ElingChat.buka('Cara mencari bank sampah atau TPS terdekat');
            });
        }
        var ctaTanya = document.getElementById('ctaTanya');
        if (ctaTanya) {
            ctaTanya.addEventListener('click', function () {
                if (window.ElingChat) window.ElingChat.buka();
            });
        }
    })();
</script>
@endpush
