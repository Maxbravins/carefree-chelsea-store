@extends('admin.layouts.app')

@section('content')

<div class="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-8 shadow-sm">

    <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-extrabold text-slate-900">Add New Product</h2>
        <a href="{{ route('admin.products.index') }}" class="text-xs font-bold text-slate-500 hover:text-slate-700">← Back</a>
    </div>

    <form action="{{ route('admin.products.store') }}"
          method="POST"
          enctype="multipart/form-data">

        @csrf

        <div class="mb-5">
            <label class="block text-sm font-semibold text-slate-700 mb-1">Product Name</label>
            <input
                type="text"
                name="name"
                class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                required>
        </div>

        <div class="mb-5">
            <label class="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea
                name="description"
                class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                rows="4"
                required></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Price (KES)</label>
                <input
                    type="number"
                    name="price"
                    class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    required>
            </div>

            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <input
                    type="text"
                    name="category"
                    placeholder="e.g. Home Kit, Away Kit, Training"
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
                    class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    required>
            </div>

            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Delivery Estimate</label>
                <input
                    type="text"
                    name="delivery_estimate"
                    class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    placeholder="Ships in 3-5 business days"
                    required>
            </div>
        </div>

        <div class="mb-6">
            <label class="block text-sm font-semibold text-slate-700 mb-1">Product Image</label>
            <input
                type="file"
                name="image"
                class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
        </div>

        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition">
            Save Product to Catalog
        </button>

    </form>

</div>

@endsection