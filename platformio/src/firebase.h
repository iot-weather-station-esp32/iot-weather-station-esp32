#pragma once
#include <FirebaseESP32.h>
#include <addons/TokenHelper.h>

#define API_KEY ""
#define DATABASE_URL ""
#define USER_EMAIL ""
#define USER_PASSWORD ""

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void initFirebase() {
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectNetwork(true);
  fbdo.setBSSLBufferSize(4096, 1024);
}

void uploadData(float temp, float hum, int airQ) {

  //Enviar temperatura
  if (Firebase.setFloat(fbdo, "/meteo/temperature", temp)) {
    Serial.println("Temperatura enviada");
  } else {
    Serial.print("Error al enviar temperatura: ");
    Serial.println(fbdo.errorReason());
  }

  // Enviar humedad
  if (Firebase.setFloat(fbdo, "/meteo/humidity", hum)) {
    Serial.println("Humedad enviada");
  } else {
    Serial.print("Error al enviar humedad: ");
    Serial.println(fbdo.errorReason());
  }

  // Enviar calidad del aire
  if (Firebase.setInt(fbdo, "/meteo/air_quality", airQ)) {
    Serial.println("Calidad del aire enviada");
  } else {
    Serial.print("Error al enviar calidad del aire: ");
    Serial.println(fbdo.errorReason());
  }

}
