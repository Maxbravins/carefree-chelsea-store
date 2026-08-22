FROM tangramor/nginx-php8-fpm:php8.4.7_withoutNodejs

COPY . .

RUN composer install --no-dev --working-dir=/var/www/html --no-interaction --optimize-autoloader \
    && mkdir -p storage/app/private storage/app/public storage/logs \
        storage/framework/cache/data storage/framework/sessions \
        storage/framework/testing storage/framework/views bootstrap/cache \
    && chown -R nginx:nginx storage bootstrap/cache \
    && chmod -R ug+rwX storage bootstrap/cache

ENV WEBROOT=/var/www/html/public
ENV PHP_ERRORS_STDERR=1
ENV REAL_IP_HEADER=1
ENV COMPOSER_ALLOW_SUPERUSER=1

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

# Run Laravel setup before nginx and PHP-FPM start.
ENV RUN_SCRIPTS=0
CMD ["/bin/sh", "-c", "/var/www/html/scripts/00-laravel-deploy.sh && exec /start.sh"]