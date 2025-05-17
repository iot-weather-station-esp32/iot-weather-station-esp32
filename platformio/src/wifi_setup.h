#pragma once
#include <Arduino.h>
#include "WiFi.h"

#define WIFI_SSID "TPL-2Gatima"
#define WIFI_PASSWORD "62GadSG9"

void connectWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
}
