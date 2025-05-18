/******************************************************************************
 *  IOT-WEATHER-STATION · MQ-135 + ESP32 + Firebase RTDB
 *  ----------------------------------------------------------------------
 *  ▸ Sensor:  MQ-135  (calidad de aire – gases / COV / CO₂eq)
 *  ▸ Cableado:
 *        Módulo MQ-135 ──────────────────── ESP32 Dev Kit
 *          VCC  ──────────────►  VIN   (5 V USB)
 *          GND  ──────────────►  GND
 *          A0   ── 100 k ─┬───►  GPIO34  (ADC1_6)   ← divisor 2:1
 *                         │
 *                      100 k
 *                         │
 *                        GND
 *          D0   ──────────►  GPIO15  (opcional, lectura digital)
 *
 *  ▸ Lecturas:  voltaje y RS estimada cada 5 s
 *  ▸ Firebase:  /estacion/mq135/registros/{pushID}
 *****************************************************************************/

 #include <WiFi.h>
 #include <MQ135.h>  
 #include <FirebaseESP32.h>
 #include "TOKENS-CREDENTIALS.h"
 #include <addons/TokenHelper.h>
 #include <addons/RTDBHelper.h>
 
 /* ---------- Ajustes MQ-135 ---------- */
 #define MQ135_PIN_ANALOG   34    // GPIO34 (ADC1_6)
 #define MQ135_PIN_DIGITAL  15    // opcional – D0
 #define RL_MQ135          10000  // Ω de la resistencia de carga en tu módulo
 
 /* ---------- Firebase ---------- */
 FirebaseData   fbdo;
 FirebaseAuth   auth;
 FirebaseConfig config;
 
 /* ---------- Prototipos ---------- */
 void connectToWiFi();
 void syncTime();
 void initFirebase();
 void sendSensorData();
 
 /* ---------- setup() ---------- */
 void setup() {
   Serial.begin(115200);
   delay(2000);
 
   pinMode(MQ135_PIN_ANALOG,  INPUT);
   pinMode(MQ135_PIN_DIGITAL, INPUT_PULLUP);
 
   connectToWiFi();
   syncTime();
   initFirebase();
 }
 
 /* ---------- loop() ---------- */
 void loop() {
   sendSensorData();
   delay(5000);
 }
 
 /* ---------- 1 · Wi-Fi ---------- */
 void connectToWiFi() {
   Serial.print("Conectando a WiFi…");
   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
   while (WiFi.status() != WL_CONNECTED) {
     delay(500); Serial.print('.');
   }
   Serial.println(" ¡conectado!");
 }
 
 /* ---------- 2 · NTP ---------- */
 void syncTime() {
   Serial.print("Sincronizando reloj");
   configTime(0, 0, "es.pool.ntp.org");
   while (time(nullptr) < 100000) { Serial.print('.'); delay(500); }
   Serial.println(" ¡listo!");
 }
 
 /* ---------- 3 · Firebase ---------- */
 void initFirebase() {
   Serial.println(">> Entrando en initFirebase()");
   config.api_key      = API_KEY;
   config.database_url = DATABASE_URL;
   auth.user.email     = USER_EMAIL;
   auth.user.password  = USER_PASSWORD;
   config.token_status_callback = tokenStatusCallback;
   config.timeout.serverResponse = 10 * 1000;
   Firebase.begin(&config, &auth);
   Firebase.reconnectWiFi(true);
   Serial.println("<< Firebase inicializado");
 }
 
 /* ---------- 4 · Lectura + subida ---------- */
 void sendSensorData() {
   /* --- MQ-135 analógico --- */
   int   raw    = analogRead(MQ135_PIN_ANALOG);      // 0-4095
   float volts  = raw * 3.3 / 4095.0;                // a voltios
   float rs     = (volts > 0.05) ? ((3.3 - volts) / volts) * RL_MQ135 : -1.0;
 
   /* --- MQ-135 digital (umbral) --- */
   bool  alarm  = digitalRead(MQ135_PIN_DIGITAL) == LOW;
 
   /* --- Marca de tiempo --- */
   time_t ts = time(nullptr);
 
   /* --- Consola --- */
   Serial.printf("MQ-135 → %.2f V | RS≈ %.0f Ω | D0: %s\n",
                 volts, rs, alarm ? "ALTO" : "OK");
 
   /* --- Firebase --- */
   FirebaseJson json;
   json.set("voltaje", volts);
   json.set("rs_ohm",  rs);
   json.set("alarm",   alarm);
   json.set("timestamp", ts);
 
   const String path = "/estacion/mq135/registros";
   if (Firebase.pushJSON(fbdo, path, json)) {
     Serial.println("Datos subidos correctamente.");
   } else {
     Serial.print("Error al subir los datos: ");
     Serial.println(fbdo.errorReason());
   }
 }
 