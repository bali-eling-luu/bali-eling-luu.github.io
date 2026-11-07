<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    public function create(): View
    {
        return view('auth.register');
    }

    public function store(RegisterRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Generate username otomatis bila kosong, tapi tetap unik.
        if (empty($data['username'])) {
            $base = \Str::slug($data['name']);
            $username = $base;
            $counter = 1;
            while (User::where('username', $username)->exists()) {
                $counter++;
                $username = $base . $counter;
            }
            $data['username'] = $username;
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'username' => $data['username'],
            'phone' => $data['phone'] ?? null,
            // Role TIDAK diambil dari input. Default DB = user.
            'role' => 'user',
            'xp_balance' => 0,
        ]);

        event(new Registered($user));

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('dashboard')->with('status', 'Akun berhasil dibuat. Selamat datang di Bali Eling Luu!');
    }
}
