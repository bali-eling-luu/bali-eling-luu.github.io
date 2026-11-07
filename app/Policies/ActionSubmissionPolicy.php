<?php

namespace App\Policies;

use App\Models\ActionSubmission;
use App\Models\User;

class ActionSubmissionPolicy
{
    public function view(User $user, ActionSubmission $submission): bool
    {
        return $submission->user_id === $user->id || $user->isAdmin();
    }

    public function update(User $user, ActionSubmission $submission): bool
    {
        // Hanya admin yang mengubah status verifikasi (melalui Admin Controller khusus).
        return $user->isAdmin();
    }
}
