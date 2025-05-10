#define MQ_ANALOG 34  // Pin AOUT conectado a GPIO34

void setup() {
  Serial.begin(115200);
}

void loop() {
  int gasValue = analogRead(MQ_ANALOG);
  Serial.print("Valor de gas (ADC): ");
  Serial.println(gasValue);
  delay(1000);
}