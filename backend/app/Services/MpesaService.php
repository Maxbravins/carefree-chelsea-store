<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MpesaService
{
    protected string $consumerKey;
    protected string $consumerSecret;
    protected string $shortCode;
    protected string $passkey;
    protected string $callbackUrl;

    public function __construct()
    {
        $this->consumerKey = config('services.mpesa.consumer_key');
        $this->consumerSecret = config('services.mpesa.consumer_secret');
        $this->shortCode = config('services.mpesa.shortcode');
        $this->passkey = config('services.mpesa.passkey');
        $this->callbackUrl = config('services.mpesa.callback_url');
    }

    public function getAccessToken(): string
    {
        $response = Http::withBasicAuth(
            $this->consumerKey,
            $this->consumerSecret
        )->get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        );

        if (! $response->successful()) {
            throw new \Exception(
                'Failed to get M-Pesa access token: ' . $response->body()
            );
        }

        return $response->json('access_token');
    }

    public function stkPush(string $phone, int $amount, int $orderId): array
    {
        $token = $this->getAccessToken();

        // Generate timestamp
        $timestamp = now()->format('YmdHis');

        // Generate STK password
        $password = base64_encode(
            $this->shortCode .
            $this->passkey .
            $timestamp
        );

        // Convert phone number to 2547XXXXXXXX
        $phone = preg_replace('/\D/', '', $phone);

        if (str_starts_with($phone, '0')) {
            $phone = '254' . substr($phone, 1);
        }

        $response = Http::withToken($token)->post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            [
                'BusinessShortCode' => $this->shortCode,
                'Password' => $password,
                'Timestamp' => $timestamp,
                'TransactionType' => 'CustomerPayBillOnline',
                'Amount' => $amount,
                'PartyA' => $phone,
                'PartyB' => $this->shortCode,
                'PhoneNumber' => $phone,
                'CallBackURL' => $this->callbackUrl,
                'AccountReference' => "Order {$orderId}",
                'TransactionDesc' => 'Carefree Chelsea Store',
            ]
        );

        if (! $response->successful()) {
            throw new \Exception(
                'STK Push failed: ' . $response->body()
            );
        }

        return $response->json();
    }
}
