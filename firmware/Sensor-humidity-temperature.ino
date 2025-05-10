#include <DHT.h>

#define dhtSensorPin 15
#define dhtSensorType DHT11

DHT dhtSensor(dhtSensorPin, dhtSensorType);

void setup() {
  Serial.begin(9600);
  dhtSensor.begin();
}

void loop() {
  float humedad = dhtSensor.readHumidity();
  float tempC = dhtSensor.readTemperature();
  float tempF = dhtSensor.readTemperature(true);

  if (isnan(humedad) || isnan(tempC) || isnan(tempF)) {
    Serial.println("Error al leer datos del sensor DHT11");

  } else {
    Serial.print("Humidity: ");
    Serial.print(humedad);
    Serial.print(" %");
    Serial.println();

    Serial.print("Temperature: ");
    Serial.print(tempC);
    Serial.print(" Cº");
    Serial.println();

    Serial.print("Temperature: ");
    Serial.print(tempF);
    Serial.print(" ºF");
    Serial.println();
    Serial.println();
  }
  delay(5000);
}