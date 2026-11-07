@extends('layouts.app')

@section('title', 'Profil — Bali Eling Luu')
@section('description', 'Ubah profil Bali Eling Luu.')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <div class="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <h1 class="text-2xl font-extrabold tracking-tight text-forest">Profil</h1>
        <p class="mt-2 text-sm text-muted">{{ $user->email }} · Level {{ $user->level() }} — {{ $user->levelTitle() }} · {{ $user->xp_balance }} XP</p>

        @if(session('status'))
            <div class="mt-5 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('profil.update') }}" class="mt-6 space-y-4">
            @csrf
            @method('PATCH')
            <div>
                <label for="name" class="block text-xs font-bold text-forest">Nama</label>
                <input id="name" name="name" type="text" required value="{{ old('name', $user->name) }}"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('name') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="username" class="block text-xs font-bold text-forest">Username</label>
                <input id="username" name="username" type="text" value="{{ old('username', $user->username) }}"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('username') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="phone" class="block text-xs font-bold text-forest">Nomor HP</label>
                <input id="phone" name="phone" type="tel" value="{{ old('phone', $user->phone) }}"
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                @error('phone') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>
            <button type="submit" class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-forest">Simpan Profil</button>
        </form>

        <div class="mt-6 flex gap-2">
            <a href="{{ route('dashboard') }}" class="flex-1 rounded-xl border border-line bg-white px-4 py-2.5 text-center text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Dashboard</a>
            <a href="{{ route('riwayat') }}" class="flex-1 rounded-xl border border-line bg-white px-4 py-2.5 text-center text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Riwayat Aksi</a>
        </div>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
