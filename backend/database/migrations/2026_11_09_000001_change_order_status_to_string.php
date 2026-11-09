<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check');
        }

        Schema::table('orders', function (Blueprint $table) {
            $table->string('status')->default('pending')->change();
        });
    }

    public function down(): void
    {
        $allowedStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

        DB::table('orders')
            ->whereNotIn('status', $allowedStatuses)
            ->update(['status' => 'cancelled']);

        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled'))");
            return;
        }

        Schema::table('orders', function (Blueprint $table) use ($allowedStatuses) {
            $table->enum('status', $allowedStatuses)->default('pending')->change();
        });
    }
};
