<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\DashboardController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', [DashboardController::class, 'index'])
    ->name('admin.dashboard');

Route::resource('admin/products', ProductController::class)
    ->names('admin.products');

Route::resource('admin/orders', OrderController::class)
    ->only(['index', 'show', 'update'])
    ->names('admin.orders');
