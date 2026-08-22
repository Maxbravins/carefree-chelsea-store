FROM tangramor/nginx-php8-fpm:php8.4.7_withoutNodejs

COPY . .

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
