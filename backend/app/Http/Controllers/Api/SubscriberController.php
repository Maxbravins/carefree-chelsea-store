<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:150'],
        ]);

        $subscriber = Subscriber::firstOrCreate([
            'email' => $validated['email'],
        ]);

        return response()->json([
            'message' => 'Subscribed successfully.',
            'subscriber' => $subscriber,
        ], 201);
    }
}