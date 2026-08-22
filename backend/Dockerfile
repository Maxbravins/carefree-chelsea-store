FROM tangramor/nginx-php8-fpm:php8.4.7_withoutNodejs

COPY . .

# Install dependencies at BUILD time
RUN composer install --no-dev --working-dir=/var/www/html --no-interaction

# Run migrations at BUILD time (needs DB env vars available during build)
RUN php artisan migrate --force || true

# Image config
ENV WEBROOT=/var/www/html/public
ENV PHP_ERRORS_STDERR=1
ENV RUN_SCRIPTS=1
ENV REAL_IP_HEADER=1
ENV COMPOSER_ALLOW_SUPERUSER=1

# Laravel config
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

CMD ["/start.sh"]
