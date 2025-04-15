import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
} from "recharts";

interface MessageAnalyticsProps {
  data: Array<{
    date: string;
    messages_count: number;
    successful_count: string | number;
    failed_count: string | number;
    total_cost: string | number;
  }>;
}

const MessageAnalyticsChart: React.FC<MessageAnalyticsProps> = ({ data }) => {
  // Check if data exists and has items
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No data available for the selected time period</p>
      </div>
    );
  }

  // Format and normalize the data
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    messages_count: Number(item.messages_count),
    successful_count: Number(item.successful_count),
    failed_count: Number(item.failed_count),
    total_cost: parseFloat(String(item.total_cost)),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <ComposedChart
        data={formattedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="date" 
          padding={{ left: 10, right: 10 }}
        />
        <YAxis 
          yAxisId="left"
          tickFormatter={(value) => value.toLocaleString()}
          width={60}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) => `₦${value.toLocaleString()}`}
          width={80}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
          formatter={(value, name) => {
            if (name === "total_cost") {
              return [`₦${Number(value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`, "Cost"];
            }
            return [value.toLocaleString(), name === "messages_count" ? "Messages" : 
                                           name === "successful_count" ? "Successful" : 
                                           name === "failed_count" ? "Failed" : name];
          }}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          payload={[
            { value: 'Messages', type: 'square', color: '#0071BC' },
            { value: 'Successful', type: 'square', color: '#10B981' },
            { value: 'Failed', type: 'square', color: '#EF4444' },
            { value: 'Cost', type: 'square', color: '#F59E0B' }
          ]}
        />
        <Bar
          yAxisId="left"
          dataKey="messages_count"
          name="Messages"
          fill="#0071BC"
          barSize={20}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="successful_count"
          name="Successful"
          stroke="#10B981"
          activeDot={{ r: 6 }}
          strokeWidth={2}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="failed_count"
          name="Failed"
          stroke="#EF4444"
          activeDot={{ r: 6 }}
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="total_cost"
          name="Cost"
          stroke="#F59E0B"
          activeDot={{ r: 6 }}
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default MessageAnalyticsChart;