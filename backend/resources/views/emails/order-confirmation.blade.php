<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Carefree Chelsea Store</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; color: #1e293b; }
        .wrapper { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #021B3A 0%, #034694 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #fbbf24; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .body-content { padding: 32px 24px; }
        .greeting { font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; }
        .order-badge { display: inline-block; background: #eff6ff; color: #034694; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 14px; margin-bottom: 20px; }
        .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .item-table th { text-align: left; padding: 12px 8px; border-bottom: 2px solid #e2e8f0; color: #64748b; font-size: 12px; text-transform: uppercase; }
        .item-table td { padding: 14px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: #475569; }
        .total-row { display: flex; justify-content: space-between; padding: 16px 0 0; font-size: 18px; font-weight: 800; color: #034694; border-top: 2px solid #e2e8f0; margin-top: 12px; }
        .info-box { background: #f8fafc; border-radius: 12px; padding: 16px; margin-top: 24px; border: 1px solid #e2e8f0; font-size: 14px; line-height: 1.6; }
        .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <h1>Carefree Chelsea Store</h1>
            <p>Official Fan Store Kenya</p>
        </div>
        <div class="body-content">
            <h2 class="greeting">Thanks for your order, {{ $order->customer_name }}!</h2>
            <div class="order-badge">Order #{{ $order->id }}</div>
            <p style="color: #475569; line-height: 1.6;">We have received your order details and it is currently being processed. Below is a detailed breakdown of your item(s):</p>

            <table class="item-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th style="text-align: center;">Size</th>
                        <th style="text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($order->items as $item)
                        <tr>
                            <td>
                                <strong>{{ $item->product->name ?? 'Chelsea Product' }}</strong>
                                @if($item->custom_name || $item->custom_number)
                                    <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                                        Custom: {{ $item->custom_name }} #{{ $item->custom_number }}
                                    </div>
                                @endif
                            </td>
                            <td style="text-align: center;">
                                <span style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 12px;">{{ $item->size }}</span>
                            </td>
                            <td style="text-align: right; font-weight: 600;">KES {{ number_format($item->price) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="total-row">
                <span>Total Amount</span>
                <span>KES {{ number_format($order->total) }}</span>
            </div>

            <div class="info-box">
                <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Delivery Destination:</strong>
                {{ $order->town }}, {{ $order->county }}<br>
                @if($order->landmark) Landmark: {{ $order->landmark }}<br> @endif
                Phone: {{ $order->phone }}
            </div>

            <p style="margin-top: 24px; color: #64748b; font-size: 13px; line-height: 1.5;">
                If you have any questions or need to make changes to your delivery address, please reply directly to this email or contact our support line.
            </p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Carefree Chelsea Store — Pride of London in Kenya.
        </div>
    </div>
</body>
</html>
