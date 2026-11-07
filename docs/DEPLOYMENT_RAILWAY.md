# Deploy Railway — Bali Eling Luu

Target: dapat URL publik cepat untuk juri (saat ini repo di GitHub sudah tag `v1.0-submission`).

## 1. Buat Project
1. Railway → New Project → **Deploy from GitHub repo** → `NyssINI/bali_eling_luu` (branch `main`) → **Deploy**.
2. Railway membaca `Dockerfile` + `railway.json` di root — tidak perlu pilih stack manual.

## 2. Tambah MySQL
Project → **New Service → Database → MySQL** → variable bawaan Railway: `MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`.

## 3. Set Variables (Laravel Service)
```
APP_KEY=base64:...        # buat lokal: php artisan key:generate --show
APP_ENV=production
APP_DEBUG=false
APP_URL=https://<domain>.up.railway.app   # ganti setelah deploy pertama
DB_CONNECTION=mysql
DB_HOST=${{ MySQL.MYSQLHOST }}
DB_PORT=${{ MySQL.MYSQLPORT }}
DB_DATABASE=${{ MySQL.MYSQLDATABASE }}
DB_USERNAME=${{ MySQL.MYSQLUSER }}
DB_PASSWORD=${{ MySQL.MYSQLPASSWORD }}
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=local
LOG_CHANNEL=stack
```

## 4. Deploy Ulang + Seed
Setelah MySQL terhubung, deploy ulang. Lalu jalankan sekali:
```
php artisan migrate --force
php artisan db:seed --class=ChallengeSeeder --force
php artisan db:seed --class=RewardSeeder --force
php artisan db:seed --class=PartnerSeeder --force
php artisan db:seed --class=DemoSeeder --force
```
(Bisa via Railway CLI `railway run php artisan ...` atau Railway Shell.)

## 5. Smoke Test
- `GET /` → 200
- Register → login → dashboard → tantangan → kirim bukti → pending
- Login admin → `/admin/verifikasi` → setujui → XP naik
- `/rewards` → tukar DEMO → admin proses → completed
- Demo: `demo.user@...` / `demo.admin@...` (`BaliElingLuuDemo2026!`)

## 6. Domain kustom (opsional)
Railway → Settings → Domains → Add `app.bali-eling-luu.id` → DNS CNAME ke Railway → update `APP_URL=https://app.bali-eling-luu.id` → deploy ulang.

## Catatan
Reward pulsa tetap **DEMO** (tanpa kirim nyata). Backup MySQL berkala; bukti di `storage/app/private/bukti` ikut volume Railway (pastikan Persistent Volume dikonfigurasi jika ingin tahan redeploy).
