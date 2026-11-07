# Audit Kit — Bali Eling Luu (Dataset + Pengujian Model 13 Kelas)

ZIP ini terpisah dari `BaliElingLuu-final.zip` (kode + model). 

Isi:
- `dataset/` — 734 foto training per kelas (13 kelas, 23 MB)
- `dataset_test_fresh/` — **230 foto test SEGAR, overlap hash MD5 = 0** dengan training (6.5 MB)
- `model/` — model Teachable Machine 13 kelas yang diuji (`model.json`, `metadata.json`, `weights.bin`)
- `evaluation.html` — harness browser: pilih folder test → confusion matrix + precision/recall/F1 per kelas + macro + unknown 45% + bukan-sampah

## Koreksi Leakage (P0)
Test lama `dataset_test/` (144 foto) **bocor: 143/144 identik hash dengan training** (duplikat fisik). Test itu **tidak dipakai lagi** dan diganti `dataset_test_fresh/`:
- 140 foto Kaggle fresh (7 kelas × 20) dari sisa pool 15.515 foto yang tidak pernah disalin ke `dataset/`
- 90 foto Wikimedia Commons fresh dengan offset pencarian berbeda (6 kelas Bali + bukan-sampah)
- Verifikasi: `overlap hash = 0/230` (script MD5)

Catatan: model aktif dilatih dari `dataset/` utuh (sebelum split fresh). Karena fresh overlap 0, akurasi fresh = estimasi tidak bocor yang jujur untuk model ini. Training berikutnya WAJIB pakai split: training = `dataset/` minus test, atau split acak baru sebelum latih.

## Distribusi
Training: canang 33, styrofoam 27, kresek 32 (paling kecil) vs kaca 150 (terbesar) — ketidakseimbangan 5.5×, duplikat hash 12/721 (1.6%).
Test fresh: 230 foto, 15-20 per kelas (kresek 5 saja — Commons terbatas, perlu tambah foto HP nyata).

## Uji
1. Serve folder ini: `python3 -m http.server 8002`
2. Buka `http://localhost:8002/evaluation.html`
3. Pilih folder `dataset_test_fresh/`, klik Jalankan
4. Laporan: akurasi hold-out, precision/recall/F1 per kelas, macro F1, unknown rate, bukan-sampah recall. Target P0: ≥80% keduanya.

## Lisensi
Foto Kaggle (Mostafa Garbage Classification 12 kelas) + Wikimedia Commons (Bali + bukan-sampah, CC terbuka). Untuk pelatihan & audit internal; model turunan patuhi lisensi sumber.
