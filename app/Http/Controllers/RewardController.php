<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreRedemptionRequest;
use App\Models\Reward;
use App\Services\RewardRedemptionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class RewardController extends Controller
{
    public function index(): View
    {
        $rewards = Reward::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('xp_cost')
            ->paginate(12);

        return view('rewards.index', compact('rewards'));
    }

    public function store(StoreRedemptionRequest $request, RewardRedemptionService $service): RedirectResponse
    {
        $reward = Reward::query()->findOrFail($request->input('reward_id'));

        $service->redeem($request->user(), $reward, $request->input('phone'));

        return redirect()->route('rewards.history')
            ->with('status', 'Penukaran diajukan (DEMO). XP sudah dikurangi dan menunggu proses admin.');
    }

    public function history(): View
    {
        $redemptions = auth()->user()->redemptions()
            ->with('reward')
            ->paginate(15);

        return view('rewards.history', compact('redemptions'));
    }
}
