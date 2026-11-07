<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_pages_return_successfully(): void
    {
        $this->withoutVite();

        $this->get('/')->assertOk();
        // Dashboard kini dilindungi auth: tamu diarahkan ke login
        $this->get('/dashboard')->assertRedirect(route('login'));
        $this->get('/edukasi?jenis=organik')->assertOk()->assertSee('Organik — Jenis Sampah');
        $this->get('/edukasi?jenis=tidak-ada')->assertOk()->assertSee('Anorganik — Jenis Sampah');
        $this->get('/panduan')->assertOk()->assertSee('Pilah Sampah dengan Benar');
        $this->get('/artikel')->assertOk();
        $this->get('/login')->assertOk();
        $this->get('/register')->assertOk();
    }

    public function test_dashboard_shows_for_authenticated_user(): void
    {
        $this->withoutVite();
        $user = User::factory()->create(['name' => 'Putu Test']);

        $this->actingAs($user)->get('/dashboard')->assertOk()->assertSee('Halo, Putu Test!');
    }

    public function test_feature_assets_are_present(): void
    {
        foreach ([
            'js/ai_scanner.js',
            'js/chat.js',
            'js/data_lokasi.js',
            'js/data_lokasi_peta.js',
            'js/data_sampah.js',
            'js/data_statistik.js',
            'js/eco_action.js',
            'js/peta.js',
            'model/model.json',
            'model/metadata.json',
            'model/model_config.js',
            'model/weights.bin',
        ] as $asset) {
            $this->assertFileExists(public_path($asset));
        }
    }

    public function test_scanner_exposes_open_function_and_model_base(): void
    {
        $scanner = file_get_contents(public_path('js/ai_scanner.js'));

        $this->assertStringContainsString('window.openBaliElingScanner', $scanner);
        $this->assertStringContainsString('window.BALI_MODEL_BASE', $scanner);
    }
}
