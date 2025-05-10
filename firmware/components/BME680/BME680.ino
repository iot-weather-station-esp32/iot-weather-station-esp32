#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME680.h>

Adafruit_BME680 bme;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // SDA, SCL
  if (!bme.begin()) {
    Serial.println("¡No se detecta BME680!");
    while (1);
  }
  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_2X);
  bme.setPressureOversampling(BME680_OS_4X);
  bme.setGasHeater(320, 150); // temperatura y duración del calentador
}

void loop() {
  if (!bme.performReading()) {
    Serial.println("Lectura fallida :(");
    return;
  }

  Serial.print("Temp: "); Serial.print(bme.temperature); Serial.println(" °C");
  Serial.print("Hum: "); Serial.print(bme.humidity); Serial.println(" %");
  Serial.print("Pres: "); Serial.print(bme.pressure / 100.0); Serial.println(" hPa");
  Serial.print("Gas: "); Serial.print(bme.gas_resistance / 1000.0); Serial.println(" KOhms");
  Serial.println();

  delay(2000);
}