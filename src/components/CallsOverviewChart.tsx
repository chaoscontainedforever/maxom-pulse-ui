
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Mon", calls: 120, successRate: 92 },
  { name: "Tue", calls: 180, successRate: 93 },
  { name: "Wed", calls: 190, successRate: 95 },
  { name: "Thu", calls: 230, successRate: 94 },
  { name: "Fri", calls: 280, successRate: 95 },
  { name: "Sat", calls: 150, successRate: 92 },
  { name: "Sun", calls: 130, successRate: 93 },
];

type ChartDataType = "calls" | "successRate";

const CallsOverviewChart = () => {
  const [dataType, setDataType] = useState<ChartDataType>("calls");

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setDataType("calls")}
          className={`px-4 py-1 text-sm rounded-full ${
            dataType === "calls" ? "bg-maxom-orange text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Call Volume
        </button>
        <button
          onClick={() => setDataType("successRate")}
          className={`px-4 py-1 text-sm rounded-full ${
            dataType === "successRate" ? "bg-maxom-orange text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Success Rate
        </button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis 
            stroke="#888888" 
            fontSize={12}
            domain={dataType === "calls" ? [0, 'auto'] : [80, 100]}
            tickFormatter={dataType === "successRate" ? (value) => `${value}%` : undefined}
          />
          <Tooltip 
            formatter={(value: number) => [
              dataType === "successRate" ? `${value}%` : value,
              dataType === "successRate" ? "Success Rate" : "Calls"
            ]}
          />
          <Line
            type="monotone"
            dataKey={dataType}
            stroke={dataType === "calls" ? "#FF6200" : "#2B004C"}
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallsOverviewChart;
