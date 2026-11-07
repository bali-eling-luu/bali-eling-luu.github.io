@extends('layouts.app')

@section('title', 'Kirim Bukti — ' . $challenge->name . ' — Bali Eling Luu')
@section('description', 'Unggah bukti foto aksi nyata untuk tantangan ' . $challenge->name . '.')

@section('content')
@include('partials.public-header', ['navAktif' => 'panduan'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <a href="{{ route('challenges.show', $challenge) }}" class="text-sm font-bold text-primary hover:underline">← Kembali ke tantangan</a>

    <div class="mx-auto mt-6 max-w-2xl rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <h1 class="text-2xl font-extrabold tracking-tight text-forest">Kirim Bukti Aksi</h1>
        <p class="mt-2 text-sm leading-relaxed text-muted">
            <strong class="text-forest">{{ $challenge->name }}</strong> · {{ $challenge->xp_reward }} XP (diberikan setelah diverifikasi admin).
        </p>
        <p class="mt-1 text-xs leading-relaxed text-muted">Format JPG/PNG/WebP, maks. 5 MB. File disimpan privat dan hanya bisa dilihat olehmu dan admin.</p>

        @if($errors->any())
            <div class="mt-5 rounded-xl border border-danger/20 bg-danger/8 px-4 py-3 text-sm font-semibold text-danger" role="alert">
                <ul class="list-disc pl-5">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="{{ route('aksi.store') }}" enctype="multipart/form-data" class="mt-6 space-y-4">
            @csrf
            <input type="hidden" name="challenge_id" value="{{ $challenge->id }}">

            <div>
                <label for="bukti" class="block text-xs font-bold text-forest">Foto Bukti <span class="text-danger">*</span></label>
                <input id="bukti" name="bukti" type="file" accept=".jpg,.jpeg,.png,.webp" required
                       class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-bold file:text-white">
                @error('bukti') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="type" class="block text-xs font-bold text-forest">Jenis Bukti</label>
                <select id="type" name="type" class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                    <option value="activity" @selected(old('type') === 'activity')>Foto aktivitas</option>
                    <option value="before_after" @selected(old('type') === 'before_after')>Sebelum &amp; sesudah</option>
                    <option value="receipt" @selected(old('type') === 'receipt')>Bukti setoran Bank Sampah</option>
                    <option value="qr" @selected(old('type') === 'qr')>QR Code mitra</option>
                </select>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
                <div>
                    <label for="weight_kg" class="block text-xs font-bold text-forest">Berat (kg) <span class="font-normal text-muted">(opsional)</span></label>
                    <input id="weight_kg" name="weight_kg" type="number" step="0.01" min="0" value="{{ old('weight_kg') }}"
                           class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                    @error('weight_kg') <p class="mt-1 text-xs font-semibold text-danger">{{ $message }}</p> @enderror
                </div>
                <div>
                    <label for="location_text" class="block text-xs font-bold text-forest">Lokasi <span class="font-normal text-muted">(opsional)</span></label>
                    <input id="location_text" name="location_text" type="text" value="{{ old('location_text') }}" placeholder="Misal: Banjar, Denpasar"
                           class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">
                </div>
            </div>

            <div>
                <label for="note" class="block text-xs font-bold text-forest">Catatan <span class="font-normal text-muted">(opsional)</span></label>
                <textarea id="note" name="note" rows="3" class="mt-1 w-full rounded-xl border border-line bg-cream p-3 text-sm focus:border-primary focus:outline-none">{{ old('note') }}</textarea>
            </div>

            <button type="submit" class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-forest">Kirim Pengajuan</button>
            <p class="text-center text-xs text-muted">Status awal: <span class="font-bold text-forest">Pending</span>. XP belum diberikan sampai admin menyetujui.</p>
        </form>
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'panduan'])
@endsection
