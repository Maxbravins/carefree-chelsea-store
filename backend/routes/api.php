<?php

use App\Http\Controllers\Api\MpesaController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockNotificationController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::post('/orders', [OrderController::class, 'store']);
Route::post('/mpesa/callback', [MpesaController::class, 'callback']);
Route::post('/stock-notifications', [StockNotificationController::class, 'store']);
