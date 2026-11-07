@extends('layouts.app')

@section('title', 'Edit Tantangan — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.challenges.index') }}" class="text-sm font-bold text-primary hover:underline">← Kelola Tantangan</a>
    <div class="mx-auto mt-5 max-w-2xl rounded-3xl border border-line bg-white p-6 sm:p-8">
        <h1 class="text-2xl font-extrabold text-forest">Edit Tantangan</h1>

        @if($errors->any())
            <div class="mt-4 rounded-xl border border-danger/20 bg-danger/8 px-4 py-3 text-sm font-semibold text-danger" role="alert">
                @foreach($errors->all() as $e)<p>{{ $e }}</p>@endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('admin.challenges.update', $challenge) }}" class="mt-6 space-y-4">
            @csrf @method('PATCH')
            <div>
                <label class="block text-xs font-bold text-forest">Nama</label>
                <input name="name" value="{{ old('name', $challenge->name) }}" required class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
            </div>
            <div>
                <label class="block text-xs font-bold text-forest">Deskripsi</label>
                <textarea name="description" rows="3" required class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">{{ old('description', $challenge->description) }}</textarea>
            </div>
            <div>
                <label class="block text-xs font-bold text-forest">Instruksi</label>
                <textarea name="instruction" rows="2" class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">{{ old('instruction', $challenge->instruction) }}</textarea>
            </div>
            <div class="grid gap-3 sm:grid-cols-3">
                <div>
                    <label class="block text-xs font-bold text-forest">Kategori</label>
                    <input name="category" value="{{ old('category', $challenge->category) }}" class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs font-bold text-forest">XP</label>
                    <input name="xp_reward" type="number" value="{{ old('xp_reward', $challenge->xp_reward) }}" required class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
                </div>
                <div>
                    <label class="block text-xs font-bold text-forest">Batas/hari</label>
                    <input name="daily_limit" type="number" value="{{ old('daily_limit', $challenge->daily_limit) }}" required class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm">
                </div>
            </div>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="evidence_required" value="1" @checked(old('evidence_required', $challenge->evidence_required)) class="h-4 w-4 accent-primary"> Bukti wajib</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="requires_weight" value="1" @checked(old('requires_weight', $challenge->requires_weight)) class="h-4 w-4 accent-primary"> Wajib berat</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" value="1" @checked(old('is_active', $challenge->is_active)) class="h-4 w-4 accent-primary"> Aktif</label>
            <button class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-forest">Simpan Perubahan</button>
        </form>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
