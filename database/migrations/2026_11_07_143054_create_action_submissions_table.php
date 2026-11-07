<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('action_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('challenge_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default('pending')->index(); // pending|approved|rejected|cancelled
            $table->decimal('weight_kg', 8, 2)->nullable();
            $table->string('location_text')->nullable();
            $table->text('note')->nullable();
            $table->foreignId('admin_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('admin_note')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['submitted_at', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('action_submissions');
    }
};
