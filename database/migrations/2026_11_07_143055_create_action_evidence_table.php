<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('action_evidences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('action_submission_id')->constrained('action_submissions')->cascadeOnDelete();
            $table->string('type')->default('activity'); // before_after|activity|receipt|qr
            $table->string('path');
            $table->string('original_name')->nullable();
            $table->string('mime')->nullable();
            $table->unsignedBigInteger('size_bytes')->default(0);
            $table->char('hash', 64)->unique()->index();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('action_evidences');
    }
};
