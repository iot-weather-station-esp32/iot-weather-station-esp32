export function RadiationUV() {
    return (
        <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Radiación & UV</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Índice UV 5</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                Irradiancia W/m² · Salida/puesta de sol
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
        </div>
    )
}