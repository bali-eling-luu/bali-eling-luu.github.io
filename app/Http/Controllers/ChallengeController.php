<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use Illuminate\View\View;

class ChallengeController extends Controller
{
    public function index(): View
    {
        $challenges = Challenge::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(12);

        return view('challenges.index', compact('challenges'));
    }

    public function show(Challenge $challenge): View
    {
        abort_unless($challenge->is_active, 404);

        return view('challenges.show', compact('challenge'));
    }
}
