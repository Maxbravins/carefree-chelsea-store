<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MpesaController extends Controller
{
    public function callback(Request $request)
    {
        // Log the entire callback
        Log::info('M-Pesa Callback Received', $request->all());

        $callback = $request->input('Body.stkCallback');

        if (!$callback) {
            Log::warning('Invalid M-Pesa Callback');

            return response()->json([
                'ResultCode' => 0,
                'ResultDesc' => 'Accepted'
            ]);
        }

        $checkoutRequestId = $callback['CheckoutRequestID'] ?? null;
        $resultCode = $callback['ResultCode'] ?? null;

        Log::info('Processing Callback', [
            'CheckoutRequestID' => $checkoutRequestId,
            'ResultCode' => $resultCode,
        ]);

        $payment = Payment::where(
            'checkout_request_id',
            $checkoutRequestId
        )->first();

        if (!$payment) {

            Log::error('Payment not found', [
                'CheckoutRequestID' => $checkoutRequestId,
            ]);

            return response()->json([
                'ResultCode' => 0,
                'ResultDesc' => 'Accepted'
            ]);
        }

        // Successful payment
        if ($resultCode == 0) {

            $receipt = null;

            if (isset($callback['CallbackMetadata']['Item'])) {

                foreach ($callback['CallbackMetadata']['Item'] as $item) {

                    if (
                        isset($item['Name']) &&
                        $item['Name'] === 'MpesaReceiptNumber'
                    ) {
                        $receipt = $item['Value'];
                    }
                }
            }
        // Update payment and order status
            $payment->update([
                'status' => 'success',
                'mpesa_receipt' => $receipt,
            ]);

            $payment->order->update([
                'status' => 'paid',
            ]);

            Log::info('Payment Successful', [
                'PaymentID' => $payment->id,
                'OrderID' => $payment->order_id,
                'Receipt' => $receipt,
            ]);

        } else {

            // Payment failed
            $payment->update([
                'status' => 'payment_failed',
            ]);

            $payment->order->update([
                'status' => 'payment_failed',
            ]);

            Log::warning('Payment Failed', [
                'PaymentID' => $payment->id,
                'OrderID' => $payment->order_id,
                'ResultCode' => $resultCode,
                'ResultDesc' => $callback['ResultDesc'] ?? '',
            ]);
        }

        return response()->json([
            'ResultCode' => 0,
            'ResultDesc' => 'Accepted'
        ]);
    }
}