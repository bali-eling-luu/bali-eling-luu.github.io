# Sumber Dataset (Kredit & Lisensi)

Semua dataset di bawah ditujukan untuk **pelatihan internal / edukasi**.
Simpan link ini di README publik agar tetap ada atribusi.

| Dataset | Isi | Link | Dipakai untuk |
|---|---|---|---|
| Garbage Classification (Kaggle) | 10 kelas, ~12k foto | https://www.kaggle.com/datasets/siddharthdani/garbage-classification | botol-pet, kaca, kaleng, kardus, baterai, sisa makanan |
| TrashNet | 6 kelas, 2.527 foto | https://github.com/garythung/trashnet | botol, kaleng, kardus (tambahan) |
| TACO | 1.500+ foto sampah liar, 60 kategori | http://taco.vision/ | kresek, styrofoam, sachet (bila waktu cukup) |

## Aturan Lisensi
- Dataset riset umumnya boleh untuk non-komersial / edukasi.
- **Jangan** jual foto dataset mentah sebagai produk.
- Model yang dilatih dari foto ini: cek lisensi turunan bila nanti komersial (buat catatan di `model/TRAINING_GUIDE.md`).
- Foto Bali (canang, dll) = kontribusi warga — sebutkan sebagai "difoto ulang oleh komunitas Bali Eling Luu".

## Cara Cepat Sore Ini
```bash
pip install kagglehub
python3 dataset/download_dataset.py --source kaggle --limit 60
# foto manual: canang, daun, styrofoam, kresek, higiene (30-50/kelas, 30 mnt)
python3 dataset/validate_dataset.py
```
Target sore ini: **50-60/kelas pertama (pilot)** → latih → demo jalan. Naikkan ke 200/kelas setelah deadline.

## Langkah Manual TrashNet (opsional)
1. Buka https://github.com/garythung/trashnet → cari "Download" di README
2. Ekstrak zip → misalnya `~/Downloads/trashnet/data`
3. Salin ke folder kita:
```bash
python3 dataset/download_dataset.py --source trashnet-local --path ~/Downloads/trashnet/data --limit 60
```
