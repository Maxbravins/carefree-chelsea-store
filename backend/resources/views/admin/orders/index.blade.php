@extends('admin.layouts.app')

@section('content')

<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

    <div class="bg-blue-600 text-white rounded-xl p-6">
        <h3>Total Orders</h3>
        <p class="text-3xl font-bold">{{ $totalOrders }}</p>
    </div>

    <div class="bg-yellow-500 text-white rounded-xl p-6">
        <h3>Pending</h3>
        <p class="text-3xl font-bold">{{ $pendingOrders }}</p>
    </div>

    <div class="bg-green-600 text-white rounded-xl p-6">
        <h3>Paid Orders</h3>
        <p class="text-3xl font-bold">{{ $paidOrders }}</p>
    </div>

    <div class="bg-red-600 text-white rounded-xl p-6">
    <h3>Failed Payments</h3>
    <p class="text-3xl font-bold">
        {{ $failedOrders }}
    </p>
    </div>

    <div class="bg-purple-600 text-white rounded-xl p-6">
        <h3>Revenue</h3>
        <p class="text-2xl font-bold">
            KES {{ number_format($totalRevenue) }}
        </p>
    </div>

</div>

<form method="GET"
      class="bg-white rounded-xl shadow p-6 mb-6">

    <div class="grid md:grid-cols-3 gap-4">

        <input
            type="text"
            name="search"
            value="{{ request('search') }}"
            placeholder="Search customer, phone or order..."
            class="border rounded-lg px-4 py-2">

        <select
            name="status"
            class="border rounded-lg px-4 py-2">

            <option value="">All Statuses</option>

            <option value="pending"
                @selected(request('status')=='pending')>

                Pending

            </option>

            <option value="paid"
                @selected(request('status')=='paid')>

                Paid

            </option>

            <option value="payment_failed"
                @selected(request('status')=='payment_failed')>

                Payment Failed

            </option>

            <option value="processing"
                @selected(request('status')=='processing')>

                Processing

            </option>

            <option value="shipped"
                @selected(request('status')=='shipped')>

                Shipped

            </option>

            <option value="delivered"
                @selected(request('status')=='delivered')>

                Delivered

            </option>

            <option value="cancelled"
                @selected(request('status')=='cancelled')>

                Cancelled

            </option>

        </select>

        <button
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">

            Search

        </button>

    </div>

</form>

<div class="bg-white rounded-xl shadow">

    <div class="p-6 border-b">
        <h2 class="text-2xl font-bold">
            Customer Orders
        </h2>
    </div>

    <div class="overflow-x-auto">

        <table class="min-w-full">

            <thead class="bg-gray-100">

            <tr>

                <th class="px-6 py-4 text-left">Order #</th>
                <th class="px-6 py-4 text-left">Customer</th>
                <th class="px-6 py-4 text-left">Phone</th>
                <th class="px-6 py-4 text-left">County</th>
                <th class="px-6 py-4 text-left">Total</th>
                <th class="px-6 py-4 text-left">Status</th>
                <th class="px-6 py-4 text-left">Date</th>
                <th class="px-6 py-4 text-center">Action</th>

            </tr>

            </thead>

            <tbody>

            @forelse($orders as $order)

                <tr class="border-b hover:bg-gray-50">

                    <td class="px-6 py-4">
                        #{{ $order->id }}
                    </td>

                    <td class="px-6 py-4">
                        {{ $order->customer_name }}
                    </td>

                    <td class="px-6 py-4">
                        {{ $order->phone }}
                    </td>

                    <td class="px-6 py-4">
                        {{ $order->county }}
                    </td>

                    <td class="px-6 py-4">
                        KES {{ number_format($order->total) }}
                    </td>

                    <td class="px-6 py-4">

                        @switch($order->status)

                            @case('pending')
                                <span class="px-3 py-1 rounded-full bg-yellow-500 text-white">
                                    Pending
                                </span>
                                @break

                            @case('paid')
                                <span class="px-3 py-1 rounded-full bg-green-600 text-white">
                                    Paid
                                </span>
                                @break

                            @case('payment_failed')
                                <span class="px-3 py-1 rounded-full bg-red-600 text-white">
                                    Payment Failed
                                </span>
                                @break

                            @case('processing')
                                <span class="px-3 py-1 rounded-full bg-indigo-600 text-white">
                                    Processing
                                </span>
                                @break

                            @case('shipped')
                                <span class="px-3 py-1 rounded-full bg-blue-600 text-white">
                                    Shipped
                                </span>
                                @break

                            @case('delivered')
                                <span class="px-3 py-1 rounded-full bg-emerald-600 text-white">
                                    Delivered
                                </span>
                                @break

                            @case('cancelled')
                                <span class="px-3 py-1 rounded-full bg-gray-700 text-white">
                                    Cancelled
                                </span>
                                @break

                            @default
                                <span class="px-3 py-1 rounded-full bg-gray-400 text-white">
                                    {{ $order->status }}
                                </span>

                        @endswitch

                    </td>

                    <td class="px-6 py-4">
                        {{ $order->created_at->format('d M Y') }}
                    </td>

                    <td class="px-6 py-4 text-center">

                        <a href="{{ route('admin.orders.show',$order) }}"
                           class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">

                            View

                        </a>

                    </td>

                </tr>

            @empty

                <tr>

                    <td colspan="8" class="text-center py-10 text-gray-500">

                        No orders found.

                    </td>

                </tr>

            @endforelse

            </tbody>

        </table>

    </div>

</div>

<div class="mt-6">
    {{ $orders->links() }}
</div>

@endsection