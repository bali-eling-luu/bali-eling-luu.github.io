<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoSeeder extends Seeder
{
    /**
     * Akun demo untuk testing/juri — JANGAN dipakai di production.
     * Password: BaliElingLuuDemo2026!
     */
    public function run(): void
    {
        $password = Hash::make('BaliElingLuuDemo2026!');

        $this->ensureUser(
            email: 'demo.user@bali-eling-luu.test',
            name: 'Demo User',
            username: 'demo-user',
            phone: '081234567890',
            role: 'user',
            password: $password,
        );

        $this->ensureUser(
            email: 'demo.admin@bali-eling-luu.test',
            name: 'Demo Admin',
            username: 'demo-admin',
            phone: '081234567899',
            role: 'admin',
            password: $password,
        );
    }

    private function ensureUser(string $email, string $name, string $username, ?string $phone, string $role, string $password): void
    {
        $user = User::firstOrNew(['email' => $email]);
        $user->forceFill([
            'name' => $name,
            'username' => $username,
            'phone' => $phone,
            'role' => $role,
            'xp_balance' => (int) ($user->xp_balance ?? 0),
            'password' => $password,
        ])->save();
    }
}
