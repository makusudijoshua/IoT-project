// SoundCard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";

interface SoundData {
  sound: number; // dB
  amplitude: number; // 0–4095
  timestamp: number;
}

const SoundCard = () => {
  const [data, setData] = useState<SoundData | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/sensor-data");
      const rawData = await res.json();
      const entries: SoundData[] = Object.values(rawData);
      entries.sort((a, b) => b.timestamp - a.timestamp);
      setData(entries[0] || null);
    } catch (err) {
      console.error("Failed to fetch sound data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p className="py-4">Loading sound data...</p>;

  const { sound, amplitude } = data;
  const percentage = Math.floor((amplitude / 4095) * 100);
  const filledBars = Math.floor((amplitude / 4095) * 30);
  const barString = Array.from({ length: 30 })
    .map((_, i) => (i < filledBars ? "#" : " "))
    .join("");

  return (
    <div className="p-6 rounded-xl shadow-md bg-white w-full max-w-md space-y-4">
      <div className="flex items-center gap-3">
        <div>
          <Volume2 className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Sound Level</h2>
      </div>

      <div className="text-sm text-gray-700">
        <span className="font-medium">Amplitude (avg):</span> {amplitude}{" "}
        <span className="mx-2">|</span>
        <span className="font-medium">Sound Level:</span> {sound} dB
      </div>

      <div className="font-mono text-sm bg-gray-100 rounded px-3 py-2 text-gray-700 tracking-tight shadow-inner">
        [{barString}] {percentage}%
      </div>
    </div>
  );
};

export default SoundCard;
