"use client";

import React, { useEffect, useState } from "react";
import TimeFilterBar from "@/app/components/TimeFilterBar";
import ViewToggle from "@/app/components/ViewToggle";
import ChartTypeSelector from "@/app/components/ChartTypeSelector";
import SensorChart from "@/app/components/SensorChart";

type SensorReading = {
  temperature: number;
  humidity: number;
  sound?: number;
  battery?: number;
  timestamp: number;
  readable_time: string;
};

const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState(5); // in minutes
  const [view, setView] = useState<"chart" | "table">("table");
  const [chartType, setChartType] = useState<
    "temperature" | "humidity" | "sound" | "battery"
  >("temperature");

  const [allReadings, setAllReadings] = useState<SensorReading[]>([]);
  const [filteredReadings, setFilteredReadings] = useState<SensorReading[]>([]);

  const MAX_ROWS = 500;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/sensor-data");
      const raw = await res.json();
      const entries: SensorReading[] = Object.values(raw);
      entries.sort((a, b) => b.timestamp - a.timestamp);
      setAllReadings(entries);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const now = Date.now();
    const cutoff = now - selectedRange * 60 * 1000;

    const filtered = allReadings.filter(
      (entry) => entry.timestamp * 1000 >= cutoff,
    );
    setFilteredReadings(filtered);
  }, [selectedRange, allReadings]);

  useEffect(() => {
    setView(selectedRange <= 15 ? "table" : "chart");
  }, [selectedRange]);

  const limitedReadings = filteredReadings.slice(0, MAX_ROWS);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to your dashboard. Here you can monitor your system&#39;s
        performance through time.
      </p>

      <TimeFilterBar selected={selectedRange} onChange={setSelectedRange} />
      <ViewToggle selectedView={view} onChange={setView} />

      {view === "chart" ? (
        <>
          <ChartTypeSelector
            chartType={chartType}
            setChartType={setChartType}
          />
          <SensorChart data={limitedReadings} type={chartType} />
        </>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Time</th>
                <th className="p-2">Temperature (°C)</th>
                <th className="p-2">Humidity (%)</th>
                <th className="p-2">Sound (dB)</th>
                <th className="p-2">Battery (V)</th>
              </tr>
            </thead>
            <tbody>
              {limitedReadings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No data available for this range.
                  </td>
                </tr>
              ) : (
                limitedReadings.map((entry, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{entry.readable_time}</td>
                    <td className="p-2">{entry.temperature}</td>
                    <td className="p-2">{entry.humidity}</td>
                    <td className="p-2">{entry.sound ?? "—"}</td>
                    <td className="p-2">{entry.battery ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
