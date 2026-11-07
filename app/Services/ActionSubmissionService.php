<?php

namespace App\Services;

use App\Models\ActionSubmission;
use App\Models\Challenge;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ActionSubmissionService
{
    /**
     * Simpan pengajuan + bukti dalam transaction.
     * $file harus sudah tervalidasi (MIME, size) oleh FormRequest.
     */
    public function submit(User $user, Challenge $challenge, array $data, UploadedFile $file): ActionSubmission
    {
        return DB::transaction(function () use ($user, $challenge, $data, $file) {
            // Cegah duplikat harian sesuai daily_limit
            $todayCount = ActionSubmission::query()
                ->where('user_id', $user->id)
                ->where('challenge_id', $challenge->id)
                ->whereDate('submitted_at', now()->toDateString())
                ->count();

            if ($todayCount >= (int) $challenge->daily_limit) {
                throw ValidationException::withMessages([
                    'challenge' => ['Batas pengajuan harian untuk tantangan ini sudah tercapai.'],
                ]);
            }

            $hash = hash_file('sha256', $file->getRealPath());

            // Bukti duplikat: hash sama dari user yang sama dalam 24 jam
            $duplicate = DB::table('action_evidences')
                ->join('action_submissions', 'action_submissions.id', '=', 'action_evidences.action_submission_id')
                ->where('action_submissions.user_id', $user->id)
                ->where('action_evidences.hash', $hash)
                ->where('action_evidences.created_at', '>=', now()->subHours(24))
                ->exists();

            if ($duplicate) {
                throw ValidationException::withMessages([
                    'bukti' => ['File bukti ini sudah pernah dikirim dalam 24 jam terakhir.'],
                ]);
            }

            $submission = ActionSubmission::create([
                'user_id' => $user->id,
                'challenge_id' => $challenge->id,
                'status' => 'pending',
                'weight_kg' => $data['weight_kg'] ?? null,
                'location_text' => $data['location_text'] ?? null,
                'note' => $data['note'] ?? null,
                'submitted_at' => now(),
            ]);

            $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
            $safeName = Str::uuid() . '.' . $ext;
            $stored = $file->storeAs('bukti', $safeName, 'local');

            $submission->evidences()->create([
                'type' => $data['type'] ?? 'activity',
                'path' => $stored,
                'original_name' => $file->getClientOriginalName(),
                'mime' => $file->getMimeType(),
                'size_bytes' => $file->getSize(),
                'hash' => $hash,
                'position' => 0,
            ]);

            return $submission;
        });
    }
}
