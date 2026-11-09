set -euo pipefail
cd /var/www/html
if [ "${APP_ENV:-production}" = "production" ]; then
  if [ "${DB_CONNECTION:-pgsql}" != "pgsql" ]; then
    echo "Production must use PostgreSQL so catalog data survives deployments." >&2
    exit 1
  fi
  if [ -z "${DATABASE_URL:-}" ] && [ -z "${DB_HOST:-}" ]; then
    echo "Set DATABASE_URL or DB_HOST to the persistent PostgreSQL database before deploying." >&2
    exit 1
  fi
fi

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
php artisan storage:link || true
php artisan db:seed --class=ProductSeeder --force
php artisan tinker --execute="\App\Models\User::firstOrCreate(['email' => env('ADMIN_EMAIL')], ['name' => 'Admin', 'password' => bcrypt(env('ADMIN_PASSWORD'))]);"
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
chown -R nginx:nginx storage bootstrap/cache
