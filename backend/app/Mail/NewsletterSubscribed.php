<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewsletterSubscribed extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct()
    {
    }

    public function build()
    {
        return $this
            ->subject('Welcome to Carefree Chelsea 💙')
            ->view('emails.newsletter-subscribed');
    }
}
