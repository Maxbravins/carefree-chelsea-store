@extends('admin.layouts.app')

@section('content')

<div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Product Catalog</h1>
        <p class="text-sm text-slate-500 mt-1">Manage all products available in the Carefree Chelsea online store.</p>
    </div>
    <div>
        <a href="{{ route('admin.products.create') }}"
           class="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 transition">
            <span>+</span> Add New Product
        </a>
    </div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Products</span>
        <p class="text-3xl font-extrabold text-slate-900 mt-2">{{ $totalProducts }}</p>
    </div>
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Active In Store</span>
        <p class="text-3xl font-extrabold text-emerald-600 mt-2">{{ $activeProducts }}</p>
    </div>
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <span class="text-xs font-bold text-rose-600 uppercase tracking-wider">Out of Stock</span>
        <p class="text-3xl font-extrabold text-rose-600 mt-2">{{ $outOfStock }}</p>
    </div>
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Total Valuation</span>
        <p class="text-2xl font-extrabold text-indigo-600 mt-2">KSh {{ number_format($inventoryValue) }}</p>
    </div>
</div>

<div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
                    <th class="px-6 py-4">Item</th>
                    <th class="px-6 py-4">Category</th>
                    <th class="px-6 py-4">Price</th>
                    <th class="px-6 py-4">Stock</th>
                    <th class="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm font-medium">
                @forelse($products as $product)
                <tr class="hover:bg-slate-50/80 transition">
                    <td class="px-6 py-4 flex items-center gap-4">
                        <img src="{{ $product->image_url }}" alt="{{ $product->name }}" class="w-14 h-14 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0">
                        <div>
                            <div class="font-bold text-slate-900">{{ $product->name }}</div>
                            <div class="text-xs text-slate-500 font-mono">{{ $product->slug }}</div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                            {{ $product->category }}
                        </span>
                    </td>
                    <td class="px-6 py-4 font-bold text-slate-900">
                        KSh {{ number_format($product->price) }}
                    </td>
                    <td class="px-6 py-4">
                        <span class="inline-block px-2.5 py-1 rounded-full text-xs font-extrabold {{ $product->stock > 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800' }}">
                            {{ $product->stock }} units
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-3">
                            <a href="{{ route('admin.products.edit', $product) }}" class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs transition">
                                Edit
                            </a>
                            <form action="{{ route('admin.products.destroy', $product) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this product?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs transition">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400">
                        No products found in the catalog.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($products->hasPages())
    <div class="p-4 border-t border-slate-100 bg-slate-50">
        {{ $products->links() }}
    </div>
    @endif
</div>

@endsection