function hitungDaya() {
  const q = parseFloat(document.getElementById('debit').value);
  const h = parseFloat(document.getElementById('tinggi').value);
  const etaT = parseFloat(document.getElementById('turbin').value);
  const etaG = parseFloat(document.getElementById('generator').value);
  const output = document.getElementById('hasil');

  if (
    isNaN(q) || isNaN(h) || isNaN(etaT) || isNaN(etaG) ||
    q <= 0 || h <= 0 || etaT <= 0 || etaT > 1 || etaG <= 0 || etaG > 1
  ) {
    output.innerHTML = `
      <div class="error">
        ⚠️ <strong>Input tidak valid.</strong><br/>
        Pastikan semua nilai:
        <ul style="text-align:left; margin-top:6px">
          <li>Sudah diisi semua</li>
          <li>Lebih dari 0 (positif)</li>
          <li>Efisiensi antara 0 dan 1 (contoh: 0.85)</li>
        </ul>
      </div>
    `;
    return;
  }

  const rho = 1000;
  const g = 9.8;

  const daya_kW = (rho * g * q * h * etaT * etaG) / 1000;
  const daya_MW = daya_kW / 1000;
  const rumah = Math.floor(daya_kW / 2);
  const energiPerHari = daya_kW * 24;
  const energiPerTahun = energiPerHari * 365;

  output.innerHTML = `
    <div class="success" style="text-align:left; margin-top:10px;">
      <h3>💡 Hasil Simulasi</h3>
      <ul>
        <li><strong>Daya Listrik:</strong> ${daya_kW.toFixed(2)} kW (${daya_MW.toFixed(3)} MW)</li>
        <li><strong>Estimasi Rumah Terlayani:</strong> ${rumah} rumah</li>
        <li><strong>Energi Harian:</strong> ${energiPerHari.toLocaleString()} kWh</li>
        <li><strong>Energi Tahunan:</strong> ${energiPerTahun.toLocaleString()} kWh</li>
      </ul>
    </div>
  `;
}
