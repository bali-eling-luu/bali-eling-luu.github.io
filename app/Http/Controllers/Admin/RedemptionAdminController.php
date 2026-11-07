<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RewardRedemption;
use App\Services\RewardRedemptionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class RedemptionAdminController extends Controller
{
    public function index(Request $request): View
    {
        $status = $request->query('status');

        $redemptions = RewardRedemption::query()
            ->with(['user', 'reward'])
            ->when($status, fn ($q) => $q->where('status', $status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return view('admin.redemptions.index', compact('redemptions', 'status'));
    }

    public function show(RewardRedemption $redemption): View
    {
        $redemption->loadMissing(['user', 'reward']);

        return view('admin.redemptions.show', compact('redemption'));
    }

    public function approve(Request $request, RewardRedemption $redemption, RewardRedemptionService $service): RedirectResponse
    {
        $service->approve($request->user(), $redemption);

        return redirect()->route('admin.redemptions.index', ['status' => 'approved'])
            ->with('status', 'Penukaran disetujui (DEMO).');
    }

    public function process(Request $request, RewardRedemption $redemption, RewardRedemptionService $service): RedirectResponse
    {
        $service->process($request->user(), $redemption);

        return redirect()->route('admin.redemptions.index', ['status' => 'processing'])
            ->with('status', 'Penukaran diproses (DEMO).');
    }

    public function complete(Request $request, RewardRedemption $redemption, RewardRedemptionService $service): RedirectResponse
    {
        $service->complete($request->user(), $redemption);

        return redirect()->route('admin.redemptions.index', ['status' => 'completed'])
            ->with('status', 'Penukaran selesai (DEMO — pulsa tidak benar-benar terkirim).');
    }

    public function reject(Request $request, RewardRedemption $redemption, RewardRedemptionService $service): RedirectResponse
    {
        $request->validate(['admin_note' => ['required', 'string', 'max:1000']]);

        $service->reject($request->user(), $redemption, $request->input('admin_note'));

        return redirect()->route('admin.redemptions.index', ['status' => 'rejected'])
            ->with('status', 'Penukaran ditolak. XP dikembalikan.');
    }
}
