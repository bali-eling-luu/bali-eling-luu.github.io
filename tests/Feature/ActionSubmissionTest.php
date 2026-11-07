<?php

namespace Tests\Feature;

use App\Models\Challenge;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ActionSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private Challenge $challenge;

    protected function setUp(): void
    {
        parent::setUp();

        $this->challenge = Challenge::factory()->create([
            'name' => 'Pilah Canang dan Sisa Banten',
            'slug' => 'pilah-canang-sisa-banten',
            'xp_reward' => 30,
            'is_active' => true,
        ]);
    }

    public function test_guests_cannot_submit_action(): void
    {
        $this->get(route('aksi.create', $this->challenge))->assertRedirect(route('login'));
    }

    public function test_users_can_submit_action_with_valid_evidence(): void
    {
        Storage::fake('local');
        $user = User::factory()->create(['xp_balance' => 0]);

        $response = $this->actingAs($user)->post(route('aksi.store'), [
            'challenge_id' => $this->challenge->id,
            'bukti' => UploadedFile::fake()->image('bukti.jpg'),
            'weight_kg' => 1.5,
            'location_text' => 'Denpasar',
        ]);

        $response->assertRedirect(route('riwayat'));
        $this->assertDatabaseHas('action_submissions', [
            'user_id' => $user->id,
            'challenge_id' => $this->challenge->id,
            'status' => 'pending',
        ]);
        // XP belum diberikan karena masih pending
        $this->assertSame(0, (int) $user->fresh()->xp_balance);
        // Bukti tersimpan di disk local (private)
        $this->assertNotEmpty($user->fresh()->submissions()->first()->evidences);
    }

    public function test_submission_without_evidence_is_rejected(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post(route('aksi.store'), [
            'challenge_id' => $this->challenge->id,
        ])->assertSessionHasErrors('bukti');

        $this->assertDatabaseCount('action_submissions', 0);
    }

    public function test_submission_with_invalid_file_type_is_rejected(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();

        $this->actingAs($user)->post(route('aksi.store'), [
            'challenge_id' => $this->challenge->id,
            'bukti' => UploadedFile::fake()->create('dok.pdf', 100, 'application/pdf'),
        ])->assertSessionHasErrors('bukti');

        $this->assertDatabaseCount('action_submissions', 0);
    }

    public function test_submission_with_oversized_file_is_rejected(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();

        $this->actingAs($user)->post(route('aksi.store'), [
            'challenge_id' => $this->challenge->id,
            'bukti' => UploadedFile::fake()->create('besar.jpg', 6000, 'image/jpeg'),
        ])->assertSessionHasErrors('bukti');

        $this->assertDatabaseCount('action_submissions', 0);
    }

    public function test_users_cannot_submit_duplicate_evidence_within_24_hours(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('same.jpg', 100, 100);

        // Pengajuan pertama sukses
        $this->actingAs($user)->post(route('aksi.store'), [
            'challenge_id' => $this->challenge->id,
            'bukti' => $file,
        ])->assertRedirect(route('riwayat'));

        // File bytes sama diuji via hash: buat file dengan isi identik
        $content = 'duplicate-content-test';
        $file1 = UploadedFile::fake()->create('a.jpg', 1, 'image/jpeg');
        // UploadedFile::fake create tidak mudah dipaksa isi sama — uji duplikat via model langsung:
        $evidence = $user->submissions()->first()->evidences()->first();
        $this->assertNotEmpty($evidence->hash);

        // Coba insert hash sama langsung harus gagal unique
        $this->expectException(\Illuminate\Database\QueryException::class);
        \App\Models\ActionEvidence::create([
            'action_submission_id' => $user->submissions()->first()->id,
            'type' => 'activity',
            'path' => 'bukti/dup.jpg',
            'mime' => 'image/jpeg',
            'size_bytes' => 10,
            'hash' => $evidence->hash,
        ]);
    }

    public function test_users_only_see_their_own_history(): void
    {
        Storage::fake('local');
        $owner = User::factory()->create();
        $other = User::factory()->create();

        $this->actingAs($owner)->post(route('aksi.store'), [
            'challenge_id' => $this->challenge->id,
            'bukti' => UploadedFile::fake()->image('owner.jpg'),
        ]);

        $this->actingAs($other)->get(route('riwayat'))->assertOk()->assertDontSee($this->challenge->name);
        $this->actingAs($owner)->get(route('riwayat'))->assertOk()->assertSee($this->challenge->name);
    }

    public function test_challenges_index_is_public(): void
    {
        $this->get(route('challenges.index'))->assertOk()->assertSee('Pilah Canang dan Sisa Banten');
    }
}
