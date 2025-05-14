import "./dashboard-components.css";

export function Precipitation() {
    return (
        <div className="dashboard-component lg:col-span-2">
            <div className="container-decoration" />
            <div className="container-distribution">
              <div className="p-10 pt-4">
                <h3>Precipitación</h3>
                <p className="data">2.6 mm hoy</p>
                <p className="description">Acumulado mes · Intensidad actual</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
        </div>
    )
}