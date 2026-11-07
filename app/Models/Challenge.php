<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'instruction', 'category',
        'xp_reward', 'evidence_required', 'requires_weight',
        'daily_limit', 'is_active', 'sort_order', 'starts_at', 'ends_at',
    ];

    protected function casts(): array
    {
        return [
            'evidence_required' => 'boolean',
            'requires_weight' => 'boolean',
            'is_active' => 'boolean',
            'xp_reward' => 'integer',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(ActionSubmission::class);
    }
}
