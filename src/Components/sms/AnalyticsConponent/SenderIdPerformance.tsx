import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SenderIdPerformanceProps {
  data: Array<{
    name: string;
    count: number;
  }>;
}

const SenderIdPerformance: React.FC<SenderIdPerformanceProps> = ({ data }) => {
  // Check if data exists and has items
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No sender ID data available</p>
      </div>
    );
  }

  // Sort data in descending order by count
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium mb-1">{`Sender ID: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`tooltip-${index}`}
              className="text-xs"
              style={{ color: entry.color }}
            >
              {`Messages Sent: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={70}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Bar 
            dataKey="count" 
            name="Messages Sent" 
            fill="#0071BC" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SenderIdPerformance;