type Props = {
  chartType: "temperature" | "humidity" | "sound" | "battery";
  setChartType: (val: Props["chartType"]) => void;
};

export default function ChartTypeSelector({ chartType, setChartType }: Props) {
  const options: Props["chartType"][] = [
    "temperature",
    "humidity",
    "sound",
    "battery",
  ];

  return (
    <div className="flex gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option}
          className={`px-3 py-1 rounded-md text-sm ${
            chartType === option
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setChartType(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}
