import "./dashboard-components.css";

/* BME680 ─ Condiciones ambientales + gas */
export function Environment() {
  return (
    <div className="dashboard-component lg:col-span-2">
      <div className="container-decoration" />
      <div className="container-distribution">
        <div className="p-10 pt-4">
          <h3>Condiciones Ambientales</h3>
          <p className="data">21.9 °C · 52 % · 1011 hPa</p>
          <p className="description">BME680 · Resistencia gas: 12 kΩ</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  );
}