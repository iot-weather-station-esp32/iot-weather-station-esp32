#pragma once
#include <DHT.h>
#include <MQ135.h>

#define DHTPIN 4
#define DHTTYPE DHT11
#define MQ135_PIN 34

DHT dht(DHTPIN, DHTTYPE);
MQ135 gasSensor(MQ135_PIN);

void initSensors() {
  dht.begin();
}

float readTemperature() {
  return dht.readTemperature();
}

float readHumidity() {
  return dht.readHumidity();
}

int readAirQuality() {
  return gasSensor.getPPM();
}
