import { Sun, Cloud, CloudSun, CloudRain, CloudLightning, CloudSnow, CloudFog } from "lucide-react";

export function WeatherIcon({ condition, className }) {
  let Icon = Sun;
  
  if (!condition) {
    Icon = Sun;
  } else {
    const main = condition.toLowerCase();
    if (main.includes("clear")) Icon = Sun;
    else if (main.includes("clouds")) Icon = Cloud;
    else if (main.includes("partly")) Icon = CloudSun; // fallback
    else if (main.includes("rain") || main.includes("drizzle")) Icon = CloudRain;
    else if (main.includes("thunderstorm")) Icon = CloudLightning;
    else if (main.includes("snow")) Icon = CloudSnow;
    else Icon = CloudFog; // Mist, Smoke, Haze, Dust, Fog, etc.
  }

  return <Icon className={className} strokeWidth={1.25} />;
}
