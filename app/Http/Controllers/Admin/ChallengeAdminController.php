<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ChallengeAdminController extends Controller
{
    public function index(): View
    {
        $challenges = Challenge::query()->latest()->paginate(15);

        return view('admin.challenges.index', compact('challenges'));
    }

    public function create(): View
    {
        return view('admin.challenges.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'instruction' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'xp_reward' => ['required', 'integer', 'min:0', 'max:100000'],
            'daily_limit' => ['required', 'integer', 'min:1'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'evidence_required' => ['nullable', 'boolean'],
            'requires_weight' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $slug = $request->input('slug') ?: \Str::slug($data['name']);
        abort_if(Challenge::where('slug', $slug)->exists(), 422, 'Slug sudah dipakai.');

        Challenge::create([
            'name' => $data['name'],
            'slug' => $slug,
            'description' => $data['description'],
            'instruction' => $data['instruction'] ?? null,
            'category' => $data['category'] ?? null,
            'xp_reward' => $data['xp_reward'],
            'daily_limit' => $data['daily_limit'],
            'sort_order' => $data['sort_order'] ?? 0,
            'evidence_required' => $request->boolean('evidence_required'),
            'requires_weight' => $request->boolean('requires_weight'),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.challenges.index')->with('status', 'Tantangan dibuat.');
    }

    public function edit(Challenge $challenge): View
    {
        return view('admin.challenges.edit', compact('challenge'));
    }

    public function update(Request $request, Challenge $challenge): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'instruction' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'xp_reward' => ['required', 'integer', 'min:0', 'max:100000'],
            'daily_limit' => ['required', 'integer', 'min:1'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $challenge->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'instruction' => $request->input('instruction'),
            'category' => $request->input('category'),
            'xp_reward' => $request->input('xp_reward'),
            'daily_limit' => $request->input('daily_limit'),
            'sort_order' => $request->input('sort_order') ?? 0,
            'evidence_required' => $request->boolean('evidence_required'),
            'requires_weight' => $request->boolean('requires_weight'),
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()->route('admin.challenges.index')->with('status', 'Tantangan diperbarui.');
    }

    public function destroy(Challenge $challenge): RedirectResponse
    {
        $challenge->delete();

        return redirect()->route('admin.challenges.index')->with('status', 'Tantangan dihapus.');
    }
}
