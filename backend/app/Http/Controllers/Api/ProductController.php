<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::where('active', true)->latest()->get();
    }

    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)->where('active', true)->firstOrFail();

        return response()->json($product);
    }
}

