<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login_for_dashboard(): void
    {
        $this->get('/dashboard')->assertRedirect(route('login'));
    }

    public function test_users_can_register(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Putu Test',
            'email' => 'putu@test.local',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'putu@test.local',
            'role' => 'user',
        ]);
    }

    public function test_users_cannot_register_as_admin_via_form(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Evil Test',
            'email' => 'evil@test.local',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'admin',
            'xp_balance' => 9999,
        ]);

        $response->assertRedirect(route('dashboard'));
        $user = User::where('email', 'evil@test.local')->first();
        $this->assertNotNull($user);
        $this->assertSame('user', $user->role);
        $this->assertSame(0, (int) $user->xp_balance);
    }

    public function test_users_can_login_and_logout(): void
    {
        $user = User::factory()->create([
            'email' => 'login@test.local',
            'password' => Hash::make('secret123'),
        ]);

        $this->post(route('login'), [
            'email' => 'login@test.local',
            'password' => 'secret123',
        ])->assertRedirect(route('dashboard'));
        $this->assertAuthenticatedAs($user);

        $this->post(route('logout'))->assertRedirect(route('home'));
        $this->assertGuest();
    }

    public function test_users_cannot_login_with_wrong_password(): void
    {
        User::factory()->create([
            'email' => 'wrong@test.local',
            'password' => Hash::make('correct123'),
        ]);

        $this->post(route('login'), [
            'email' => 'wrong@test.local',
            'password' => 'wrong-password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_regular_users_cannot_access_admin_dashboard(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $this->actingAs($user)->get(route('admin.dashboard'))->assertForbidden();
    }

    public function test_admins_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->get(route('admin.dashboard'))->assertOk()->assertSee('Dashboard Admin');
    }

    public function test_guests_cannot_access_admin_dashboard(): void
    {
        $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
    }
}
