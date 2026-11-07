<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActionEvidence extends Model
{
    use HasFactory;

    protected $table = 'action_evidences';

    protected $fillable = [
        'action_submission_id', 'type', 'path', 'original_name',
        'mime', 'size_bytes', 'hash', 'position',
    ];

    protected function casts(): array
    {
        return [
            'size_bytes' => 'integer',
            'position' => 'integer',
        ];
    }

    public function submission(): BelongsTo
    {
        return $this->belongsTo(ActionSubmission::class, 'action_submission_id');
    }
}
