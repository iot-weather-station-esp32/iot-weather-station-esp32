export function PressureForecast() {
    return (
        <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Presión & Pronóstico</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">1013 hPa</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Tendencia ↑/↓ · Altitud compensada
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
        </div>
    )
}