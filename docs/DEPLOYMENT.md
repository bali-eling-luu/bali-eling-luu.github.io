# Deployment — Bali Eling Luu

Backend Laravel di hosting yang mendukung Laravel (VPS + Nginx + MySQL).
**Jangan deploy Laravel ke Vercel** seperti frontend statis. Jika Vercel wajib, pisahkan: backend tetap di VPS/Laravel-host, frontend ke Vercel.

## Stack produksi
- Ubuntu 22.04/24.04, PHP 8.3+ (proyek teruji di 8.5), MySQL 8.0, Nginx, Supervisor queue
- Node 20+ untuk `npm run build` (atau build sebelum deploy)

## Setup (sekali)
```bash
sudo apt update && sudo apt install -y nginx mysql-server php8.3 php8.3-fpm php8.3-mbstring php8.3-xml php8.3-curl php8.3-zip php8.3-bcmath php8.3-gd php8.3-intl php8.3-mysql composer git unzip nodejs
sudo mysql -e "CREATE DATABASE bali_eling_luu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'bali_eling_luu'@'localhost' IDENTIFIED BY 'STRONG_VALUE';
GRANT ALL ON bali_eling_luu.* TO 'bali_eling_luu'@'localhost'; FLUSH PRIVILEGES;"
```

## Deploy
```bash
cd /var/www/bali-eling-luu
git clone git@github.com:NyssINI/bali_eling_luu.git .
composer install --no-dev --optimize-autoloader
npm ci && npm run build
cp .env.example .env
# isi APP_KEY, APP_URL, DB_PASSWORD dari vault — JANGAN commit .env
php artisan key:generate
php artisan migrate --force
php artisan db:seed --class=ChallengeSeeder --force
php artisan db:seed --class=RewardSeeder --force
php artisan db:seed --class=PartnerSeeder --force
php artisan db:seed --class=DemoSeeder --force   # hanya environment demo/juri
php artisan storage:link   # hanya jika ada file publik (bukti tetap private)
php artisan config:cache && php artisan route:cache && php artisan view:cache
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

## Nginx (contoh)
```
server {
  listen 443 ssl; server_name app.bali-eling-luu.id;
  root /var/www/bali-eling-luu/public;
  index index.php;
  location / { try_files $uri $uri/ /index.php?$query_string; }
  location ~ \.php$ { fastcgi_pass unix:/var/run/php/php8.3-fpm.sock; include fastcgi_params; fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; }
  location ~ /\.ht { deny all; }
}
```
Aktifkan HTTPS (Let's Encrypt). Pastikan `SESSION_SECURE_COOKIE=true` di `.env`.

## Queue (Supervisor)
```
[program:bali-eling-luu-queue]
command=/usr/bin/php /var/www/bali-eling-luu/artisan queue:work --tries=3
directory=/var/www/bali-eling-luu
autostart=true autorestart=true
```

## Backup & restore
```bash
# Backup database
mysqldump -u bali_eling_luu -p bali_eling_luu > ~/backup-$(date +%F).sql
# Backup bukti privat
tar -czf ~/bukti-$(date +%F).tgz storage/app/private/bukti
# Restore
mysql -u bali_eling_luu -p bali_eling_luu < ~/backup-DATE.sql
tar -xzf ~/bukti-DATE.tgz -C storage/app/private/
php artisan migrate --force
```

## Smoke test (wajib sebelum serah terima)
- [ ] `GET /` → 200, Lighthouse OK, console bersih
- [ ] Register → login → dashboard OK
- [ ] Submit bukti → pending, admin approve → XP naik, reward DEMO → completed
- [ ] `/admin/*` hanya admin (user 403)
- [ ] Backup berhasil dibuat

## Troubleshooting
- `APP_KEY` hilang: `php artisan key:generate` lalu `config:clear`.
- Upload tidak tersimpan: cek izin `storage` + `FILESYSTEM_DISK=local`.
- MySQL timeout: cek `DB_HOST` 127.0.0.1/3306 + firewall.
- View cache basi: `php artisan view:clear && view:cache`.
