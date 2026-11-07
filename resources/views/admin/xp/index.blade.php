@extends('layouts.app')

@section('title', 'Riwayat XP — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.dashboard') }}" class="text-sm font-bold text-primary hover:underline">← Dashboard Admin</a>
    <h1 class="mt-3 text-3xl font-extrabold tracking-tight text-forest">Riwayat Transaksi XP</h1>

    <div class="mt-6 flex flex-wrap gap-2">
        <a href="{{ route('admin.xp.index') }}" class="rounded-xl px-4 py-2 text-sm font-bold {{ !$type ? 'bg-primary text-white' : 'border border-line bg-white text-forest' }}">Semua</a>
        <a href="{{ route('admin.xp.index', ['type' => 'earn']) }}" class="rounded-xl px-4 py-2 text-sm font-bold {{ $type === 'earn' ? 'bg-primary text-white' : 'border border-line bg-white text-forest' }}">Earn</a>
        <a href="{{ route('admin.xp.index', ['type' => 'spend']) }}" class="rounded-xl px-4 py-2 text-sm font-bold {{ $type === 'spend' ? 'bg-primary text-white' : 'border border-line bg-white text-forest' }}">Spend</a>
        <a href="{{ route('admin.xp.index', ['type' => 'adjust']) }}" class="rounded-xl px-4 py-2 text-sm font-bold {{ $type === 'adjust' ? 'bg-primary text-white' : 'border border-line bg-white text-forest' }}">Adjust</a>
    </div>

    <div class="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table class="w-full min-w-[680px] text-left text-sm">
            <thead><tr class="border-b border-line bg-cream">
                <th class="px-4 py-3 font-bold text-forest">Waktu</th><th class="px-4 py-3 font-bold text-forest">User</th>
                <th class="px-4 py-3 font-bold text-forest">Tipe</th><th class="px-4 py-3 font-bold text-forest">Jumlah</th>
                <th class="px-4 py-3 font-bold text-forest">Saldo</th><th class="px-4 py-3 font-bold text-forest">Alasan</th>
            </tr></thead>
            <tbody>
                @forelse($transactions as $t)
                    <tr class="border-b border-line last:border-0">
                        <td class="px-4 py-3 text-muted">{{ $t->created_at?->format('d M Y H:i') }}</td>
                        <td class="px-4 py-3 font-bold text-forest">{{ $t->user->name }}</td>
                        <td class="px-4 py-3">{{ $t->type }}</td>
                        <td class="px-4 py-3 font-bold">{{ $t->amount > 0 ? '+' : '' }}{{ $t->amount }}</td>
                        <td class="px-4 py-3">{{ $t->balance_after }}</td>
                        <td class="px-4 py-3 text-muted">{{ $t->reason }}</td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="px-4 py-6 text-center text-sm text-muted">Belum ada transaksi.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div class="mt-6">{{ $transactions->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
