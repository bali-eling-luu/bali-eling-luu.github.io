@extends('layouts.app')

@section('title', 'Edit Reward — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.rewards.index') }}" class="text-sm font-bold text-primary hover:underline">← Kelola Reward</a>
    <div class="mx-auto mt-5 max-w-xl rounded-3xl border border-line bg-white p-6 sm:p-8">
        <h1 class="text-2xl font-extrabold text-forest">Edit Reward</h1>
        @if($errors->any())
            <div class="mt-4 rounded-xl border border-danger/20 bg-danger/8 px-4 py-3 text-sm font-semibold text-danger" role="alert">
                @foreach($errors->all() as $e)<p>{{ $e }}</p>@endforeach
            </div>
        @endif
        <form method="POST" action="{{ route('admin.rewards.update', $reward) }}" class="mt-6 space-y-4">
            @csrf @method('PATCH')
            <div>
                <label class="block text-xs font-bold text-forest">Nama</label>
                <input name="name" value="{{ old('name', $reward->name) }}" required class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
            </div>
            <div>
                <label class="block text-xs font-bold text-forest">Deskripsi</label>
                <textarea name="description" rows="2" class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">{{ old('description', $reward->description) }}</textarea>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
                <div>
                    <label class="block text-xs font-bold text-forest">Harga XP</label>
                    <input name="xp_cost" type="number" value="{{ old('xp_cost', $reward->xp_cost) }}" required class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs font-bold text-forest">Stok</label>
                    <input name="stock" type="number" value="{{ old('stock', $reward->stock) }}" required class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
                </div>
            </div>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="requires_phone" value="1" @checked(old('requires_phone', $reward->requires_phone)) class="h-4 w-4 accent-primary"> Butuh nomor HP</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" @checked(old('is_active', $reward->is_active)) class="h-4 w-4 accent-primary"> Aktif</label>
            <button class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-forest">Simpan Perubahan</button>
        </form>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
