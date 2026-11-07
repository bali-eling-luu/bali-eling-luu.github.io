<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActionSubmission;
use App\Models\AuditLog;
use App\Models\Challenge;
use App\Models\User;
use App\Models\XpTransaction;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        return view('admin.dashboard', [
            'totalUsers' => User::count(),
            'adminUsers' => User::where('role', 'admin')->count(),
            'regularUsers' => User::where('role', 'user')->count(),
            'totalXp' => (int) User::sum('xp_balance'),
            'totalChallenges' => Challenge::count(),
            'activeChallenges' => Challenge::where('is_active', true)->count(),
            'totalSubmissions' => ActionSubmission::count(),
            'pendingSubmissions' => ActionSubmission::where('status', 'pending')->count(),
            'approvedSubmissions' => ActionSubmission::where('status', 'approved')->count(),
            'rejectedSubmissions' => ActionSubmission::where('status', 'rejected')->count(),
            'totalWeight' => (float) ActionSubmission::where('status', 'approved')->sum('weight_kg'),
            'totalXpTransactions' => XpTransaction::count(),
            'recentUsers' => User::latest()->take(8)->get(),
            'recentSubmissions' => ActionSubmission::with(['user', 'challenge'])->latest('submitted_at')->take(8)->get(),
            'recentAuditLogs' => AuditLog::with('actor')->latest()->take(8)->get(),
        ]);
    }
}
