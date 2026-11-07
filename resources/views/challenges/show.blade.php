@extends('layouts.app')

@section('title', $challenge->name . ' — Bali Eling Luu')
@section('description', $challenge->description)

@section('content')
@include('partials.public-header', ['navAktif' => 'panduan'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <nav aria-label="Breadcrumb" class="text-sm text-muted">
        <a href="{{ route('challenges.index') }}" class="font-bold text-primary hover:underline">Tantangan</a> / <span class="font-semibold text-forest">{{ $challenge->name }}</span>
    </nav>

    <div class="mt-6 max-w-3xl rounded-3xl border border-line bg-white p-6 sm:p-8">
        <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold text-forest">{{ $challenge->category }}</span>
            <span class="rounded-full bg-forest px-3 py-1 text-[11px] font-bold text-white">{{ $challenge->xp_reward }} XP</span>
        </div>
        <h1 class="mt-3 text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">{{ $challenge->name }}</h1>
        <p class="mt-3 text-sm leading-relaxed text-muted sm:text-base">{{ $challenge->description }}</p>
        @if($challenge->instruction)
            <div class="mt-5 rounded-2xl border border-line bg-cream p-5">
                <h2 class="text-sm font-extrabold text-forest">Instruksi</h2>
                <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ $challenge->instruction }}</p>
            </div>
        @endif
        <ul class="mt-4 space-y-1.5 text-sm text-muted">
            @if($challenge->evidence_required)
                <li>• Bukti foto wajib (JPG/PNG/WebP, maks. 5 MB).</li>
            @endif
            @if($challenge->requires_weight)
                <li>• Cantumkan berat sampah (kg) bila ada.</li>
            @endif
            <li>• Batas pengajuan: {{ $challenge->daily_limit }} kali per hari.</li>
        </ul>
        <div class="mt-6">
            @auth
                <a href="{{ route('aksi.create', $challenge) }}" class="inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-forest">Kirim Bukti Aksi</a>
            @else
                <a href="{{ route('login') }}" class="inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-forest">Masuk untuk Mengirim Bukti</a>
            @endauth
        </div>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'panduan'])
@endsection
