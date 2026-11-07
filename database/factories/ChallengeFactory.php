<?php

namespace Database\Factories;

use App\Models\Challenge;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Challenge>
 */
class ChallengeFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->words(3, true);

        return [
            'name' => ucfirst($name),
            'slug' => 'challenge-' . Str::random(8),
            'description' => fake()->sentence(12),
            'instruction' => fake()->sentence(20),
            'category' => 'Umum',
            'xp_reward' => 30,
            'evidence_required' => true,
            'requires_weight' => false,
            'daily_limit' => 1,
            'is_active' => true,
            'sort_order' => 0,
        ];
    }
}
