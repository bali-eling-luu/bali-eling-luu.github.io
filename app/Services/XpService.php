<?php

namespace App\Services;

use App\Models\User;
use App\Models\XpTransaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class XpService
{
    /**
     * Tambah/kurang XP secara atomik + catat transaksi.
     * amount positif untuk earn, negatif untuk spend.
     */
    public function adjust(User $user, int $amount, string $type, string $reason, ?int $submissionId = null, ?int $createdBy = null): XpTransaction
    {
        return DB::transaction(function () use ($user, $amount, $type, $reason, $submissionId, $createdBy) {
            $locked = User::query()->lockForUpdate()->findOrFail($user->id);

            // Cegah dobel XP untuk pengajuan yang sama
            if ($submissionId && $type === 'earn') {
                $exists = XpTransaction::query()->where('action_submission_id', $submissionId)->exists();
                if ($exists) {
                    throw ValidationException::withMessages([
                        'status' => ['Pengajuan ini sudah pernah menerima XP.'],
                    ]);
                }
            }

            $newBalance = (int) $locked->xp_balance + $amount;
            if ($newBalance < 0) {
                throw ValidationException::withMessages([
                    'xp' => ['Saldo XP tidak mencukupi.'],
                ]);
            }

            $locked->xp_balance = $newBalance;
            $locked->save();

            return XpTransaction::create([
                'user_id' => $locked->id,
                'action_submission_id' => $submissionId,
                'type' => $type,
                'amount' => $amount,
                'balance_after' => $newBalance,
                'reason' => $reason,
                'created_by' => $createdBy,
            ]);
        });
    }
}
