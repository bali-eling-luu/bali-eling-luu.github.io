# Checklist Foto — Kualitas Data = Kualitas Akurasi

## ✅ Foto Baik (kumpulkan)
- [ ] Sampah mengisi 50-80% frame
- [ ] Cahaya cukup (pagi/siang/malam tapi terlihat jelas)
- [ ] Fokus tajam, tidak goyang
- [ ] Latar bervariasi: lantai keramik, tanah, rumput, teras
- [ ] Sudut bervariasi: atas, samping, miring, dekat, agak jauh
- [ ] Kondisi nyata: kotor, basah, lecek, tercampur sedikit, sobek
- [ ] Satu kelas dominan per foto
- [ ] Boleh ada tangan pemegang (tapi jangan dominan)

## ❌ Foto Buruk (buang)
- Blur / goyang / terlalu gelap atau silau
- Sampah kecil jauh di sudut, kebanyakan latar
- Foto screenshot / foto dari internet (watermark)
- Dua kelas sama-sama mencolok (mis. botol di atas kardus)
- Foto burst beruntun yang isinya sama persis → cukup ambil 1-2

## Kriteria per Kelas
| Kelas | Ditangkap | Hindari |
|---|---|---|
| canang-sari | janur, bunga gumitir, porosan, koin kepeng terlihat | foto pura jauh tanpa canang |
| botol-pet | label aqua terlihat, tutup, botol pipih | botol kaca hijau tebal |
| botol-kaca-arak | kaca tebal, arak, toples | gelas plastik |
| kaleng-minuman | label soda, kerok atas kaleng | tutup botol |
| kardus-karton | lakban, lipatan kardus, cetakan belanja online | kertas HVS |
| sisa-makanan | nasi, kulit buah, sayur | piring kosong bersih |
| daun-ranting | daun gugur, ranting, rumput kering | daun hijau tanaman hidup |
| kresek-plastik | kresek bening/hitam, gelas aros | sachet foil |
| plastik-sachet | foil, bungkus mie/snack | kantong kresek polos |
| styrofoam | kotak putih, gabus pengganjal | tisu |
| sampah-higiene | tisu bekas, popok, pembalut (tutup label sensitif) | handuk bersih |
| baterai-b3 | baterai AA, aki, bohlam, kabel | mainan plastik |

## Tips Ambil di Bali
- Jam 08.00-16.00 cahaya terbaik, hindari lampu sorot langsung
- Ambil di teba, dapur, banjar, pantai (sampah pantai = kelas berbeda, jangan dicampur)
- Minta 5 orang kerabat foto gantian → variasi HP & cara pegang
- Total target: 20 foto/hari × 10 hari = 200/kelas

## Setelah Kumpul
```bash
python3 dataset/validate_dataset.py   # cek jumlah & kelas kurang
```
Kelas <150 foto = tandai kuning, kelas <50 = merah (belum boleh latih).
