import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weather Dashboard" },
    { name: "description", content: "IOT Weather Station - ESP32" },
  ];
}

export default function Home() {
  return <Welcome />;
}
