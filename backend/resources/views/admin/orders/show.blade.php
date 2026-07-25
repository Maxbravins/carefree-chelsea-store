@extends('admin.layouts.app')

@section('content')

<div class="mb-8 flex justify-between items-center">

    <div>

        <h1 class="text-3xl font-bold">
            Order #{{ $order->id }}
        </h1>

        <p class="text-gray-500">
            {{ $order->created_at->format('d M Y H:i') }}
        </p>

    </div>

    <a href="{{ route('admin.orders.index') }}"
       class="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg">

        ← Back

    </a>

</div>


@if(session('success'))

<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">

    {{ session('success') }}

</div>

@endif


<div class="grid lg:grid-cols-2 gap-8">

    {{-- Customer Details --}}
    <div class="bg-white rounded-xl shadow p-6">

        <h2 class="text-xl font-bold mb-5">
            Customer Information
        </h2>

        <div class="space-y-3">

            <p><strong>Name:</strong> {{ $order->customer_name }}</p>

            <p><strong>Phone:</strong> {{ $order->phone }}</p>

            <p><strong>County:</strong> {{ $order->county }}</p>

            <p><strong>Town:</strong> {{ $order->town }}</p>

            <p><strong>Landmark:</strong> {{ $order->landmark ?? '-' }}</p>

            <p class="text-lg font-bold">
                Total:
                KES {{ number_format($order->total) }}
            </p>

        </div>

    </div>


    {{-- Payment Details --}}
    <div class="bg-white rounded-xl shadow p-6">

        <h2 class="text-xl font-bold mb-5">

            Payment Details

        </h2>

        @if($order->payment)

            <div class="space-y-3">

                <p>

                    <strong>Status:</strong>

                    {{ ucfirst(str_replace('_',' ',$order->payment->status)) }}

                </p>

                <p>

                    <strong>Checkout ID:</strong>

                    {{ $order->payment->checkout_request_id ?? '-' }}

                </p>

                <p>

                    <strong>M-Pesa Receipt:</strong>

                    {{ $order->payment->mpesa_receipt ?? '-' }}

                </p>

                <p>

                    <strong>Amount:</strong>

                    KES {{ number_format($order->payment->amount) }}

                </p>

            </div>

        @else

            <p>No payment record.</p>

        @endif

    </div>

</div>



<div class="bg-white rounded-xl shadow mt-8">

    <div class="p-6 border-b">

        <h2 class="text-xl font-bold">

            Ordered Items

        </h2>

    </div>

    <table class="min-w-full">

        <thead class="bg-gray-100">

        <tr>

            <th class="px-6 py-4 text-left">Product</th>

            <th class="px-6 py-4 text-left">Size</th>

            <th class="px-6 py-4 text-left">Custom Name</th>

            <th class="px-6 py-4 text-left">Custom Number</th>

            <th class="px-6 py-4 text-left">Price</th>

        </tr>

        </thead>

        <tbody>

        @foreach($order->items as $item)

        <tr class="border-b">

            <td class="px-6 py-4">

                {{ $item->product->name }}

            </td>

            <td class="px-6 py-4">

                {{ $item->size }}

            </td>

            <td class="px-6 py-4">

                {{ $item->custom_name ?: '-' }}

            </td>

            <td class="px-6 py-4">

                {{ $item->custom_number ?: '-' }}

            </td>

            <td class="px-6 py-4">

                KES {{ number_format($item->price) }}

            </td>

        </tr>

        @endforeach

        </tbody>

    </table>

</div>



<div class="bg-white rounded-xl shadow mt-8 p-6">

    <h2 class="text-xl font-bold mb-5">

        Update Order Status

    </h2>

    <form action="{{ route('admin.orders.update',$order) }}"
          method="POST">

        @csrf

        @method('PUT')

        <div class="flex gap-4 items-center">

            <select
                name="status"
                class="border rounded-lg px-4 py-2">

                <option value="pending"
                    @selected($order->status=='pending')>

                    Pending

                </option>

                <option value="paid"
                    @selected($order->status=='paid')>

                    Paid

                </option>

                <option value="payment_failed"
                    @selected($order->status=='payment_failed')>

                    Payment Failed

                </option>

                <option value="processing"
                    @selected($order->status=='processing')>

                    Processing

                </option>

                <option value="shipped"
                    @selected($order->status=='shipped')>

                    Shipped

                </option>

                <option value="delivered"
                    @selected($order->status=='delivered')>

                    Delivered

                </option>

                <option value="cancelled"
                    @selected($order->status=='cancelled')>

                    Cancelled

                </option>

            </select>

            <button
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">

                Update Status

            </button>

        </div>

    </form>

</div>

@endsection