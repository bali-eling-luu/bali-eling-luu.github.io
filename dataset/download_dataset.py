#!/usr/bin/env python3
"""
Download dataset sampah siap latih → langsung ke kelas inti Bali Eling Luu.

Sumber:
  1) Kaggle Garbage Classification (12k foto, 10 kelas) via kagglehub
  2) TrashNet (2.5k foto, 6 kelas) — fallback manual bila gdown tersedia

Pemetaan ke 12 kelas inti (dataset/):
  battery   -> baterai-b3
  biological-> sisa-makanan
  cardboard -> kardus-karton
  glass     -> botol-kaca-arak
  metal     -> kaleng-minuman
  paper     -> kardus-karton
  plastic   -> botol-pet   (botol plastik dominan)
  trash     -> plastik-sachet
  clothes, shoes -> dilewati (bukan 12 kelas inti)

Class Bali (canang/daun/styrofoam/kresek/higiene) tetap wajib foto manual —
tidak ada di dataset publik.

Cara pakai:
  pip install kagglehub  # sekali saja
  python3 dataset/download_dataset.py --source kaggle --limit 60
  python3 dataset/download_dataset.py --source trashnet --limit 60
  python3 dataset/download_dataset.py --source all --limit 80
  python3 dataset/validate_dataset.py
"""

import argparse
import shutil
import sys
from pathlib import Path

BASE = Path(__file__).parent
IMG_EXT = {".jpg", ".jpeg", ".png", ".webp"}

# peta kelas sumber -> kelas Bali Eling Luu
KAGGLE_MAP = {
    "battery": "baterai-b3",
    "biological": "sisa-makanan",
    "cardboard": "kardus-karton",
    "glass": "botol-kaca-arak",
    "metal": "kaleng-minuman",
    "paper": "kardus-karton",
    "plastic": "botol-pet",
    "trash": "plastik-sachet",
    # dilewati: clothes, shoes
}

TRASHNET_MAP = {
    "cardboard": "kardus-karton",
    "glass": "botol-kaca-arak",
    "metal": "kaleng-minuman",
    "plastic": "botol-pet",
    "paper": "kardus-karton",
    "trash": "plastik-sachet",
}


def copy_limit(src_dir: Path, dst_dir: Path, limit: int):
    dst_dir.mkdir(parents=True, exist_ok=True)
    imgs = [
        p for p in src_dir.rglob("*") if p.suffix.lower() in IMG_EXT and p.is_file()
    ]
    imgs.sort(key=lambda p: p.name)
    n = 0
    for f in imgs:
        if n >= limit:
            break
        # buat unik: prefix nama folder asal
        out = dst_dir / f"{src_dir.name}_{n:04d}_{f.name}"
        shutil.copy2(f, out)
        n += 1
    return n


def apply_map(source_root: Path, mapping: dict, limit: int):
    total = 0
    for src_name, dst_name in mapping.items():
        # cari folder sumber (case-insensitive)
        found = None
        for d in source_root.rglob(src_name):
            if d.is_dir():
                found = d
                break
        if not found:
            print(f"  ⚠️  folder '{src_name}' tidak ketemu di {source_root}")
            continue
        n = copy_limit(found, BASE / dst_name, limit)
        print(f"  ✅ {src_name:12} -> {dst_name:18} {n} foto")
        total += n
    return total


def download_kaggle(limit: int):
    print("📥 Kaggle Garbage Classification via kagglehub…")
    try:
        import kagglehub
    except ImportError:
        print("❌ Butuh: pip install kagglehub")
        print("   Lalu jalankan lagi.")
        return 0
    path = kagglehub.dataset_download("siddharthdani/garbage-classification")
    print(f"   folder cache: {path}")
    return apply_map(Path(path), KAGGLE_MAP, limit)


def download_trashnet(limit: int):
    print("📥 TrashNet…")
    # TrashNet zip umum didistribusikan via Google Drive (butuh gdown).
    # Coba import gdown, kalau tidak ada tampilkan langkah manual.
    try:
        import gdown
    except ImportError:
        print(
            "❌ Butuh gdown: pip install gdown lalu unduh manual file berikut lalu ekstrak:"
        )
        print(
            "   https://github.com/garythung/trashnet  (petunjuk Download di README repo)"
        )
        print("   Setelah ekstrak, jalankan:")
        print(
            "   python3 dataset/download_dataset.py --source trashnet-local --path /lokasi/folder-ekstrak --limit 60"
        )
        return 0
    # Catatan: ID Drive bisa berubah; script ini fallback ke langkah manual di atas.
    print(
        "   TrashNet: silakan unduh via GitHub README (Drive), lalu pakai --source trashnet-local"
    )
    return 0


def download_local(path_str: str, limit: int):
    src = Path(path_str)
    if not src.exists():
        print(f"❌ Path tidak ada: {src}")
        return 0
    print(f"📂 TrashNet lokal: {src}")
    return apply_map(src, TRASHNET_MAP, limit)


def main():
    ap = argparse.ArgumentParser(
        description="Download dataset sampah ke folder dataset/"
    )
    ap.add_argument(
        "--source",
        choices=["kaggle", "trashnet", "trashnet-local", "all"],
        default="kaggle",
    )
    ap.add_argument(
        "--path", help="path folder ekstrak TrashNet (untuk --source trashnet-local)"
    )
    ap.add_argument(
        "--limit",
        type=int,
        default=60,
        help="maks foto per kelas (default 60, pilot cepat)",
    )
    args = ap.parse_args()

    total = 0
    if args.source in ("kaggle", "all"):
        total += download_kaggle(args.limit)
    if args.source == "trashnet":
        total += download_trashnet(args.limit)
    if args.source == "trashnet-local":
        if not args.path:
            print("❌ Butuh --path /lokasi/folder-ekstrak")
            sys.exit(1)
        total += download_local(args.path, args.limit)
    if args.source == "all" and not args.path:
        print(
            "ℹ️  all = Kaggle saja bila TrashNet manual belum ada. Tambah manual beriknya."
        )

    print("=" * 48)
    print(f"Selasa: {total} foto disalin. Cek:")
    print("  python3 dataset/validate_dataset.py")
    print("Sisa yang wajib foto manual: canang-sari, daun-ranting, styrofoam,")
    print("  kresek-plastik, sampah-higiene (30-50 foto/kelas, 30 menit selesai).")


if __name__ == "__main__":
    main()
