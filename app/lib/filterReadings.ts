import { SensorData } from "@/app/type/sensor";

export function filterByTime(
  data: SensorData[],
  minutesAgo: number,
): SensorData[] {
  const now = Date.now();
  const cutoff = now - minutesAgo * 60 * 1000;
  return data.filter((d) => d.timestamp * 1000 >= cutoff);
}
