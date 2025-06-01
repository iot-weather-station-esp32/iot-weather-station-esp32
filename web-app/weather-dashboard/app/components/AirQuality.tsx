import "./dashboard-components.css";

/* MQ-135 ─ Calidad de aire / COV / CO2*/
export function AirQuality() {
  return (
    <div className="dashboard-component lg:col-span-2">
      <div className="container-decoration" />
      <div className="container-distribution">
        <div className="p-10 pt-4">
          <h3>Calidad de Aire</h3>
          <p className="data">450 ppm CO₂eq</p>
          <p className="description">COV estimado · Estado actual</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  );
}