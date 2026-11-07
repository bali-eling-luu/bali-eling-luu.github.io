# BALI ELING LUU — MVP PLAN (Phase 1)

Tagline: Dari Sampah, Untuk Bali
Laravel: 12.71 | PHP: 8.5.12 | MySQL (prod) + SQLite (testing)

## 1. Environment (terverifikasi 7 Nov 2026, macOS darwin)

- PHP 8.5.12 CLI (NTS), Composer 2.8.12, Node v24.22.2, npm 11.19.1
- Ekstensi: pdo_mysql, pdo_sqlite, pdo_pgsql, fileinfo, gd, imagick, zip, intl, mbstring, bcmath, curl, openssl, redis — cukup untuk Laravel + upload + image (GD/Imagick).
- MySQL lokal: client 26.7.0 (Homebrew), `mysqladmin ping` → alive (`brew services mysql started`). PostgreSQL@16 juga jalan.
- DB berikutnya: **MySQL untuk dev & production** sesuai prompt §3. SQLite hanya untuk testing (in-memory) agar test cepat. DB dev: `bali_eling_luu`, user `root` (lokal saja), charset `utf8mb4` collation `utf8mb4_unicode_ci`.
- Tailwind: Vite (`@tailwindcss/vite`) + CDN `cdn.tailwindcss.com` di layout (warisan Fase 0). Di Fase 2+ layout auth/admin akan memakai Vite build total.
- Testing: Pest + PHPUnit (keduanya terinstall via `vendor/bin/pest|phpunit`). Dipilih Pest untuk concise feature test.
- Tidak ada scaffolding auth (no Breeze/Jetstream/Fortify/Sanctum), tidak ada Filament, tidak ada Spatie. Yang ada hanya `laravel/framework` + `laravel/tinker`.
- `.env` saat ini `DB_CONNECTION=sqlite` (warisan Fase 0). Migrasi: ganti ke MySQL + `migrate:fresh --seed`.
- `storage/app/private` tersedia (Laravel 12 default). Bukti aksi disimpan di disk `local` (tidak publik), diakses lewat controller berhak akses.

## 2. Kondisi repo saat ini (sebelum MVP backend)

Sudah ada (Fase 0+1, `main` @ `63d1257`):

- Public: `/`, `/artikel`, `/artikel/{id}`, `/dashboard` (penuh), `/edukasi?jenis=`, `/panduan` (penuh), `public/js/*` (ai_scanner, chat, data_*, eco_action, peta), `public/model/*` Teachable Machine 2,1 MB, `public/assets/*`.
- Layout `layouts/app.blade.php` + partial `public-header/footer/bottom-nav`. Body class dinamis; home `locked` selama splash, halaman lain scrollable.
- `public/js` classic scripts (bukan Vite) agar global `KATEGORI`, `FASILITAS_BALI` bisa dipakai `chat.js`/`peta.js`/`ai_scanner.js`.
- Migration stub kosong: `articles`, `locations`, `eco_actions`, `trash_types` hanya `id+timestamps`. Model: `User, Article, EcoAction, Location, TrashType`.
- Belum ada: auth, role, middleware admin, policies, validasi upload, transaksi XP, reward, admin CRUD, audit log sungguhan, eco impact dari DB.

## 3. Arsitektur yang diusulkan

```
Browser (Blade + Tailwind + classic JS)
   │
Routes: public (home/edukasi/panduan/artikel/eco-impact)
        user (auth): /dashboard, /tantangan, /aksi/{id}/bukti,
                     /riwayat, /rewards, /penukaran, /leaderboard, /profil
        admin: /admin/* (middleware role:admin)
   │
Controllers (thin) → Services (ActionVerificationService,
                   XpService, RewardRedemptionService)
   │
Models + Policies + FormRequests (validasi server) + Events/Listeners (audit)
   │
MySQL (users, challenges, action_submissions, action_evidences,
       xp_transactions, rewards, reward_redemptions,
       partner_locations, waste_deposits, badges, user_badges, audit_logs)
   │
storage/app/private/bukti (disk local, tidak publik)
```

Keputusan penting:

- **Auth: Laravel Breeze (Blade)** — paling ringan, konsisten Blade+Tailwind tanpa Livewire/Alpine. Tidak pakai Jetstream/Fortify (overkill untuk MVP). Tidak pakai Filament untuk admin (buat admin Blade custom agar tema konsisten + tidak tambah dependensi berat). Tidak pakai Spatie Permission (cukup kolom `role` + policy).
- **Authorization:** kolom `users.role` (`user|admin`), middleware `role:admin`, Policy per model (`ActionSubmissionPolicy`, dll.). Role tidak bisa diisi dari form registrasi (guard di `RegisterRequest` + `fillable` tanpa `role`).
- **XP:** sumber kebenaran = `xp_transactions` (append-only). Kolom `users.xp_balance` di-cache via transaction, tidak bisa diupdate dari frontend. Level dihitung dari total. Anti double-XP: unique `action_submission_id` di `xp_transactions`.
- **Bukti:** upload ke disk `local` (private), validasi `mimes:jpeg,jpg,png,webp|max:5120` + `fileinfo` MIME check, hash SHA-256 untuk deteksi duplikat (`evidence_hash` unique per user+challenge per hari), nama file acak (`Str::uuid()` + ekstensi tervalidasi). Download/view lewat controller + policy (bukan URL publik).
- **Reward (DEMO):** stok + saldo dikurangi atomik dalam `DB::transaction` + `lockForUpdate()`. Status: `pending → approved → processing → completed | rejected | cancelled`. Semua transaksi demo dilabeli `DEMO`. Nomor HP hanya di tabel penukaran, tidak ditampilkan publik.
- **Audit:** `audit_logs` (actor, action, entity, before/after JSON, ip) ditulis untuk verifikasi, XP, reward, admin CRUD via service — bukan via event manual yang mudah terlewat.
- **Eco Impact:** agregasi dari data valid saja (`verified`), bedakan `dipilah` (submission approved without deposit yet) vs `disetor` (`waste_deposits` confirmed) vs `diproses mitra` (hanya jika ada konfirmasi mitra — default tidak diklaim).
- **Artikel statis lama:** tetap memakai port JS (`data_artikel.js` + Vite) untuk parity sampai DB artikel diputuskan. Tabel `articles` stub dibiarkan, tidak di-drop.
- **Deploy:** VPS Laravel-compatible (Ubuntu + PHP 8.3+/8.5, MySQL 8, Nginx, Supervisor/queue) atau managed Laravel host. **Bukan Vercel** untuk backend. Frontend statis tetap live sebagai acuan sampai parity backend teruji.

## 4. Database design (minimal sesuai prompt §12)

### `users` (extends bawaan)
`id, name, username (unique), email (unique), phone (nullable, untuk penukaran saja), password, role ENUM('user','admin') default 'user', avatar_path nullable, xp_balance INTEGER default 0, email_verified_at, remember_token, timestamps, softDeletes`
Index: `role`, `username`, `email`. Policy: user tidak bisa ubah `role`, `xp_balance`.

### `challenges`
`id, name, slug (unique), description, instruction, category, xp_reward, evidence_required BOOLEAN default true, requires_weight BOOLEAN default false, daily_limit INT default 1, is_active BOOLEAN, sort_order, starts_at nullable, ends_at nullable, timestamps, softDeletes`
Seed 5 tantangan §6 dengan XP 30/25/20/30/35 dari `eco_action.js` + level §8.

### `action_submissions`
`id, user_id FK, challenge_id FK, status ENUM('pending','approved','rejected','cancelled'), weight_kg DECIMAL(8,2) nullable, location_text nullable, note, admin_id nullable FK→users, admin_note nullable, submitted_at, verified_at nullable, timestamps`
Index: `user_id+status`, `status`. Unique bagian: `(user_id, challenge_id, DATE(submitted_at))` untuk enforce daily_limit (dijaga di service + DB).

### `action_evidences`
`id, action_submission_id FK, type ENUM('before_after','activity','receipt','qr'), path (private disk), original_name (untuk audit saja), mime, size_bytes, hash CHAR(64), position INT, timestamps`
Unique: `hash` (tentukan aturan duplikat: tolak hash sama dari user yang sama dalam 24 jam). `path` tidak pernah di-expose langsung.

### `xp_transactions`
`id, user_id FK, action_submission_id FK nullable unique, reward_redemption_id FK nullable, type ENUM('earn','spend','adjust'), amount INT (bisa negatif untuk spend), balance_after INT, reason, created_by nullable FK, timestamps`
Append-only: tidak ada update/delete via aplikasi. `balance_after` dihitung dalam transaction.

### `rewards`
`id, name, description, image_path nullable, xp_cost, stock INT, is_active, sort_order, requires_phone BOOLEAN, timestamps, softDeletes`
Seed katalog §9 (500/900/1000/700/1500 XP).

### `reward_redemptions`
`id, user_id FK, reward_id FK, xp_cost_snapshot, phone (encrypted bila perlu) nullable, status ENUM('pending','approved','processing','completed','rejected','cancelled'), is_demo BOOLEAN default true, admin_id nullable, admin_note nullable, processed_at nullable, completed_at nullable, timestamps`
XP dikunci saat `pending` via transaksi `spend` pending? Desain MVP: XP langsung dikurangi atomik saat create (status pending = XP sudah di-hold), refund saat `rejected/cancelled`. Stok dikurangi atomik saat create, dikembalikan saat rejected.

### `partner_locations`
`id, name, type ('bank_sampah','tps3r','dropbox_b3','tps_terpadu'), regency, address, lat, lng, contact (opsional, hanya untuk demo), is_verified, is_active, timestamps`

### `waste_deposits`
`id, partner_location_id nullable FK, user_id nullable FK, waste_category, weight_kg, deposit_date, verification_status ENUM('dipilah','dikumpulkan','disetor','diproses_mitra'), verified_by nullable, timestamps`
Hanya `disetor`/`diproses_mitra` yang dihitung sebagai dampak nyata.

### `badges` + `user_badges`
`badges: id, name, description, criteria_type, criteria_value, icon, timestamps`
`user_badges: id, user_id FK, badge_id FK, awarded_at, unique(user_id,badge_id)`

### `audit_logs`
`id, actor_id nullable FK, action, auditable_type nullable, auditable_id nullable, before JSON nullable, after JSON nullable, ip_address, user_agent, timestamps`
Index: `auditable_type+auditable_id`, `actor_id`, `action`.

FK, index, unique, enum, timestamp, soft delete (users, challenges, rewards) sesuai §12. Semua proses penting pakai `DB::transaction` + `lockForUpdate` untuk cegah race condition (double XP, double redeem).

## 5. Route & halaman (MVP)

Public: `/`, `/tentang`, `/cara-kerja`, `/tantangan` (daftar publik aktif), `/eco-impact`, `/login`, `/register`
User (auth): `/dashboard` (otomatis pakai rute auth bila login; anonim diarahkan ke login dengan pesan), `/profil`, `/tantangan/{slug}`, `/aksi/submit`, `/riwayat`, `/rewards`, `/penukaran`, `/leaderboard`
Admin (`/admin`): dashboard, users, challenges, verifikasi, rewards, penukaran, xp-history, laporan, audit-log, settings

Navigasi: header publik + bottom-nav existing dipertahankan; menu user/admin ditambah setelah auth.

## 6. Testing plan (wajib, §14–15)

Framework: Pest (Feature tests). DB testing: SQLite `RefreshDatabase` in-memory.

- **Auth (A):** register/login/logout, guard guest → dashboard, user → `/admin` ditolak 403, admin → `/admin` 200.
- **Authorization (B):** user tidak bisa verify/ubah XP/role/akses pengajuan orang lain (IDOR), admin bisa verify/kelola reward.
- **Verification (C):** bukti valid → pending; tanpa bukti → 422; file salah/terlalu besar → 422; hash duplikat ditolak; XP belum saat pending, ada setelah approved, tidak setelah rejected, tidak ganda.
- **XP (D):** bertambah setelah approval saja, level diperbarui, riwayat tercatat, frontend tidak bisa manipulasi (POST extra field diabaikan).
- **Rewards (E):** XP cukup bisa redeem; kurang/stok habis ditolak; saldo tidak minus; race condition diuji via lock; admin approve/reject; tidak mengklaim pulsa terkirim.
- **Security (F):** validasi, XSS (`<script>` disimpan sebagai teks, tidak dieksekusi), CSRF (missing token → 419), upload MIME spoof ditolak, akses file privat tanpa policy → 403/404, IDOR, role escalation (POST `role=admin` saat register → tetap `user`), audit log tertulis.
- **UI (G):** browser automation (Chromium via `browser` tool) desktop/tablet/mobile screenshot + form/nav/empty/error state.
- **E2E (§15):** akun demo `demo.user@bali-eling-luu.test` / `demo.admin@bali-eling-luu.test` password `BaliElingLuuDemo2026!` untuk testing saja. Skenario approve + reject dijalankan end-to-end dengan bukti foto WebP asli. Laporan PASS/FAIL/BLOCKED per langkah.

## 7. Keamanan & production readiness (checklist §16)

`APP_ENV=production`, `APP_DEBUG=false`, `APP_KEY` set, DB prod terkonfigurasi, `.env` tidak di-commit, CSRF on, validasi upload, rate-limit login (`throttle`), queue untuk notifikasi, error log, backup DB, storage private, tidak ada data demo di prod.

## 8. Risiko & keputusan terbuka

1. **MySQL vs SQLite**: prompt minta MySQL. Lokal MySQL hidup — pindah `.env` ke MySQL di Phase 2; test tetap SQLite.
2. **Estimasi scope**: Fase 1–9 besar; MVP backend ditargetkan per fase dengan checkpoint Git; tidak sekaligus.
3. **Reward pulsa**: simulasi DEMO saja sampai ada kontrak provider + pendanaan. Dilarang klaim terkirim.
4. **Foto bukti**: pastikan UX mobile upload + preview + validasi tipe terlihat.
5. **Bagde**: logika kriteria sederhana (total XP, jumlah approved, streak) — tidak over-engineer.

## 9. Urutan pengerjaan (workflow §20, perkiraan file)

- **PHASE 2 — Foundation**: MySQL switch, Breeze install, `users.role` + middleware + policy scaffold, layout auth/admin, `.env.example` MySQL, dokumentasi environment.
- **PHASE 3 — User**: dashboard user (profil/XP/level/stat), challenges list, submission + upload private, riwayat, profil edit.
- **PHASE 4 — Admin**: dashboard stats, users/challenges CRUD, verifikasi + audit log.
- **PHASE 5 — XP & Rewards**: xp_transactions service + level, rewards catalog, redemption atomik, DEMO payout.
- **PHASE 6 — Eco Impact**: stats dari DB + partner_locations seed + waste_deposits.
- **PHASE 7 — Testing**: semua §14–15 termasuk browser.
- **PHASE 8 — Deploy**: VPS/managed Laravel, prod config, seeder demo, smoke test.
- **PHASE 9 — Submission**: README lengkap, screenshot, demo instructions, tag `v1.0-submission` setelah uji penuh.
