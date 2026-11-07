<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\XpTransaction;
use Illuminate\Http\Request;
use Illuminate\View\View;

class LogController extends Controller
{
    public function xpHistory(Request $request): View
    {
        $type = $request->query('type');

        $transactions = XpTransaction::query()
            ->with(['user', 'submission.challenge'])
            ->when($type, fn ($query) => $query->where('type', $type))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return view('admin.xp.index', compact('transactions', 'type'));
    }

    public function auditLog(): View
    {
        $logs = AuditLog::with('actor')->latest()->paginate(20);

        return view('admin.audit.index', compact('logs'));
    }
}
