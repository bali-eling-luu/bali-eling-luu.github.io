<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditService
{
    /**
     * Catat perubahan penting. Dipanggil dalam transaction yang sama
     * dengan operasi yang diaudit agar konsisten.
     */
    public function log(?int $actorId, string $action, ?string $type = null, ?int $id = null, ?array $before = null, ?array $after = null, ?Request $request = null): AuditLog
    {
        $request ??= app('request');

        return AuditLog::create([
            'actor_id' => $actorId,
            'action' => $action,
            'auditable_type' => $type,
            'auditable_id' => $id,
            'before' => $before,
            'after' => $after,
            'ip_address' => $request?->ip(),
            'user_agent' => $request?->userAgent(),
        ]);
    }
}
