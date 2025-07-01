import React from "react";

type Props = {
  showChart: boolean;
  setShowChart: (val: boolean) => void;
};

export default function ChartToggle({ showChart, setShowChart }: Props) {
  return (
    <div className="flex items-center justify-end mb-4">
      <label className="mr-2 text-sm">View:</label>
      <button
        onClick={() => setShowChart(!showChart)}
        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
      >
        {showChart ? "Table" : "Chart"}
      </button>
    </div>
  );
}
