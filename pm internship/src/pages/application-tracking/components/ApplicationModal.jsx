import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ApplicationTimeline from './ApplicationTimeline';

const ApplicationModal = ({ application, isOpen, onClose }) => {
  if (!isOpen || !application) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleOverlayClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">{application?.role}</h2>
            <p className="text-muted-foreground">{application?.company}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Details */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Application Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Application ID:</span>
                    <span className="font-medium text-foreground">{application?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Applied Date:</span>
                    <span className="font-medium text-foreground">{formatDate(application?.appliedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{application?.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{application?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stipend:</span>
                    <span className="font-medium text-foreground">₹{application?.stipend?.toLocaleString('en-IN')}/month</span>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Company Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground">Industry:</span>
                    <p className="font-medium text-foreground">{application?.industry}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Company Size:</span>
                    <p className="font-medium text-foreground">{application?.companySize}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Description:</span>
                    <p className="text-sm text-muted-foreground mt-1">{application?.companyDescription}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              {application?.contactInfo && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{application?.contactInfo?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{application?.contactInfo?.phone}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div>
              <ApplicationTimeline application={application} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => window.open(`https://pminternship.gov.in/application/${application?.id}`, '_blank')}
              iconName="ExternalLink"
              iconPosition="right"
              className="flex-1"
            >
              View on Portal
            </Button>
            <Button
              variant="default"
              onClick={() => {
                // Mock download functionality
                const element = document.createElement('a');
                element?.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Application Details\n\nRole: ${application?.role}\nCompany: ${application?.company}\nStatus: ${application?.status}\nApplied: ${formatDate(application?.appliedDate)}`));
                element?.setAttribute('download', `application-${application?.id}.txt`);
                element.style.display = 'none';
                document.body?.appendChild(element);
                element?.click();
                document.body?.removeChild(element);
              }}
              iconName="Download"
              iconPosition="left"
              className="flex-1"
            >
              Download Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;