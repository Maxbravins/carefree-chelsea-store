<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\OrderStatusUpdatedMail;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

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

        $oldStatus = $order->status;
        $newStatus = $request->status;

        $order->update([
            'status' => $newStatus,
        ]);

        if ($oldStatus !== $newStatus && $order->email) {
            try {
                Mail::to($order->email)->send(new OrderStatusUpdatedMail($order, $newStatus));
            } catch (\Throwable $e) {
                Log::warning("Order status email notification failed for order #{$order->id}: " . $e->getMessage());
            }
        }

        return redirect()
            ->route('admin.orders.show', $order)
            ->with('success', 'Order status updated successfully.');
    }
}