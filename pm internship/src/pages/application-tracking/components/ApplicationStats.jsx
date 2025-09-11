import React from 'react';
import Icon from '../../../components/AppIcon';

const ApplicationStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Applications',
      value: stats?.total,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Under Review',
      value: stats?.underReview,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Interviews',
      value: stats?.interviews,
      icon: 'Calendar',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Selected',
      value: stats?.selected,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStats;