<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;
    public ?string $receipt;

    public function __construct(Order $order, ?string $receipt = null)
    {
        $this->order = $order->load('items.product', 'payment');
        $this->receipt = $receipt;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Order Confirmed — #{$this->order->id} | Carefree Chelsea Store",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.order-confirmation',
        );
    }
}