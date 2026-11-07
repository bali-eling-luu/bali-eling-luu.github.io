<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        $stats = null;
        if ($user) {
            $subs = $user->submissions();
            $stats = [
                'total' => (clone $subs)->count(),
                'pending' => (clone $subs)->where('status', 'pending')->count(),
                'approved' => (clone $subs)->where('status', 'approved')->count(),
                'rejected' => (clone $subs)->where('status', 'rejected')->count(),
                'xp' => (int) ($user->xp_balance ?? 0),
                'level' => $user->level(),
                'levelTitle' => $user->levelTitle(),
                'recent' => $user->submissions()->with('challenge')->take(5)->get(),
            ];
        }

        return view('pages.dashboard', compact('stats'));
    }

    public function edukasi(Request $request)
    {
        return view('pages.edukasi', [
            'jenis' => $request->query('jenis'),
        ]);
    }

    public function panduan()
    {
        return view('pages.panduan');
    }
}
