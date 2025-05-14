import "./dashboard-components.css";

export function PressureForecast() {
    return (
        <div className="dashboard-component lg:col-span-3">
            <div className="container-decoration lg:rounded-tr-[2rem]" />
            <div className="container-distribution lg:rounded-tr-[calc(2rem+1px)]">
              <div className="p-10 pt-4">
                <h3>Presión & Pronóstico</h3>
                <p className="data">1013 hPa</p>
                <p className="description">
                  Tendencia ↑/↓ · Altitud compensada
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
        </div>
    )
}