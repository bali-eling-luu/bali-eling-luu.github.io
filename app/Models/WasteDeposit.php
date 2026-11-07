<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WasteDeposit extends Model
{
    use HasFactory;

    protected $fillable = [
        'partner_location_id', 'user_id', 'waste_category',
        'weight_kg', 'deposit_date', 'verification_status', 'verified_by',
    ];

    protected function casts(): array
    {
        return [
            'weight_kg' => 'decimal:2',
            'deposit_date' => 'date',
        ];
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(PartnerLocation::class, 'partner_location_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
