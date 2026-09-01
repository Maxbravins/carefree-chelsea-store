<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\NewsletterSubscribed;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:150'],
        ]);

        $email = strtolower(trim($validated['email']));

        $subscriber = Subscriber::firstOrCreate([
            'email' => $email,
        ]);

        // Only send the welcome email to a new subscriber
        if ($subscriber->wasRecentlyCreated) {
            Mail::to($subscriber->email)
                ->send(new NewsletterSubscribed());
        }

        return response()->json([
            'message' => $subscriber->wasRecentlyCreated
                ? 'You have successfully subscribed to Carefree Chelsea!'
                : 'You are already subscribed to Carefree Chelsea.',
            'subscriber' => $subscriber,
            'new_subscription' => $subscriber->wasRecentlyCreated,
        ], 201);
    }
}
