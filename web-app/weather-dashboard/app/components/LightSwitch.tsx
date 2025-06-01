import "./dashboard-components.css";

/* HW-072 + LDR ─ Día / noche */
export function LightSwitch() {
  return (
    <div className="dashboard-component">
      <div className="container-decoration" />
      <div className="container-distribution">
        <div className="p-10 pt-4">
          <h3>Luminosidad (LDR)</h3>
          <p className="data">Noche</p>
          <p className="description">Comparador digital · Umbral</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  );
}