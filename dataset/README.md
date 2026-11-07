# Dataset Sampah Bali Eling Luu — 13 Kelas Inti (12 sampah + bukan-sampah)

Model khusus sampah (Opsi B) dilatih dari foto asli di folder ini.

## Struktur
```
dataset/
├── canang-sari/       # Canang sari & sisa banten
├── botol-pet/         # Botol plastik PET (aqua, soda, teh)
├── botol-kaca-arak/   # Botol kaca & arak Bali
├── kaleng-minuman/    # Kaleng aluminium / baja
├── kardus-karton/     # Kardus & kotak
├── sisa-makanan/      # Sisa makanan & buah
├── daun-ranting/      # Daun kering & ranting
├── kresek-plastik/    # Kresek & gelas plastik sekali pakai
├── plastik-sachet/    # Sachet & kemasan multilayer
├── styrofoam/         # Styrofoam / gabus
├── sampah-higiene/    # Tisu, popok, pembalut bekas
└── baterai-b3/        # Baterai, lampu, obat, elektronik (B3)
```

## Target
- **150–300 foto per kelas** (total ±2.000 foto untuk 13 kelas)
- Foto asli: dapur, halaman, jalan, siang/malam, latar berbeda
- Boleh campur: bersih / kotor / basah / lecek — sesuai sampah nyata
- Pisahkan 80% latih / 20% tes (Teachable Machine membagi otomatis saat export)

## Aturan
1. Sat u foto = satu kelas dominan. Jangan ada sampah kelas lain mencolok di frame.
2. JPG/PNG, resolusi ≥ 640px, jangan blur/gelap total.
3. Boleh putar / miring / sudut berbeda — jangan selalu tegak lurus.
4. Untuk kelas Bali spesifik (canang) wajib foto sendiri — tidak ada di dataset internet.
5. B3: foto dari jarak aman, jangan bongkar baterai.
6. Jangan pernah kirim foto orang / wajah ke Teachable Machine.

## Validasi jumlah
```bash
python3 dataset/validate_dataset.py
```
Script akan hitung foto per kelas dan tandai kelas yang kurang.

## Setelah Foto Cukup
1. Baca `../model/TRAINING_GUIDE.md` untuk langkah latih di Teachable Machine.
2. Export TensorFlow.js → simpan ke `../model/` (`model.json` + `weights.bin`).
3. Integrasi via `../model/model_config.js` & `../model/integrasi_ke_scanner.js`.

## Catatan Privasi
Hapus metadata GPS sebelum upload publik. Foto rumah tangga aman dipakai untuk pelatihan internal.
