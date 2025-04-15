import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface MessageAnalyticsPieProps {
  data: Array<{
    date: string;
    messages_count: number;
    successful_count: string | number;
    failed_count: string | number;
    total_cost: string | number;
  }>;
}

const COLORS = ["#10B981", "#EF4444", "#6B7280", "#F59E0B"];

const MessageStatusPieChart: React.FC<MessageAnalyticsPieProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No data available for the selected time period</p>
      </div>
    );
  }

  // Transform the time-series data into status distribution data
  const aggregateData = data.reduce((acc, item) => {
    const successful = Number(item.successful_count);
    const failed = Number(item.failed_count);
    const totalMessages = Number(item.messages_count);
    
    // The pending count is the total messages minus successful and failed
    const pending = Math.max(0, totalMessages - (successful + failed));
    
    // Add to accumulator
    acc.successful += successful;
    acc.failed += failed;
    acc.pending += pending;
    
    return acc;
  }, { successful: 0, failed: 0, pending: 0 });

  // Format the data for the pie chart
  const pieData = [
    { name: "Delivered", value: aggregateData.successful },
    { name: "Failed", value: aggregateData.failed },
    { name: "Pending", value: aggregateData.pending },
  ].filter(item => item.value > 0); // Only keep non-zero values

  // Calculate total for percentage
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  // Format data to include percentage
  const formattedData = pieData.map((item) => ({
    ...item,
    percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : "0",
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value.toLocaleString()}`}</p>
          <p className="text-xs text-gray-500">{`${payload[0].payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-col gap-2 justify-center">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-xs text-gray-700">
              {entry.value}: {formattedData[index]?.value.toLocaleString()} ({formattedData[index]?.percentage}%)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-full w-full flex flex-col">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MessageStatusPieChart;