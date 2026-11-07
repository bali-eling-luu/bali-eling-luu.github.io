<?php

namespace App\Services;

use App\Models\Badge;
use App\Models\User;
use App\Models\UserBadge;

class BadgeService
{
    /**
     * Beri badge yang kriteria terpenuhi (sederhana, idempotent).
     * Kriteria: total_xp, approved_count, streak_days (minimal 1).
     */
    public function awardEligible(User $user): void
    {
        $totalXp = (int) $user->xp_balance;
        $approved = $user->submissions()->where('status', 'approved')->count();

        foreach (Badge::all() as $badge) {
            $eligible = match ($badge->criteria_type) {
                'total_xp' => $totalXp >= (int) $badge->criteria_value,
                'approved_count' => $approved >= (int) $badge->criteria_value,
                default => false,
            };

            if (! $eligible) {
                continue;
            }

            UserBadge::firstOrCreate(
                ['user_id' => $user->id, 'badge_id' => $badge->id],
                ['awarded_at' => now()]
            );
        }
    }
}
