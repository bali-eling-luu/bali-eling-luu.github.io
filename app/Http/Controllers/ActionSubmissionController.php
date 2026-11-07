<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreActionSubmissionRequest;
use App\Models\Challenge;
use App\Services\ActionSubmissionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ActionSubmissionController extends Controller
{
    public function create(Challenge $challenge): View
    {
        return view('submissions.create', compact('challenge'));
    }

    public function store(StoreActionSubmissionRequest $request, ActionSubmissionService $service): RedirectResponse
    {
        $data = $request->validated();
        $challenge = Challenge::query()->where('is_active', true)->findOrFail($data['challenge_id']);

        $service->submit($request->user(), $challenge, $data, $request->file('bukti'));

        return redirect()->route('riwayat')->with('status', 'Pengajuan dikirim. Menunggu verifikasi admin — XP belum diberikan.');
    }

    public function index(): View
    {
        $submissions = auth()->user()->submissions()
            ->with('challenge')
            ->latest('submitted_at')
            ->paginate(15);

        return view('submissions.index', compact('submissions'));
    }
}
