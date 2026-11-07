<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserRole
{
    /**
     * Ensure the authenticated user has one of the given roles.
     * Usage: ->middleware('role:admin') or ->middleware('role:admin,editor')
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->guest(route('login'))->with('status', 'Silakan masuk terlebih dahulu.');
        }

        if (! in_array($user->role ?? 'user', $roles, true)) {
            abort(403, 'Akses ditolak: halaman ini hanya untuk admin.');
        }

        return $next($request);
    }
}
