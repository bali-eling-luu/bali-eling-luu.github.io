@extends('layouts.app')

@section('title', 'Dashboard Admin — Bali Eling Luu')
@section('description', 'Statistik dan ringkasan pengguna Bali Eling Luu untuk admin.')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Area Admin</p>
            <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Dashboard Admin</h1>
            <p class="mt-2 text-sm text-muted">Ringkasan pengguna, pengajuan, dan XP.</p>
        </div>
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Keluar</button>
        </form>
    </div>

    @if(session('status'))
        <div class="mt-6 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">
            {{ session('status') }}
        </div>
    @endif

    <div class="mt-8 flex flex-wrap gap-2">
        <a href="{{ route('admin.users.index') }}" class="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-forest">Kelola Pengguna</a>
        <a href="{{ route('admin.challenges.index') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Kelola Tantangan</a>
        <a href="{{ route('admin.verifications.index') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Verifikasi Aksi ({{ $pendingSubmissions }})</a>
        <a href="{{ route('admin.xp.index') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Riwayat XP</a>
        <a href="{{ route('admin.rewards.index') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Kelola Reward</a>
        <a href="{{ route('admin.redemptions.index') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Penukaran</a>
        <a href="{{ route('admin.audit.index') }}" class="rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Audit Log</a>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-2xl border border-line bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-muted">Total Pengguna</p>
            <p class="mt-2 text-3xl font-extrabold text-forest">{{ $totalUsers }}</p>
            <p class="text-xs text-muted">{{ $adminUsers }} admin · {{ $regularUsers }} user</p>
        </div>
        <div class="rounded-2xl border border-line bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-muted">Pengajuan</p>
            <p class="mt-2 text-3xl font-extrabold text-forest">{{ $totalSubmissions }}</p>
            <p class="text-xs text-muted">Pending {{ $pendingSubmissions }} · Disetujui {{ $approvedSubmissions }} · Ditolak {{ $rejectedSubmissions }}</p>
        </div>
        <div class="rounded-2xl border border-line bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-muted">Total XP</p>
            <p class="mt-2 text-3xl font-extrabold text-forest">{{ number_format($totalXp) }}</p>
            <p class="text-xs text-muted">{{ $totalXpTransactions }} transaksi</p>
        </div>
        <div class="rounded-2xl border border-line bg-white p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-muted">Sampah Terverifikasi</p>
            <p class="mt-2 text-3xl font-extrabold text-forest">{{ number_format($totalWeight, 2) }} kg</p>
            <p class="text-xs text-muted">{{ $activeChallenges }}/{{ $totalChallenges }} tantangan aktif</p>
        </div>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h2 class="text-base font-extrabold text-forest">Pengajuan Terbaru</h2>
            @forelse($recentSubmissions as $s)
                <div class="flex items-center justify-between border-b border-line py-3 last:border-0">
                    <div>
                        <p class="text-sm font-bold text-forest">{{ $s->challenge->name }}</p>
                        <p class="text-xs text-muted">{{ $s->user->name }} · {{ $s->submitted_at?->format('d M Y H:i') }}</p>
                    </div>
                    <a href="{{ route('admin.verifications.show', $s) }}" class="text-xs font-bold text-primary hover:underline">Detail</a>
                </div>
            @empty
                <p class="mt-3 text-sm text-muted">Belum ada pengajuan.</p>
            @endforelse
        </div>
        <div class="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h2 class="text-base font-extrabold text-forest">Pengguna Terbaru</h2>
            @forelse($recentUsers as $u)
                <div class="flex items-center justify-between border-b border-line py-3 last:border-0">
                    <div>
                        <p class="text-sm font-bold text-forest">{{ $u->name }}</p>
                        <p class="text-xs text-muted">{{ $u->email }} · {{ $u->role }}</p>
                    </div>
                    <span class="text-xs font-bold text-muted">{{ $u->xp_balance }} XP</span>
                </div>
            @empty
                <p class="mt-3 text-sm text-muted">Belum ada pengguna.</p>
            @endforelse
        </div>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
