<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reward;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class RewardAdminController extends Controller
{
    public function index(): View
    {
        $rewards = Reward::query()->latest()->paginate(15);

        return view('admin.rewards.index', compact('rewards'));
    }

    public function create(): View
    {
        return view('admin.rewards.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'xp_cost' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        Reward::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'xp_cost' => $data['xp_cost'],
            'stock' => $data['stock'],
            'sort_order' => $data['sort_order'] ?? 0,
            'requires_phone' => $request->boolean('requires_phone'),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.rewards.index')->with('status', 'Reward dibuat.');
    }

    public function edit(Reward $reward): View
    {
        return view('admin.rewards.edit', compact('reward'));
    }

    public function update(Request $request, Reward $reward): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'xp_cost' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $reward->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'xp_cost' => $request->input('xp_cost'),
            'stock' => $request->input('stock'),
            'sort_order' => $request->input('sort_order') ?? 0,
            'requires_phone' => $request->boolean('requires_phone'),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.rewards.index')->with('status', 'Reward diperbarui.');
    }

    public function destroy(Reward $reward): RedirectResponse
    {
        $reward->delete();

        return redirect()->route('admin.rewards.index')->with('status', 'Reward dihapus.');
    }
}
