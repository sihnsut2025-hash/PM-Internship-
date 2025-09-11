import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationCard = ({ application, onViewDetails, onOpenPortal }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interview scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'selected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'not selected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return 'Send';
      case 'under review':
        return 'Clock';
      case 'interview scheduled':
        return 'Calendar';
      case 'selected':
        return 'CheckCircle';
      case 'not selected':
        return 'XCircle';
      default:
        return 'FileText';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {application?.role}
          </h3>
          <p className="text-muted-foreground font-medium">
            {application?.company}
          </p>
        </div>
        {application?.hasUpdate && (
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
        )}
      </div>
      {/* Status Badge */}
      <div className="flex items-center space-x-2 mb-4">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application?.status)}`}>
          <Icon name={getStatusIcon(application?.status)} size={14} />
          <span>{application?.status}</span>
        </div>
      </div>
      {/* Application Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-muted-foreground">Applied on:</span>
          <p className="font-medium text-foreground">{formatDate(application?.appliedDate)}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Location:</span>
          <p className="font-medium text-foreground">{application?.location}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Duration:</span>
          <p className="font-medium text-foreground">{application?.duration}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Stipend:</span>
          <p className="font-medium text-foreground">₹{application?.stipend?.toLocaleString('en-IN')}/month</p>
        </div>
      </div>
      {/* Next Steps */}
      {application?.nextStep && (
        <div className="bg-muted rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Next Step:</p>
              <p className="text-sm text-muted-foreground">{application?.nextStep}</p>
              {application?.deadline && (
                <p className="text-xs text-accent font-medium mt-1">
                  Deadline: {formatDate(application?.deadline)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(application)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onOpenPortal(application)}
          iconName="ExternalLink"
          iconPosition="right"
          className="flex-1"
        >
          Open Portal
        </Button>
      </div>
    </div>
  );
};

export default ApplicationCard;