@extends('layouts.app')

@section('title', 'Daftar — Bali Eling Luu')
@section('description', 'Daftar akun Bali Eling Luu untuk mulai beraksi, kumpulkan XP Palemahan, dan tukar reward.')

@section('content')
@include('partials.public-header', ['navAktif' => null])

<main class="mx-auto max-w-shell px-5 py-12 sm:py-20">
    <div class="mx-auto max-w-md rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <a href="{{ route('home') }}" class="text-sm font-bold text-primary hover:underline">← Kembali ke Beranda</a>

        <h1 class="mt-4 text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">Daftar Akun</h1>
        <p class="mt-2 text-sm text-muted">Buat akun untuk mengakses aksi nyata, kumpulkan XP Palemahan, dan tukar reward.</p>

        <form method="POST" action="{{ route('register') }}" class="mt-6 space-y-4">
            @csrf
            <div>
                <label for="name" class="block text-xs font-bold text-forest">Nama Lengkap</label>
                <input id="name" name="name" type="text" required value="{{ old('name') }}" autocomplete="name"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('name') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="username" class="block text-xs font-bold text-forest">Username <span class="font-normal text-muted">(opsional)</span></label>
                <input id="username" name="username" type="text" value="{{ old('username') }}" autocomplete="username"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('username') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="email" class="block text-xs font-bold text-forest">Email</label>
                <input id="email" name="email" type="email" required value="{{ old('email') }}" autocomplete="email"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('email') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="phone" class="block text-xs font-bold text-forest">Nomor HP <span class="font-normal text-muted">(opsional, untuk penukaran reward)</span></label>
                <input id="phone" name="phone" type="tel" value="{{ old('phone') }}" autocomplete="tel"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('phone') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="password" class="block text-xs font-bold text-forest">Kata Sandi</label>
                <input id="password" name="password" type="password" required autocomplete="new-password"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('password') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="password_confirmation" class="block text-xs font-bold text-forest">Konfirmasi Kata Sandi</label>
                <input id="password_confirmation" name="password_confirmation" type="password" required autocomplete="new-password"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
            </div>
            <button type="submit" class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-forest">Buat Akun</button>
        </form>

        <p class="mt-5 text-center text-sm text-muted">
            Sudah punya akun?
            <a href="{{ route('login') }}" class="font-bold text-primary hover:underline">Masuk</a>
        </p>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => null])
@endsection
