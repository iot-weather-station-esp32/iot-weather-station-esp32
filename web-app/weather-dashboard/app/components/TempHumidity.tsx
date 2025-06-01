import "./dashboard-components.css";

/* DHT11 ─ Temperatura y humedad */
export function TempHumidity() {
  return (
    <div className="dashboard-component lg:col-span-2">
      <div className="container-decoration" />
      <div className="container-distribution">
        <div className="p-10 pt-4">
          <h3>Temperatura / Humedad</h3>
          <p className="data">22.8 °C · 49 %</p>
          <p className="description">Sensor DHT11 · Interior</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  );
}