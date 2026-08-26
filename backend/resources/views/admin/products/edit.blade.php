@extends('admin.layouts.app')

@section('content')

<div class="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-8 shadow-sm">

    <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-extrabold text-slate-900">Edit Product</h2>
        <a href="{{ route('admin.products.index') }}" class="text-xs font-bold text-slate-500 hover:text-slate-700">← Back</a>
    </div>

    <form action="{{ route('admin.products.update', $product) }}"
          method="POST"
          enctype="multipart/form-data">

        @csrf
        @method('PUT')

        <div class="mb-5">
            <label class="block text-sm font-semibold text-slate-700 mb-1">Product Name</label>
            <input
                type="text"
                name="name"
                value="{{ old('name', $product->name) }}"
                class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                required>
        </div>

        <div class="mb-5">
            <label class="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea
                name="description"
                rows="4"
                class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                required>{{ old('description', $product->description) }}</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Price (KES)</label>
                <input
                    type="number"
                    name="price"
                    value="{{ old('price', $product->price) }}"
                    class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    required>
            </div>

            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <input
                    type="text"
                    name="category"
                    value="{{ old('category', $product->category) }}"
                    class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    required>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Stock Quantity</label>
                <input
                    type="number"
                    name="stock"
                    value="{{ old('stock', $product->stock) }}"
                    class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    required>
            </div>

            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Delivery Estimate</label>
                <input
                    type="text"
                    name="delivery_estimate"
                    value="{{ old('delivery_estimate', $product->delivery_estimate) }}"
                    class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    required>
            </div>
        </div>

        @if($product->image_url)
            <div class="mb-5">
                <label class="block text-sm font-semibold text-slate-700 mb-1">Current Image</label>
                <img src="{{ $product->image_url }}" alt="{{ $product->name }}" class="w-32 h-32 object-cover rounded-xl border border-slate-200">
            </div>
        @endif

        <div class="mb-6">
            <label class="block text-sm font-semibold text-slate-700 mb-1">Replace Image (Optional)</label>
            <input
                type="file"
                name="image"
                class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
        </div>

        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition">
            Update Product Changes
        </button>

    </form>

</div>

@endsection