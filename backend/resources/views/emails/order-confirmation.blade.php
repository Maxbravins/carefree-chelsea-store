<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: system-ui, sans-serif; background: #f3f4f6; margin: 0; padding: 0; }
        .container { max-width: 480px; margin: 0 auto; background: white; padding: 2rem; }
        .header { background: #034694; padding: 1.5rem; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 1.25rem; }
        .item { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e5e7eb; }
        .total { display: flex; justify-content: space-between; padding-top: 1rem; font-weight: bold; font-size: 1.1rem; }
        .footer { text-align: center; color: #6b7280; font-size: 0.8rem; margin-top: 2rem; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Carefree Chelsea Store</h1>
    </div>
    <div class="container">
        <h2>Thanks for your order, {{ $order->customer_name }}!</h2>
        <p>We've received order <strong>#{{ $order->id }}</strong> and it's being processed. Here's a summary:</p>

        @foreach ($order->items as $item)
            <div class="item">
                <span>{{ $item->product->name ?? 'Product' }} ({{ $item->size }}) x1</span>
                <span>KES {{ number_format($item->price) }}</span>
            </div>
        @endforeach

        <div class="total">
            <span>Total</span>
            <span>KES {{ number_format($order->total) }}</span>
        </div>

        <p style="margin-top: 2rem;">
            Delivery to: {{ $order->town }}, {{ $order->county }}<br>
            Phone: {{ $order->phone }}
        </p>

        <p>We'll notify you once your order ships. If you have any questions, just reply to this email.</p>
    </div>
    <div class="footer">
        &copy; {{ date('Y') }} Carefree Chelsea Store — Official Fan Store
    </div>
</body>
</html>
