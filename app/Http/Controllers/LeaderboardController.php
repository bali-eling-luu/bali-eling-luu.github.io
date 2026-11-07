<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\View\View;

class LeaderboardController extends Controller
{
    public function __invoke(): View
    {
        $leaders = User::query()
            ->withCount(['submissions as approved_count' => fn ($q) => $q->where('status', 'approved')])
            ->orderByDesc('xp_balance')
            ->orderByDesc('approved_count')
            ->take(20)
            ->get();

        return view('leaderboard.index', compact('leaders'));
    }
}
