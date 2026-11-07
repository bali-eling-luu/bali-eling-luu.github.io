@extends('layouts.app')

@section('title', 'Kelola Reward — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.dashboard') }}" class="text-sm font-bold text-primary hover:underline">← Dashboard Admin</a>
    <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 class="text-3xl font-extrabold tracking-tight text-forest">Kelola Reward</h1>
        <a href="{{ route('admin.rewards.create') }}" class="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-forest">Tambah Reward</a>
    </div>

    @if(session('status'))
        <div class="mt-5 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">{{ session('status') }}</div>
    @endif

    <div class="mt-6 space-y-3">
        @forelse($rewards as $r)
            <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4">
                <div>
                    <p class="text-sm font-bold text-forest">{{ $r->name }} <span class="font-normal text-muted">· {{ $r->xp_cost }} XP · Stok {{ $r->stock }} · {{ $r->is_active ? 'Aktif' : 'Nonaktif' }}</span></p>
                </div>
                <div class="flex gap-2">
                    <a href="{{ route('admin.rewards.edit', $r) }}" class="rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-forest hover:border-primary hover:text-primary">Edit</a>
                    <form method="POST" action="{{ route('admin.rewards.destroy', $r) }}" onsubmit="return confirm('Hapus reward ini?')">
                        @csrf @method('DELETE')
                        <button class="rounded-xl border border-danger/30 bg-white px-3 py-2 text-sm font-bold text-danger">Hapus</button>
                    </form>
                </div>
            </div>
        @empty
            <p class="text-sm text-muted">Belum ada reward.</p>
        @endforelse
    </div>
    <div class="mt-6">{{ $rewards->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
