<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class UserController extends Controller
{
    public function index(Request $request): View
    {
        $q = $request->query('q');
        $role = $request->query('role');

        $users = User::query()
            ->when($q, fn ($query) => $query->where(function ($qq) use ($q) {
                $qq->where('name', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%")
                    ->orWhere('username', 'like', "%{$q}%");
            }))
            ->when($role, fn ($query) => $query->where('role', $role))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return view('admin.users.index', compact('users', 'q', 'role'));
    }

    public function edit(User $user): View
    {
        return view('admin.users.edit', compact('user'));
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'username' => ['nullable', 'string', 'max:50', 'alpha_dash', 'unique:users,username,' . $user->id],
            'phone' => ['nullable', 'string', 'max:30'],
            'role' => ['required', 'in:user,admin'],
        ]);

        // Admin tidak boleh menurunkan dirinya sendiri dari admin
        if ($user->id === $request->user()->id && $request->input('role') !== 'admin') {
            return back()->withErrors(['role' => ['Anda tidak dapat mengubah role admin Anda sendiri.']])->withInput();
        }

        $user->forceFill([
            'name' => $request->input('name'),
            'username' => $request->input('username'),
            'phone' => $request->input('phone'),
            'role' => $request->input('role'),
        ])->save();

        return redirect()->route('admin.users.index')->with('status', 'Pengguna ' . $user->name . ' diperbarui.');
    }
}
