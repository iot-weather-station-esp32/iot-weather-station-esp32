#include <MQ135.h>        // Biblioteca de Olivier Loader (en Library Manager)
#include <Wire.h>

const int PIN_MQ135   = 34;   // A0 (tras el divisor)
const int PIN_DIGITAL = 15;   // D0, opcional

MQ135 mq135_sensor(PIN_MQ135);

void setup() {
  Serial.begin(115200);
  pinMode(PIN_DIGITAL, INPUT_PULLUP);
  delay(2000);                // deja que el sensor caliente un poco
}

void loop() {
  /* 1. Leer resistencia del sensor */
  float rssi = mq135_sensor.getResistance();   // en ohmios

  /* 2. Calibrar en aire “limpio” (400 ppm CO₂ aprox.) la primera vez ---------
     Coloca el sensor en exterior, espera 5 min y usa este valor como RZERO.
     Luego DEJA FIJO RZERO en tu código.  */
  static float RZERO = mq135_sensor.getRZero();   // solo para descubrirlo
  // Sustituye la línea anterior por “const float RZERO = 76.63;” (ejemplo)

  /* 3. Medir CO₂ equivalente */
  float ppm = mq135_sensor.getPPM();           // usa el RZERO interno

  /* 4. Leer la salida digital (umbral) */
  bool alarm = digitalRead(PIN_DIGITAL) == LOW;

  Serial.printf("RS: %.0f Ω  |  CO₂_eq: %.0f ppm  |  D0: %s\n",
                rssi, ppm, alarm ? "ALTO" : "OK");

  delay(2000);
}