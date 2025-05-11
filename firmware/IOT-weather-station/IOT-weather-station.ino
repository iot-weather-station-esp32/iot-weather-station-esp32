#include <WiFi.h>
#include <FirebaseESP32.h>
#include <Adafruit_BMP085.h>
#include "TOKENS-CREDENTIALS.h"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
Adafruit_BMP085 bmp;

void setup() {
  Serial.begin(115200);
  delay(2000);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando a WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conectado!");
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  time_t now = time(nullptr);
  while (now < 100000) {
    delay(100);
    now = time(nullptr);
  }

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if (!bmp.begin()) {
    Serial.println("No se detectó BMP180");
    while (1);
  }
}

void loop() {
  float temp = bmp.readTemperature();
  int pressure = bmp.readPressure();
  time_t now = time(nullptr); // timestamp UNIX

  Serial.printf("Temp: %.2f C, Presion: %d Pa\n", temp, pressure);

  FirebaseJson json;
  json.set("temperatura", temp);
  json.set("presion", pressure);
  json.set("timestamp", now);

  String path = "/estacion/bmp180/registros";
  if (Firebase.pushJSON(fbdo, path, json)) {
    Serial.println("Datos subidos correctamente.");
  } else {
    Serial.println("Error al subir los datos:");
    Serial.println(fbdo.errorReason());
  }

  delay(5000);
}