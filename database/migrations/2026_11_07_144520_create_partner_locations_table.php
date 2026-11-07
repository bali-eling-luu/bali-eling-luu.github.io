<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partner_locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->default('bank_sampah')->index(); // bank_sampah|tps3r|dropbox_b3|tps_terpadu
            $table->string('regency')->nullable()->index();
            $table->string('address')->nullable();
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->string('contact')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partner_locations');
    }
};
