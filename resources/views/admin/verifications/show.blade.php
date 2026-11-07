@extends('layouts.app')

@section('title', 'Detail Verifikasi — Bali Eling Luu')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10">
    <a href="{{ route('admin.verifications.index', ['status' => $submission->status]) }}" class="text-sm font-bold text-primary hover:underline">← Verifikasi</a>

    <div class="mx-auto mt-5 max-w-3xl rounded-3xl border border-line bg-white p-6 sm:p-8">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h1 class="text-2xl font-extrabold text-forest">{{ $submission->challenge->name }}</h1>
            <span class="rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-forest">{{ $submission->status }}</span>
        </div>
        <dl class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt class="font-bold text-forest">Pengguna</dt><dd class="text-muted">{{ $submission->user->name }} ({{ $submission->user->email }})</dd></div>
            <div><dt class="font-bold text-forest">Dikirim</dt><dd class="text-muted">{{ $submission->submitted_at?->format('d M Y H:i') }}</dd></div>
            <div><dt class="font-bold text-forest">XP</dt><dd class="text-muted">{{ $submission->challenge->xp_reward }} XP</dd></div>
            <div><dt class="font-bold text-forest">Berat</dt><dd class="text-muted">{{ $submission->weight_kg ? $submission->weight_kg . ' kg' : '-' }}</dd></div>
            @if($submission->location_text)
                <div><dt class="font-bold text-forest">Lokasi</dt><dd class="text-muted">{{ $submission->location_text }}</dd></div>
            @endif
            @if($submission->note)
                <div><dt class="font-bold text-forest">Catatan user</dt><dd class="text-muted">{{ $submission->note }}</dd></div>
            @endif
            @if($submission->admin_note)
                <div class="sm:col-span-2"><dt class="font-bold text-forest">Catatan admin</dt><dd class="text-muted">{{ $submission->admin_note }}</dd></div>
            @endif
        </dl>

        <h2 class="mt-6 text-sm font-extrabold text-forest">Bukti</h2>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
            @forelse($submission->evidences as $ev)
                <div class="rounded-2xl border border-line bg-cream p-3">
                    <p class="text-xs font-bold text-muted">{{ $ev->type }} · {{ $ev->mime }} · {{ number_format($ev->size_bytes / 1024, 0) }} KB</p>
                    <img src="{{ route('bukti.show', $ev) }}" alt="Bukti pengajuan" class="mt-2 w-full rounded-xl object-cover">
                    <p class="mt-1 truncate text-[11px] text-muted">Hash: {{ substr($ev->hash, 0, 16) }}…</p>
                </div>
            @empty
                <p class="text-sm text-muted">Tidak ada bukti.</p>
            @endforelse
        </div>

        @if($submission->status === 'pending')
            @if($errors->any())
                <div class="mt-4 rounded-xl border border-danger/20 bg-danger/8 px-4 py-3 text-sm font-semibold text-danger" role="alert">
                    @foreach($errors->all() as $e)<p>{{ $e }}</p>@endforeach
                </div>
            @endif
            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                <form method="POST" action="{{ route('admin.verifications.approve', $submission) }}" class="flex-1">
                    @csrf
                    <button class="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-forest">Setujui + Beri {{ $submission->challenge->xp_reward }} XP</button>
                </form>
                <form method="POST" action="{{ route('admin.verifications.reject', $submission) }}" class="flex-1 space-y-2">
                    @csrf
                    <textarea name="admin_note" required placeholder="Alasan penolakan (wajib)" class="w-full rounded-xl border border-line bg-cream p-3 text-sm"></textarea>
                    <button class="w-full rounded-xl bg-danger px-5 py-3 text-sm font-bold text-white hover:opacity-90">Tolak Pengajuan</button>
                </form>
            </div>
        @else
            <p class="mt-6 text-sm text-muted">Pengajuan sudah diproses ({{ $submission->status }}) — tidak dapat diubah.</p>
        @endif
    </div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
