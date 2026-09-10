# Carefree Chelsea Store

A full-stack e-commerce storefront for Chelsea FC merchandise, built with a
Laravel API/admin backend and a React (Vite) frontend — with **M-Pesa mobile
money checkout** for the Kenyan market.

## Features

- **Storefront:** Home, Shop, Product detail, Cart, Wishlist, Checkout, Order
  success, About, Contact — a complete customer purchase journey.
- **M-Pesa payments:** STK Push integration (Safaricom Daraja API) — request
  payment, handle the async callback, mark orders paid/failed, and roll back
  reserved stock automatically if a payment fails.
- **Admin panel:** Auth-gated dashboard, product management (CRUD), and order
  management, built on Laravel Blade.
- **Email notifications:** Order confirmation, payment receipt, order status
  updates, contact form messages, and newsletter signup — sent via
  [Resend](https://resend.com).
- **Extras:** Back-in-stock notifications, newsletter subscriptions, rate
  limiting on all public write endpoints, and a custom security-headers
  middleware.

## Tech Stack

**Backend**
- Laravel 13 (PHP 8.3)
- SQLite (dev) — see `config/database.php` for other drivers
- [Resend](https://resend.com) for transactional email
- [Cloudinary](https://cloudinary.com) for image hosting
- Safaricom Daraja API (M-Pesa STK Push)

**Frontend**
- React 18 + Vite 7
- React Router 7
- Tailwind CSS 4
- Axios, react-hot-toast, lucide-react / react-icons

## Project Structure

```
backend/     Laravel app — API, admin panel, auth, mail, M-Pesa integration
frontend/    React (Vite) storefront — customer-facing SPA
```

## Getting Started

### Backend (Laravel API + Admin)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Configure these additional environment variables in `backend/.env` (not
present by default in `.env.example`):

```env
# M-Pesa (Safaricom Daraja API)
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=
MPESA_PASSKEY=
MPESA_CALLBACK_URL=

# Resend (transactional email)
RESEND_API_KEY=

# Cloudinary (product images)
CLOUDINARY_URL=
```

An admin user can be created via the `AdminUserSeeder` (included in
`php artisan migrate --seed`).

### Frontend (React storefront)

```bash
cd frontend
npm install
npm run dev
```

Set the API base URL in `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
```

## Testing

Backend tests run via PHPUnit:

```bash
cd backend
php artisan test
```

> Note: test coverage currently consists of Laravel's default example tests.
> Feature tests around order creation, stock deduction, and the M-Pesa
> callback flow are a planned next step.

## Roadmap / Known Gaps

- [ ] Feature tests for order flow and M-Pesa callback handling
- [ ] CI pipeline (lint + test on push)
- [ ] Document `.env.example` fully (M-Pesa, Resend, Cloudinary keys)