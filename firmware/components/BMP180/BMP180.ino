#include <Wire.h>
#include <Adafruit_BMP085.h>

Adafruit_BMP085 bmp;

void setup() {
  Serial.begin(115200);
  if (!bmp.begin()) {
    Serial.println("¡No se detecta BMP180!");
    while (1);
  }
}

void loop() {
  Serial.print("Temp: "); Serial.print(bmp.readTemperature()); Serial.println(" °C");
  Serial.print("Pres: "); Serial.print(bmp.readPressure() / 100.0); Serial.println(" hPa");
  Serial.println();
  delay(2000);
}