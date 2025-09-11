import React from 'react';
import Icon from '../../../components/AppIcon';

const ApplicationTimeline = ({ application }) => {
  const timelineSteps = [
    {
      id: 1,
      title: 'Application Submitted',
      description: 'Your application has been successfully submitted to the company.',
      date: application?.appliedDate,
      status: 'completed',
      icon: 'Send'
    },
    {
      id: 2,
      title: 'Under Review',
      description: 'The company is reviewing your application and profile.',
      date: application?.reviewStartDate,
      status: application?.status === 'submitted' ? 'pending' : 'completed',
      icon: 'Eye'
    },
    {
      id: 3,
      title: 'Interview Process',
      description: 'Interview scheduled or in progress.',
      date: application?.interviewDate,
      status: application?.status === 'interview scheduled' ? 'current' : 
              application?.status === 'selected' || application?.status === 'not selected' ? 'completed' : 'pending',
      icon: 'Users'
    },
    {
      id: 4,
      title: 'Final Decision',
      description: 'Company has made the final selection decision.',
      date: application?.decisionDate,
      status: application?.status === 'selected' || application?.status === 'not selected' ? 'completed' : 'pending',
      icon: application?.status === 'selected' ? 'CheckCircle' : application?.status === 'not selected' ? 'XCircle' : 'Clock'
    }
  ];

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success border-success bg-success/10';
      case 'current':
        return 'text-primary border-primary bg-primary/10';
      case 'pending':
        return 'text-muted-foreground border-border bg-muted';
      default:
        return 'text-muted-foreground border-border bg-muted';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Application Progress</h3>
      <div className="relative">
        {timelineSteps?.map((step, index) => (
          <div key={step?.id} className="relative flex items-start space-x-4 pb-8 last:pb-0">
            {/* Connector Line */}
            {index < timelineSteps?.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
            )}
            
            {/* Step Icon */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStepColor(step?.status)}`}>
              <Icon name={step?.icon} size={20} />
            </div>
            
            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`text-sm font-semibold ${
                  step?.status === 'completed' ? 'text-success' :
                  step?.status === 'current'? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {formatDate(step?.date)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {step?.description}
              </p>
              
              {/* Current Step Indicator */}
              {step?.status === 'current' && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs text-primary font-medium">In Progress</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTimeline;