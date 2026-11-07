<?php

namespace App\Providers;

use App\Models\ActionSubmission;
use App\Policies\ActionSubmissionPolicy;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        ActionSubmission::class => ActionSubmissionPolicy::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        //
    }
}
