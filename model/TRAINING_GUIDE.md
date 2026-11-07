# TRAINING GUIDE — Latih Model Sampah di Teachable Machine (5-10 menit kerja)

## Prasyarat
- Foto sudah ≥150 per kelas (`python3 dataset/validate_dataset.py` hijau)
- Browser Chrome/Edge, koneksi internet untuk upload

## Langkah

1. **Buat proyek**
   Buka https://teachablemachine.withgoogle.com/train/image → *Get Started* → *Image Project*

2. **Tambah 13 Kelas Standar (12 sampah + bukan-sampah P0)**
   Klik *Add Class* 13×, namakan **persis** (harus sama dengan `model_config.js`):
   ```
   canang-sari, botol-pet, botol-kaca-arak, kaleng-minuman,
   kardus-karton, sisa-makanan, daun-ranting, kresek-plastik,
   plastik-sachet, styrofoam, sampah-higiene, baterai-b3, bukan-sampah
   ```

3. **Upload foto**
   *Upload Images* per kelas → pilih foto dari `dataset/<nama-kelas>/` → drag. 
   - Lakukan per kelas, jangan campur.
   - Cek 10 foto pertama per kelas: salah label? hapus, ulangi.

4. **Train**
   Klik *Train Model* (5-20 menit tergantung jumlah foto).
   Lihat **Confusion Matrix** bawah: diagonal hijau = benar. Kelas yang kuning/merah = sering tertukar → tambah foto kelas itu.

5. **Preview**
   *Preview* → upload foto tes 20 foto nyata (yang belum pernah di-upload). Kenaikan harus ≥85%. Kalau buruk, balik ke langkah 3 tambah foto.

6. **Export → TensorFlow.js**
   *Export Model* → *TensorFlow.js* → *Download* (dapat zip isi `model.json` + `weights.bin`).

7. **Simpan ke repo**
   Ekstrak zip ke folder ini:
   ```
   model/
   ├── model.json      ← dari Teachable Machine
   ├── weights.bin     ← dari Teachable Machine
   ├── model_config.js (sudah ada)
   └── integrasi_ke_scanner.js (panduan ganti loader)
   ```
   Nama kelas di `model.json` harus cocok persis dengan `model_config.js`. Buka `model.json` → cek `"labels": [...]`.

8. **Uji lokal**
   ```bash
   python3 -m http.server 8001
   # buka http://localhost:8001/index.html → Scan AI → upload foto tes
   ```

9. **Commit & push**
   ```bash
   git add model/ ai_scanner.js
   git commit -m "feat(scanner): ganti MobileNet umum → model khusus sampah 13 kelas"
   git push origin main
   ```

## Biaya & Batasan
- Gratis, tanpa Python, tanpa GPU.
- Ukuran model TF.js ~5-12 MB (aman untuk GitHub Pages, limit 100 MB/file).
- Tambah kelas baru = latih ulang dari nol (Teachable Machine tidak bisa menambah kelas setelah export).

## Troubleshooting
| Gejala | Penyebab | Solusi |
|---|---|---|
| `Failed to fetch model.json` | Path salah / CORS | Pakai path relatif `model/model.json`, serve via http.server bukan file:// |
| Kelas selalu tertukar (mis. kresek vs sachet) | Foto mirip | Tambah 100 foto tiap kelas dengan latar berbeda |
| Akurasi turun di foto nyata | Data latih terlalu bersih | Tambah foto kotor/basah/lecek |
| Model besar di HP | alpha 1.0 MobileNet | Di Teachable Machine pilih *MobileNet v2* (sudah default) |
