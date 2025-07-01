import React from "react";

const TimeBar = () => {
  return <div>
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-gray-500">Last 24 hours</span>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">
          5 min
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm">
          15 min
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm">
          1h
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm">
          1 day
        </button>
      </div>
    </div>
    <div className="w-full h-[200px] bg-gray-100 rounded-lg shadow-inner"></div>
  </div>;
};

export default TimeBar;
