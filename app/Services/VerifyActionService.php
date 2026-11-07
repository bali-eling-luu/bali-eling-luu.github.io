<?php

namespace App\Services;

use App\Models\ActionSubmission;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class VerifyActionService
{
    public function __construct(
        protected XpService $xp,
        protected AuditService $audit,
        protected BadgeService $badges,
    ) {}

    public function approve(User $admin, ActionSubmission $submission): ActionSubmission
    {
        return DB::transaction(function () use ($admin, $submission) {
            $locked = ActionSubmission::query()->lockForUpdate()->findOrFail($submission->id);

            if ($locked->status !== 'pending') {
                throw ValidationException::withMessages([
                    'status' => ['Pengajuan ini sudah diproses (' . $locked->status . ').'],
                ]);
            }

            $before = ['status' => $locked->status, 'xp' => (int) $locked->user->xp_balance];
            $xpReward = (int) ($locked->challenge->xp_reward ?? 0);

            $locked->update([
                'status' => 'approved',
                'admin_id' => $admin->id,
                'verified_at' => now(),
            ]);

            if ($xpReward > 0) {
                $this->xp->adjust(
                    $locked->user,
                    $xpReward,
                    'earn',
                    'Verifikasi: ' . $locked->challenge->name,
                    $locked->id,
                    $admin->id,
                );
            }

            $this->audit->log($admin->id, 'action.approved', ActionSubmission::class, $locked->id, $before, [
                'status' => 'approved',
                'xp_reward' => $xpReward,
            ]);

            $this->badges->awardEligible($locked->user->fresh());

            return $locked->fresh('challenge');
        });
    }

    public function reject(User $admin, ActionSubmission $submission, string $note): ActionSubmission
    {
        return DB::transaction(function () use ($admin, $submission, $note) {
            $locked = ActionSubmission::query()->lockForUpdate()->findOrFail($submission->id);

            if ($locked->status !== 'pending') {
                throw ValidationException::withMessages([
                    'status' => ['Pengajuan ini sudah diproses (' . $locked->status . ').'],
                ]);
            }

            $before = ['status' => $locked->status];

            $locked->update([
                'status' => 'rejected',
                'admin_id' => $admin->id,
                'admin_note' => $note,
                'verified_at' => now(),
            ]);

            $this->audit->log($admin->id, 'action.rejected', ActionSubmission::class, $locked->id, $before, [
                'status' => 'rejected',
                'admin_note' => $note,
            ]);

            return $locked->fresh('challenge');
        });
    }
}
