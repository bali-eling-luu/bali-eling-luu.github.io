<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\Reward;
use Illuminate\Database\Seeder;

class RewardSeeder extends Seeder
{
    public function run(): void
    {
        $rewards = [
            ['name' => 'Pulsa Rp5.000', 'description' => 'Pulsa prabayar Rp5.000 (simulasi DEMO).', 'xp_cost' => 500, 'stock' => 50, 'sort_order' => 1, 'requires_phone' => true],
            ['name' => 'Pulsa Rp10.000', 'description' => 'Pulsa prabayar Rp10.000 (simulasi DEMO).', 'xp_cost' => 900, 'stock' => 40, 'sort_order' => 2, 'requires_phone' => true],
            ['name' => 'Paket Data Bulanan', 'description' => 'Paket data bulanan (simulasi DEMO).', 'xp_cost' => 1000, 'stock' => 30, 'sort_order' => 3, 'requires_phone' => true],
            ['name' => 'Eco Tote Bag', 'description' => 'Tas belanja ramah lingkungan.', 'xp_cost' => 700, 'stock' => 20, 'sort_order' => 4, 'requires_phone' => false],
            ['name' => 'Eco Tumbler', 'description' => 'Tumbler stainless ramah lingkungan.', 'xp_cost' => 1500, 'stock' => 15, 'sort_order' => 5, 'requires_phone' => false],
            ['name' => 'Bibit Tanaman', 'description' => 'Bibit tanaman untuk pekarangan.', 'xp_cost' => 350, 'stock' => 100, 'sort_order' => 6, 'requires_phone' => false],
        ];

        foreach ($rewards as $r) {
            Reward::firstOrCreate(['name' => $r['name']], array_merge([
                'image_path' => null,
                'is_active' => true,
            ], $r));
        }

        $badges = [
            ['name' => 'Krama Peduli', 'description' => 'Mencapai Level 1', 'criteria_type' => 'total_xp', 'criteria_value' => 0],
            ['name' => 'Krama Lestari', 'description' => 'Mencapai 150 XP', 'criteria_type' => 'total_xp', 'criteria_value' => 150],
            ['name' => 'Penjaga Alam', 'description' => 'Mencapai 400 XP', 'criteria_type' => 'total_xp', 'criteria_value' => 400],
            ['name' => 'Pahlawan Palemahan', 'description' => 'Mencapai 800 XP', 'criteria_type' => 'total_xp', 'criteria_value' => 800],
            ['name' => 'Duta Bali Lestari', 'description' => 'Mencapai 1500 XP', 'criteria_type' => 'total_xp', 'criteria_value' => 1500],
            ['name' => 'Peduli Pertama', 'description' => 'Selesaikan 1 aksi terverifikasi', 'criteria_type' => 'approved_count', 'criteria_value' => 1],
            ['name' => 'Pejuang Pilah', 'description' => 'Selesaikan 5 aksi terverifikasi', 'criteria_type' => 'approved_count', 'criteria_value' => 5],
        ];

        foreach ($badges as $b) {
            Badge::firstOrCreate(['name' => $b['name']], $b);
        }
    }
}
