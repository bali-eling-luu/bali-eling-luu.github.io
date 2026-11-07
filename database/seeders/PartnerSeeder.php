<?php

namespace Database\Seeders;

use App\Models\PartnerLocation;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Diport dari public/js/data_lokasi_peta.js (FASILITAS_BALI, 18 titik).
     * Kontak hanya disimpan bila terkonfirmasi (tanpa xxxx).
     */
    public function run(): void
    {
        $data = [
            ['name' => 'TPS 3R Desa Pemecutan Kaja', 'type' => 'tps3r', 'regency' => 'Denpasar', 'address' => 'Jl. Sutomo No. 112, Pemecutan Kaja, Denpasar Utara', 'lat' => -8.6385, 'lng' => 115.2078, 'contact' => null, 'is_verified' => true],
            ['name' => 'TPS 3R Kesiman Kertalangu', 'type' => 'tps3r', 'regency' => 'Denpasar', 'address' => 'Kawasan Desa Budaya Kertalangu, Jl. Bypass Ngurah Rai', 'lat' => -8.6432, 'lng' => 115.2534, 'contact' => null, 'is_verified' => true],
            ['name' => 'Bank Sampah Tegeh Sari', 'type' => 'bank_sampah', 'regency' => 'Denpasar', 'address' => 'Banjar Tegeh Sari, Jl. Gunung Batur, Padangsambian Kaja', 'lat' => -8.651, 'lng' => 115.185, 'contact' => null, 'is_verified' => true],
            ['name' => 'Drop Box Sampah B3 DLHK Denpasar', 'type' => 'dropbox_b3', 'regency' => 'Denpasar', 'address' => 'Kantor Dinas LHK Kota Denpasar, Jl. Majapahit No. 1', 'lat' => -8.665, 'lng' => 115.215, 'contact' => '(0361) 223333', 'is_verified' => true],
            ['name' => 'Bank Sampah Pelita Kedaton', 'type' => 'bank_sampah', 'regency' => 'Denpasar', 'address' => 'Banjar Kedaton, Desa Kesiman Petilan', 'lat' => -8.6534, 'lng' => 115.241, 'contact' => null, 'is_verified' => true],
            ['name' => 'Bank Sampah Bhineka Nusa Kauh', 'type' => 'bank_sampah', 'regency' => 'Badung', 'address' => 'Perumahan Bhineka Nusa Kauh, Dalung, Kuta Utara', 'lat' => -8.621, 'lng' => 115.1765, 'contact' => null, 'is_verified' => true],
            ['name' => 'TPS 3R Mengwitani', 'type' => 'tps3r', 'regency' => 'Badung', 'address' => 'Jl. Raya Mengwitani, Mengwi, Kabupaten Badung', 'lat' => -8.5478, 'lng' => 115.1732, 'contact' => null, 'is_verified' => true],
            ['name' => 'TPS 3R Seminyak Clean', 'type' => 'tps3r', 'regency' => 'Badung', 'address' => 'Jl. Sunset Road Gg. Merpati, Seminyak, Kuta', 'lat' => -8.6923, 'lng' => 115.1682, 'contact' => null, 'is_verified' => true],
            ['name' => 'TPS 3R Jimbaran Asri', 'type' => 'tps3r', 'regency' => 'Badung', 'address' => 'Jl. Kampus Unud, Jimbaran, Kuta Selatan', 'lat' => -8.789, 'lng' => 115.164, 'contact' => null, 'is_verified' => true],
            ['name' => 'Sentra Kompos & TPS 3R Temesi', 'type' => 'tps3r', 'regency' => 'Gianyar', 'address' => 'Desa Temesi, Kecamatan Gianyar', 'lat' => -8.5432, 'lng' => 115.3456, 'contact' => '(0361) 948123', 'is_verified' => true],
            ['name' => 'Rumah Kompos Padangtegal Ubud', 'type' => 'tps3r', 'regency' => 'Gianyar', 'address' => 'Jl. Wenara Wana (Monkey Forest), Padangtegal, Ubud', 'lat' => -8.5189, 'lng' => 115.2635, 'contact' => null, 'is_verified' => true],
            ['name' => 'TOSS Center Karangdadi Klungkung', 'type' => 'tps_terpadu', 'regency' => 'Klungkung', 'address' => 'Dusun Karangdadi, Desa Kusamba, Klungkung', 'lat' => -8.552, 'lng' => 115.418, 'contact' => '(0366) 21123', 'is_verified' => true],
            ['name' => 'TPS 3R Tabanan Mandiri Asri', 'type' => 'tps3r', 'regency' => 'Tabanan', 'address' => 'Dajan Peken, Kecamatan Tabanan', 'lat' => -8.5412, 'lng' => 115.1245, 'contact' => null, 'is_verified' => true],
            ['name' => 'TPS 3R Bangli Kota', 'type' => 'tps3r', 'regency' => 'Bangli', 'address' => 'Br. Selat, Kelurahan Bangli, Kab. Bangli', 'lat' => -8.4519, 'lng' => 115.3539, 'contact' => '(0366) 938077', 'is_verified' => false],
            ['name' => 'Bank Sampah Singaraja Kota', 'type' => 'bank_sampah', 'regency' => 'Buleleng', 'address' => 'Br. Anyar, Kelurahan Kampung Kajanan, Singaraja', 'lat' => -8.1123, 'lng' => 115.0861, 'contact' => null, 'is_verified' => false],
            ['name' => 'TPS 3R Sangsit', 'type' => 'tps3r', 'regency' => 'Buleleng', 'address' => 'Desa Sangsit, Kecamatan Sawan, Buleleng', 'lat' => -8.1765, 'lng' => 115.142, 'contact' => null, 'is_verified' => false],
            ['name' => 'TPS 3R Negara Kota', 'type' => 'tps3r', 'regency' => 'Jembrana', 'address' => 'Kelurahan Baler Bale Agung, Negara, Jembrana', 'lat' => -8.3574, 'lng' => 114.6237, 'contact' => '(0365) 32212', 'is_verified' => false],
            ['name' => 'TPS 3R Amlapura Kota', 'type' => 'tps3r', 'regency' => 'Karangasem', 'address' => 'Kelurahan Padang Kerta, Amlapura, Karangasem', 'lat' => -8.4478, 'lng' => 115.6083, 'contact' => '(0363) 21412', 'is_verified' => false],
        ];

        foreach ($data as $row) {
            PartnerLocation::firstOrCreate(['name' => $row['name']], [...$row, 'is_active' => true]);
        }
    }
}
