<?php

namespace Tests\Feature;

use App\Models\ActionSubmission;
use App\Models\Challenge;
use App\Models\PartnerLocation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EcoImpactTest extends TestCase
{
    use RefreshDatabase;

    public function test_eco_impact_counts_only_approved_actions(): void
    {
        $user = User::factory()->create();
        $challenge = Challenge::factory()->create(['xp_reward' => 30]);

        ActionSubmission::create([
            'user_id' => $user->id, 'challenge_id' => $challenge->id,
            'status' => 'approved', 'weight_kg' => 2.5, 'submitted_at' => now(), 'verified_at' => now(),
        ]);
        ActionSubmission::create([
            'user_id' => $user->id, 'challenge_id' => $challenge->id,
            'status' => 'pending', 'weight_kg' => 10, 'submitted_at' => now(),
        ]);

        $this->get(route('eco-impact'))
            ->assertOk()
            ->assertSee('1')
            ->assertSee('2.50 kg')
            ->assertDontSee('12.50');
    }

    public function test_leaderboard_shows_xp_order(): void
    {
        User::factory()->create(['name' => 'Zara Top', 'xp_balance' => 500]);
        User::factory()->create(['name' => 'Abdul Rendah', 'xp_balance' => 10]);

        $this->get(route('leaderboard'))
            ->assertOk()
            ->assertSee('Zara Top')
            ->assertSee('500');
    }

    public function test_partner_locations_are_imported_from_eco_map(): void
    {
        $this->seed(\Database\Seeders\PartnerSeeder::class);

        $this->assertSame(18, PartnerLocation::count());
        $this->assertSame(13, PartnerLocation::where('is_verified', true)->count());
        $this->assertSame(5, PartnerLocation::where('is_verified', false)->count());
    }
}
