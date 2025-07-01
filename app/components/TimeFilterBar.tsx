"use client";

import React from "react";

type Props = {
  selected: number; // in minutes
  onChange: (minutes: number) => void;
};

const TimeFilterBar = ({ selected, onChange }: Props) => {
  const options = [
    { label: "5 min", value: 5 },
    { label: "15 min", value: 15 },
    { label: "1h", value: 60 },
    { label: "1 day", value: 1440 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Showing readings from the last{" "}
          {selected < 60
            ? `${selected} minutes`
            : selected === 60
              ? "hour"
              : "24 hours"}
        </span>
        <div className="flex items-center gap-2">
          {options.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onChange(value)}
              className={`px-3 py-1 rounded-md text-sm ${
                selected === value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeFilterBar;
