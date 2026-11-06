/**
 * model/model_config.js
 * Pemetaan kelas Teachable Machine → KNOWLEDGE_BASE_BALI di ai_scanner.js
 * NAMA KELAS HARUS PERSIS sama dengan yang diketik di Teachable Machine.
 */
const MODEL_CONFIG = {
  // Path file model (relatif dari index.html)
  modelJsonUrl: "model/model.json",
  // metadata: Teachable Machine export juga menghasilkan model.json yang sama.
  // Jika kamu export metadata.json terpisah, isi di bawah:
  // metadataUrl: "model/metadata.json",

  // Label Teachable Machine → id katalog scanner
  // Sesuaikan dengan TRAINING_GUIDE.md (12 kelas inti)
  labelToId: {
    "canang-sari": "canang-sari",
    "botol-pet": "botol-pet",
    "botol-kaca-arak": "botol-kaca-arak",
    "kaleng-minuman": "kaleng-minuman",
    "kardus-karton": "kardus-karton",
    "sisa-makanan": "sisa-makanan",
    "daun-ranting": "daun-ranting",
    "kresek-plastik": "kresek-plastik",
    "plastik-sachet": "plastik-sachet",
    "styrofoam": "styrofoam",
    "sampah-higiene": "sampah-higiene",
    "baterai-b3": "baterai-elektronik"
  },

  // Ambang keyakinan: di bawah ini → tampil "Belum Yakin" (jujur, bukan tebakan)
  minConfidence: 0.45,   // 45%
  // Status keyakinan
  thresholds: { yakin: 0.75, cukup: 0.55 }
};

if (typeof window !== "undefined") window.MODEL_CONFIG = MODEL_CONFIG;
if (typeof module !== "undefined") module.exports = MODEL_CONFIG;
