<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RewardRedemption extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'reward_id', 'xp_cost_snapshot', 'phone',
        'status', 'is_demo', 'admin_id', 'admin_note',
        'processed_at', 'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'is_demo' => 'boolean',
            'processed_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reward(): BelongsTo
    {
        return $this->belongsTo(Reward::class);
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
