import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "",
  authDomain: "iot-weather-station-esp32.firebaseapp.com",
  databaseURL: "https://iot-weather-station-esp32-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iot-weather-station-esp32",
  storageBucket: "iot-weather-station-esp32.appspot.com",
  messagingSenderId: "",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);