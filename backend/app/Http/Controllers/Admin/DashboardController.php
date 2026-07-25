<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Payment;

class DashboardController extends Controller
{
    public function index()
    {
        return view('admin.dashboard', [

            'products' => Product::count(),

            'orders' => Order::count(),

            'pendingOrders' => Order::where('status','pending')->count(),

            'paidOrders' => Order::where('status', 'paid')->count(),

            'failedOrders' => Order::where('status', 'payment_failed')->count(),
            
            'totalRevenue' => Order::where('status', 'paid')->sum('total'),

            'recentOrders' => Order::latest()->take(5)->get(),

            'lowStock' => Product::where('stock','<=',5)->get(),

        ]);
    }
}