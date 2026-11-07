@extends('layouts.app')

@section('title', 'Masuk — Bali Eling Luu')
@section('description', 'Masuk ke akun Bali Eling Luu untuk melihat dashboard, tantangan, dan riwayat kontribusi.')

@section('content')
@include('partials.public-header', ['navAktif' => null])

<main class="mx-auto max-w-shell px-5 py-12 sm:py-20">
    <div class="mx-auto max-w-md rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <a href="{{ route('home') }}" class="text-sm font-bold text-primary hover:underline">← Kembali ke Beranda</a>

        <h1 class="mt-4 text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">Masuk</h1>
        <p class="mt-2 text-sm text-muted">Masuk untuk melihat dashboard, tantangan harian, dan riwayat kontribusi.</p>

        @if(session('status'))
            <div class="mt-5 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}" class="mt-6 space-y-4">
            @csrf
            <div>
                <label for="email" class="block text-xs font-bold text-forest">Email</label>
                <input id="email" name="email" type="email" required value="{{ old('email') }}" autocomplete="email"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('email') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="password" class="block text-xs font-bold text-forest">Kata Sandi</label>
                <input id="password" name="password" type="password" required autocomplete="current-password"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('password') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div class="flex items-center justify-between text-sm">
                <label class="flex items-center gap-2 text-muted">
                    <input type="checkbox" name="remember" class="h-4 w-4 rounded border-line accent-primary"> Ingat saya
                </label>
            </div>
            <button type="submit" class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-forest">Masuk</button>
        </form>

        <p class="mt-5 text-center text-sm text-muted">
            Belum punya akun?
            <a href="{{ route('register') }}" class="font-bold text-primary hover:underline">Daftar sekarang</a>
        </p>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => null])
@endsection
