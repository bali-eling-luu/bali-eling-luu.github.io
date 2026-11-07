<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartnerLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'type', 'regency', 'address', 'lat', 'lng',
        'contact', 'is_verified', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
            'lat' => 'decimal:7',
            'lng' => 'decimal:7',
        ];
    }
}
