@extends('admin.layouts.app')

@section('content')

<div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Executive Overview</h1>
        <p class="text-sm text-slate-500 mt-1">Live metrics across catalog items, order transactions, and revenue.</p>
    </div>
    <div class="flex items-center gap-3">
        <a href="{{ route('admin.products.create') }}" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/30 transition">
            <span>+</span> Add New Product
        </a>
    </div>
</div>

<!-- Stats Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <span class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">💰</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mt-4">KSh {{ number_format($totalRevenue) }}</p>
        <p class="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <span>↑</span> Paid transactions
        </p>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
            <span class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">🛒</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mt-4">{{ $orders }}</p>
        <p class="text-xs text-slate-500 mt-2 font-medium">{{ $paidOrders }} paid • {{ $pendingOrders }} pending</p>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Products</span>
            <span class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">👕</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mt-4">{{ $products }}</p>
        <p class="text-xs text-indigo-600 font-semibold mt-2">Available in store</p>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Orders</span>
            <span class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">⏳</span>
        </div>
        <p class="text-3xl font-extrabold text-amber-600 mt-4">{{ $pendingOrders }}</p>
        <p class="text-xs text-amber-600 font-semibold mt-2">Requires fulfillment</p>
    </div>
</div>

<div class="grid lg:grid-cols-2 gap-8">
    <!-- Recent Orders Card -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
                <h2 class="text-lg font-bold text-slate-900">Recent Orders</h2>
                <p class="text-xs text-slate-500">Live order placements from store checkout</p>
            </div>
            <a href="{{ route('admin.orders.index') }}" class="text-xs font-bold text-blue-600 hover:text-blue-700">View All →</a>
        </div>
        <div class="divide-y divide-slate-100">
            @forelse($recentOrders as $order)
                <div class="p-5 flex items-center justify-between hover:bg-slate-50 transition">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm">
                            #{{ $order->id }}
                        </div>
                        <div>
                            <h3 class="font-bold text-slate-900 text-sm">{{ $order->customer_name }}</h3>
                            <p class="text-xs text-slate-500">{{ $order->phone }} • {{ $order->town }}, {{ $order->county }}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-extrabold text-slate-900 text-sm">KSh {{ number_format($order->total) }}</p>
                        <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold {{ $order->status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800' }}">
                            {{ ucfirst($order->status) }}
                        </span>
                    </div>
                </div>
            @empty
                <div class="p-8 text-center text-slate-400 text-sm font-medium">
                    No orders placed yet.
                </div>
            @endforelse
        </div>
    </div>

    <!-- Stock Monitor Card -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
                <h2 class="text-lg font-bold text-slate-900">Inventory Warning</h2>
                <p class="text-xs text-slate-500">Products with stock level ≤ 5</p>
            </div>
            <a href="{{ route('admin.products.index') }}" class="text-xs font-bold text-blue-600 hover:text-blue-700">Manage Stock →</a>
        </div>
        <div class="divide-y divide-slate-100">
            @forelse($lowStock as $product)
                <div class="p-5 flex items-center justify-between hover:bg-slate-50 transition">
                    <div class="flex items-center gap-3">
                        <img src="{{ $product->image_url }}" class="w-12 h-12 object-cover rounded-xl border border-slate-200">
                        <div>
                            <h3 class="font-bold text-slate-900 text-sm">{{ $product->name }}</h3>
                            <p class="text-xs text-slate-500">{{ $product->category }} • KSh {{ number_format($product->price) }}</p>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-700 border border-rose-200">
                        Only {{ $product->stock }} left!
                    </span>
                </div>
            @empty
                <div class="p-8 text-center text-emerald-600 text-sm font-semibold flex items-center justify-center gap-2">
                    <span>🎉</span> All product stock levels are healthy!
                </div>
            @endforelse
        </div>
    </div>
</div>

@endsection