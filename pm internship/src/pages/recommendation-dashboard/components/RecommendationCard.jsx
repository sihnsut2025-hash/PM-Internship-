import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ internship, onBookmark, onApply, onViewDetails }) => {
  const [isBookmarked, setIsBookmarked] = useState(internship?.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(internship?.id, !isBookmarked);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10';
    if (percentage >= 75) return 'text-primary bg-primary/10';
    if (percentage >= 60) return 'text-warning bg-warning/10';
    return 'text-muted-foreground bg-muted';
  };

  const formatStipend = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-modal transition-all duration-200 ease-out-custom">
      {/* Header with Company Logo and Match Percentage */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image 
              src={internship?.companyLogo} 
              alt={`${internship?.companyName} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {internship?.roleTitle}
            </h3>
            <p className="text-muted-foreground text-sm">{internship?.companyName}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getMatchColor(internship?.matchPercentage)}`}>
          {internship?.matchPercentage}% Match
        </div>
      </div>
      {/* Key Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{internship?.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{internship?.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="IndianRupee" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground font-medium">
            {formatStipend(internship?.stipend)}/month
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Building2" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{internship?.industry}</span>
        </div>
      </div>
      {/* Skills Match */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Matching Skills:</p>
        <div className="flex flex-wrap gap-1">
          {internship?.matchingSkills?.slice(0, 3)?.map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {internship?.matchingSkills?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{internship?.matchingSkills?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          >
            {isBookmarked ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(internship?.id)}
            iconName="Eye"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          >
            Details
          </Button>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => onApply(internship?.id)}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={16}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;