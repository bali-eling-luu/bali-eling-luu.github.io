<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreActionSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // route sudah middleware auth
    }

    public function rules(): array
    {
        return [
            'challenge_id' => ['required', 'exists:challenges,id'],
            'bukti' => ['required', 'file', 'mimes:jpeg,jpg,png,webp', 'max:5120'],
            'type' => ['nullable', 'in:before_after,activity,receipt,qr'],
            'weight_kg' => ['nullable', 'numeric', 'min:0', 'max:10000'],
            'location_text' => ['nullable', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'bukti.required' => 'Bukti foto wajib diunggah.',
            'bukti.mimes' => 'Format bukti harus JPG, PNG, atau WebP.',
            'bukti.max' => 'Ukuran bukti maksimal 5 MB.',
        ];
    }
}
