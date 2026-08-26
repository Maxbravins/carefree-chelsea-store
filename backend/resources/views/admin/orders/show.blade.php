@extends('admin.layouts.app')

@section('content')

<div class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Order #{{ $order->id }}</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Placed on {{ $order->created_at->format('d M Y \a\t H:i') }}</p>
    </div>
    <div>
        <a href="{{ route('admin.orders.index') }}"
           class="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition w-full sm:w-auto">
            ← Back to Orders
        </a>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
    {{-- Customer Details --}}
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
        <h2 class="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
            Customer Shipping Details
        </h2>
        <div class="space-y-3 text-sm text-slate-700">
            <p><strong>Full Name:</strong> {{ $order->customer_name }}</p>
            <p><strong>Phone Number:</strong> {{ $order->phone }}</p>
            @if($order->email)<p><strong>Email Address:</strong> {{ $order->email }}</p>@endif
            <p><strong>County:</strong> {{ $order->county }}</p>
            <p><strong>Town:</strong> {{ $order->town }}</p>
            <p><strong>Landmark / Address:</strong> {{ $order->landmark ?? '-' }}</p>
            <p class="text-lg font-extrabold text-blue-900 pt-2 border-t border-slate-100">
                Order Total: KSh {{ number_format($order->total) }}
            </p>
        </div>
    </div>

    {{-- Payment Details --}}
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
        <h2 class="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
            Payment Transaction Summary
        </h2>
        @if($order->payment)
            <div class="space-y-3 text-sm text-slate-700">
                <p>
                    <strong>Payment Status:</strong>
                    <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold {{ $order->payment->status === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800' }}">
                        {{ ucfirst(str_replace('_',' ',$order->payment->status)) }}
                    </span>
                </p>
                <p><strong>Checkout Request ID:</strong> <span class="font-mono text-xs">{{ $order->payment->checkout_request_id ?? '-' }}</span></p>
                <p><strong>M-Pesa Receipt Code:</strong> <span class="font-mono text-xs font-bold text-emerald-700">{{ $order->payment->mpesa_receipt ?? '-' }}</span></p>
                <p><strong>Amount Paid:</strong> KSh {{ number_format($order->payment->amount) }}</p>
            </div>
        @else
            <p class="text-slate-500 text-sm">No payment record found for this order.</p>
        @endif
    </div>
</div>

{{-- Ordered Items Table --}}
<div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm mt-6 sm:mt-8 overflow-hidden">
    <div class="p-4 sm:p-6 border-b border-slate-100">
        <h2 class="text-lg font-bold text-slate-900">Ordered Products</h2>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[500px]">
            <thead class="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
                <tr>
                    <th class="px-4 sm:px-6 py-3">Product</th>
                    <th class="px-4 sm:px-6 py-3">Size</th>
                    <th class="px-4 sm:px-6 py-3">Custom Name</th>
                    <th class="px-4 sm:px-6 py-3">Custom Number</th>
                    <th class="px-4 sm:px-6 py-3 text-right">Price</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm font-medium">
                @foreach($order->items as $item)
                <tr>
                    <td class="px-4 sm:px-6 py-4 font-bold text-slate-900">
                        {{ $item->product->name ?? 'Product' }}
                    </td>
                    <td class="px-4 sm:px-6 py-4">
                        <span class="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold text-xs">{{ $item->size }}</span>
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-slate-600">
                        {{ $item->custom_name ?: '-' }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-slate-600">
                        {{ $item->custom_number ?: '-' }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-right font-bold text-slate-900">
                        KSh {{ number_format($item->price) }}
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

{{-- Update Order Status Form --}}
<div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm mt-6 sm:mt-8 p-5 sm:p-6">
    <h2 class="text-lg font-bold text-slate-900 mb-4">Update Order Fulfillment Status</h2>
    <form action="{{ route('admin.orders.update', $order) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center max-w-lg">
            <select name="status" class="w-full sm:flex-1 border rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-600">
                <option value="pending" @selected($order->status=='pending')>Pending</option>
                <option value="paid" @selected($order->status=='paid')>Paid</option>
                <option value="payment_failed" @selected($order->status=='payment_failed')>Payment Failed</option>
                <option value="processing" @selected($order->status=='processing')>Processing</option>
                <option value="shipped" @selected($order->status=='shipped')>Shipped</option>
                <option value="delivered" @selected($order->status=='delivered')>Delivered</option>
                <option value="cancelled" @selected($order->status=='cancelled')>Cancelled</option>
            </select>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition">
                Update Status
            </button>
        </div>
    </form>
</div>

@endsection