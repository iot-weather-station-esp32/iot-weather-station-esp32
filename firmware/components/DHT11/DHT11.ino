#include <DHT.h>

#define DHTPIN 4        // GPIO4 (pin D4 en tu placa)
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  delay(2000);          // tiempo mínimo para que el sensor se estabilice
}

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if (isnan(t) || isnan(h)) {
    Serial.println("Lectura fallida");
  } else {
    Serial.printf("Temp: %.1f °C  |  Humedad: %.0f %%\n", t, h);
  }
  delay(2500);          // DHT11 ≥ 1 s entre lecturas; pongo 2,5 s por seguridad
}
