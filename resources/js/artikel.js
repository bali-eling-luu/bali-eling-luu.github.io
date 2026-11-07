
import { ARTIKEL, cariArtikel } from './data_artikel.js';

// Diisi oleh Blade sebelum modul ini dieksekusi (lihat artikel/index.blade.php).
const ARTIKEL_URL = window.ARTIKEL_URL || '/artikel';
const ASSET_URL = window.ASSET_URL || '';
const HOME_URL = window.HOME_URL || '/';

const isi = document.getElementById('isi');

function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;"
        }[c];
    });
}

const WARNA_KATEGORI = {
    Pemilahan: "bg-primary/12 text-primary",
    Wisata: "bg-terra/20 text-forest",
    Pantai: "bg-primary/12 text-primary",
    B3: "bg-terra/20 text-forest",
};

function chip(kategori) {
    const kelas = WARNA_KATEGORI[kategori] || "bg-primary/12 text-primary";

    return `
        <span class="rounded-full ${kelas} px-3 py-1 text-[11px] font-bold">
            ${esc(kategori)}
        </span>
    `;
}

function kartu(a, kecil = false) {
    return `
        <a href="${routeArtikel(a.id)}"
           class="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/10">

            <div class="aspect-video overflow-hidden bg-line/60">
                <img src="${asset(a.foto)}"
                     alt="${esc(a.alt)}"
                     loading="lazy"
                     class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
            </div>

            <div class="${kecil ? 'p-4' : 'p-5'}">
                ${chip(a.kategori)}

                ${kecil
                    ? `<h3 class="mt-3 font-bold leading-snug text-forest transition group-hover:text-primary text-[14px]">${esc(a.judul)}</h3>`
                    : `<h2 class="mt-3 font-bold leading-snug text-forest transition group-hover:text-primary text-base">${esc(a.judul)}</h2>`}

                <p class="mt-2 text-sm leading-relaxed text-muted">
                    ${esc(a.ringkas)}
                </p>

                <span class="mt-4 inline-block text-sm font-bold text-primary">
                    ${kecil ? 'Baca →' : 'Baca Selengkapnya'}
                </span>
            </div>
        </a>
    `;
}

function routeArtikel(id) {
    return `${ARTIKEL_URL}?id=${encodeURIComponent(id)}`;
}

function asset(path) {
    return `${ASSET_URL}/${path}`;
}

function renderBlok(b) {
    if (b.t === "p") {
        return `
            <p class="text-[14.5px] leading-relaxed text-muted sm:text-base">
                ${esc(b.v)}
            </p>
        `;
    }

    if (b.t === "h") {
        return `
            <h2 class="mt-10 text-[20px] font-extrabold tracking-tight text-forest sm:text-2xl">
                ${esc(b.v)}
            </h2>
        `;
    }

    if (b.t === "h2") {
        return `
            <h3 class="mt-7 text-[15.5px] font-bold text-forest sm:text-lg">
                ${esc(b.v)}
            </h3>
        `;
    }

    if (b.t === "ul" || b.t === "ol") {
        const ordered = b.t === "ol";

        return `
            <${ordered ? 'ol' : 'ul'} class="mt-4 space-y-${ordered ? '3' : '2.5'}">
                ${b.v.map((x, i) => `
                    <li class="${ordered ? 'flex gap-3' : 'flex gap-2.5 text-[14.5px] leading-relaxed text-muted sm:text-base'}">
                        ${ordered
                            ? `<span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">${i + 1}</span>
                               <p class="pt-0.5 text-[14.5px] leading-relaxed text-muted sm:text-base">${esc(x)}</p>`
                            : `<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span><span>${esc(x)}</span>`
                        }
                    </li>
                `).join('')}
            </${ordered ? 'ol' : 'ul'}>
        `;
    }

    if (b.t === "catatan") {
        return `
            <div class="mt-7 rounded-2xl border border-line bg-cream p-5 sm:p-6">
                <p class="text-[11px] font-bold uppercase tracking-wide text-terra-deep">
                    ${esc(b.judul)}
                </p>
                <p class="mt-1.5 text-[13.5px] leading-relaxed text-muted sm:text-sm">
                    ${esc(b.v)}
                </p>
            </div>
        `;
    }

    if (b.t === "tabel") {
        return `
            <div class="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
                <table class="w-full min-w-[420px] text-left text-[13px]">
                    <thead>
                        <tr class="border-b border-line bg-cream">
                            ${b.header.map(h => `
                                <th class="px-4 py-3 font-bold text-forest">${esc(h)}</th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${b.baris.map(r => `
                            <tr class="border-b border-line last:border-0">
                                ${r.map(c => `
                                    <td class="px-4 py-3 text-muted">${esc(c)}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    return "";
}

function renderDaftar() {
    document.title = "Artikel — Bali Eling Luu";

    isi.innerHTML = `
        <div class="max-w-3xl">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-forest">
                Artikel
            </span>

            <h1 class="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-forest sm:text-4xl lg:text-5xl">
                Cerita dan Inspirasi untuk Bali
            </h1>

            <p class="mt-3 text-[13.5px] leading-relaxed text-muted sm:text-base">
                Panduan praktis seputar pemilahan sampah, pengurangan plastik, dan menjaga lingkungan Bali.
            </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            ${ARTIKEL.map(a => kartu(a)).join('')}
        </div>
    `;
}

function renderArtikel(a) {
    document.title = `${a.judul} — Bali Eling Luu`;

    const lain = ARTIKEL.filter(x => x.id !== a.id);

    isi.innerHTML = `
        <div class="mx-auto max-w-baca">

            <nav aria-label="Breadcrumb" class="mb-6 hidden text-sm text-muted lg:block">
                <a href="${HOME_URL}" class="transition hover:text-primary">Beranda</a> /
                <a href="${ARTIKEL_URL}" class="transition hover:text-primary">Artikel</a> /
                <span class="font-semibold text-forest">${esc(a.judul)}</span>
            </nav>

            <div>
                ${chip(a.kategori)}

                <h1 class="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight text-forest sm:text-4xl lg:text-[42px]">
                    ${esc(a.judul)}
                </h1>

                <p class="mt-3 text-[13px] text-muted sm:text-sm">
                    ${esc(a.penulis)} • ${esc(a.tanggal)} • ${a.menit} menit baca
                </p>
            </div>

            <div class="mt-8 overflow-hidden rounded-2xl sm:mt-10">
                <img src="${asset(a.foto)}"
                     alt="${esc(a.alt)}"
                     class="aspect-[16/9] w-full object-cover">
            </div>

            <div class="isi-artikel mt-9 lg:mt-12">
                ${a.isi.map(renderBlok).join('')}
            </div>
        </div>

        <section class="mt-14 border-t border-line pt-10 lg:mt-20 lg:pt-14">
            <h2 class="text-[18px] font-extrabold tracking-tight text-forest sm:text-2xl">
                Artikel lainnya
            </h2>

            <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                ${lain.map(x => kartu(x, true)).join('')}
            </div>

            <a href="${ARTIKEL_URL}"
               class="mt-8 inline-block text-sm font-bold text-primary hover:underline">
                ← Lihat semua artikel
            </a>
        </section>
    `;
}

const id = window.ARTIKEL_ID || new URLSearchParams(window.location.search).get('id');
const artikel = id ? cariArtikel(id) : null;

if (artikel) {
    renderArtikel(artikel);
} else {
    renderDaftar();
}
