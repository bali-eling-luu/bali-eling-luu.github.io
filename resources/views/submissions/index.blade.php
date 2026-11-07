@extends('layouts.app')

@section('title', 'Riwayat Aksi — Bali Eling Luu')
@section('description', 'Riwayat pengajuan aksi dan status verifikasinya.')

@section('content')
@include('partials.public-header', ['navAktif' => 'dashboard'])

<main class="mx-auto max-w-shell px-5 pb-24 py-10 sm:py-14">
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">Riwayat Aksi</h1>
            <p class="mt-2 text-sm text-muted">Pengajuan pribadimu beserta status verifikasi admin.</p>
        </div>
        <a href="{{ route('challenges.index') }}" class="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-forest">Lihat Tantangan</a>
    </div>

    @if(session('status'))
        <div class="mt-6 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-forest" role="status">
            {{ session('status') }}
        </div>
    @endif

    <div class="mt-8 space-y-4">
        @forelse($submissions as $s)
            <article class="rounded-2xl border border-line bg-white p-5">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <h2 class="text-base font-extrabold text-forest">{{ $s->challenge->name }}</h2>
                    <span class="rounded-full px-3 py-1 text-[11px] font-bold {{ $s->status === 'approved' ? 'bg-primary/12 text-forest' : ($s->status === 'rejected' ? 'bg-danger/12 text-danger' : 'bg-terra/20 text-forest') }}">
                        {{ $s->status === 'pending' ? 'Menunggu verifikasi' : ($s->status === 'approved' ? 'Terverifikasi' : 'Ditolak') }}
                    </span>
                </div>
                <p class="mt-1 text-xs text-muted">Dikirim {{ $s->submitted_at?->format('d M Y H:i') }} WITA · {{ $s->challenge->xp_reward }} XP
                    @if($s->weight_kg) · {{ $s->weight_kg }} kg @endif
                    @if($s->location_text) · {{ $s->location_text }} @endif
                </p>
                @if($s->admin_note)
                    <p class="mt-2 rounded-xl bg-cream px-3 py-2 text-sm text-muted"><strong class="text-forest">Catatan admin:</strong> {{ $s->admin_note }}</p>
                @endif
                <div class="mt-3 flex flex-wrap gap-2">
                    @foreach($s->evidences as $ev)
                        <a href="{{ route('bukti.show', $ev) }}" target="_blank" rel="noopener" class="rounded-xl border border-line bg-cream px-3 py-2 text-xs font-bold text-primary hover:underline">Lihat bukti ({{ $ev->type }})</a>
                    @endforeach
                </div>
            </article>
        @empty
            <div class="rounded-2xl border border-dashed border-line bg-white p-8 text-center">
                <p class="text-sm font-bold text-forest">Belum ada pengajuan.</p>
                <p class="mt-1 text-sm text-muted">Mulai dari tantangan pertamamu.</p>
                <a href="{{ route('challenges.index') }}" class="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-forest">Lihat Tantangan</a>
            </div>
        @endforelse
    </div>

    <div class="mt-8">{{ $submissions->links() }}</div>
</main>

@include('partials.public-footer')
@include('partials.bottom-nav', ['navAktif' => 'dashboard'])
@endsection
