import "./dashboard-components.css";

export function Wind() {
    return (
        <div className="dashboard-component lg:col-span-2">
            <div className="container-decoration lg:rounded-bl-[2rem]" />
            <div className="container-distribution lg:rounded-bl-[calc(2rem+1px)]">
              <div className="p-10 pt-4">
                <h3>Viento</h3>
                <p className="data">12 km/h NE</p>
                <p className="description">
                Ráfaga máx. · Dirección dominante
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
        </div>
    )
}