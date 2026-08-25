<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index()
    {
        return Cache::remember('active_products', 300, function () {
            return Product::where('active', true)
                ->latest()
                ->get();
        });
    }

    public function show(string $slug)
    {
        $product = Cache::remember(
            "product_{$slug}",
            300,
            fn () => Product::where('slug', $slug)
                ->where('active', true)
                ->firstOrFail()
        );

        return response()->json($product);
    }
}