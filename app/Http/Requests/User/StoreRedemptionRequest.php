<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreRedemptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'reward_id' => ['required', 'exists:rewards,id'],
            'phone' => ['nullable', 'string', 'max:30'],
        ];
    }
}
