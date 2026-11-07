@extends('layouts.app')

@section('title', 'Tantangan Harian — Bali Eling Luu')
@section('description', 'Daftar tantangan harian Bali Eling Luu. Lakukan aksi, unggah bukti, kumpulkan XP Palemahan.')

@section('content')
@include('partials.public-header', ['navAktif' => 'panduan'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Tantangan Harian</p>
    <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Lakukan Aksi, Buktikan, Raih XP</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Selesaikan tantangan dengan bukti foto. XP hanya diberikan setelah admin memverifikasi pengajuanmu — bukan sekadar tombol centang.
    </p>

    @if(session('status'))
        <div class="mt-6 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">
            {{ session('status') }}
        </div>
    @endif

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @forelse($challenges as $challenge)
            <article class="flex flex-col rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-forest/10">
                <div class="flex items-center justify-between gap-2">
                    <span class="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold text-forest">{{ $challenge->category }}</span>
                    <span class="rounded-full bg-forest px-3 py-1 text-[11px] font-bold text-white">{{ $challenge->xp_reward }} XP</span>
                </div>
                <h2 class="mt-3 text-lg font-extrabold leading-snug text-forest">{{ $challenge->name }}</h2>
                <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ $challenge->description }}</p>
                <div class="mt-5 flex gap-2">
                    <a href="{{ route('challenges.show', $challenge) }}" class="flex-1 rounded-xl border border-line bg-white px-4 py-2.5 text-center text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Detail</a>
                    @auth
                        <a href="{{ route('aksi.create', $challenge) }}" class="flex-1 rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-forest">Kirim Bukti</a>
                    @else
                        <a href="{{ route('login') }}" class="flex-1 rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-forest">Masuk untuk Ikut</a>
                    @endauth
                </div>
            </article>
        @empty
            <div class="col-span-full rounded-2xl border border-dashed border-line bg-white p-8 text-center">
                <p class="text-sm font-bold text-forest">Belum ada tantangan aktif.</p>
                <p class="mt-1 text-sm text-muted">Silakan cek lagi nanti.</p>
            </div>
        @endforelse
    </div>

    <div class="mt-8">{{ $challenges->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'panduan'])
@endsection
