@extends('layouts.app')

@section('title', 'Riwayat Penukaran — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <h1 class="text-3xl font-extrabold tracking-tight text-forest">Riwayat Penukaran</h1>
    <p class="mt-2 text-sm text-muted">Semua penukaran bersifat <strong class="text-forest">simulasi DEMO</strong>.</p>

    @if(session('status'))
        <div class="mt-6 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">{{ session('status') }}</div>
    @endif

    <div class="mt-6 space-y-3">
        @forelse($redemptions as $r)
            <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4">
                <div>
                    <p class="text-sm font-bold text-forest">{{ $r->reward->name }} <span class="font-normal text-muted">· {{ $r->xp_cost_snapshot }} XP {{ $r->is_demo ? '(DEMO)' : '' }}</span></p>
                    <p class="text-xs text-muted">{{ $r->created_at?->format('d M Y H:i') }} · {{ $r->status }}</p>
                    @if($r->admin_note)<p class="text-xs text-muted">Admin: {{ $r->admin_note }}</p>@endif
                </div>
                <span class="rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-forest">{{ $r->status }}</span>
            </div>
        @empty
            <p class="text-sm text-muted">Belum ada penukaran. <a href="{{ route('rewards.index') }}" class="font-bold text-primary hover:underline">Lihat katalog</a></p>
        @endforelse
    </div>
    <div class="mt-6">{{ $redemptions->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
