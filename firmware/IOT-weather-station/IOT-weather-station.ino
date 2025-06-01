/**************************************************************************
 *  IOT-WEATHER-STATION
 *  ──────────────────────────────────────────────────────────────────────
 *  • MCU: ESP32 DevKit v1
 *  • Sensores:
 *      ├─ MQ-135          (calidad de aire – gases / COV / CO₂eq)
 *      ├─ HW-072 + LDR    (interruptor día/noche digital)
 *      ├─ DHT11           (temperatura y humedad)
 *      ├─ BH1750          (iluminancia en lux, bus I²C)
 *      ├─ BME680          (T/H/P + resistencia de gas, bus I²C)
 *      └─ BMP180          (temperatura y presión, bus I²C)
 *  • Backend: Firebase Realtime Database
 *  • Intervalo de muestreo: 5 s
 *
 *  Rutas en Firebase RTDB
 *  ├─ /estacion/mq135/registros/{pushID}
 *  ├─ /estacion/hw072/registros/{pushID}
 *  ├─ /estacion/dht11/registros/{pushID}
 *  ├─ /estacion/bh1750/registros/{pushID}
 *  ├─ /estacion/bme680/registros/{pushID}
 *  └─ /estacion/bmp180/registros/{pushID}
 **************************************************************************/

#include <WiFi.h>
#include <Wire.h>                   // Bus I²C

/* ─────────── Librerías de sensores ─────────── */
#include <MQ135.h>                  // MQ-135 (calidad de aire analógica)
#include <DHTesp.h>                 // DHT11 / DHT22
#include <BH1750.h>                 // Luxómetro I²C
#include <Adafruit_Sensor.h>        // Base para BME/BMP
#include <Adafruit_BME680.h>        // BME680
#include <Adafruit_BMP085.h>        // BMP180/BMP085

/* ─────────── Firebase ─────────── */
#include <FirebaseESP32.h>
#include "TOKENS-CREDENTIALS.h"     // ← AQUÍ defines WIFI_SSID, WIFI_PASSWORD, API_KEY, DATABASE_URL, USER_EMAIL, USER_PASSWORD
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

/* ─────────── Definición de pines y constantes ─────────── */
/* MQ-135 */
#define MQ135_PIN_ANALOG   34       // Entrada ADC1_6
#define MQ135_PIN_DIGITAL  15       // Salida digital D0 (LOW = alarma)
#define RL_MQ135        10000       // Ω de la resistencia de carga del módulo

/* HW-072 */
#define HW072_PIN_DIGITAL  17       // Salida digital (LOW = “oscuro”)

/* DHT11 */
#define DHT_PIN            27
DHTesp dht;                         // Objeto de la librería DHT

/* Objetos de sensores I²C */
BH1750          lightMeter;         // BH1750 – lux
Adafruit_BME680 bme;                // BME680 – Temp/Hum/Pres/Gas
Adafruit_BMP085 bmp180;             // BMP180 – Temp/Pres

/* Objetos Firebase */
FirebaseData   fbdo;
FirebaseAuth   auth;
FirebaseConfig config;

/* ─────────── Prototipos ─────────── */
void connectToWiFi();   // Conexión Wi-Fi
void syncTime();        // Sincronización NTP
void initFirebase();    // Inicio sesión Firebase
void initSensors();     // Inicio sensores I²C
void sendSensorData();  // Lectura + subida

/* ══════════════════════════════════════════════════════════════════════
 *  setup()
 *  Inicializa periféricos, red, tiempo, Firebase y sensores.
 * ══════════════════════════════════════════════════════════════════════ */
void setup() {
  Serial.begin(115200);
  delay(2000);                      // Esperar para abrir el monitor serie

  /* Configura pines */
  pinMode(MQ135_PIN_ANALOG,  INPUT);
  pinMode(MQ135_PIN_DIGITAL, INPUT_PULLUP);
  pinMode(HW072_PIN_DIGITAL, INPUT_PULLUP);

  dht.setup(DHT_PIN, DHTesp::DHT11);

  connectToWiFi();
  syncTime();
  initFirebase();
  initSensors();
}

/* ══════════════════════════════════════════════════════════════════════
 *  loop()
 *  Llamada a sendSensorData() cada 5 s.
 * ══════════════════════════════════════════════════════════════════════ */
void loop() {
  sendSensorData();
  delay(5000);   // intervalo de muestreo
}

/* ──────────────────────────────────────────────────────────────────────
 *  1 · Conexión Wi-Fi
 * ────────────────────────────────────────────────────────────────────── */
void connectToWiFi() {
  Serial.print("Conectando a WiFi…");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print('.');
  }
  Serial.println(" ¡conectado!");
}

/* ──────────────────────────────────────────────────────────────────────
 *  2 · Sincronización NTP
 * ────────────────────────────────────────────────────────────────────── */
void syncTime() {
  Serial.print("Sincronizando reloj");
  configTime(0, 0, "es.pool.ntp.org");      // UTC; ajusta zona en el backend
  while (time(nullptr) < 100000) {
    Serial.print('.');
    delay(500);
  }
  Serial.println(" ¡listo!");
}

/* ──────────────────────────────────────────────────────────────────────
 *  3 · Firebase
 * ────────────────────────────────────────────────────────────────────── */
void initFirebase() {
  Serial.println(">> initFirebase()");
  config.api_key      = API_KEY;
  config.database_url = DATABASE_URL;

  auth.user.email     = USER_EMAIL;
  auth.user.password  = USER_PASSWORD;

  config.token_status_callback  = tokenStatusCallback;
  config.timeout.serverResponse = 10 * 1000;            // 10 s

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Serial.println("<< Firebase inicializado");
}

/* ──────────────────────────────────────────────────────────────────────
 *  4 · Inicializa sensores I²C
 * ────────────────────────────────────────────────────────────────────── */
void initSensors() {
  Wire.begin();    // Pines por defecto en ESP32 (SDA 21, SCL 22)

  /* BH1750 – luxómetro */
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE))
    Serial.println("BH1750 listo.");
  else
    Serial.println("Error BH1750.");

  /* BME680 – T/H/P/Gas */
  if (bme.begin(0x76)) {
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
    bme.setPressureOversampling(BME680_OS_4X);
    bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
    bme.setGasHeater(320, 100);     // 320 °C durante 100 ms
    Serial.println("BME680 listo.");
  } else {
    Serial.println("Error BME680.");
  }

  /* BMP180 – Temp/Pres */
  if (bmp180.begin())
    Serial.println("BMP180 listo.");
  else
    Serial.println("Error BMP180.");
}

/* ──────────────────────────────────────────────────────────────────────
 *  5 · Lectura de sensores + subida a Firebase
 * ────────────────────────────────────────────────────────────────────── */
void sendSensorData() {
  /* Marca temporal (UTC) para todos los sensores */
  time_t ts = time(nullptr);

  /* ═════ MQ-135 ═════ */
  int   rawMQ   = analogRead(MQ135_PIN_ANALOG);            // 0-4095
  float voltsMQ = rawMQ * 3.3f / 4095.0f;                  // a voltios
  float rsMQ    = (voltsMQ > 0.05f)                        // evita div/0
                    ? ((3.3f - voltsMQ) / voltsMQ) * RL_MQ135
                    : -1.0f;
  bool  alarmMQ = digitalRead(MQ135_PIN_DIGITAL) == LOW;   // LOW = alarma

  /* ═════ HW-072 (LDR digital) ═════ */
  bool darkHW = digitalRead(HW072_PIN_DIGITAL) == LOW;     // LOW = “oscuro”

  /* ═════ DHT11 ═════ */
  TempAndHumidity th = dht.getTempAndHumidity();           // lectura blocking
  float tempDHT = th.temperature;                          // °C
  float humDHT  = th.humidity;                             // %

  /* ═════ BH1750 ═════ */
  float lux = lightMeter.readLightLevel();                 // lux

  /* ═════ BME680 ═════ */
  float tempBME = NAN, humBME = NAN, presBME = NAN, gasBME = NAN;
  if (bme.performReading()) {                              // true si OK
    tempBME = bme.temperature;                             // °C
    humBME  = bme.humidity;                                // %
    presBME = bme.pressure / 100.0f;                       // hPa
    gasBME  = bme.gas_resistance / 1000.0f;                // kΩ
  }

  /* ═════ BMP180 ═════ */
  float tempBMP = bmp180.readTemperature();                // °C
  float presBMP = bmp180.readPressure() / 100.0f;          // hPa

  /* ── Log por serie ── */
  Serial.printf(
    "\n== %ld ==\n"
    "MQ135  %.2f V | RS %.0f Ω | D0:%s\n"
    "HW072  LDR:%s\n"
    "DHT11  T:%.1f °C | H:%.1f %%\n"
    "BH1750 %.1f lux\n"
    "BME680 T:%.1f °C | H:%.1f %% | P:%.1f hPa | GAS:%.1f kΩ\n"
    "BMP180 T:%.1f °C | P:%.1f hPa\n",
    ts,
    voltsMQ, rsMQ, alarmMQ ? "ALTO" : "OK",
    darkHW ? "OSC" : "LUZ",
    tempDHT, humDHT,
    lux,
    tempBME, humBME, presBME, gasBME,
    tempBMP, presBMP
  );

  /* ── Subida a Firebase ── */
  FirebaseJson j;

  /* MQ-135 */
  j.clear();
  j.set("voltaje",   voltsMQ);
  j.set("rs_ohm",    rsMQ);
  j.set("alarm",     alarmMQ);
  j.set("timestamp", ts);
  Firebase.pushJSON(fbdo, "/estacion/mq135/registros", j);

  /* HW-072 */
  j.clear();
  j.set("oscuro",    darkHW);       // true = luz < umbral
  j.set("timestamp", ts);
  Firebase.pushJSON(fbdo, "/estacion/hw072/registros", j);

  /* DHT11 */
  j.clear();
  j.set("temp_c",    tempDHT);
  j.set("hum_pct",   humDHT);
  j.set("timestamp", ts);
  Firebase.pushJSON(fbdo, "/estacion/dht11/registros", j);

  /* BH1750 */
  j.clear();
  j.set("lux",       lux);
  j.set("timestamp", ts);
  Firebase.pushJSON(fbdo, "/estacion/bh1750/registros", j);

  /* BME680 – solo si la lectura es válida */
  if (!isnan(tempBME)) {
    j.clear();
    j.set("temp_c",    tempBME);
    j.set("hum_pct",   humBME);
    j.set("pres_hpa",  presBME);
    j.set("gas_kohm",  gasBME);
    j.set("timestamp", ts);
    Firebase.pushJSON(fbdo, "/estacion/bme680/registros", j);
  }

  /* BMP180 */
  j.clear();
  j.set("temp_c",    tempBMP);
  j.set("pres_hpa",  presBMP);
  j.set("timestamp", ts);
  Firebase.pushJSON(fbdo, "/estacion/bmp180/registros", j);
}