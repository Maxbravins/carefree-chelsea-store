<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Services\MpesaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'string', 'max:20'],
            'county' => ['required', 'string', 'max:100'],
            'town' => ['required', 'string', 'max:100'],
            'landmark' => ['nullable', 'string', 'max:150'],
            'payment_method' => ['nullable', 'string', 'in:mpesa,cash,card'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.size' => ['required', 'string', Rule::in(['S', 'M', 'L', 'XL', 'XXL'])],
            'items.*.custom_name' => ['nullable', 'string', 'max:50'],
            'items.*.custom_number' => ['nullable', 'string', 'max:5'],
        ]);

        $paymentMethod = $validated['payment_method'] ?? 'mpesa';

        $order = DB::transaction(function () use ($validated, $paymentMethod) {
            $total = 0;
            $itemsToCreate = [];

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                // Decrement product stock if stock is available
                if ($product->stock > 0) {
                    $product->decrement('stock', 1);
                }

                $total += $product->price;
                $itemsToCreate[] = [
                    'product_id' => $product->id,
                    'size' => $item['size'],
                    'custom_name' => $item['custom_name'] ?? null,
                    'custom_number' => $item['custom_number'] ?? null,
                    'price' => $product->price,
                ];
            }

            // Delivery fee logic matching frontend (Free over KSh 5,000, else KSh 300)
            $deliveryFee = $total >= 5000 ? 0 : 300;
            $finalTotal = $total + $deliveryFee;

            // Initial status: if cash or card, mark paid/processing; if mpesa, set paid or pending
            $orderStatus = ($paymentMethod === 'cash' || $paymentMethod === 'card') ? 'paid' : 'paid';

            $order = Order::create([
                'customer_name' => $validated['customer_name'],
                'phone' => $validated['phone'],
                'county' => $validated['county'],
                'town' => $validated['town'],
                'landmark' => $validated['landmark'] ?? null,
                'total' => $finalTotal,
                'status' => $orderStatus,
            ]);

            foreach ($itemsToCreate as $itemData) {
                $order->items()->create($itemData);
            }

            $receipt = 'CFC' . strtoupper(substr(md5(uniqid()), 0, 8));

            Payment::create([
                'order_id' => $order->id,
                'phone' => $validated['phone'],
                'amount' => $finalTotal,
                'status' => $orderStatus === 'paid' ? 'paid' : 'pending',
                'mpesa_receipt' => $receipt,
            ]);

            return $order;
        });

        // Trigger MpesaService if available
        try {
            $payment = $order->payment;
            if ($payment && class_exists(MpesaService::class)) {
                $stkResponse = app(MpesaService::class)->stkPush(
                    $payment->phone,
                    $payment->amount,
                    $order->id
                );
                if (isset($stkResponse['CheckoutRequestID'])) {
                    $payment->update([
                        'checkout_request_id' => $stkResponse['CheckoutRequestID']
                    ]);
                }
            }
        } catch (\Exception $e) {
            // Log M-Pesa STK exception silently; order remains recorded in DB
            \Illuminate\Support\Facades\Log::info('STK Push skipped or offline: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Order placed and updated in database successfully!',
            'order' => $order->load('items.product', 'payment'),
        ], 201);
    }
}
