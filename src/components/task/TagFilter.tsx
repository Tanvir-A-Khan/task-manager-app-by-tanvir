import React, { useState } from "react";
import { TagFilterProps } from "../../types";

const TagFilter: React.FC<TagFilterProps> = ({ onFilterChange }) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSelectedSearch(search);
    onFilterChange({ tag: selectedTag, priority: selectedPriority, search });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;
    setSelectedTag(tag);
    onFilterChange({ tag, priority: selectedPriority, search: selectedSearch });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value;
    setSelectedPriority(priority);
    onFilterChange({ tag: selectedTag, priority, search: selectedSearch });
  };

  return (
    <div className="flex space-x-4 p-4 bg-white rounded shadow dark:bg-gray-700">
      <input
        placeholder="Search for any task"
        className="w-full px-3 py-2 border rounded dark:bg-gray-600"
        value={selectedSearch}
        onChange={handleSearchChange}
      />
      <select
        value={selectedTag}
        onChange={handleTagChange}
        className="md:px-3 py-2 border rounded dark:bg-gray-600"
      >
        <option value="">All Tags</option>
        <option value="Backend">Backend</option>
        <option value="Frontend">Frontend</option>
        <option value="Documentation">Documentation</option>
      </select>

      <select
        value={selectedPriority}
        onChange={handlePriorityChange}
        className="md:px-3 py-2 border rounded dark:bg-gray-600"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TagFilter;
