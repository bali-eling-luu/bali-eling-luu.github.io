@extends('layouts.app')

@section('title', 'Permintaan Penukaran — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.dashboard') }}" class="text-sm font-bold text-primary hover:underline">← Dashboard Admin</a>
    <h1 class="mt-3 text-3xl font-extrabold tracking-tight text-forest">Permintaan Penukaran</h1>
    <p class="mt-1 text-sm text-muted">Proses dalam status: pending → approved → processing → completed (semua DEMO).</p>

    <div class="mt-6 flex flex-wrap gap-2">
        @foreach(['' => 'Semua', 'pending' => 'Pending', 'approved' => 'Disetujui', 'processing' => 'Diproses', 'completed' => 'Selesai', 'rejected' => 'Ditolak'] as $val => $label)
            <a href="{{ route('admin.redemptions.index', $val ? ['status' => $val] : []) }}" class="rounded-xl px-4 py-2 text-sm font-bold {{ $status === $val ? 'bg-primary text-white' : 'border border-line bg-white text-forest' }}">{{ $label }}</a>
        @endforeach
    </div>

    <div class="mt-6 space-y-3">
        @forelse($redemptions as $r)
            <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4">
                <div>
                    <p class="text-sm font-bold text-forest">{{ $r->reward->name }} <span class="font-normal text-muted">· {{ $r->xp_cost_snapshot }} XP {{ $r->is_demo ? '(DEMO)' : '' }}</span></p>
                    <p class="text-xs text-muted">{{ $r->user->name }} · {{ $r->status }} · {{ $r->created_at?->format('d M Y H:i') }}</p>
                </div>
                <a href="{{ route('admin.redemptions.show', $r) }}" class="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-forest">Detail</a>
            </div>
        @empty
            <p class="text-sm text-muted">Tidak ada penukaran.</p>
        @endforelse
    </div>
    <div class="mt-6">{{ $redemptions->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
