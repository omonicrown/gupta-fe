import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateRangeChange: (range: { startDate: string; endDate: string }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateRangeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalEndDate(e.target.value);
  };

  const handleApply = () => {
    onDateRangeChange({
      startDate: localStartDate,
      endDate: localEndDate,
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Predefined ranges
  const applyPredefinedRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    setLocalStartDate(start.toISOString().split('T')[0]);
    setLocalEndDate(end.toISOString().split('T')[0]);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer border border-gray-200"
        onClick={toggleOpen}
      >
        <FiCalendar className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-700">
          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
        </span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-md z-10 border border-gray-200 w-72">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between mb-3">
              <button
                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => applyPredefinedRange(7)}
              >
                Last 7 days
              </button>
              <button
                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => applyPredefinedRange(30)}
              >
                Last 30 days
              </button>
              <button
                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => applyPredefinedRange(90)}
              >
                Last 90 days
              </button>
            </div>
            
            <div className="mb-3">
              <label className="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded text-sm"
                value={localStartDate}
                onChange={handleStartDateChange}
                max={localEndDate}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded text-sm"
                value={localEndDate}
                onChange={handleEndDateChange}
                min={localStartDate}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;