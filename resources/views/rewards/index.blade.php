@extends('layouts.app')

@section('title', 'Eling Rewards — Bali Eling Luu')
@section('description', 'Katalog reward Bali Eling Luu (simulasi DEMO). Tukar XP Palemahanmu dengan reward pilihan.')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <p class="text-xs font-bold uppercase tracking-[0.18em] text-terra-deep">Eling Rewards <span class="rounded-full bg-terra/20 px-2 py-0.5 text-forest">DEMO</span></p>
    <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Tukar XP, Dukung Bali</h1>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Saldo XP kamu: <strong class="text-forest">{{ auth()->user()->xp_balance }} XP</strong> · Level {{ auth()->user()->level() }} — {{ auth()->user()->levelTitle() }}.
        Semua penukaran saat ini <strong class="text-forest">simulasi DEMO</strong> — pulsa tidak benar-benar terkirim sampai integrasi provider resmi tersedia.
    </p>

    @if(session('status'))
        <div class="mt-6 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">{{ session('status') }}</div>
    @endif
    @if($errors->any())
        <div class="mt-6 rounded-xl border border-danger/20 bg-danger/8 px-4 py-3 text-sm font-semibold text-danger" role="alert">
            @foreach($errors->all() as $e)<p>{{ $e }}</p>@endforeach
        </div>
    @endif

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @forelse($rewards as $reward)
            <article class="flex flex-col rounded-2xl border border-line bg-white p-5">
                <div class="flex items-center justify-between gap-2">
                    <span class="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold text-forest">{{ $reward->xp_cost }} XP</span>
                    <span class="text-xs font-bold text-muted">Stok {{ $reward->stock }}</span>
                </div>
                <h2 class="mt-3 text-lg font-extrabold text-forest">{{ $reward->name }}</h2>
                <p class="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{{ $reward->description }}</p>
                @if($reward->stock < 1)
                    <p class="mt-4 text-sm font-bold text-danger">Stok habis</p>
                @elseif($reward->xp_cost > auth()->user()->xp_balance)
                    <p class="mt-4 text-sm font-bold text-muted">XP belum cukup</p>
                @else
                    <form method="POST" action="{{ route('rewards.store') }}" class="mt-4 flex gap-2">
                        @csrf
                        <input type="hidden" name="reward_id" value="{{ $reward->id }}">
                        @if($reward->requires_phone)
                            <input name="phone" placeholder="No. HP" value="{{ auth()->user()->phone }}" class="min-w-0 flex-1 rounded-xl border border-line bg-cream px-3 py-2.5 text-sm">
                        @endif
                        <button class="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-forest">Tukar</button>
                    </form>
                @endif
            </article>
        @empty
            <p class="text-sm text-muted">Belum ada reward aktif.</p>
        @endforelse
    </div>

    <div class="mt-8">
        <a href="{{ route('rewards.history') }}" class="text-sm font-bold text-primary hover:underline">Lihat riwayat penukaran →</a>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
