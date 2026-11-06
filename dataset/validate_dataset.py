#!/usr/bin/env python3
"""Validasi dataset sampah: hitung foto per kelas & tandai yang kurang.
Target: 150-300 foto per kelas (total ±2000 untuk 12 kelas inti).
Jalankan: python3 dataset/validate_dataset.py
"""

import os
from pathlib import Path

BASE = Path(__file__).parent
TARGET_MIN = 150
TARGET_IDEAL = 200
IMG_EXT = {".jpg", ".jpeg", ".png", ".webp"}

CLASSES = [
    "canang-sari",
    "botol-pet",
    "botol-kaca-arak",
    "kaleng-minuman",
    "kardus-karton",
    "sisa-makanan",
    "daun-ranting",
    "kresek-plastik",
    "plastik-sachet",
    "styrofoam",
    "sampah-higiene",
    "baterai-b3",
]


def count_images(d: Path):
    if not d.exists():
        return 0
    return sum(1 for p in d.iterdir() if p.suffix.lower() in IMG_EXT and p.is_file())


def main():
    print("📊 Validasi Dataset Bali Eling Luu")
    print("=" * 48)
    total = 0
    ok = 0
    for cls in CLASSES:
        n = count_images(BASE / cls)
        total += n
        if n >= TARGET_IDEAL:
            status = "✅"
            ok += 1
        elif n >= TARGET_MIN:
            status = "🟡"
        elif n >= 50:
            status = "🟠"
        else:
            status = "🔴"
        print(f"{status} {cls:<18} {n:>4} foto")
    print("=" * 48)
    print(f"Total: {total} foto | Kelas ideal (≥{TARGET_IDEAL}): {ok}/{len(CLASSES)}")
    if ok == len(CLASSES):
        print("🎉 Semua kelas siap latih! Lanjut ke model/TRAINING_GUIDE.md")
    else:
        print("⚠️  Tambah foto untuk kelas 🔴/🟠/🟡 sebelum latih.")


if __name__ == "__main__":
    main()
