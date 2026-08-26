<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Receipt - Carefree Chelsea Store</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; color: #1e293b; }
        .wrapper { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #059669 0%, #034694 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #a7f3d0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .body-content { padding: 32px 24px; }
        .greeting { font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; }
        .status-badge { display: inline-block; background: #dcfce7; color: #15803d; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 14px; margin-bottom: 20px; }
        .receipt-card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 20px 0; }
        .receipt-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
        .receipt-label { color: #166534; font-weight: 600; }
        .receipt-val { color: #0f172a; font-weight: 700; }
        .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <h1>Payment Confirmed!</h1>
            <p>Carefree Chelsea Store</p>
        </div>
        <div class="body-content">
            <h2 class="greeting">Hi {{ $order->customer_name }},</h2>
            <div class="status-badge">✓ M-Pesa Payment Received</div>
            <p style="color: #475569; line-height: 1.6;">We have successfully received your payment for Order <strong>#{{ $order->id }}</strong>. Your order is now confirmed and being prepared for dispatch.</p>

            <div class="receipt-card">
                <div class="receipt-row">
                    <span class="receipt-label">M-Pesa Receipt Code:</span>
                    <span class="receipt-val">{{ $receipt ?? $order->payment?->mpesa_receipt ?? 'N/A' }}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Amount Paid:</span>
                    <span class="receipt-val">KES {{ number_format($order->total) }}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Payment Phone:</span>
                    <span class="receipt-val">{{ $order->phone }}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Order Reference:</span>
                    <span class="receipt-val">#{{ $order->id }}</span>
                </div>
            </div>

            <p style="color: #475569; line-height: 1.6;">We will send you another update as soon as your items ship to <strong>{{ $order->town }}, {{ $order->county }}</strong>.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Carefree Chelsea Store — Official Fan Store Kenya.
        </div>
    </div>
</body>
</html>
