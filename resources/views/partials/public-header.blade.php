<header class="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
    <nav class="mx-auto flex max-w-shell items-center justify-between gap-4 px-5 py-3.5" aria-label="Navigasi utama">
        <a href="{{ route('home') }}" class="flex shrink-0 items-center gap-2.5">
            <img src="{{ asset('assets/logo/logo-mark.webp') }}" alt="" class="h-9 w-9 rounded-xl object-contain">
            <span class="text-base font-extrabold tracking-tight text-forest">Bali Eling Luu</span>
        </a>

        <ul class="hidden items-center gap-6 text-sm font-semibold text-ink md:flex">
            <li>
                <a href="{{ route('home') }}"
                   @if(($navAktif ?? null) === 'beranda') aria-current="page" class="font-bold text-primary"
                   @else class="transition hover:text-primary" @endif>Beranda</a>
            </li>
            <li>
                <a href="{{ route('panduan') }}"
                   @if(in_array($navAktif ?? null, ['panduan', 'edukasi'], true)) aria-current="page" class="font-bold text-primary"
                   @else class="transition hover:text-primary" @endif>Panduan</a>
            </li>
            <li><a href="{{ route('home') }}#peta" class="transition hover:text-primary">Eco Map</a></li>
            <li>
                <a href="{{ route('dashboard') }}"
                   @if(($navAktif ?? null) === 'dashboard') aria-current="page" class="font-bold text-primary"
                   @else class="transition hover:text-primary" @endif>Dashboard</a>
            </li>
            <li>
                <a href="{{ route('artikel.index') }}"
                   @if(($navAktif ?? null) === 'artikel') aria-current="page" class="font-bold text-primary"
                   @else class="transition hover:text-primary" @endif>Artikel</a>
            </li>
        </ul>

        <div class="hidden items-center gap-2 md:flex">
            @guest
                <a href="{{ route('login') }}" class="rounded-xl px-3 py-2 text-sm font-bold text-forest transition hover:text-primary">Masuk</a>
                <a href="{{ route('register') }}" class="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-forest">Daftar</a>
            @endguest
            @auth
                @if(auth()->user()->isAdmin())
                    <a href="{{ route('admin.dashboard') }}" class="rounded-xl bg-forest px-4 py-2 text-sm font-bold text-white transition hover:bg-deep">Admin</a>
                @endif
                <span class="rounded-xl bg-white px-3 py-2 text-sm font-bold text-forest">{{ auth()->user()->name }}</span>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-forest transition hover:border-primary hover:text-primary">Keluar</button>
                </form>
            @endauth
        </div>

        <div class="flex items-center gap-2 md:hidden">
            @guest
                <a href="{{ route('login') }}" class="rounded-xl bg-primary px-3 py-2 text-sm font-bold text-white">Masuk</a>
            @endguest
            @auth
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-forest">Keluar</button>
                </form>
            @endauth
        </div>
    </nav>
</header>
