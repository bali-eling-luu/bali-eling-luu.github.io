<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reward extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'image_path', 'xp_cost',
        'stock', 'is_active', 'sort_order', 'requires_phone',
    ];

    protected function casts(): array
    {
        return [
            'xp_cost' => 'integer',
            'stock' => 'integer',
            'is_active' => 'boolean',
            'requires_phone' => 'boolean',
        ];
    }

    public function redemptions(): HasMany
    {
        return $this->hasMany(RewardRedemption::class);
    }
}
