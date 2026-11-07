@extends('layouts.app')

@section('title', 'Detail Penukaran — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.redemptions.index') }}" class="text-sm font-bold text-primary hover:underline">← Permintaan Penukaran</a>

    <div class="mx-auto mt-5 max-w-2xl rounded-3xl border border-line bg-white p-6 sm:p-8">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h1 class="text-2xl font-extrabold text-forest">{{ $redemption->reward->name }}</h1>
            <span class="rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-forest">{{ $redemption->status }} {{ $redemption->is_demo ? '(DEMO)' : '' }}</span>
        </div>
        <dl class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt class="font-bold text-forest">User</dt><dd class="text-muted">{{ $redemption->user->name }} ({{ $redemption->user->email }})</dd></div>
            <div><dt class="font-bold text-forest">XP</dt><dd class="text-muted">{{ $redemption->xp_cost_snapshot }} XP</dd></div>
            <div><dt class="font-bold text-forest">Nomor HP</dt><dd class="text-muted">{{ $redemption->phone ?? '-' }}</dd></div>
            <div><dt class="font-bold text-forest">Dibuat</dt><dd class="text-muted">{{ $redemption->created_at?->format('d M Y H:i') }}</dd></div>
            @if($redemption->admin_note)
                <div class="sm:col-span-2"><dt class="font-bold text-forest">Catatan admin</dt><dd class="text-muted">{{ $redemption->admin_note }}</dd></div>
            @endif
        </dl>

        @if($errors->any())
            <div class="mt-4 rounded-xl border border-danger/20 bg-danger/8 px-4 py-3 text-sm font-semibold text-danger" role="alert">
                @foreach($errors->all() as $e)<p>{{ $e }}</p>@endforeach
            </div>
        @endif

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            @if($redemption->status === 'pending')
                <form method="POST" action="{{ route('admin.redemptions.approve', $redemption) }}">@csrf
                    <button class="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-forest">Setujui</button>
                </form>
            @endif
            @if($redemption->status === 'approved')
                <form method="POST" action="{{ route('admin.redemptions.process', $redemption) }}">@csrf
                    <button class="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-forest">Proses (DEMO)</button>
                </form>
            @endif
            @if($redemption->status === 'processing')
                <form method="POST" action="{{ route('admin.redemptions.complete', $redemption) }}">@csrf
                    <button class="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-forest">Selesaikan (DEMO)</button>
                </form>
            @endif
            @if(in_array($redemption->status, ['pending', 'approved', 'processing'], true))
                <form method="POST" action="{{ route('admin.redemptions.reject', $redemption) }}" class="flex-1 space-y-2 min-w-[200px]">
                    @csrf
                    <textarea name="admin_note" required placeholder="Alasan penolakan (XP dikembalikan)" class="w-full rounded-xl border border-line bg-cream p-3 text-sm"></textarea>
                    <button class="w-full rounded-xl bg-danger px-5 py-3 text-sm font-bold text-white">Tolak + Refund XP</button>
                </form>
            @endif
        </div>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
