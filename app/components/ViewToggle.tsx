"use client";

type Props = {
  selectedView: "chart" | "table";
  onChange: (view: "chart" | "table") => void;
};

export default function ViewToggle({ selectedView, onChange }: Props) {
  return (
    <div className="mb-4 flex gap-2">
      <button
        onClick={() => onChange("chart")}
        className={`px-3 py-1 text-sm rounded-md ${
          selectedView === "chart"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Chart View
      </button>
      <button
        onClick={() => onChange("table")}
        className={`px-3 py-1 text-sm rounded-md ${
          selectedView === "table"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Table View
      </button>
    </div>
  );
}
