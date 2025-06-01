import "./dashboard-components.css";

/* BH1750 ─ Iluminancia en lux */
export function AmbientLux() {
  return (
    <div className="dashboard-component">
      <div className="container-decoration" />
      <div className="container-distribution">
        <div className="p-10 pt-4">
          <h3>Iluminancia</h3>
          <p className="data">387 lux</p>
          <p className="description">BH1750 · Lectura continua</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  );
}