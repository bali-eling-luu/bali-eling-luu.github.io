<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'criteria_type', 'criteria_value', 'icon',
    ];

    protected function casts(): array
    {
        return ['criteria_value' => 'integer'];
    }
}
