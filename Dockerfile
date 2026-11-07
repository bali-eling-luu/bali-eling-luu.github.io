FROM php:8.4-fpm

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN npm ci && npm run build

EXPOSE 8080

CMD ["sh", "-c", "php artisan migrate --force && php artisan serve --host 0.0.0.0 --port ${PORT:-8080}"]
