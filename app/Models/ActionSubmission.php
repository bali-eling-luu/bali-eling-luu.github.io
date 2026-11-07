<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActionSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'challenge_id', 'status', 'weight_kg',
        'location_text', 'note', 'admin_id', 'admin_note',
        'submitted_at', 'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'weight_kg' => 'decimal:2',
            'submitted_at' => 'datetime',
            'verified_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function challenge(): BelongsTo
    {
        return $this->belongsTo(Challenge::class);
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function evidences(): HasMany
    {
        return $this->hasMany(ActionEvidence::class)->orderBy('position');
    }
}
