@extends('admin.layouts.app')

@section('content')

<div class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Customer Orders</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Track payments, order status updates, and customer shipping details.</p>
    </div>
</div>

<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
    <div class="bg-blue-600 text-white rounded-2xl p-4 sm:p-6 shadow-md">
        <h3 class="text-xs font-semibold opacity-90 uppercase tracking-wider">Total Orders</h3>
        <p class="text-2xl sm:text-3xl font-black mt-2">{{ $totalOrders }}</p>
    </div>

    <div class="bg-amber-500 text-white rounded-2xl p-4 sm:p-6 shadow-md">
        <h3 class="text-xs font-semibold opacity-90 uppercase tracking-wider">Pending</h3>
        <p class="text-2xl sm:text-3xl font-black mt-2">{{ $pendingOrders }}</p>
    </div>

    <div class="bg-emerald-600 text-white rounded-2xl p-4 sm:p-6 shadow-md">
        <h3 class="text-xs font-semibold opacity-90 uppercase tracking-wider">Paid Orders</h3>
        <p class="text-2xl sm:text-3xl font-black mt-2">{{ $paidOrders }}</p>
    </div>

    <div class="bg-rose-600 text-white rounded-2xl p-4 sm:p-6 shadow-md">
        <h3 class="text-xs font-semibold opacity-90 uppercase tracking-wider">Failed</h3>
        <p class="text-2xl sm:text-3xl font-black mt-2">{{ $failedOrders }}</p>
    </div>

    <div class="col-span-2 sm:col-span-1 bg-purple-600 text-white rounded-2xl p-4 sm:p-6 shadow-md">
        <h3 class="text-xs font-semibold opacity-90 uppercase tracking-wider">Revenue</h3>
        <p class="text-xl sm:text-2xl font-black mt-2">
            KES {{ number_format($totalRevenue) }}
        </p>
    </div>
</div>

<form method="GET" class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 mb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
            type="text"
            name="search"
            value="{{ request('search') }}"
            placeholder="Search customer, phone or order..."
            class="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-600 text-sm">

        <select
            name="status"
            class="w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-white">
            <option value="">All Statuses</option>
            <option value="pending" @selected(request('status')=='pending')>Pending</option>
            <option value="paid" @selected(request('status')=='paid')>Paid</option>
            <option value="payment_failed" @selected(request('status')=='payment_failed')>Payment Failed</option>
            <option value="processing" @selected(request('status')=='processing')>Processing</option>
            <option value="shipped" @selected(request('status')=='shipped')>Shipped</option>
            <option value="delivered" @selected(request('status')=='delivered')>Delivered</option>
            <option value="cancelled" @selected(request('status')=='cancelled')>Cancelled</option>
        </select>

        <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-2.5 text-sm transition">
            Search Orders
        </button>
    </div>
</form>

<div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
                <tr>
                    <th class="px-4 sm:px-6 py-4">Order #</th>
                    <th class="px-4 sm:px-6 py-4">Customer</th>
                    <th class="px-4 sm:px-6 py-4">Phone</th>
                    <th class="px-4 sm:px-6 py-4">Location</th>
                    <th class="px-4 sm:px-6 py-4">Total</th>
                    <th class="px-4 sm:px-6 py-4">Status</th>
                    <th class="px-4 sm:px-6 py-4">Date</th>
                    <th class="px-4 sm:px-6 py-4 text-center">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm font-medium">
                @forelse($orders as $order)
                <tr class="hover:bg-slate-50 transition">
                    <td class="px-4 sm:px-6 py-4 font-bold text-slate-900">
                        #{{ $order->id }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 font-semibold text-slate-900">
                        {{ $order->customer_name }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-slate-600">
                        {{ $order->phone }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-slate-600">
                        {{ $order->town }}, {{ $order->county }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 font-bold text-slate-900">
                        KES {{ number_format($order->total) }}
                    </td>
                    <td class="px-4 sm:px-6 py-4">
                        @switch($order->status)
                            @case('pending')
                                <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">Pending</span>
                                @break
                            @case('paid')
                                <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Paid</span>
                                @break
                            @case('payment_failed')
                                <span class="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">Failed</span>
                                @break
                            @case('processing')
                                <span class="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">Processing</span>
                                @break
                            @case('shipped')
                                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">Shipped</span>
                                @break
                            @case('delivered')
                                <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Delivered</span>
                                @break
                            @case('cancelled')
                                <span class="px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">Cancelled</span>
                                @break
                            @default
                                <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">{{ $order->status }}</span>
                        @endswitch
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-xs text-slate-500">
                        {{ $order->created_at->format('d M Y') }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 text-center">
                        <a href="{{ route('admin.orders.show', $order) }}"
                           class="inline-block bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition">
                            View Details
                        </a>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="8" class="text-center py-10 text-slate-400">
                        No orders found matching your criteria.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    @if($orders->hasPages())
    <div class="p-4 border-t border-slate-100 bg-slate-50">
        {{ $orders->links() }}
    </div>
    @endif
</div>

@endsection