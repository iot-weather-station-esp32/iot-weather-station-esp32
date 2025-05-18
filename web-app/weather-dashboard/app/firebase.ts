import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDY4zckroayYrF5BYfxIGPrWfeltaL_mVE",
  authDomain: "iot-weather-station-esp32.firebaseapp.com",
  databaseURL: "https://iot-weather-station-esp32-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "iot-weather-station-esp32",
  storageBucket: "iot-weather-station-esp32.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx",
  appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxx",
};

export const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const db = getDatabase(app);