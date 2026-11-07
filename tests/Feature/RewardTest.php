<?php

namespace Tests\Feature;

use App\Models\Reward;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RewardTest extends TestCase
{
    use RefreshDatabase;

    private Reward $reward;

    protected function setUp(): void
    {
        parent::setUp();

        $this->reward = Reward::create([
            'name' => 'Pulsa Rp5.000',
            'description' => 'Simulasi DEMO',
            'xp_cost' => 500,
            'stock' => 2,
            'is_active' => true,
            'requires_phone' => true,
        ]);
    }

    public function test_rewards_are_visible(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('rewards.index'))
            ->assertOk()->assertSee('Pulsa Rp5.000')->assertSee('DEMO');
    }

    public function test_user_with_enough_xp_can_redeem(): void
    {
        $user = User::factory()->create(['xp_balance' => 1000]);

        $response = $this->actingAs($user)->post(route('rewards.store'), [
            'reward_id' => $this->reward->id,
            'phone' => '081234567890',
        ]);

        $response->assertRedirect(route('rewards.history'));
        $this->assertSame(500, (int) $user->fresh()->xp_balance);
        $this->assertSame(1, (int) $this->reward->fresh()->stock);
        $this->assertDatabaseHas('reward_redemptions', [
            'user_id' => $user->id,
            'reward_id' => $this->reward->id,
            'status' => 'pending',
            'is_demo' => true,
            'xp_cost_snapshot' => 500,
        ]);
    }

    public function test_user_with_insufficient_xp_is_rejected(): void
    {
        $user = User::factory()->create(['xp_balance' => 100]);

        $this->actingAs($user)->post(route('rewards.store'), [
            'reward_id' => $this->reward->id,
            'phone' => '081234567890',
        ])->assertSessionHasErrors('xp');

        $this->assertSame(100, (int) $user->fresh()->xp_balance);
        $this->assertDatabaseCount('reward_redemptions', 0);
    }

    public function test_out_of_stock_reward_cannot_be_redeemed(): void
    {
        $this->reward->update(['stock' => 0]);
        $user = User::factory()->create(['xp_balance' => 5000]);

        $this->actingAs($user)->post(route('rewards.store'), [
            'reward_id' => $this->reward->id,
            'phone' => '081234567890',
        ])->assertSessionHasErrors('reward');

        $this->assertDatabaseCount('reward_redemptions', 0);
    }

    public function test_admin_can_process_demo_redemption_to_completed(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create(['xp_balance' => 1000]);

        // User ajukan
        $this->actingAs($user)->post(route('rewards.store'), [
            'reward_id' => $this->reward->id,
            'phone' => '081234567890',
        ]);

        $redemption = $user->redemptions()->first();
        $this->assertNotNull($redemption);

        $this->actingAs($admin)->post(route('admin.redemptions.approve', $redemption))->assertRedirect();
        $this->actingAs($admin)->post(route('admin.redemptions.process', $redemption))->assertRedirect();
        $this->actingAs($admin)->post(route('admin.redemptions.complete', $redemption))->assertRedirect();

        $this->assertSame('completed', $redemption->fresh()->status);
        $this->assertTrue((bool) $redemption->fresh()->is_demo);
    }

    public function test_admin_rejection_refunds_xp_and_restores_stock(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create(['xp_balance' => 1000]);

        $this->actingAs($user)->post(route('rewards.store'), [
            'reward_id' => $this->reward->id,
            'phone' => '081234567890',
        ]);

        $redemption = $user->redemptions()->first();
        $this->assertSame(500, (int) $user->fresh()->xp_balance);
        $this->assertSame(1, (int) $this->reward->fresh()->stock);

        $this->actingAs($admin)->post(route('admin.redemptions.reject', $redemption), [
            'admin_note' => 'Stok tidak tersedia',
        ])->assertRedirect();

        $this->assertSame('rejected', $redemption->fresh()->status);
        $this->assertSame(1000, (int) $user->fresh()->xp_balance);
        $this->assertSame(2, (int) $this->reward->fresh()->stock);
    }

    public function test_regular_user_cannot_manage_rewards(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('admin.rewards.index'))->assertForbidden();
    }
}
