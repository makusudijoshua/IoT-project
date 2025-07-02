"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/card";
import SoundCard from "@/app/components/SoundCard";
import { TbTemperatureSun } from "react-icons/tb";
import { IoWaterOutline } from "react-icons/io5";

type SensorReading = {
  temperature: number;
  humidity: number;
  sound?: number;
  amplitude?: number;
  timestamp: number;
};

const Hero = () => {
  const [current, setCurrent] = useState<SensorReading | null>(null);
  const [previous, setPrevious] = useState<SensorReading | null>(null);

  const fetchSensorData = async () => {
    try {
      const res = await fetch("/api/sensor-data");
      const rawData = await res.json();

      const entries: SensorReading[] = Object.values(rawData);
      entries.sort((a, b) => b.timestamp - a.timestamp);

      setCurrent(entries[0] || null);
      setPrevious(entries[1] || null);
    } catch (err) {
      console.error("Failed to fetch sensor data:", err);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!current) return <p className="py-8">Loading cards...</p>;

  return (
    <div className="flex md:flex-row gap-8">
      <Card
        title="Temperature"
        currentReading={
          current.temperature !== undefined ? `${current.temperature}°C` : "—"
        }
        latestReading={`${previous?.temperature ?? "—"}°C`}
        icon={<TbTemperatureSun />}
      />
      <Card
        title="Humidity"
        currentReading={
          current.humidity !== undefined ? `${current.humidity} %` : "—"
        }
        latestReading={`${previous?.humidity ?? "—"} %`}
        icon={<IoWaterOutline />}
      />
      <SoundCard />
    </div>
  );
};

export default Hero;
