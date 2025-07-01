import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type SensorReading = {
  temperature: number;
  humidity: number;
  sound?: number;
  battery?: number;
  readable_time: string;
};

type Props = {
  data: SensorReading[];
  type: "temperature" | "humidity" | "sound" | "battery";
};

export default function SensorChart({ data, type }: Props) {
  const colorMap: Record<Props["type"], string> = {
    temperature: "#1d4ed8",
    humidity: "#10b981",
    sound: "#f59e0b",
    battery: "#6b7280",
  };

  const labelMap: Record<Props["type"], string> = {
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    sound: "Sound (dB)",
    battery: "Battery (V)",
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="readable_time" tick={{ fontSize: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={type}
          stroke={colorMap[type]}
          name={labelMap[type]}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
