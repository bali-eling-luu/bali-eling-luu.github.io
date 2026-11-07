@extends('layouts.app')

@section('title', 'Kelola Pengguna — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.dashboard') }}" class="text-sm font-bold text-primary hover:underline">← Dashboard Admin</a>
    <h1 class="mt-3 text-3xl font-extrabold tracking-tight text-forest">Kelola Pengguna</h1>

    <form method="GET" class="mt-6 flex flex-wrap gap-2">
        <input name="q" value="{{ $q }}" placeholder="Cari nama/email/username" class="rounded-xl border border-line bg-white px-3 py-2 text-sm">
        <select name="role" class="rounded-xl border border-line bg-white px-3 py-2 text-sm">
            <option value="">Semua role</option>
            <option value="user" @selected($role === 'user')>User</option>
            <option value="admin" @selected($role === 'admin')>Admin</option>
        </select>
        <button class="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white">Filter</button>
    </form>

    @if(session('status'))
        <div class="mt-5 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">{{ session('status') }}</div>
    @endif

    <div class="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table class="w-full min-w-[640px] text-left text-sm">
            <thead><tr class="border-b border-line bg-cream">
                <th class="px-4 py-3 font-bold text-forest">Nama</th><th class="px-4 py-3 font-bold text-forest">Email</th>
                <th class="px-4 py-3 font-bold text-forest">Role</th><th class="px-4 py-3 font-bold text-forest">XP</th><th class="px-4 py-3"></th>
            </tr></thead>
            <tbody>
                @forelse($users as $u)
                    <tr class="border-b border-line last:border-0">
                        <td class="px-4 py-3 font-bold text-forest">{{ $u->name }}</td>
                        <td class="px-4 py-3 text-muted">{{ $u->email }}</td>
                        <td class="px-4 py-3">{{ $u->role }}</td>
                        <td class="px-4 py-3">{{ $u->xp_balance }}</td>
                        <td class="px-4 py-3 text-right"><a href="{{ route('admin.users.edit', $u) }}" class="font-bold text-primary hover:underline">Edit</a></td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="px-4 py-6 text-center text-sm text-muted">Tidak ada pengguna.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-6">{{ $users->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
