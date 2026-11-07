<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActionSubmission;
use App\Services\VerifyActionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class VerificationController extends Controller
{
    public function index(Request $request): View
    {
        $status = $request->query('status', 'pending');
        $q = $request->query('q');

        $submissions = ActionSubmission::query()
            ->with(['user', 'challenge'])
            ->when($status, fn ($query) => $query->where('status', $status))
            ->when($q, fn ($query) => $query->whereHas('user', fn ($qq) => $qq->where('name', 'like', "%{$q}%")->orWhere('email', 'like', "%{$q}%")))
            ->latest('submitted_at')
            ->paginate(15)
            ->withQueryString();

        $counts = [
            'pending' => ActionSubmission::where('status', 'pending')->count(),
            'approved' => ActionSubmission::where('status', 'approved')->count(),
            'rejected' => ActionSubmission::where('status', 'rejected')->count(),
        ];

        return view('admin.verifications.index', compact('submissions', 'status', 'q', 'counts'));
    }

    public function show(ActionSubmission $submission): View
    {
        $submission->loadMissing(['user', 'challenge', 'evidences']);

        return view('admin.verifications.show', compact('submission'));
    }

    public function approve(Request $request, ActionSubmission $submission, VerifyActionService $service): RedirectResponse
    {
        $service->approve($request->user(), $submission);

        return redirect()->route('admin.verifications.index', ['status' => 'approved'])
            ->with('status', 'Pengajuan disetujui dan XP diberikan.');
    }

    public function reject(Request $request, ActionSubmission $submission, VerifyActionService $service): RedirectResponse
    {
        $request->validate([
            'admin_note' => ['required', 'string', 'max:1000'],
        ]);

        $service->reject($request->user(), $submission, $request->input('admin_note'));

        return redirect()->route('admin.verifications.index', ['status' => 'rejected'])
            ->with('status', 'Pengajuan ditolak.');
    }
}
