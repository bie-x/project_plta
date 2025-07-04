function hitung() {
  const q = parseFloat(document.getElementById('q').value);
  const h = parseFloat(document.getElementById('h').value);
  const etaT = parseFloat(document.getElementById('etaT').value);
  const etaG = parseFloat(document.getElementById('etaG').value);
  const output = document.getElementById('output');

  if (
    isNaN(q) || isNaN(h) || isNaN(etaT) || isNaN(etaG) ||
    q <= 0 || h <= 0 || etaT <= 0 || etaT > 1 || etaG <= 0 || etaG > 1
  ) {
    output.innerHTML = `
      <div class="error">
        Input tidak valid. Pastikan semua nilai:<br/>
        <ul style="text-align:left;margin-top:6px">
          <li>Terisi semua</li>
          <li>Lebih dari 0</li>
          <li>Efisiensi antara 0–1 (misal: 0.85)</li>
        </ul>
      </div>
    `;
    return;
  }

  const rho = 1000; // kg/m³
  const g = 9.8;    // m/s²
  const daya = (rho * g * q * h * etaT * etaG) / 1000; // kW
  const rumah = Math.floor(daya / 2);

  output.innerHTML = `
    <div class="success">
      Daya yang dihasilkan: <strong>${daya.toFixed(2)} kW</strong><br>
      Dapat menyuplai sekitar <strong>${rumah}</strong> rumah
    </div>
  `;
}