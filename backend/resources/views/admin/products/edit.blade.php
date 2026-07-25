@extends('admin.layouts.app')

@section('content')

<div class="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

    <h2 class="text-3xl font-bold mb-8 text-gray-800">
        Edit Product
    </h2>

    <form action="{{ route('admin.products.update', $product) }}"
          method="POST"
          enctype="multipart/form-data">

        @csrf
        @method('PUT')

        <div class="mb-6">
            <label class="block mb-2 font-semibold">Name</label>

            <input
                type="text"
                name="name"
                value="{{ old('name',$product->name) }}"
                class="w-full border rounded-lg px-4 py-3"
                required>
        </div>

        <div class="mb-6">
            <label class="block mb-2 font-semibold">Description</label>

            <textarea
                name="description"
                rows="4"
                class="w-full border rounded-lg px-4 py-3"
                required>{{ old('description',$product->description) }}</textarea>
        </div>

        <div class="mb-6">
            <label class="block mb-2 font-semibold">Price</label>

            <input
                type="number"
                name="price"
                value="{{ old('price',$product->price) }}"
                class="w-full border rounded-lg px-4 py-3"
                required>
        </div>

        <div class="mb-6">
            <label class="block mb-2 font-semibold">Category</label>

            <input
                type="text"
                name="category"
                value="{{ old('category',$product->category) }}"
                class="w-full border rounded-lg px-4 py-3"
                required>
        </div>

        <div class="mb-6">
            <label class="block mb-2 font-semibold">Stock</label>

            <input
                type="number"
                name="stock"
                value="{{ old('stock',$product->stock) }}"
                class="w-full border rounded-lg px-4 py-3"
                required>
        </div>

        <div class="mb-6">
            <label class="block mb-2 font-semibold">Delivery Estimate</label>

            <input
                type="text"
                name="delivery_estimate"
                value="{{ old('delivery_estimate',$product->delivery_estimate) }}"
                class="w-full border rounded-lg px-4 py-3"
                required>
        </div>

        @if($product->image)
            <div class="mb-6">
                <img src="{{ asset('storage/'.$product->image) }}"
                     class="w-32 rounded-lg">
            </div>
        @endif

        <div class="mb-8">
            <label class="block mb-2 font-semibold">Replace Image</label>

            <input
                type="file"
                name="image"
                class="block w-full">
        </div>

        <button
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Update Product
        </button>

    </form>

</div>

@endsection