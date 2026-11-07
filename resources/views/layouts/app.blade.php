<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>
        @yield('title', 'Bali Eling Luu — Jaga Alam, Lestarikan Bali')
    </title>

    <meta name="description" content="@yield('description', 'Bali Eling Luu — ruang digital untuk belajar, memilah, dan bergerak bersama menjaga Bali.')">

    <meta name="theme-color" content="#123B2A">

    <link rel="icon" type="image/webp" href="{{ asset('assets/logo/logo-mark.webp') }}">

    {{-- Tailwind --}}
    <script src="https://cdn.tailwindcss.com"></script>

    {{-- Font --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />

    {{-- Leaflet --}}
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {

                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
                        display: ['"DM Serif Display"', "Georgia", "serif"],
                    },

                    colors: {

                        primary: '#1D7A4A',

                        forest: '#123B2A',

                        deep: '#0B281C',

                        sage: '#A8BFAE',

                        cream: '#F4F1E8',

                        paper: '#FAF9F5',

                        terra: '#C99348',

                        'terra-deep': '#8F611F',

                        danger: '#C0392B',

                        ink: '#1C3026',

                        muted: '#5F6E65',

                        line: '#DDE4DE',

                    },

                    maxWidth: {

                        shell: '1240px',

                    },

                    boxShadow: {

                        soft: '0 20px 60px rgba(18,59,42,.08)',

                        card: '0 14px 40px rgba(18,59,42,.10)',

                    },

                },
            },
        };
    </script>

    <style>
        html {
            scroll-behavior: smooth;
        }

        body {
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
        }

        ::selection {
            background: #1D7A4A;
            color: white;
        }


        /* =========================================================
           SPLASH
        ========================================================= */

        .splash {
            position: fixed;
            inset: 0;
            z-index: 9999;

            display: flex;
            align-items: center;
            justify-content: center;

            overflow: hidden;

            background: #F4F1E8;

            transition:
                opacity .8s ease,
                visibility .8s ease;
        }

        .splash.hide {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .splash-bg {
            position: absolute;
            inset: 0;

            width: 100%;
            height: 100%;

            object-fit: cover;

            animation: splashZoom 6s ease-out both;
        }

        .splash::after {
            content: "";

            position: absolute;
            inset: 0;

            background:
                linear-gradient(180deg,
                    rgba(244, 241, 232, .55),
                    rgba(244, 241, 232, .18) 45%,
                    rgba(11, 40, 28, .42));
        }

        .splash-inner {
            position: relative;
            z-index: 2;

            display: flex;
            flex-direction: column;
            align-items: center;

            text-align: center;
        }

        .splash-logo {
            width: min(68vw, 350px);

            filter:
                drop-shadow(0 20px 45px rgba(11, 40, 28, .28));

            animation:
                splashLogo .9s cubic-bezier(.2, .8, .2, 1) both;
        }

        .splash-tag {
            margin-top: 22px;

            letter-spacing: .24em;

            animation:
                splashRise .7s .3s both;
        }

        .splash-bar {
            width: 150px;
            height: 3px;

            margin-top: 30px;

            overflow: hidden;

            border-radius: 999px;

            background:
                rgba(18, 59, 42, .18);

            animation:
                splashRise .7s .45s both;
        }

        .splash-bar i {
            display: block;

            width: 0;
            height: 100%;

            background: #C99348;

            animation:
                splashLoad 2s ease forwards;
        }

        @keyframes splashLogo {

            from {
                opacity: 0;
                transform: scale(.82) translateY(15px);
            }

            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }

        }

        @keyframes splashRise {

            from {
                opacity: 0;
                transform: translateY(15px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }

        }

        @keyframes splashLoad {
            to {
                width: 100%;
            }
        }

        @keyframes splashZoom {

            from {
                transform: scale(1.08);
            }

            to {
                transform: scale(1);
            }

        }


        /* =========================================================
           APP
        ========================================================= */

        #app {
            opacity: 0;

            transition:
                opacity .7s ease .15s;
        }

        #app.show {
            opacity: 1;
        }

        body.locked {
            overflow: hidden;
        }


        /* =========================================================
           NAV
        ========================================================= */

        .nav-glass {

            background:
                rgba(244, 241, 232, .82);

            backdrop-filter:
                blur(18px);

            -webkit-backdrop-filter:
                blur(18px);
        }


        /* =========================================================
           HERO
        ========================================================= */

        .hero-photo {
            position: absolute;
            inset: 0;

            width: 100%;
            height: 100%;

            object-fit: cover;

            object-position: center;
        }

        .hero-overlay {

            position: absolute;
            inset: 0;

            background:
                linear-gradient(90deg,
                    rgba(244, 241, 232, .96) 0%,
                    rgba(244, 241, 232, .88) 35%,
                    rgba(244, 241, 232, .38) 70%,
                    rgba(244, 241, 232, .10) 100%);

        }

        .hero-noise {

            position: absolute;
            inset: 0;

            opacity: .12;

            background-image:
                url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");

            pointer-events: none;
        }


        /* =========================================================
           REVEAL
        ========================================================= */

        .reveal {
            opacity: 0;
            transform: translateY(24px);

            transition:
                opacity .8s ease,
                transform .8s cubic-bezier(.2, .8, .2, 1);
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }


        /* =========================================================
           ARTICLE / TEXT
        ========================================================= */

        .editorial-title {
            font-family:
                "Playfair Display",
                Georgia,
                serif;
        }


        /* =========================================================
           CARDS
        ========================================================= */

        .lift {

            transition:
                transform .35s ease,
                box-shadow .35s ease;
        }

        .lift:hover {

            transform:
                translateY(-7px);

            box-shadow:
                0 24px 60px rgba(18, 59, 42, .13);
        }


        /* =========================================================
           MAP
        ========================================================= */

        #eco-map {
            min-height: 440px;

            border-radius: 28px;

            overflow: hidden;
        }

        .leaflet-control-zoom {
            border: none !important;
            box-shadow: 0 8px 25px rgba(18, 59, 42, .15) !important;
        }


        /* =========================================================
           FORM
        ========================================================= */

        .field {

            width: 100%;

            padding: 14px 16px;

            border:
                1px solid #DDE4DE;

            border-radius:
                14px;

            background:
                rgba(255, 255, 255, .9);

            color:
                #1C3026;

            transition:
                border-color .2s,
                box-shadow .2s;
        }

        .field:focus {

            outline: none;

            border-color:
                #1D7A4A;

            box-shadow:
                0 0 0 4px rgba(29, 122, 74, .12);
        }


        /* =========================================================
           MOBILE
        ========================================================= */

        @media(max-width: 768px) {

            .hero-overlay {

                background:
                    linear-gradient(180deg,
                        rgba(244, 241, 232, .82),
                        rgba(244, 241, 232, .72) 45%,
                        rgba(244, 241, 232, .88));

            }

            #eco-map {
                min-height: 360px;
            }

        }


        @media(prefers-reduced-motion: reduce) {

            *,
            *::before,
            *::after {

                animation-duration:
                    .01ms !important;

                animation-iteration-count:
                    1 !important;

                scroll-behavior:
                    auto !important;

            }

        }
    </style>

    @stack('styles')

</head>


<body class="@yield('body_class', 'bg-cream font-sans text-ink')">

    @yield('content')

    @stack('scripts')


    <script>
        /*
                |--------------------------------------------------------------------------
                | SPLASH
                |--------------------------------------------------------------------------
                */

        window.addEventListener('load', function() {

            setTimeout(function() {

                const splash =
                    document.getElementById('splash');

                const app =
                    document.getElementById('app');

                if (splash) {
                    splash.classList.add('hide');
                }

                if (app) {
                    app.classList.add('show');
                }

                document.body.classList.remove('locked');

            }, 1800);

        });


        /*
        |--------------------------------------------------------------------------
        | REVEAL ON SCROLL
        |--------------------------------------------------------------------------
        */

        document.addEventListener(
            'DOMContentLoaded',
            function() {

                const elements =
                    document.querySelectorAll('.reveal');

                if (!elements.length) return;

                const observer =
                    new IntersectionObserver(
                        entries => {

                            entries.forEach(entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add('visible');

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            });

                        }, {
                            threshold: .12
                        }
                    );

                elements.forEach(
                    element =>
                    observer.observe(element)
                );

            }
        );
    </script>

</body>

</html>
