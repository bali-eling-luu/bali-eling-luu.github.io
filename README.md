# Bali Eling Luu — Dari Sampah, Untuk Bali

Platform Laravel untuk aksi nyata pengelolaan sampah Bali: edukasi, pemilahan, AI Vision, Eco Map, bukti terverifikasi, XP/level/badge, dan reward simulasi.

## 1. Nama project
Bali Eling Luu — Dari Sampah, Untuk Bali

## 2. Deskripsi
Platform digital yang menghubungkan masyarakat dengan pemilahan sampah dan fasilitas pengelolaan sampah di Bali, mengapresiasi kontribusi lewat XP, serta mencatat dampak secara terukur. Prinsip: **Aksi Nyata → Bukti → Verifikasi → Reward → Dampak.**

## 3. Permasalahan yang diselesaikan
- Masyarakat tidak tahu cara memilah sampah rumah tangga dan tradisi Bali (canang, banten).
- Warga tidak tahu tempat pembuangan terdekat (TPS 3R, Bank Sampah, Drop Box B3).
- Kontribusi warga tidak tercatat dan tidak diapresiasi.

## 4. Solusi
- AI Vision (TensorFlow.js MobileNet, `public/model/`) di perangkat pengguna.
- Panduan pemilahan 4 kategori + edukasi + artikel.
- Eco Map 18 titik fasilitas Bali (Leaflet).
- Alur aksi terverifikasi: unggah bukti → admin periksa → XP → reward.

## 5. Teknologi
- Laravel 12, PHP 8.5, MySQL 8, Blade, Tailwind (Vite + CDN runtime), JavaScript classic (`public/js`), Pest + PHPUnit.
- Auth custom Blade (session), Middleware `role:admin`, Policies, FormRequests, Storage `local` (private), Transactions + `lockForUpdate`.

## 6. Fitur
### Publik
Landing, Panduan (`/panduan`), Edukasi (`/edukasi?jenis=`), Artikel, Tantangan (`/tantangan`), Eco Impact (`/eco-impact`), Leaderboard (`/leaderboard`), Login/Register.

### User (auth)
Dashboard (`/dashboard`), Profil (`/profil`), Tantangan + Kirim Bukti (`/aksi`), Riwayat (`/riwayat`), Eling Rewards (`/rewards`), Riwayat Penukaran (`/rewards/riwayat`), Dashboard gamifikasi Palemahan.

### Admin (`/admin`, role admin)
Dashboard statistik, Kelola Pengguna, Kelola Tantangan, Verifikasi Aksi (approve/reject + XP + audit), Kelola Reward, Permintaan Penukaran (pending→approved→processing→completed/rejected), Riwayat XP, Audit Log.

## 7. Arsitektur
```
Browser (Blade + Tailwind + classic JS)
  → Routes (public / user auth / admin role)
  → Controllers (thin) → Services (Verify, Xp, Reward, Badge, Audit)
  → Models + Policies + FormRequests
  → MySQL + storage/app/private/bukti
```
Lihat `docs/MASTER_PLAN.md`.

## 8. Database
Tabel: `users`, `challenges`, `action_submissions`, `action_evidences`, `xp_transactions`, `rewards`, `reward_redemptions`, `partner_locations`, `waste_deposits`, `badges`, `user_badges`, `audit_logs` (+ bawaan Laravel). FK, index, unique (`hash` bukti, `action_submission_id` di XP, `user_id+badge_id`), enum status, soft delete (challenges/rewards/users), transaction untuk XP/stok.

## 9. Instalasi lokal
```bash
composer install
npm ci && npm run build
cp .env.example .env
# sesuaikan DB_CONNECTION=mysql, DB_DATABASE=bali_eling_luu
php artisan key:generate
php artisan migrate --force
php artisan db:seed --class=ChallengeSeeder --force
php artisan db:seed --class=RewardSeeder --force
php artisan db:seed --class=PartnerSeeder --force
php artisan db:seed --class=DemoSeeder --force
php artisan serve --host=127.0.0.1 --port=8012
```
Atau pakai Herd: link folder sebagai site `bali-eling-luu.test`, set `APP_URL` accordingly.

## 10. Konfigurasi `.env`
Lihat `.env.example` (MySQL, `DB_DATABASE=bali_eling_luu`). Jangan commit `.env`.

## 11. Migration
`php artisan migrate --force` — 18 migration (users → challenges/submissions/evidences → audit/XP → rewards/redemptions/badges → partners/deposits).

## 12. Seeder
- `ChallengeSeeder` (5 tantangan 30/25/20/30/35 XP)
- `RewardSeeder` (6 reward + 7 badge)
- `PartnerSeeder` (18 Eco Map)
- `DemoSeeder` (akun demo saja)

## 13. Akun demo (testing/juri saja — bukan production)
- User: `demo.user@bali-eling-luu.test` / `BaliElingLuuDemo2026!`
- Admin: `demo.admin@bali-eling-luu.test` / `BaliElingLuuDemo2026!`
- Alur uji: login user → dashboard → tantangan → kirim bukti → pending → logout → login admin → verifikasi approve → logout → login user → XP naik → Rewards tukar pulsa → admin proses DEMO → completed. Ulangi dengan tolak.
- Lihat `docs/TEST_REPORT.md`.

## 14. Testing
`php artisan test` → **46 passed (189 assertions)** (Auth, Action, Admin, Reward, EcoImpact, E2E, Security, PageRoutes). Detail di `docs/TEST_REPORT.md`.

## 15. Deployment
Lihat `docs/DEPLOYMENT.md` (VPS Nginx+MySQL, HTTPS, queue, backup/restore, smoke test). **Bukan Vercel untuk backend Laravel.**

## 16. Batasan MVP
- Reward pulsa adalah **simulasi DEMO** — tidak ada transfer sungguhan sampai ada kontrak provider + pendanaan resmi. Semua penukaran dilabeli DEMO.
- Angka impact hanya dari DB valid; “didaur ulang” tidak diklaim tanpa proses mitra.
- Bukti tersimpan privat; verifikasi butuh admin aktif.
- AI Vision 65% pada hold-out segar (butuh foto HP Bali + retrain untuk ≥80%).

## 17. Roadmap
Integrasi provider pulsa resmi, verifikasi mitra otomatis (QR/gps), notifikasi, API mobile, retrain model, perluasan kota, dashboard pemerintah.

## 18. Screenshot
- Splash: `docs/screenshots/01-splash.jpg`
- Tantangan: `docs/screenshots/02-tantangan.jpg`
- Eco Impact: `docs/screenshots/04-eco-impact.jpg`
- Rewards DEMO: `docs/screenshots/05-rewards.jpg`
- Dashboard user: `docs/screenshots/06-dashboard.jpg`

## 19. URL production
Belum di-deploy. Saat deploy, isi URL final di sini (jangan URL contoh).

## 20. Repository
GitHub: `https://github.com/NyssINI/bali_eling_luu` · branch `main` · situs statis live tetap sebagai acuan sampai parity backend teruji.
