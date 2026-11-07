<?php

namespace Tests\Feature;

use App\Models\ActionSubmission;
use App\Models\Challenge;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminVerificationTest extends TestCase
{
    use RefreshDatabase;

    private Challenge $challenge;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
        $this->challenge = Challenge::factory()->create([
            'name' => 'Pilah Canang',
            'slug' => 'pilah-canang',
            'xp_reward' => 30,
            'is_active' => true,
        ]);
    }

    private function makePendingSubmission(User $user): ActionSubmission
    {
        $sub = ActionSubmission::create([
            'user_id' => $user->id,
            'challenge_id' => $this->challenge->id,
            'status' => 'pending',
            'submitted_at' => now(),
            'weight_kg' => 1.2,
        ]);

        $file = UploadedFile::fake()->image('bukti.jpg');
        $stored = $file->storeAs('bukti', 'test-' . uniqid() . '.jpg', 'local');

        $sub->evidences()->create([
            'type' => 'activity',
            'path' => $stored,
            'original_name' => 'bukti.jpg',
            'mime' => 'image/jpeg',
            'size_bytes' => 1000,
            'hash' => hash('sha256', uniqid()),
        ]);

        return $sub;
    }

    public function test_admin_can_approve_and_award_xp(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create(['xp_balance' => 0]);
        $sub = $this->makePendingSubmission($user);

        $response = $this->actingAs($admin)->post(route('admin.verifications.approve', $sub));

        $response->assertRedirect();
        $this->assertSame('approved', $sub->fresh()->status);
        $this->assertSame(30, (int) $user->fresh()->xp_balance);
        $this->assertDatabaseHas('xp_transactions', [
            'user_id' => $user->id,
            'action_submission_id' => $sub->id,
            'type' => 'earn',
            'amount' => 30,
            'balance_after' => 30,
        ]);
        $this->assertDatabaseHas('audit_logs', [
            'action' => 'action.approved',
            'auditable_id' => $sub->id,
        ]);
    }

    public function test_admin_can_reject_with_note_and_no_xp(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create(['xp_balance' => 0]);
        $sub = $this->makePendingSubmission($user);

        $response = $this->actingAs($admin)->post(route('admin.verifications.reject', $sub), [
            'admin_note' => 'Bukti kurang jelas.',
        ]);

        $response->assertRedirect();
        $this->assertSame('rejected', $sub->fresh()->status);
        $this->assertSame('Bukti kurang jelas.', $sub->fresh()->admin_note);
        $this->assertSame(0, (int) $user->fresh()->xp_balance);
        $this->assertDatabaseCount('xp_transactions', 0);
    }

    public function test_double_approve_does_not_award_xp_twice(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create(['xp_balance' => 0]);
        $sub = $this->makePendingSubmission($user);

        $this->actingAs($admin)->post(route('admin.verifications.approve', $sub));
        $this->assertSame(30, (int) $user->fresh()->xp_balance);

        $second = $this->actingAs($admin)->post(route('admin.verifications.approve', $sub));
        $second->assertSessionHasErrors('status');
        $this->assertSame(30, (int) $user->fresh()->xp_balance);
        $this->assertDatabaseCount('xp_transactions', 1);
    }

    public function test_regular_user_cannot_approve(): void
    {
        $user = User::factory()->create();
        $sub = $this->makePendingSubmission($user);

        $this->actingAs($user)->post(route('admin.verifications.approve', $sub))->assertForbidden();
        $this->assertSame('pending', $sub->fresh()->status);
    }

    public function test_admin_can_manage_challenges(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->post(route('admin.challenges.store'), [
            'name' => 'Tantangan Baru',
            'description' => 'Deskripsi baru',
            'xp_reward' => 45,
            'daily_limit' => 1,
            'evidence_required' => '1',
            'is_active' => '1',
        ])->assertRedirect(route('admin.challenges.index'));

        $this->assertDatabaseHas('challenges', ['name' => 'Tantangan Baru', 'xp_reward' => 45]);
    }

    public function test_admin_can_update_user_role(): void
    {
        $admin = User::factory()->admin()->create();
        $target = User::factory()->create(['role' => 'user']);

        $this->actingAs($admin)->patch(route('admin.users.update', $target), [
            'name' => $target->name,
            'username' => 'target-updated',
            'role' => 'admin',
        ])->assertRedirect(route('admin.users.index'));

        $this->assertSame('admin', $target->fresh()->role);
    }
}
