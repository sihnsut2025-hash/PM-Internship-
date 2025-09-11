import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusFilter = ({ selectedStatus, onStatusChange, applicationCounts }) => {
  const statusOptions = [
    { value: 'all', label: 'All Applications', icon: 'FileText', count: applicationCounts?.all },
    { value: 'submitted', label: 'Submitted', icon: 'Send', count: applicationCounts?.submitted },
    { value: 'under review', label: 'Under Review', icon: 'Clock', count: applicationCounts?.underReview },
    { value: 'interview scheduled', label: 'Interview Scheduled', icon: 'Calendar', count: applicationCounts?.interview },
    { value: 'selected', label: 'Selected', icon: 'CheckCircle', count: applicationCounts?.selected },
    { value: 'not selected', label: 'Not Selected', icon: 'XCircle', count: applicationCounts?.rejected }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Filter by Status</h3>
      <div className="space-y-2">
        {statusOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => onStatusChange(option?.value)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
              selectedStatus === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={option?.icon} 
                size={18} 
                color={selectedStatus === option?.value ? 'currentColor' : 'currentColor'}
              />
              <span className="text-sm font-medium">{option?.label}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedStatus === option?.value
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {option?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;