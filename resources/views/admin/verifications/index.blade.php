@extends('layouts.app')

@section('title', 'Verifikasi Aksi — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.dashboard') }}" class="text-sm font-bold text-primary hover:underline">← Dashboard Admin</a>
    <h1 class="mt-3 text-3xl font-extrabold tracking-tight text-forest">Verifikasi Aksi</h1>

    <div class="mt-6 flex flex-wrap gap-2">
        <a href="{{ route('admin.verifications.index', ['status' => 'pending']) }}" class="rounded-xl px-4 py-2 text-sm font-bold {{ $status === 'pending' ? 'bg-primary text-white' : 'border border-line bg-white text-forest' }}">Pending ({{ $counts['pending'] }})</a>
        <a href="{{ route('admin.verifications.index', ['status' => 'approved']) }}" class="rounded-xl px-4 py-2 text-sm font-bold {{ $status === 'approved' ? 'bg-primary text-white' : 'border border-line bg-white text-forest' }}">Disetujui ({{ $counts['approved'] }})</a>
        <a href="{{ route('admin.verifications.index', ['status' => 'rejected']) }}" class="rounded-xl px-4 py-2 text-sm font-bold {{ $status === 'rejected' ? 'bg-primary text-white' : 'border border-line bg-white text-forest' }}">Ditolak ({{ $counts['rejected'] }})</a>
    </div>

    <form method="GET" class="mt-4">
        <input type="hidden" name="status" value="{{ $status }}">
        <input name="q" value="{{ $q }}" placeholder="Cari nama/email pengguna" class="rounded-xl border border-line bg-white px-3 py-2 text-sm">
        <button class="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white">Cari</button>
    </form>

    @if(session('status'))
        <div class="mt-5 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">{{ session('status') }}</div>
    @endif

    <div class="mt-6 space-y-3">
        @forelse($submissions as $s)
            <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4">
                <div>
                    <p class="text-sm font-bold text-forest">{{ $s->challenge->name }}</p>
                    <p class="text-xs text-muted">{{ $s->user->name }} · {{ $s->submitted_at?->format('d M Y H:i') }} · {{ $s->challenge->xp_reward }} XP · {{ $s->status }}</p>
                </div>
                <a href="{{ route('admin.verifications.show', $s) }}" class="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-forest">Periksa</a>
            </div>
        @empty
            <p class="text-sm text-muted">Tidak ada pengajuan dengan filter ini.</p>
        @endforelse
    </div>
    <div class="mt-6">{{ $submissions->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
