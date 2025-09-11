import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InternshipHeader = ({ internship, onApply, onBookmark, onShare, isBookmarked, hasApplied }) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Company Logo and Basic Info */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-border">
            <Image 
              src={internship?.company?.logo} 
              alt={`${internship?.company?.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                {internship?.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Icon name="Building2" size={16} />
                <span className="font-medium">{internship?.company?.name}</span>
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                  Verified
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  <span>{internship?.location?.city}, {internship?.location?.state}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  <span>{internship?.duration} months</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="IndianRupee" size={14} />
                  <span>₹{internship?.stipend?.toLocaleString('en-IN')}/month</span>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">
              {hasApplied ? (
                <div className="bg-success/10 text-success px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} />
                  Applied
                </div>
              ) : (
                <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium">
                  Open for Applications
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={hasApplied ? "outline" : "default"}
              onClick={onApply}
              disabled={hasApplied}
              iconName={hasApplied ? "CheckCircle" : "Send"}
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              {hasApplied ? "Application Submitted" : "Apply Now"}
            </Button>

            <Button
              variant="outline"
              onClick={onBookmark}
              iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
              iconPosition="left"
            >
              {isBookmarked ? "Saved" : "Save"}
            </Button>

            <Button
              variant="ghost"
              onClick={onShare}
              iconName="Share2"
              size="default"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipHeader;