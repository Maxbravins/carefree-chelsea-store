<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MpesaController extends Controller
{
    public function callback(Request $request)
    {
        $callback = $request->input('Body.stkCallback');

        if (!$callback) {
            Log::warning('Invalid M-Pesa Callback');

            return response()->json([
                'ResultCode' => 0,
                'ResultDesc' => 'Accepted',
            ]);
        }

        $checkoutRequestId = $callback['CheckoutRequestID'] ?? null;
        $resultCode = $callback['ResultCode'] ?? null;

        Log::info('M-Pesa Callback Received', [
            'checkout_request_id' => $checkoutRequestId,
            'result_code' => $resultCode,
        ]);

        $payment = Payment::where(
            'checkout_request_id',
            $checkoutRequestId
        )->with('order.items.product')->first();

        if (!$payment) {
            Log::warning('Payment not found', [
                'CheckoutRequestID' => $checkoutRequestId,
            ]);

            return response()->json([
                'ResultCode' => 0,
                'ResultDesc' => 'Accepted',
            ]);
        }

        // Ignore callbacks that were already processed.
        if ($payment->status !== 'pending') {
            Log::info('M-Pesa callback already processed', [
                'payment_id' => $payment->id,
                'status' => $payment->status,
            ]);

            return response()->json([
                'ResultCode' => 0,
                'ResultDesc' => 'Accepted',
            ]);
        }

        // Successful payment.
        if ((int) $resultCode === 0) {
            $receipt = null;

            foreach ($callback['CallbackMetadata']['Item'] ?? [] as $item) {
                if (($item['Name'] ?? null) === 'MpesaReceiptNumber') {
                    $receipt = $item['Value'] ?? null;
                    break;
                }
            }

            DB::transaction(function () use ($payment, $receipt) {
                $payment->update([
                    'status' => 'success',
                    'mpesa_receipt' => $receipt,
                ]);

                $payment->order->update([
                    'status' => 'paid',
                ]);
            });

            Log::info('M-Pesa Payment Successful', [
                'payment_id' => $payment->id,
                'order_id' => $payment->order_id,
                'receipt' => $receipt,
            ]);
        } else {
            // Failed payment: restore the stock reserved during order creation.
            DB::transaction(function () use ($payment, $resultCode, $callback) {
                $order = $payment->order;

                foreach ($order->items as $item) {
                    if ($item->product) {
                        $item->product->increment('stock', 1);
                    }
                }

                $payment->update([
                    'status' => 'payment_failed',
                ]);

                $order->update([
                    'status' => 'payment_failed',
                ]);

                Log::warning('M-Pesa Payment Failed - Stock Restored', [
                    'payment_id' => $payment->id,
                    'order_id' => $order->id,
                    'result_code' => $resultCode,
                    'result_desc' => $callback['ResultDesc'] ?? '',
                ]);
            });
        }

        return response()->json([
            'ResultCode' => 0,
            'ResultDesc' => 'Accepted',
        ]);
    }
}