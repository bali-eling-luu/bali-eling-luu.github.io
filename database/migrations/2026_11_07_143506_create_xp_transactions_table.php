<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('xp_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('action_submission_id')->nullable()->unique()->constrained('action_submissions')->nullOnDelete();
            $table->foreignId('reward_redemption_id')->nullable()->index();
            $table->string('type')->default('earn')->index(); // earn|spend|adjust
            $table->integer('amount')->default(0);
            $table->integer('balance_after')->default(0);
            $table->string('reason')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('xp_transactions');
    }
};
