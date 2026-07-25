<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Chelsea Home Jersey 2026/27',
                'slug' => 'chelsea-home-2026',
                'category' => 'Home Kit',
                'price' => 2500,
                'stock' => 25,
                'delivery_estimate' => 'Ships within 2-5 business days',
                'image' => 'products/home.jpg',
                'description' => 'Official Chelsea Home Jersey for the 2026/27 season. Premium Dri-FIT technology with breathable mesh panels and official club crest.',
                'active' => true,
            ],
            [
                'name' => 'Chelsea Away Jersey 2026/27',
                'slug' => 'chelsea-away-2026',
                'category' => 'Away Kit',
                'price' => 2500,
                'stock' => 18,
                'delivery_estimate' => 'Ships within 2-5 business days',
                'image' => 'products/away.jpg',
                'description' => 'Official Chelsea Away Jersey featuring sleek futuristic detailing, lightweight performance fabric, and athletic fit.',
                'active' => true,
            ],
            [
                'name' => 'Chelsea Third Jersey 2026/27',
                'slug' => 'chelsea-third-2026',
                'category' => 'Third Kit',
                'price' => 2500,
                'stock' => 12,
                'delivery_estimate' => 'Ships within 2-5 business days',
                'image' => 'products/third.jpg',
                'description' => 'Bold Chelsea Third Kit with dynamic graphic pattern, gold accents, and moisture-wicking technology.',
                'active' => true,
            ],
            [
                'name' => 'Chelsea Retro 2012 UCL Final',
                'slug' => 'chelsea-retro-2012',
                'category' => 'Retro Kit',
                'price' => 3200,
                'stock' => 8,
                'delivery_estimate' => 'Ships within 3-6 business days',
                'image' => 'products/retro.jpg',
                'description' => 'Iconic 2012 Munich Champions League Victory commemorative retro edition with Munich 2012 embroidery.',
                'active' => true,
            ],
            [
                'name' => 'Chelsea Training Jersey 2026',
                'slug' => 'chelsea-training',
                'category' => 'Training',
                'price' => 2200,
                'stock' => 20,
                'delivery_estimate' => 'Ships within 2-5 business days',
                'image' => 'products/training.jpg',
                'description' => 'Official Nike training shirt worn by players during pre-match warmups. Ultra-light and flexible.',
                'active' => true,
            ],
            [
                'name' => 'Chelsea Black Special Edition',
                'slug' => 'chelsea-black',
                'category' => 'Special Edition',
                'price' => 3500,
                'stock' => 10,
                'delivery_estimate' => 'Ships within 2-5 business days',
                'image' => 'products/black.jpg',
                'description' => 'Exclusive blackout edition jersey with metallic crest detail and premium gold badges.',
                'active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['slug' => $product['slug']], $product);
        }
    }
}

