<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stock_notifications', function (Blueprint $table) {
            $table->id();

            $table->foreignId('product_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('email');

            $table->boolean('notified')
                ->default(false);

            $table->timestamps();

            $table->unique(
                ['product_id', 'email'],
                'stock_notifications_product_email_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_notifications');
    }
};