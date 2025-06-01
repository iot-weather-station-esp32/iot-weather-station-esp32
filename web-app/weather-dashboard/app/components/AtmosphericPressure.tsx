import "./dashboard-components.css";

/* BMP180 ─ Presión atmosférica */
export function AtmosphericPressure() {
  return (
    <div className="dashboard-component">
      <div className="container-decoration" />
      <div className="container-distribution">
        <div className="p-10 pt-4">
          <h3>Presión Atmosférica</h3>
          <p className="data">1013 hPa</p>
          <p className="description">BMP180 · Temperatura 22.0 °C</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  );
}