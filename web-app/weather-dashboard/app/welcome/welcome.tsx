import { Precipitation } from "~/components/Precipitation"
import { PressureForecast } from "~/components/PressureForecast"
import { RadiationUV } from "~/components/RadiationUV"
import { TemperatureHumidity } from "~/components/TemperatureHumidity"
import { Wind } from "~/components/Wind"

export function Welcome() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-600">Estación Meteorológica</h2>
        <div className="mt-2 flex flex-row justify-between">
          <p className="max-w-lg text-2xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-3xl">
            Tres Cantos, Madrid, Spain
          </p>
          <p className="max-w-lg text-2xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-3xl">
            24º
          </p>
        </div>
        
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <TemperatureHumidity />
          <PressureForecast />
          <Wind />
          <Precipitation />
          <RadiationUV />
        </div>
      </div>
    </div>
  )
}
