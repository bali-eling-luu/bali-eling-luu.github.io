<?php

namespace Database\Seeders;

use App\Models\Challenge;
use Illuminate\Database\Seeder;

class ChallengeSeeder extends Seeder
{
    public function run(): void
    {
        $challenges = [
            [
                'name' => 'Pilah Canang dan Sisa Banten',
                'slug' => 'pilah-canang-sisa-banten',
                'description' => 'Pisahkan bunga dan janur dari plastik pembungkus serta koin sesari.',
                'instruction' => 'Foto tumpukan canang yang sudah dipilah (organik terpisah dari plastik/koin).',
                'category' => 'Organik & Budaya',
                'xp_reward' => 30,
                'sort_order' => 1,
            ],
            [
                'name' => 'Tolak Kantong Plastik Sekali Pakai',
                'slug' => 'tolak-kantong-plastik',
                'description' => 'Gunakan tas kain belanja sendiri saat berbelanja di pasar atau minimarket.',
                'instruction' => 'Foto tas kain yang dipakai saat belanja, tanpa kantong plastik sekali pakai.',
                'category' => 'Pergub 97/2018',
                'xp_reward' => 25,
                'sort_order' => 2,
            ],
            [
                'name' => 'Bawa Tumbler Air Minum Sendiri',
                'slug' => 'bawa-tumbler',
                'description' => 'Hindari membeli air mineral gelas/botol plastik sekali pakai hari ini.',
                'instruction' => 'Foto tumbler milikmu yang dibawa beraktivitas hari ini.',
                'category' => 'Pencegahan Residu',
                'xp_reward' => 20,
                'sort_order' => 3,
            ],
            [
                'name' => 'Pindai Sampah dengan Eling AI',
                'slug' => 'pindai-sampah-ai',
                'description' => 'Gunakan AI Waste Scanner untuk memahami cara pengelolaan sampah di sekitarmu.',
                'instruction' => 'Unggah tangkapan hasil pindai AI (screenshot hasil deteksi) sebagai bukti.',
                'category' => 'Edukasi Cerdas',
                'xp_reward' => 30,
                'sort_order' => 4,
            ],
            [
                'name' => 'Simpan dan Padatkan Kardus/Plastik',
                'slug' => 'simpan-padatkan-kardus-plastik',
                'description' => 'Kumpulkan anorganik bersih untuk disetorkan ke Bank Sampah banjar.',
                'instruction' => 'Foto kardus/plastik yang sudah dilipat/padatkan dan siap disetor, cantumkan berat jika ada.',
                'category' => 'Ekonomi Sirkular',
                'xp_reward' => 35,
                'requires_weight' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($challenges as $c) {
            Challenge::firstOrCreate(
                ['slug' => $c['slug']],
                array_merge($c, [
                    'evidence_required' => true,
                    'daily_limit' => 1,
                    'is_active' => true,
                ])
            );
        }
    }
}
