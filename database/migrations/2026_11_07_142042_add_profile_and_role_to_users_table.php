<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->unique()->after('email');
            $table->string('phone')->nullable()->unique()->after('username');
            $table->string('role')->default('user')->after('phone')->index();
            $table->string('avatar_path')->nullable()->after('role');
            $table->unsignedInteger('xp_balance')->default(0)->after('avatar_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'phone', 'role', 'avatar_path', 'xp_balance']);
        });
    }
};
