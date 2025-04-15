import React from "react";
import { FiFilter } from "react-icons/fi";

interface ContactFiltersProps {
  groups: any[];
  selectedGroupId: string;
  onGroupFilterChange: (groupId: string) => void;
}

const ContactFilters: React.FC<ContactFiltersProps> = ({
  groups,
  selectedGroupId,
  onGroupFilterChange,
}) => {
  return (
    <div className="flex space-x-2">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiFilter className="text-gray-400" />
        </div>
        <select
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={selectedGroupId}
          onChange={(e) => onGroupFilterChange(e.target.value)}
        >
          <option value="">All Groups</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ContactFilters;