<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Status Update - Carefree Chelsea Store</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; color: #1e293b; }
        .wrapper { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #021B3A 0%, #034694 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #fbbf24; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .body-content { padding: 32px 24px; }
        .greeting { font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; }
        .status-badge { display: inline-block; background: #dbeafe; color: #1e40af; padding: 8px 18px; border-radius: 20px; font-weight: 800; font-size: 15px; margin-bottom: 20px; text-transform: capitalize; }
        .details-box { background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0; font-size: 14px; line-height: 1.6; }
        .footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <h1>Carefree Chelsea Store</h1>
            <p>Order Status Update</p>
        </div>
        <div class="body-content">
            <h2 class="greeting">Hi {{ $order->customer_name }},</h2>
            <p style="color: #475569; line-height: 1.6;">The status of your Order <strong>#{{ $order->id }}</strong> has been updated to:</p>
            
            <div className="status-badge" style="display: inline-block; background: #dbeafe; color: #1e40af; padding: 8px 18px; border-radius: 20px; font-weight: 800; font-size: 15px; margin-bottom: 20px;">
                Status: {{ ucfirst(str_replace('_', ' ', $status)) }}
            </div>

            <div class="details-box">
                <strong style="color: #0f172a; display: block; margin-bottom: 6px;">Order Details:</strong>
                Order ID: #{{ $order->id }}<br>
                Total Amount: KES {{ number_format($order->total) }}<br>
                Destination: {{ $order->town }}, {{ $order->county }}
            </div>

            <p style="color: #475569; line-height: 1.6;">Thank you for shopping with Carefree Chelsea Store. If you have any inquiries regarding your package, reply directly to this email.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Carefree Chelsea Store — Official Fan Store Kenya.
        </div>
    </div>
</body>
</html>
