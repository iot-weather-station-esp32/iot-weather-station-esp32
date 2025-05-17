
#include <Arduino.h>
#include "sensors.h"
#include "firebase.h"
#include "wifi_setup.h"

unsigned long dataMillis = 0;

void setup() {
  Serial.begin(115200);
  initSensors();
  connectWiFi();
  initFirebase();
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int airQuality = gasSensor.getPPM();
  
  Serial.printf("🌡️ Temp: %.1f °C | 💧 Humedad: %.1f %% | 🫁 Aire: %d ppm\n", temperature, humidity, airQuality);

  //Enviar datos a Firebase
  if (millis() - dataMillis > 5000) {
    dataMillis = millis();
    uploadData(temperature, humidity, airQuality);
  }
  delay(5000);
}
