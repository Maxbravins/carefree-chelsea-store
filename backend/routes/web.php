<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', function () {
    return view('welcome');
});

// Public login routes, rate-limited to stop brute-force attempts
Route::middleware('throttle:5,1')->group(function () {
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login.attempt');
});
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Everything admin now requires a logged-in session
Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('admin/products', ProductController::class)->names('admin.products');
    Route::resource('admin/orders', OrderController::class)
        ->only(['index', 'show', 'update'])
        ->names('admin.orders');
});