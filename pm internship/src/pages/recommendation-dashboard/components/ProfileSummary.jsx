import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileSummary = ({ userProfile, onEditProfile }) => {
  const getCompletionColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-primary';
    if (percentage >= 50) return 'text-warning';
    return 'text-error';
  };

  const completionItems = [
    { label: 'Basic Info', completed: userProfile?.basicInfoComplete },
    { label: 'Skills', completed: userProfile?.skillsComplete },
    { label: 'Education', completed: userProfile?.educationComplete },
    { label: 'Preferences', completed: userProfile?.preferencesComplete }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image 
            src={userProfile?.avatar} 
            alt={`${userProfile?.name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground text-lg">{userProfile?.name}</h2>
          <p className="text-muted-foreground text-sm">{userProfile?.email}</p>
          <p className="text-muted-foreground text-sm">{userProfile?.location}</p>
        </div>
      </div>
      {/* Profile Completion */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Profile Completion</span>
          <span className={`text-sm font-semibold ${getCompletionColor(userProfile?.completionPercentage)}`}>
            {userProfile?.completionPercentage}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              userProfile?.completionPercentage >= 90 ? 'bg-success' :
              userProfile?.completionPercentage >= 70 ? 'bg-primary' :
              userProfile?.completionPercentage >= 50 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${userProfile?.completionPercentage}%` }}
          />
        </div>

        {/* Completion Items */}
        <div className="space-y-2">
          {completionItems?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item?.label}</span>
              <Icon 
                name={item?.completed ? "CheckCircle2" : "Circle"} 
                size={16} 
                className={item?.completed ? "text-success" : "text-muted-foreground"}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-foreground">{userProfile?.applicationsCount}</div>
          <div className="text-xs text-muted-foreground">Applications</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-foreground">{userProfile?.bookmarksCount}</div>
          <div className="text-xs text-muted-foreground">Bookmarks</div>
        </div>
      </div>
      {/* Edit Profile Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onEditProfile}
        iconName="Edit3"
        iconPosition="left"
        iconSize={16}
        fullWidth
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileSummary;