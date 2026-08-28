<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
          $products = Product::latest()->paginate(10);

    return view('admin.products.index', [
        'products' => $products,
        'totalProducts' => Product::count(),
        'activeProducts' => Product::where('active', true)->count(),
        'outOfStock' => Product::where('stock', 0)->count(),
        'inventoryValue' => Product::all()->sum(function ($product) {
         return $product->price * $product->stock;
        }),
    ]);
    }

    public function create()
    {
         return view('admin.products.create');
    }

    public function store(Request $request)
    {
        $request->validate([
        'name' => 'required|max:255',
        'description' => 'required',
        'price' => 'required|numeric|min:1',
        'category' => 'required',
        'stock' => 'required|integer|min:0',
        'delivery_estimate' => 'required',
        'image' => 'nullable|file|mimetypes:image/jpeg,image/png,image/webp,image/avif|max:4096',
    ]);

    $imagePath = null;

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
    }

    Product::create([
        'name' => $request->name,
        'slug' => Str::slug($request->name),
        'description' => $request->description,
        'price' => $request->price,
        'category' => $request->category,
        'stock' => $request->stock,
        'delivery_estimate' => $request->delivery_estimate,
        'image' => $imagePath,
        'active' => true,
    ]);

    return redirect()
        ->route('admin.products.index')
        ->with('success', 'Product added successfully.');
}
    

    public function show(Product $product)
    {
        //
    }

    public function edit(Product $product)
    {
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
         $request->validate([
        'name' => 'required|max:255',
        'description' => 'required',
        'price' => 'required|numeric|min:1',
        'category' => 'required',
        'stock' => 'required|integer|min:0',
        'delivery_estimate' => 'required',
        'image' => 'nullable|file|mimetypes:image/jpeg,image/png,image/webp,image/avif|max:4096',
    ]);

    $imagePath = $product->image;

    if ($request->hasFile('image')) {

        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $imagePath = $request->file('image')->store('products', 'public');
    }

    $product->update([
        'name' => $request->name,
        'slug' => Str::slug($request->name),
        'description' => $request->description,
        'price' => $request->price,
        'category' => $request->category,
        'stock' => $request->stock,
        'delivery_estimate' => $request->delivery_estimate,
        'image' => $imagePath,
    ]);

    return redirect()
        ->route('admin.products.index')
        ->with('success', 'Product updated successfully.');
    }

   public function destroy(Product $product)
{
    if ($product->image && Storage::disk('public')->exists($product->image)) {
        Storage::disk('public')->delete($product->image);
    }

    $product->delete();

    return redirect()
        ->route('admin.products.index')
        ->with('success', 'Product deleted successfully.');
}
}