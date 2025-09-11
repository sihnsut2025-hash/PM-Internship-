import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchAndSort = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'date-desc', label: 'Latest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'company-asc', label: 'Company A-Z' },
    { value: 'company-desc', label: 'Company Z-A' },
    { value: 'status', label: 'By Status' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search by company, role, or location..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="sm:w-48">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by..."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;