import "./dashboard-components.css";

export function TemperatureHumidity() {
    return (
        <div className="dashboard-component lg:col-span-3">
            <div className="container-decoration max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="container-distribution max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <div className="p-10 pt-4">
                <h3>Temperatura & Humedad</h3>
                <p className="data">24 °C · 46 %</p>
                <p className="description">
                  Mín./máx. del día · Punto de rocío
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
        </div>
    )
  }
  