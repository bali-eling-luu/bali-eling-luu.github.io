<nav class="fixed bottom-0 left-0 z-40 w-full border-t border-line bg-white/95 backdrop-blur lg:hidden" aria-label="Navigasi bawah">
    <ul class="mx-auto grid max-w-shell grid-cols-5">
        <li>
            <a href="{{ route('home') }}"
               @if(($navAktif ?? null) === 'beranda') aria-current="page" class="flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-primary"
               @else class="flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold text-muted transition hover:text-primary" @endif>
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
                Beranda
            </a>
        </li>
        <li>
            <button type="button"
                    onclick="if(typeof openBaliElingScannerSafe==='function')openBaliElingScannerSafe()"
                    class="flex w-full flex-col items-center gap-1 py-2.5 text-[10px] font-semibold text-terra-deep">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/><circle cx="12" cy="12" r="3"/></svg>
                Scan AI
            </button>
        </li>
        <li>
            <a href="{{ route('panduan') }}"
               @if(in_array($navAktif ?? null, ['panduan', 'edukasi'], true)) aria-current="page" class="flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-primary"
               @else class="flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold text-muted transition hover:text-primary" @endif>
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></svg>
                Panduan
            </a>
        </li>
        <li>
            <a href="{{ route('home') }}#peta"
               class="flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold text-muted transition hover:text-primary">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                Eco Map
            </a>
        </li>
        <li>
            <a href="{{ route('dashboard') }}"
               @if(($navAktif ?? null) === 'dashboard') aria-current="page" class="flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-primary"
               @else class="flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold text-muted transition hover:text-primary" @endif>
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M16 21v-6M8 21v-4M12 21V9M3 3v18h18"/></svg>
                Aksi
            </a>
        </li>
    </ul>
</nav>
