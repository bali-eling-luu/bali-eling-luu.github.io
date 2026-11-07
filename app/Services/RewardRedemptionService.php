<?php

namespace App\Services;

use App\Models\Reward;
use App\Models\RewardRedemption;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RewardRedemptionService
{
    public function __construct(
        protected XpService $xp,
        protected AuditService $audit,
    ) {}

    /**
     * Ajukan penukaran: cek saldo + stok atomik, kurangi XP + stok,
     * buat request pending (DEMO). XP di-refund saat reject/cancel.
     */
    public function redeem(User $user, Reward $reward, ?string $phone = null): RewardRedemption
    {
        return DB::transaction(function () use ($user, $reward, $phone) {
            $lockedReward = Reward::query()->lockForUpdate()->findOrFail($reward->id);

            if (! $lockedReward->is_active) {
                throw ValidationException::withMessages(['reward' => ['Reward tidak aktif.']]);
            }
            if ($lockedReward->stock < 1) {
                throw ValidationException::withMessages(['reward' => ['Stok reward habis.']]);
            }

            $lockedUser = User::query()->lockForUpdate()->findOrFail($user->id);
            if ((int) $lockedUser->xp_balance < (int) $lockedReward->xp_cost) {
                throw ValidationException::withMessages(['xp' => ['Saldo XP tidak mencukupi untuk reward ini.']]);
            }

            if ($lockedReward->requires_phone) {
                $phone ??= $lockedUser->phone;
                if (! $phone) {
                    throw ValidationException::withMessages(['phone' => ['Nomor HP wajib untuk reward ini.']]);
                }
            }

            $lockedReward->decrement('stock');

            $redemption = RewardRedemption::create([
                'user_id' => $lockedUser->id,
                'reward_id' => $lockedReward->id,
                'xp_cost_snapshot' => $lockedReward->xp_cost,
                'phone' => $phone,
                'status' => 'pending',
                'is_demo' => true,
            ]);

            $this->xp->adjust(
                $lockedUser,
                - (int) $lockedReward->xp_cost,
                'spend',
                'Penukaran: ' . $lockedReward->name . ' (DEMO)',
            );

            $this->audit->log($lockedUser->id, 'reward.redeem_requested', RewardRedemption::class, $redemption->id, null, [
                'reward' => $lockedReward->name,
                'xp_cost' => $lockedReward->xp_cost,
            ]);

            return $redemption;
        });
    }

    public function approve(User $admin, RewardRedemption $redemption): RewardRedemption
    {
        return $this->transition($admin, $redemption, 'approved', 'reward.approved');
    }

    public function process(User $admin, RewardRedemption $redemption): RewardRedemption
    {
        return $this->transition($admin, $redemption, 'processing', 'reward.processing');
    }

    public function complete(User $admin, RewardRedemption $redemption): RewardRedemption
    {
        return DB::transaction(function () use ($admin, $redemption) {
            $locked = RewardRedemption::query()->lockForUpdate()->findOrFail($redemption->id);

            if ($locked->status !== 'processing') {
                throw ValidationException::withMessages(['status' => ['Penukaran harus diproses (processing) sebelum selesai.']]);
            }

            $locked->update([
                'status' => 'completed',
                'admin_id' => $admin->id,
                'completed_at' => now(),
            ]);

            $this->audit->log($admin->id, 'reward.completed', RewardRedemption::class, $locked->id, ['status' => 'processing'], ['status' => 'completed']);

            return $locked->fresh('reward');
        });
    }

    public function reject(User $admin, RewardRedemption $redemption, string $note): RewardRedemption
    {
        return DB::transaction(function () use ($admin, $redemption, $note) {
            $locked = RewardRedemption::query()->lockForUpdate()->findOrFail($redemption->id);

            if (! in_array($locked->status, ['pending', 'approved', 'processing'], true)) {
                throw ValidationException::withMessages(['status' => ['Penukaran sudah diproses (' . $locked->status . ').']]);
            }

            $before = ['status' => $locked->status];

            $locked->update([
                'status' => 'rejected',
                'admin_id' => $admin->id,
                'admin_note' => $note,
            ]);

            // Kembalikan stok + refund XP yang sudah dipotong saat redeem
            $locked->reward()->lockForUpdate()->first()?->increment('stock');

            $this->xp->adjust(
                $locked->user,
                (int) $locked->xp_cost_snapshot,
                'earn',
                'Refund penukaran ditolak: ' . $locked->reward->name,
                null,
                $admin->id,
            );

            $this->audit->log($admin->id, 'reward.rejected', RewardRedemption::class, $locked->id, $before, [
                'status' => 'rejected', 'admin_note' => $note,
            ]);

            return $locked->fresh('reward');
        });
    }

    private function transition(User $admin, RewardRedemption $redemption, string $to, string $auditAction): RewardRedemption
    {
        return DB::transaction(function () use ($admin, $redemption, $to, $auditAction) {
            $locked = RewardRedemption::query()->lockForUpdate()->findOrFail($redemption->id);

            $allowed = match ($to) {
                'approved' => ['pending'],
                'processing' => ['approved'],
                default => [],
            };

            if (! in_array($locked->status, $allowed, true)) {
                throw ValidationException::withMessages(['status' => ['Transisi status tidak valid dari ' . $locked->status . '.']]);
            }

            $before = ['status' => $locked->status];

            $locked->update([
                'status' => $to,
                'admin_id' => $admin->id,
                'processed_at' => now(),
            ]);

            $this->audit->log($admin->id, $auditAction, RewardRedemption::class, $locked->id, $before, ['status' => $to]);

            return $locked->fresh('reward');
        });
    }
}
