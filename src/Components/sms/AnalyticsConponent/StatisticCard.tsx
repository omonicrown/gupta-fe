import React from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

interface StatisticCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  changeType?: "positive" | "negative" | "neutral";
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  icon,
  change = 0,
  changeLabel = "since last period",
  changeType = "positive",
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-lg bg-blue-50">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">{formatNumber(value)}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {changeType === "positive" ? (
                <FiArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : changeType === "negative" ? (
                <FiArrowDown className="h-4 w-4 text-red-500 mr-1" />
              ) : null}
              <p
                className={`text-xs ${
                  changeType === "positive"
                    ? "text-green-500"
                    : changeType === "negative"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {Math.abs(change).toFixed(1)}% {changeLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;