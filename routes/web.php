<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\ActionSubmissionController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\EvidenceController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;

// Public
Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/dashboard', [PageController::class, 'dashboard'])
    ->middleware('auth')
    ->name('dashboard');

Route::get('/edukasi', [PageController::class, 'edukasi'])
    ->name('edukasi');

Route::get('/panduan', [PageController::class, 'panduan'])
    ->name('panduan');

Route::get('/artikel', [ArtikelController::class, 'index'])
    ->name('artikel.index');

Route::get('/artikel/{id}', [ArtikelController::class, 'show'])
    ->name('artikel.show');

Route::get('/tantangan', [ChallengeController::class, 'index'])
    ->name('challenges.index');

Route::get('/tantangan/{challenge:slug}', [ChallengeController::class, 'show'])
    ->name('challenges.show');

Route::get('/eco-impact', App\Http\Controllers\EcoImpactController::class)
    ->name('eco-impact');

Route::get('/leaderboard', App\Http\Controllers\LeaderboardController::class)
    ->name('leaderboard');

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:5,1');

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// User (auth)
Route::middleware('auth')->group(function () {
    Route::get('/aksi/buat/{challenge:slug}', [ActionSubmissionController::class, 'create'])
        ->name('aksi.create');
    Route::post('/aksi', [ActionSubmissionController::class, 'store'])
        ->name('aksi.store');

    Route::get('/riwayat', [ActionSubmissionController::class, 'index'])
        ->name('riwayat');

    Route::get('/profil', [ProfileController::class, 'edit'])
        ->name('profil.edit');
    Route::patch('/profil', [ProfileController::class, 'update'])
        ->name('profil.update');

    Route::get('/bukti/{evidence}', [EvidenceController::class, 'show'])
        ->name('bukti.show');

    Route::get('/rewards', [App\Http\Controllers\RewardController::class, 'index'])
        ->name('rewards.index');
    Route::post('/rewards/tukar', [App\Http\Controllers\RewardController::class, 'store'])
        ->name('rewards.store');
    Route::get('/rewards/riwayat', [App\Http\Controllers\RewardController::class, 'history'])
        ->name('rewards.history');
});

// Admin (role: admin only, cek di backend via middleware)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');

    Route::get('/users', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}/edit', [App\Http\Controllers\Admin\UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.update');

    Route::get('/challenges', [App\Http\Controllers\Admin\ChallengeAdminController::class, 'index'])->name('challenges.index');
    Route::get('/challenges/create', [App\Http\Controllers\Admin\ChallengeAdminController::class, 'create'])->name('challenges.create');
    Route::post('/challenges', [App\Http\Controllers\Admin\ChallengeAdminController::class, 'store'])->name('challenges.store');
    Route::get('/challenges/{challenge}/edit', [App\Http\Controllers\Admin\ChallengeAdminController::class, 'edit'])->name('challenges.edit');
    Route::patch('/challenges/{challenge}', [App\Http\Controllers\Admin\ChallengeAdminController::class, 'update'])->name('challenges.update');
    Route::delete('/challenges/{challenge}', [App\Http\Controllers\Admin\ChallengeAdminController::class, 'destroy'])->name('challenges.destroy');

    Route::get('/verifikasi', [App\Http\Controllers\Admin\VerificationController::class, 'index'])->name('verifications.index');
    Route::get('/verifikasi/{submission}', [App\Http\Controllers\Admin\VerificationController::class, 'show'])->name('verifications.show');
    Route::post('/verifikasi/{submission}/setujui', [App\Http\Controllers\Admin\VerificationController::class, 'approve'])->name('verifications.approve');
    Route::post('/verifikasi/{submission}/tolak', [App\Http\Controllers\Admin\VerificationController::class, 'reject'])->name('verifications.reject');

    Route::get('/xp', [App\Http\Controllers\Admin\LogController::class, 'xpHistory'])->name('xp.index');
    Route::get('/audit', [App\Http\Controllers\Admin\LogController::class, 'auditLog'])->name('audit.index');

    Route::get('/rewards', [App\Http\Controllers\Admin\RewardAdminController::class, 'index'])->name('rewards.index');
    Route::get('/rewards/create', [App\Http\Controllers\Admin\RewardAdminController::class, 'create'])->name('rewards.create');
    Route::post('/rewards', [App\Http\Controllers\Admin\RewardAdminController::class, 'store'])->name('rewards.store');
    Route::get('/rewards/{reward}/edit', [App\Http\Controllers\Admin\RewardAdminController::class, 'edit'])->name('rewards.edit');
    Route::patch('/rewards/{reward}', [App\Http\Controllers\Admin\RewardAdminController::class, 'update'])->name('rewards.update');
    Route::delete('/rewards/{reward}', [App\Http\Controllers\Admin\RewardAdminController::class, 'destroy'])->name('rewards.destroy');

    Route::get('/penukaran', [App\Http\Controllers\Admin\RedemptionAdminController::class, 'index'])->name('redemptions.index');
    Route::get('/penukaran/{redemption}', [App\Http\Controllers\Admin\RedemptionAdminController::class, 'show'])->name('redemptions.show');
    Route::post('/penukaran/{redemption}/setujui', [App\Http\Controllers\Admin\RedemptionAdminController::class, 'approve'])->name('redemptions.approve');
    Route::post('/penukaran/{redemption}/proses', [App\Http\Controllers\Admin\RedemptionAdminController::class, 'process'])->name('redemptions.process');
    Route::post('/penukaran/{redemption}/selesai', [App\Http\Controllers\Admin\RedemptionAdminController::class, 'complete'])->name('redemptions.complete');
    Route::post('/penukaran/{redemption}/tolak', [App\Http\Controllers\Admin\RedemptionAdminController::class, 'reject'])->name('redemptions.reject');
});
