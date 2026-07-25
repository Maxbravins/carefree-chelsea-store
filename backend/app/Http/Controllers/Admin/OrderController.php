<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display all orders.
     */
   public function index(Request $request)
{
    $query = Order::with('payment');

    if ($request->filled('search')) {

        $search = $request->search;

        $query->where(function ($q) use ($search) {

            $q->where('customer_name', 'like', "%{$search}%")
              ->orWhere('phone', 'like', "%{$search}%")
              ->orWhere('id', $search);

        });

    }

    if ($request->filled('status')) {

        $query->where('status', $request->status);

    }

    $orders = $query
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return view('admin.orders.index', [

        'orders' => $orders,

        'totalOrders' => Order::count(),

        'pendingOrders' => Order::where('status','pending')->count(),

        'paidOrders' => Order::where('status','paid')->count(),

        'failedOrders' => Order::where('status','payment_failed')->count(),

        'totalRevenue' => Order::where('status','paid')->sum('total'),

    ]);
}
    /**
     * Show a single order.
     */
    public function show(Order $order)
    {
        $order->load([
            'items.product',
            'payment'
        ]);

        return view('admin.orders.show', compact('order'));
    }

    /**
     * Update order status.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => [
                'required',
                'in:pending,paid,payment_failed,processing,shipped,delivered,cancelled'
            ]
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()
            ->route('admin.orders.show', $order)
            ->with('success', 'Order status updated successfully.');
    }
}