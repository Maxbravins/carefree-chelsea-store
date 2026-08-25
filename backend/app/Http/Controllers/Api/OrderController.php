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

            // M-Pesa is available now.
            // Card is reserved for the future card-payment integration.
            'payment_method' => [
                'required',
                'string',
                Rule::in(['mpesa', 'card']),
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

        $paymentMethod = $validated['payment_method'];

        // Create order
        $order = DB::transaction(function () use ($validated, $paymentMethod) {
            $total = 0;
            $itemsToCreate = [];

            foreach ($validated['items'] as $item) {

               
            // Lock product row while checking/decreasing stock
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

             //Prevent overselling
                if ($product->stock < 1) {
                    throw ValidationException::withMessages([
                        'items' => [
                            "{$product->name} is out of stock."
                        ],
                    ]);
                }

                // Reserve one item from stock
                $product->decrement('stock', 1);

                $total += $product->price;

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

           //Every order starts as pending
            $order = Order::create([
                'customer_name' => $validated['customer_name'],
                'phone' => $validated['phone'],
                'county' => $validated['county'],
                'town' => $validated['town'],
                'landmark' => $validated['landmark'] ?? null,
                'total' => $finalTotal,
                'status' => 'pending',
            ]);

           //  Create Order Items
            foreach ($itemsToCreate as $itemData) {
                $order->items()->create($itemData);
            }

            
            // Create Payment Record
            Payment::create([
                'order_id' => $order->id,
                'phone' => $validated['phone'],
                'amount' => $finalTotal,
                'status' => 'pending',
                'mpesa_receipt' => null,
                'checkout_request_id' => null,
            ]);

            return $order;
        });

        // M-Pesa STK Push       
        if ($paymentMethod === 'mpesa') {
            try {
                $payment = $order->payment;

                if ($payment && class_exists(MpesaService::class)) {

                    $stkResponse = app(MpesaService::class)->stkPush(
                        $payment->phone,
                        $payment->amount,
                        $order->id
                    );

                    // Save M-Pesa CheckoutRequestID                  
                    if (!empty($stkResponse['CheckoutRequestID'])) {

                        $payment->update([
                            'checkout_request_id' =>
                                $stkResponse['CheckoutRequestID'],
                        ]);

                        Log::info('M-Pesa STK Push initiated', [
                            'order_id' => $order->id,
                            'payment_id' => $payment->id,
                            'checkout_request_id' =>
                                $stkResponse['CheckoutRequestID'],
                        ]);
                    } else {
                        Log::warning(
                            'M-Pesa STK Push returned no CheckoutRequestID',
                            [
                                'order_id' => $order->id,
                                'response' => $stkResponse,
                            ]
                        );
                    }
                }
            } catch (\Throwable $e) {

              
                // Do not delete the order if STK Push fails           
                Log::error('M-Pesa STK Push failed', [
                    'order_id' => $order->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        
        // Card support is reserved for the future.   
        if ($paymentMethod === 'card') {
            Log::info('Card payment selected but gateway not yet integrated', [
                'order_id' => $order->id,
                'amount' => $order->total,
            ]);
        }

        // Response
        return response()->json([
            'message' => $paymentMethod === 'mpesa'
                ? 'Order created. Please complete the M-Pesa payment on your phone.'
                : 'Order created. Card payment will be available soon.',

            'order' => $order->load(
                'items.product',
                'payment'
            ),
        ], 201);
    }
}