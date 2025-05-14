export function TemperatureHumidity() {
    return (
        <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">

              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Temperatura & Humedad</h3>
                <p className="mt-2 text-2xl font-medium tracking-tight text-gray-950">24 °C · 46 %</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Mín./máx. del día · Punto de rocío
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
        </div>
    )
  }
  