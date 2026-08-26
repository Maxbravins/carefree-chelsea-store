<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;
    public string $status;

    public function __construct(Order $order, string $status)
    {
        $this->order = $order->load('items.product', 'payment');
        $this->status = $status;
    }

    public function envelope(): Envelope
    {
        $readableStatus = ucfirst(str_replace('_', ' ', $this->status));

        return new Envelope(
            subject: "Order #{$this->order->id} Status Update: {$readableStatus} | Carefree Chelsea Store",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.order-status-updated',
        );
    }
}
