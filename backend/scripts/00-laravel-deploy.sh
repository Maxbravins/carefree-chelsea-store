set -euo pipefail

cd /var/www/html

mkdir -p \
  storage/app/private \
  storage/app/public \
  storage/logs \
  storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/testing \
  storage/framework/views \
  bootstrap/cache

chown -R nginx:nginx storage bootstrap/cache
chmod -R ug+rwX storage bootstrap/cache

php artisan migrate --force
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

chown -R nginx:nginx storage bootstrap/cache
