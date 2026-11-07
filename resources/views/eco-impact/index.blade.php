@extends('layouts.app')

@section('title', 'Eco Impact — Bali Eling Luu')
@section('description', 'Dampak lingkungan Bali Eling Luu dari data database yang valid — aksi terverifikasi, berat disetor, dan lokasi mitra.')

@section('content')
@include('partials.public-header', ['navAktif' => null])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Eco Impact</p>
    <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Dampak Nyata, Terukur</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Semua angka di halaman ini berasal dari database aplikasi. Kami membedakan sampah yang <strong class="text-forest">dipilah</strong> (aksi terverifikasi),
        <strong class="text-forest">dikumpulkan</strong>, dan <strong class="text-forest">disetor ke mitra</strong>. Teks “didaur ulang” hanya dipakai bila tercatat diproses mitra.
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-2xl border border-line bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-muted">Aksi Terverifikasi</p>
            <p class="mt-2 text-3xl font-extrabold text-forest">{{ number_format($totalAksi) }}</p>
            <p class="text-xs text-muted">Pengajuan disetujui admin</p>
        </div>
        <div class="rounded-2xl border border-line bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-muted">Berat Dipilah</p>
            <p class="mt-2 text-3xl font-extrabold text-forest">{{ number_format($beratDipilah, 2) }} kg</p>
            <p class="text-xs text-muted">Dari aksi terverifikasi</p>
        </div>
        <div class="rounded-2xl border border-line bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-muted">Berat Disetor</p>
            <p class="mt-2 text-3xl font-extrabold text-forest">{{ number_format($beratDisetor, 2) }} kg</p>
            <p class="text-xs text-muted">Tercatat di mitra (disetor/diproses)</p>
        </div>
        <div class="rounded-2xl border border-line bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-muted">Lokasi Mitra Aktif</p>
            <p class="mt-2 text-3xl font-extrabold text-forest">{{ number_format($totalLokasi) }}</p>
            <p class="text-xs text-muted">{{ number_format($penggunaAktif) }} pengguna aktif</p>
        </div>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <section class="rounded-2xl border border-line bg-white p-5 sm:p-6" aria-labelledby="klien-judul">
            <h2 id="klien-judul" class="text-base font-extrabold text-forest">Jenis Sampah Terkumpul</h2>
            @forelse($categories as $c)
                <div class="flex items-center justify-between border-b border-line py-2 text-sm last:border-0">
                    <span class="text-muted">{{ $c->waste_category }}</span>
                    <span class="font-bold text-forest">{{ number_format($c->total_kg, 2) }} kg</span>
                </div>
            @empty
                <p class="mt-2 text-sm text-muted">Belum ada setoran tercatat. Data akan muncul setelah mitra mencatat setoran.</p>
            @endforelse
        </section>
        <section class="rounded-2xl border border-line bg-white p-5 sm:p-6" aria-labelledby="wilayah-judul">
            <h2 id="wilayah-judul" class="text-base font-extrabold text-forest">Lokasi Mitra per Wilayah</h2>
            @forelse($partnersByRegency as $p)
                <div class="flex items-center justify-between border-b border-line py-2 text-sm last:border-0">
                    <span class="text-muted">{{ $p->regency }}</span>
                    <span class="font-bold text-forest">{{ $p->total }} lokasi</span>
                </div>
            @empty
                <p class="mt-2 text-sm text-muted">Belum ada lokasi mitra.</p>
            @endforelse
        </section>
    </div>

    <section class="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-6" aria-labelledby="aksi-judul">
        <h2 id="aksi-judul" class="text-base font-extrabold text-forest">Aksi Terverifikasi Terbaru</h2>
        @forelse($recentVerified as $s)
            <div class="flex items-center justify-between border-b border-line py-2 text-sm last:border-0">
                <span class="text-muted"><strong class="text-forest">{{ $s->user->name }}</strong> — {{ $s->challenge->name }}</span>
                <span class="font-bold text-forest">{{ $s->challenge->xp_reward }} XP</span>
            </div>
        @empty
            <p class="mt-2 text-sm text-muted">Belum ada aksi terverifikasi. Jadilah yang pertama!</p>
        @endforelse
    </section>

    <section class="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-6" aria-labelledby="daftar-judul">
        <h2 id="daftar-judul" class="text-base font-extrabold text-forest">Daftar Lokasi Mitra ({{ $lokasiTerdaftar->count() }})</h2>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
            @foreach($lokasiTerdaftar as $loc)
                <div class="rounded-xl bg-cream p-3">
                    <p class="text-sm font-bold text-forest">{{ $loc->name }}</p>
                    <p class="text-xs text-muted">{{ $loc->regency }} · {{ $loc->type }} · {{ $loc->is_verified ? 'Terverifikasi' : 'Perlu konfirmasi' }}</p>
                </div>
            @endforeach
        </div>
        <p class="mt-4 text-xs leading-relaxed text-muted">Lokasi berasal dari Eco Map (18 titik). Status “perlu konfirmasi” means jadwal/kontak belum diaudit — selalu konfirmasi ke banjar/kelurahan setempat.</p>
    </section>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => null])
@endsection
