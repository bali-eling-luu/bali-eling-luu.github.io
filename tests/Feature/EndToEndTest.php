<?php

namespace Tests\Feature;

use App\Models\ActionSubmission;
use App\Models\Challenge;
use App\Models\Reward;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * E2E §15: user kirim bukti -> pending -> admin approve -> XP ->
 * reward DEMO -> admin complete. Plus skenario penolakan.
 */
class EndToEndTest extends TestCase
{
    use RefreshDatabase;

    public function test_full_approve_flow_user_admin_reward(): void
    {
        Storage::fake('local');
        $challenge = Challenge::factory()->create([
            'name' => 'Pilah Canang dan Sisa Banten',
            'slug' => 'pilah-canang',
            'xp_reward' => 30,
            'is_active' => true,
        ]);
        $reward = Reward::create([
            'name' => 'Pulsa Rp5.000', 'xp_cost' => 30, 'stock' => 5,
            'is_active' => true, 'requires_phone' => true,
        ]);
        $user = User::factory()->create(['xp_balance' => 0]);
        $admin = User::factory()->admin()->create();

        // 1-3. Login user, buka dashboard & tantangan
        $this->actingAs($user)->get(route('dashboard'))->assertOk();
        $this->get(route('challenges.index'))->assertOk()->assertSee('Pilah Canang');

        // 4-6. Upload bukti -> pending, XP belum bertambah
        $this->post(route('aksi.store'), [
            'challenge_id' => $challenge->id,
            'bukti' => UploadedFile::fake()->image('bukti.jpg'),
        ])->assertRedirect(route('riwayat'));

        $submission = ActionSubmission::first();
        $this->assertSame('pending', $submission->status);
        $this->assertSame(0, (int) $user->fresh()->xp_balance);

        // 7-8. Admin buka verifikasi
        $this->actingAs($admin)->get(route('admin.verifications.index', ['status' => 'pending']))
            ->assertOk()->assertSee('Pilah Canang');

        // 9-11. Admin setujui
        $this->post(route('admin.verifications.approve', $submission))->assertRedirect();
        $this->assertSame('approved', $submission->fresh()->status);

        // 12-14. User cek XP
        $this->actingAs($user)->get(route('dashboard'))->assertOk();
        $this->assertSame(30, (int) $user->fresh()->xp_balance);

        // 15-18. Tukar reward, status pending
        $this->post(route('rewards.store'), [
            'reward_id' => $reward->id,
            'phone' => '081200000000',
        ])->assertRedirect(route('rewards.history'));

        $redemption = $user->redemptions()->first();
        $this->assertSame('pending', $redemption->status);
        $this->assertSame(0, (int) $user->fresh()->xp_balance);

        // 19-20. Admin proses DEMO
        $this->actingAs($admin)->post(route('admin.redemptions.approve', $redemption))->assertRedirect();
        $this->actingAs($admin)->post(route('admin.redemptions.process', $redemption))->assertRedirect();
        $this->actingAs($admin)->post(route('admin.redemptions.complete', $redemption))->assertRedirect();

        // 21-23. User cek completed + riwayat
        $this->assertSame('completed', $redemption->fresh()->status);
        $this->assertTrue((bool) $redemption->fresh()->is_demo);
        $this->actingAs($user)->get(route('rewards.history'))->assertOk()->assertSee('Pulsa Rp5.000');
    }

    public function test_rejection_flow_awards_no_xp(): void
    {
        Storage::fake('local');
        $challenge = Challenge::factory()->create(['xp_reward' => 30, 'is_active' => true]);
        $user = User::factory()->create(['xp_balance' => 0]);
        $admin = User::factory()->admin()->create();

        $this->actingAs($user)->post(route('aksi.store'), [
            'challenge_id' => $challenge->id,
            'bukti' => UploadedFile::fake()->image('buram.jpg'),
        ]);

        $submission = ActionSubmission::first();

        $this->actingAs($admin)->post(route('admin.verifications.reject', $submission), [
            'admin_note' => 'Bukti buram, ulangi.',
        ])->assertRedirect();

        $this->assertSame('rejected', $submission->fresh()->status);
        $this->assertSame(0, (int) $user->fresh()->xp_balance);
        $this->actingAs($user)->get(route('riwayat'))->assertOk()->assertSee('Bukti buram');
    }
}
