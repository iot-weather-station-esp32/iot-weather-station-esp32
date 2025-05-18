// mq135.tsx
// Hook + dashboard card for MQ‑135 readings from Firebase Realtime DB
// Place this file inside src/components (or the folder you prefer)
// and add <MQAirQuality /> to your dashboard grid.

import { useEffect, useState } from "react";
import { getDatabase, ref, query, limitToLast, onValue } from "firebase/database";
import { app } from "~/firebase"; // your existing firebase.ts exports the initialised app
import "./dashboard-components.css";

type MQ135Datum = {
  timestamp: number;
  voltaje: number;
  rs_ohm: number;
  alarm: boolean;
};

/**
 * Realtime hook – stays subscribed to the last value under
 *   /estacion/mq135/registros  (limitToLast(1)).
 */
export function useMQ135(): MQ135Datum | null {
  const [data, setData] = useState<MQ135Datum | null>(null);

  useEffect(() => {
    const db = getDatabase(app);
    const q = query(ref(db, "/estacion/mq135/registros"), limitToLast(1));

    const off = onValue(q, (snap) => {
      let latest: MQ135Datum | null = null;
      snap.forEach((child) => {
        latest = child.val() as MQ135Datum;
      });
      setData(latest);
    });
    // unsubscribe on unmount
    return () => off();
  }, []);

  return data;
}

/**
 * Dashboard card component showing live MQ‑135 readings.
 */
export function MQAirQuality() {
  const d = useMQ135();

  const volt = d ? d.voltaje.toFixed(2) : "--";
  const rs = d && d.rs_ohm > 0 ? d.rs_ohm.toFixed(0) : "--";
  const status = d ? (d.alarm ? "ALTO" : "OK") : "--";
  const time = d ? new Date(d.timestamp * 1000).toLocaleTimeString() : "--";

  return (
    <div className="dashboard-component lg:col-span-2">
      <div className="container-decoration" />
      <div className="container-distribution">
        <div className="p-10 pt-4">
          <h3>Calidad de Aire (MQ‑135)</h3>
          <p className="data">
            {volt} V · RS {rs} Ω
          </p>
          <p className="description">Estado: {status} · {time}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  );
}
