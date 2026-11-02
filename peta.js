/**
 * Bali Eling Luu — Logika Peta Interaktif Fasilitas Lingkungan (Leaflet.js)
 */

(function () {
  "use strict";

  let mapInstance = null;
  let markersLayer = null;
  let userMarker = null;

  // Ikon SVG Kustom untuk Marker
  function buatIconKustom(warna) {
    return L.divIcon({
      className: "custom-map-pin",
      html: `
        <div style="background-color: ${warna}; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2.5px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
          <div style="transform: rotate(45deg); color: #ffffff; font-size: 15px; font-weight: bold;">
            📍
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -34]
    });
  }

  // Inisialisasi Peta Leaflet
  function initBaliEcoMap() {
    const mapElement = document.getElementById("baliEcoMap");
    if (!mapElement) return;

    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
    }

    // Koordinat pusat Bali (antara Denpasar & Gianyar)
    mapInstance = L.map("baliEcoMap", {
      center: [-8.6000, 115.2200],
      zoom: 11,
      scrollWheelZoom: false
    });

    // Tile OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Bali Eling Luu',
      maxZoom: 18
    }).addTo(mapInstance);

    markersLayer = L.layerGroup().addTo(mapInstance);

    // Render titik awal
    renderTitikPeta(FASILITAS_BALI);
    setupKontrolPeta();
  }

  // Render Marker Fasilitas ke Peta
  function renderTitikPeta(dataList) {
    if (!markersLayer) return;
    markersLayer.clearLayers();

    const listContainer = document.getElementById("petaListFasilitas");
    if (listContainer) listContainer.innerHTML = "";

    if (dataList.length === 0) {
      if (listContainer) {
        listContainer.innerHTML = `
          <div class="p-6 text-center text-muted bg-white rounded-2xl border border-line">
            <p class="text-sm font-bold">Tidak ada fasilitas yang cocok dengan filter.</p>
            <p class="text-xs mt-1">Coba pilih kabupaten lain atau reset filter.</p>
          </div>
        `;
      }
      return;
    }

    dataList.forEach(item => {
      const marker = L.marker([item.lat, item.lng], {
        icon: buatIconKustom(item.warna)
      });

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; min-width: 220px; max-width: 280px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
            <span style="background-color: ${item.warna}; color: #fff; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 999px; text-transform: uppercase;">
              ${item.kategoriLabel}
            </span>
            <span style="font-size: 11px; color: #17803d; font-weight: 700;">✓ Terverifikasi</span>
          </div>
          <h4 style="font-size: 14px; font-weight: 800; color: #14532d; margin: 0 0 4px 0; line-height: 1.25;">
            ${item.nama}
          </h4>
          <p style="font-size: 12px; color: #6b7a70; margin: 0 0 6px 0; line-height: 1.4;">
            ${item.alamat}
          </p>
          <div style="font-size: 11px; margin-bottom: 6px; padding: 6px 8px; background: #f5f2ea; border-radius: 8px;">
            <p style="margin: 0; font-weight: 700; color: #1e3a2a;">⏰ ${item.jamBuka}</p>
            <p style="margin: 2px 0 0 0; color: #4b5a51;"><strong>Terima:</strong> ${item.terima.join(", ")}</p>
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background: #17803d; color: #fff; text-decoration: none; font-size: 11.5px; font-weight: 700; padding: 6px 10px; border-radius: 8px; margin-top: 6px;">
            🗺️ Rute Google Maps →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersLayer.addLayer(marker);

      // Render juga di panel list sebelah peta
      if (listContainer) {
        const card = document.createElement("div");
        card.className = "p-4 rounded-2xl border border-line bg-white hover:border-primary transition cursor-pointer space-y-2 text-left group";
        card.innerHTML = `
          <div class="flex items-start justify-between gap-2">
            <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full text-white" style="background-color: ${item.warna}">
              ${item.kategoriLabel}
            </span>
            <span class="text-xs text-muted font-bold">${item.kabupaten}</span>
          </div>
          <h4 class="text-sm font-bold text-forest group-hover:text-primary transition">${item.nama}</h4>
          <p class="text-xs text-muted leading-relaxed">${item.alamat}</p>
          <div class="flex items-center justify-between pt-1 text-[11px] text-muted border-t border-line/60">
            <span>⏰ ${item.jamBuka.split(":")[0]}</span>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" target="_blank" rel="noopener" class="text-primary font-bold hover:underline">
              Petunjuk Arah →
            </a>
          </div>
        `;

        card.addEventListener("click", () => {
          mapInstance.setView([item.lat, item.lng], 15, { animate: true });
          marker.openPopup();
        });

        listContainer.appendChild(card);
      }
    });
  }

  // Setup Event Filter & Geolocation
  function setupKontrolPeta() {
    const filterKab = document.getElementById("filterPetaKab");
    const filterKat = document.getElementById("filterPetaKat");
    const btnLokasiSaya = document.getElementById("btnLokasiSaya");
    const inputCari = document.getElementById("inputCariPeta");

    function applyFilter() {
      const kab = filterKab ? filterKab.value : "semua";
      const kat = filterKat ? filterKat.value : "semua";
      const q = inputCari ? inputCari.value.toLowerCase().trim() : "";

      let hasil = filterFasilitasBali(kab, kat);
      if (q) {
        hasil = hasil.filter(f => 
          f.nama.toLowerCase().includes(q) || 
          f.alamat.toLowerCase().includes(q) ||
          f.terima.some(t => t.toLowerCase().includes(q))
        );
      }

      renderTitikPeta(hasil);
    }

    if (filterKab) filterKab.addEventListener("change", applyFilter);
    if (filterKat) filterKat.addEventListener("change", applyFilter);
    if (inputCari) inputCari.addEventListener("input", applyFilter);

    // Deteksi Lokasi Pengguna
    if (btnLokasiSaya) {
      btnLokasiSaya.addEventListener("click", () => {
        if (!navigator.geolocation) {
          alert("Browser kamu tidak mendukung deteksi lokasi.");
          return;
        }

        btnLokasiSaya.innerHTML = `<span>⏳ Mencari lokasimu...</span>`;

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;

            if (userMarker) mapInstance.removeLayer(userMarker);

            userMarker = L.circleMarker([userLat, userLng], {
              radius: 9,
              fillColor: "#2563EB",
              color: "#ffffff",
              weight: 3,
              opacity: 1,
              fillOpacity: 0.9
            }).addTo(mapInstance);

            userMarker.bindPopup("<b>📍 Lokasimu Saat Ini</b>").openPopup();
            mapInstance.setView([userLat, userLng], 14, { animate: true });
            btnLokasiSaya.innerHTML = `<span>📍 Lokasimu Ditemukan</span>`;
          },
          (err) => {
            alert("Gagal mendeteksi lokasi: " + (err.message || "Izin lokasi ditolak."));
            btnLokasiSaya.innerHTML = `<span>📍 Cari Lokasi Saya</span>`;
          }
        );
      });
    }
  }

  // Global trigger
  window.initBaliEcoMap = initBaliEcoMap;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.getElementById("baliEcoMap") && typeof L !== "undefined") {
        initBaliEcoMap();
      }
    });
  } else {
    if (document.getElementById("baliEcoMap") && typeof L !== "undefined") {
      initBaliEcoMap();
    }
  }

})();
