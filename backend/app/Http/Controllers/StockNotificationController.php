<?php

namespace App\Http\Controllers;

use App\Models\StockNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StockNotificationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => [
                'required',
                'exists:products,id',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
            ],
        ]);

        $alreadySubscribed = StockNotification::where(
            'product_id',
            $validated['product_id']
        )
            ->where('email', $validated['email'])
            ->where('notified', false)
            ->exists();

        if ($alreadySubscribed) {
            return response()->json([
                'message' => 'You are already subscribed for this product.'
            ], 409);
        }

        $notification = StockNotification::create([
            'product_id' => $validated['product_id'],
            'user_id' => Auth::id(),
            'email' => $validated['email'],
            'notified' => false,
        ]);

        return response()->json([
            'message' => 'You will be notified when this product is back in stock.',
            'data' => $notification,
        ], 201);
    }
}