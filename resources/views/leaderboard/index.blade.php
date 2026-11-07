@extends('layouts.app')

@section('title', 'Leaderboard — Bali Eling Luu')
@section('description', 'Peringkat kontributor Bali Eling Luu berdasarkan total XP.')

@section('content')
@include('partials.public-header', ['navAktif' => null])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <h1 class="text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Leaderboard</h1>
    <p class="mt-2 text-sm text-muted">20 besar berdasarkan total XP. Nama tampil tanpa kontak pribadi.</p>

    <div class="mt-8 space-y-3">
        @forelse($leaders as $i => $user)
            <div class="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4">
                <div class="flex items-center gap-3">
                    <span class="grid h-10 w-10 place-items-center rounded-full {{ $i < 3 ? 'bg-forest text-white' : 'bg-primary/12 text-forest' }} text-sm font-extrabold">{{ $i + 1 }}</span>
                    <div>
                        <p class="text-sm font-bold text-forest">{{ $user->name }}</p>
                        <p class="text-xs text-muted">{{ $user->levelTitle() }} · {{ $user->approved_count }} terverifikasi</p>
                    </div>
                </div>
                <p class="text-lg font-extrabold text-forest">{{ $user->xp_balance }} <span class="text-xs font-bold text-muted">XP</span></p>
            </div>
        @empty
            <p class="text-sm text-muted">Belum ada data. Jadilah yang pertama berkontribusi!</p>
        @endforelse
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => null])
@endsection
