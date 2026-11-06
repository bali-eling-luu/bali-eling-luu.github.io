/**
 * model/integrasi_ke_scanner.js
 * -----------------------------------------------------------------
 * PANDUAN INTEGRASI — Ganti loader MobileNet ImageNet →
 * Model khusus Teachable Machine (TF.js) di ai_scanner.js
 * File ini BUKAN dimuat halaman, ini template untuk disalin ke ai_scanner.js
 * setelah model terlatih. Baca TRAINING_GUIDE.md dulu.
 * -----------------------------------------------------------------
 *
 * 1) Tambah config di <head> / sebelum ai_scanner.js:
 *    <script src="model/model_config.js"></script>
 *
 * 2) Ganti fungsi loadTensorFlowModel() di ai_scanner.js menjadi:
 *
 *    let tmModel = null;
 *    let tmLabelCount = 0;
 *    let isModelLoading = false;
 *
 *    async function loadCustomModel(onProgress) {
 *      if (tmModel) return tmModel;
 *      if (isModelLoading) {
 *        while (isModelLoading) await new Promise(r => setTimeout(r, 100));
 *        return tmModel;
 *      }
 *      isModelLoading = true;
 *      if (onProgress) onProgress("Memuat model sampah khusus…");
 *      try {
 *        // Muat TF.js jika belum ada
 *        if (!window.tf) {
 *          await injectScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js");
 *        }
 *        const cfg = window.MODEL_CONFIG || {};
 *        const url = cfg.modelJsonUrl || "model/model.json";
 *        const model = await window.tf.loadLayersModel(url);
 *        const classNames = Object.keys(cfg.labelToId || {});
 *        tmLabelCount = classNames.length;
 *        if (onProgress) onProgress("Model sampah khusus siap ✔");
 *        return { model, classNames };
 *      } catch (e) {
 *        console.warn("Model khusus gagal, fallback ke MobileNet umum:", e);
 *        return null;
 *      } finally { isModelLoading = false; }
 *    }
 *
 * 3) Ganti classify di runAIImageAnalysis():
 *
 *    // Contoh potongan — sesuaikan dengan variabel di ai_scanner.js
 *    const packed = await loadCustomModel(...);
 *    let predictions = [];
 *    if (packed && packed.model) {
 *      // Teachable Machine: resize 224x224, normalisasi [-1,1]
 *      const tensor = window.tf.browser.fromPixels(imgElement)
 *        .resizeBilinear([224, 224]).toFloat().div(255).sub(0.5).div(0.5);
 *      const probs = packed.model.predict(tensor.expandDims(0));
 *      const arr = await probs.data();
 *      tensor.dispose(); probs.dispose();
 *      predictions = Array.from(arr).map((probability, i) => ({
 *        className: packed.classNames[i],
 *        probability
 *      })).sort((a, b) => b.probability - a.probability);
 *    }
 *
 * 4) Ganti mapPredictionsToBaliWaste():
 *    - TIDAK perlu keyword match lagi. Pakai labelToId langsung:
 *
 *    function mapCustomPredictions(predictions) {
 *      const cfg = window.MODEL_CONFIG || {};
 *      const top = predictions[0];
 *      const id = cfg.labelToId[top.className] || cfg.labelToId[String(top.className)];
 *      const item = KNOWLEDGE_BASE_BALI.find(k => k.id === id);
 *      if (!item || top.probability < (cfg.minConfidence || 0.45)) {
 *         return { item: buildBelumYakinItem(top.className), ... };
 *      }
 *      return { item, confidence: Math.round(top.probability * 100), ... };
 *    }
 *
 * 5) Pertahankan fallback MobileNet lama bila model khusus gagal dimuat,
 *    supaya scanner tidak mati total saat koneksi / path bermasalah.
 *
 * 6) Verifikasi:
 *    - Buka DevTools > Network: model.json & weights.bin harus 200
 *    - Console: "Model sampah khusus siap ✔"
 *    - Uji 20 foto nyata → catat akurasi, target ≥85%
 */
