@extends('layouts.app')

@section('title', 'Edit Pengguna — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.users.index') }}" class="text-sm font-bold text-primary hover:underline">← Kelola Pengguna</a>
    <div class="mx-auto mt-5 max-w-xl rounded-3xl border border-line bg-white p-6 sm:p-8">
        <h1 class="text-2xl font-extrabold text-forest">Edit Pengguna</h1>
        <p class="mt-1 text-sm text-muted">{{ $user->email }}</p>

        @if($errors->any())
            <div class="mt-4 rounded-xl border border-danger/20 bg-danger/8 px-4 py-3 text-sm font-semibold text-danger" role="alert">
                @foreach($errors->all() as $e)<p>{{ $e }}</p>@endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('admin.users.update', $user) }}" class="mt-6 space-y-4">
            @csrf @method('PATCH')
            <div>
                <label class="block text-xs font-bold text-forest">Nama</label>
                <input name="name" value="{{ old('name', $user->name) }}" required class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
            </div>
            <div>
                <label class="block text-xs font-bold text-forest">Username</label>
                <input name="username" value="{{ old('username', $user->username) }}" class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
            </div>
            <div>
                <label class="block text-xs font-bold text-forest">Nomor HP</label>
                <input name="phone" value="{{ old('phone', $user->phone) }}" class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
            </div>
            <div>
                <label class="block text-xs font-bold text-forest">Role</label>
                <select name="role" class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
                    <option value="user" @selected(old('role', $user->role) === 'user')>User</option>
                    <option value="admin" @selected(old('role', $user->role) === 'admin')>Admin</option>
                </select>
                <p class="mt-1 text-xs text-muted">Hanya admin yang mendapat role admin. Anda tidak dapat menurunkan diri sendiri.</p>
            </div>
            <button class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-forest">Simpan</button>
        </form>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
