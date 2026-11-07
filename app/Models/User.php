<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Mass-assignable attributes.
     * Penting: 'role' dan 'xp_balance' TIDAK boleh diisi dari form
     * registrasi publik — harus di-set eksplisit di backend.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'phone',
        'avatar_path',
    ];

    /**
     * Attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'xp_balance' => 'integer',
        ];
    }

    public function isAdmin(): bool
    {
        return ($this->role ?? 'user') === 'admin';
    }

    public function isUser(): bool
    {
        return ($this->role ?? 'user') === 'user';
    }

    public function submissions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ActionSubmission::class)->latest('submitted_at');
    }

    public function level(): int
    {
        $xp = (int) ($this->xp_balance ?? 0);
        return match (true) {
            $xp >= 1500 => 5,
            $xp >= 800 => 4,
            $xp >= 400 => 3,
            $xp >= 150 => 2,
            default => 1,
        };
    }

    public function levelTitle(): string
    {
        $xp = (int) ($this->xp_balance ?? 0);
        return match (true) {
            $xp >= 1500 => 'Duta Bali Lestari',
            $xp >= 800 => 'Pahlawan Palemahan',
            $xp >= 400 => 'Penjaga Alam',
            $xp >= 150 => 'Krama Lestari',
            default => 'Krama Peduli',
        };
    }

    public function badges(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(UserBadge::class);
    }

    public function redemptions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RewardRedemption::class)->latest();
    }
}
