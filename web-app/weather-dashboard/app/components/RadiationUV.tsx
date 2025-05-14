import "./dashboard-components.css";

export function RadiationUV() {
    return (
        <div className="dashboard-component lg:col-span-2">
            <div className="container-decoration max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="container-distribution max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <div className="p-10 pt-4">
                <h3>Radiación & UV</h3>
                <p className="data">Índice UV 5</p>
                <p className="description">
                Irradiancia W/m² · Salida/puesta de sol
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
        </div>
    )
}