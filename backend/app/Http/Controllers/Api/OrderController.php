<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Services\MpesaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

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

            'payment_method' => [
                'nullable',
                'string',
                Rule::in(['mpesa', 'cash', 'card']),
            ],

            'items' => ['required', 'array', 'min:1'],

            'items.*.product_id' => [
                'required',
                'exists:products,id',
            ],

            'items.*.size' => [
                'required',
                'string',
                Rule::in(['S', 'M', 'L', 'XL', 'XXL']),
            ],

            'items.*.custom_name' => [
                'nullable',
                'string',
                'max:50',
            ],

            'items.*.custom_number' => [
                'nullable',
                'string',
                'max:5',
            ],
        ]);

       // Payment method
        $paymentMethod = $validated['payment_method'] ?? 'mpesa';

       // Create order and reserve stock
        $order = DB::transaction(function () use ($validated, $paymentMethod) {
            $total = 0;
            $itemsToCreate = [];

            foreach ($validated['items'] as $item) {
                
                $product = Product::where('id', $item['product_id'])
                    ->where('active', true)
                    ->lockForUpdate()
                    ->first();

                if (!$product) {
                    throw ValidationException::withMessages([
                        'items' => [
                            'One of the selected products is no longer available.'
                        ],
                    ]);
                }

               // Prevent overselling by checking stock before decrementing
                if ($product->stock < 1) {
                    throw ValidationException::withMessages([
                        'items' => [
                            "{$product->name} is out of stock."
                        ],
                    ]);
                }

                // Decrement stock
                $product->decrement('stock', 1);

                $total += $product->price;

                // Prepare order item 
                $itemsToCreate[] = [
                    'product_id' => $product->id,
                    'size' => $item['size'],
                    'custom_name' => $item['custom_name'] ?? null,
                    'custom_number' => $item['custom_number'] ?? null,
                    'price' => $product->price,
                ];
            }

           // Delivery fee 
            $deliveryFee = $total >= 5000 ? 0 : 300;

            $finalTotal = $total + $deliveryFee;

           // Initialize order status 
            $orderStatus = $paymentMethod === 'cash'
                ? 'paid'
                : 'pending';

            // Create order
            $order = Order::create([
                'customer_name' => $validated['customer_name'],
                'phone' => $validated['phone'],
                'county' => $validated['county'],
                'town' => $validated['town'],
                'landmark' => $validated['landmark'] ?? null,
                'total' => $finalTotal,
                'status' => $orderStatus,
            ]);

            // Create order items
            foreach ($itemsToCreate as $itemData) {
                $order->items()->create($itemData);
            }

           // Create payment record
            $paymentStatus = $paymentMethod === 'cash'
                ? 'success'
                : 'pending';

            
            // This is replaced by the actual M-Pesa receipt after a successful
            $receipt = $paymentMethod === 'cash'
                ? 'CFC' . strtoupper(substr(md5(uniqid()), 0, 8))
                : null;

            Payment::create([
                'order_id' => $order->id,
                'phone' => $validated['phone'],
                'amount' => $finalTotal,
                'status' => $paymentStatus,
                'mpesa_receipt' => $receipt,
            ]);

            return $order;
        });
        
        // Only M-Pesa orders are allowed to trigger an STK Push.
        if ($paymentMethod === 'mpesa') {
            try {
                $payment = $order->payment;

                if ($payment && class_exists(MpesaService::class)) {
                    $stkResponse = app(MpesaService::class)->stkPush(
                        $payment->phone,
                        $payment->amount,
                        $order->id
                    );

                   // Save the CheckoutRequestID for future reference 
                    if (isset($stkResponse['CheckoutRequestID'])) {
                        $payment->update([
                            'checkout_request_id' =>
                                $stkResponse['CheckoutRequestID'],
                        ]);
                    }

                    Log::info('M-Pesa STK Push initiated', [
                        'order_id' => $order->id,
                        'payment_id' => $payment->id,
                        'checkout_request_id' =>
                            $stkResponse['CheckoutRequestID'] ?? null,
                    ]);
                }
            } catch (\Throwable $e) {

                // Log the error but do not fail the order creation
                Log::error('M-Pesa STK Push failed', [
                    'order_id' => $order->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

       // Return the order
        return response()->json([
            'message' => 'Order placed successfully.',
            'order' => $order->load(
                'items.product',
                'payment'
            ),
        ], 201);
    }
}