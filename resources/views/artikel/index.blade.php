
@extends('layouts.app')

@section('title', 'Artikel — Bali Eling Luu')

@section('body_class', 'bg-cream font-sans text-ink')

@section('content')

@include('partials.public-header', ['navAktif' => 'artikel'])

<main class="mx-auto max-w-shell px-5 pb-28 pt-8 sm:pb-24 lg:pb-16 lg:pt-12" id="isi">
    <div class="grid h-64 place-items-center text-sm text-muted">
        Memuat…
    </div>
</main>

@include('partials.public-footer')

@include('partials.bottom-nav', ['navAktif' => 'artikel'])

@endsection

@push('styles')
<style>
    .isi-artikel > p {
        margin-top: 1.1rem;
    }

    .isi-artikel > p:first-child {
        margin-top: 0;
    }
</style>
@endpush

@push('scripts')
@php
    $jsv = static fn (string $file): int => filemtime(public_path($file));
@endphp
<script>
    window.ARTIKEL_URL = @json(route('artikel.index'));
    window.ASSET_URL = @json(url('/'));
    window.HOME_URL = @json(route('home'));
    window.ARTIKEL_ID = @json($artikelId ?? null);
    window.BALI_MODEL_BASE = @json(asset('model') . '/');

    window.openBaliElingScannerSafe = function () {
        if (typeof window.openBaliElingScanner === 'function') return window.openBaliElingScanner();
        alert('Fitur AI Scanner belum tersedia.');
    };
</script>
<script src="{{ asset('js/data_sampah.js') }}?v={{ $jsv('js/data_sampah.js') }}"></script>
<script src="{{ asset('model/model_config.js') }}?v={{ $jsv('model/model_config.js') }}"></script>
<script src="{{ asset('js/ai_scanner.js') }}?v={{ $jsv('js/ai_scanner.js') }}"></script>
<script src="{{ asset('js/chat.js') }}?v={{ $jsv('js/chat.js') }}"></script>
@vite('resources/js/artikel.js')
@endpush
