@extends('layouts.app')

@section('title', 'Audit Log — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.dashboard') }}" class="text-sm font-bold text-primary hover:underline">← Dashboard Admin</a>
    <h1 class="mt-3 text-3xl font-extrabold tracking-tight text-forest">Audit Log</h1>

    <div class="mt-6 space-y-3">
        @forelse($logs as $log)
            <div class="rounded-2xl border border-line bg-white p-4">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <p class="text-sm font-bold text-forest">{{ $log->action }} <span class="font-normal text-muted">#{{ $log->auditable_id }}</span></p>
                    <p class="text-xs text-muted">{{ $log->created_at?->format('d M Y H:i') }} · {{ $log->actor->name ?? 'Sistem' }}</p>
                </div>
                <p class="mt-1 text-xs text-muted">{{ $log->ip_address ?? '' }}</p>
            </div>
        @empty
            <p class="text-sm text-muted">Belum ada log.</p>
        @endforelse
    </div>
    <div class="mt-6">{{ $logs->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
