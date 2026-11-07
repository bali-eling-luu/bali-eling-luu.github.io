<?php

namespace App\Http\Controllers;

use App\Models\ActionSubmission;
use App\Models\PartnerLocation;
use App\Models\User;
use App\Models\WasteDeposit;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class EcoImpactController extends Controller
{
    /**
     * Semua angka berasal dari DB valid — tanpa klaim palsu.
     * Bedakan: dipilah (approved weight) vs disetor (waste_deposits disetor+).
     */
    public function __invoke(): View
    {
        $approvedQuery = ActionSubmission::query()->where('status', 'approved');

        $totalAksi = (clone $approvedQuery)->count();
        $beratDipilah = (float) (clone $approvedQuery)->sum('weight_kg');

        $beratDisetor = (float) WasteDeposit::query()
            ->whereIn('verification_status', ['disetor', 'diproses_mitra'])
            ->sum('weight_kg');

        $penggunaAktif = User::query()
            ->whereHas('submissions', fn ($q) => $q->where('status', 'approved'))
            ->distinct('id')
            ->count('id');

        $totalLokasi = PartnerLocation::query()->where('is_active', true)->count();
        $lokasiTerdaftar = PartnerLocation::query()->where('is_active', true)->get();
        $partnersByRegency = PartnerLocation::query()
            ->where('is_active', true)
            ->selectRaw('regency, COUNT(*) as total')
            ->groupBy('regency')
            ->orderByDesc('total')
            ->get();

        $depositsByCategory = WasteDeposit::query()
            ->whereIn('verification_status', ['disetor', 'diproses_mitra'])
            ->selectRaw('verification_status, waste_category, SUM(weight_kg) as total_kg, COUNT(*) as total_records')
            ->groupBy('verification_status', 'waste_category')
            ->get();

        $categories = WasteDeposit::query()
            ->whereIn('verification_status', ['disetor', 'diproses_mitra'])
            ->whereNotNull('waste_category')
            ->selectRaw('waste_category, SUM(weight_kg) as total_kg')
            ->groupBy('waste_category')
            ->orderByDesc('total_kg')
            ->get();

        $recentVerified = ActionSubmission::query()
            ->where('status', 'approved')
            ->with(['user', 'challenge'])
            ->latest('verified_at')
            ->take(8)
            ->get();

        return view('eco-impact.index', compact(
            'totalAksi', 'beratDipilah', 'beratDisetor', 'penggunaAktif',
            'totalLokasi', 'lokasiTerdaftar', 'partnersByRegency',
            'depositsByCategory', 'categories', 'recentVerified'
        ));
    }
}
