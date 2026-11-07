<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('waste_deposits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partner_location_id')->nullable()->constrained('partner_locations')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('waste_category')->nullable()->index();
            $table->decimal('weight_kg', 8, 2)->default(0);
            $table->date('deposit_date')->nullable()->index();
            $table->string('verification_status')->default('dipilah')->index(); // dipilah|dikumpulkan|disetor|diproses_mitra
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('waste_deposits');
    }
};
