#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter;

void setup(){
  Serial.begin(115200);
  Wire.begin(21, 22);
  lightMeter.begin();
}

void loop() {
  float lux = lightMeter.readLightLevel();
  Serial.print("Luz: "); Serial.print(lux); Serial.println(" lx");
  delay(1000);
}