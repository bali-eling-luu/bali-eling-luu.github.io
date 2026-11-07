# Deploy ke Vercel

Aplikasi Laravel ini dideploy sebagai **Vercel Container Function** (FrankenPHP + PHP 8.4).
File yang dipakai Vercel:

| File | Fungsi |
|---|---|
| `Dockerfile.vercel` | Image FrankenPHP, PHP 8.4, ekstensi `pdo_pgsql`, `intl`, `zip`, `gd`, `bcmath`, `exif` |
| `Caddyfile` | Web server, document root `/app/public` |
| `vercel.json` | Service `app` + rewrite semua request ke container |
| `.dockerignore` | `.env`, `vendor`, `node_modules`, SQLite, cache build tidak ikut image |

`Dockerfile` (Railway) tidak diubah. Vercel memakai `Dockerfile.vercel`.

## Database

Vercel tidak menyimpan filesystem. Database memakai PostgreSQL eksternal (Supabase),
schema terpisah `bali_eling_luu`, koneksi lewat Supavisor pooler (IPv4) port `6543`.

Migrasi dijalankan dari mesin lokal/CI, **bukan** saat container start:

```bash
php artisan migrate --force
php artisan db:seed --class=ChallengeSeeder --force
php artisan db:seed --class=RewardSeeder --force
php artisan db:seed --class=PartnerSeeder --force
php artisan db:seed --class=DemoSeeder --force
```

## Environment variables Vercel

Set di Project → Settings → Environment Variables (Production):

```
APP_NAME="Bali Eling Luu"
APP_ENV=production
APP_DEBUG=false
APP_KEY=<php artisan key:generate --show>
APP_URL=https://<project>.vercel.app
APP_LOCALE=id
APP_FALLBACK_LOCALE=id

DB_CONNECTION=pgsql
DB_HOST=<region>.pooler.supabase.com
DB_PORT=6543
DB_DATABASE=postgres
DB_USERNAME=<role>.<project-ref>
DB_PASSWORD=<password>
DB_SEARCH_PATH=bali_eling_luu
DB_SSLMODE=require

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=
CACHE_STORE=database
QUEUE_CONNECTION=sync
LOG_CHANNEL=stderr
FILESYSTEM_DISK=local
```

`QUEUE_CONNECTION=sync` karena Vercel tidak menjalankan worker. `CACHE_STORE` dan
`SESSION_DRIVER` memakai database supaya state konsisten antar instance.

## Batasan yang diketahui

- Filesystem container bersifat sementara. Bukti aksi (`storage/app/private/bukti`)
  hilang saat instance didaur ulang; untuk produksi arahkan disk ke object storage
  (Supabase Storage / S3 / Vercel Blob).
- Region container diset `syd1` agar dekat dengan database (Supabase `ap-southeast-2`).
- Migrasi tidak dijalankan otomatis saat container start; jalankan manual atau via CI.
