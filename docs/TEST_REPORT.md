# Test Report — Bali Eling Luu (Phase 7)

Tanggal: 7 Nov 2026 · Commit: `main` setelah Phase 7
Perintah: `php artisan test` → **46 passed (189 assertions)**
Build: `npm run build` OK
Browser: console bersih, Lighthouse 1.0/1.0/1.0 untuk halaman utama

## A. Authentication — PASS
- Registrasi user berhasil · Login berhasil · Password salah ditolak · Logout berhasil
- Tamu → `/dashboard` redirect login · User → `/admin/*` 403 · Admin → `/admin/*` 200

## B. Authorization — PASS
- User tidak bisa approve · tidak bisa ubah XP/role dari form · tidak bisa akses pengajuan orang lain (IDOR bukti 403)
- Admin bisa verifikasi + kelola reward

## C. Action Verification — PASS
- Valid → pending · tanpa bukti → 422 · MIME salah → 422 · oversize → 422
- Bukti tersimpan di `local` private · status awal pending
- XP belum saat pending · +XP setelah approved · tidak setelah rejected · tidak ganda (unique + status check)
- Duplikat hash 24 jam ditolak · daily limit ditolak

## D. XP — PASS
- Bertambah hanya setelah approval · tidak sebelum · tidak ganda
- Level diperbarui (1–5: 0/150/400/800/1500) · riwayat `xp_transactions` tercatat · frontend tidak bisa manipulasi

## E. Rewards — PASS
- Katalog terlihat · XP cukup bisa redeem (XP −500, stok −1) · kurang ditolak · stok habis ditolak
- Saldo tidak minus · race dicegah via `lockForUpdate`
- Admin approve → processing → completed (DEMO) · reject refund XP + stok
- Tidak mengklaim pulsa terkirim (label DEMO)

## F. Data & keamanan — PASS
- Validasi input · XSS di-escape (name `<script>` tampil sebagai teks) · CSRF proteksi · upload MIME+size aman
- File privat tak bisa diakses asing (403) · IDOR dicegah · role escalation ditolak · audit log tertulis

## G. UI — PASS
- Desktop/tablet/mobile: viewport `width=device-width`, bottom-nav mobile, header responsif, empty state (riwayat, reward, impact), error state (422), success notification (`status`), konfirmasi hapus tantangan/reward
- Browser: home/tantangan/eco-impact/leaderboard OK tanpa error console

## E2E §15 — PASS
Skenario approve: login user → dashboard → tantangan → upload → pending (XP 0) → admin approve → XP 30 → redeem pulsa 30 XP → pending → admin approve/process/complete (DEMO) → completed.
Skenario tolak: upload → admin tolak + “Bukti buram” → XP tetap 0 → riwayat menampilkan alasan.
