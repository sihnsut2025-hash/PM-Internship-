import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = ({ currentLanguage }) => {
  const content = {
    en: {
      governmentCertified: "Government Certified",
      secureRegistration: "Secure Registration",
      officialPortal: "Official PM Internship Portal",
      trustedBy: "Trusted by 10,000+ Students"
    },
    hi: {
      governmentCertified: "सरकारी प्रमाणित",
      secureRegistration: "सुरक्षित पंजीकरण",
      officialPortal: "आधिकारिक पीएम इंटर्नशिप पोर्टल",
      trustedBy: "10,000+ छात्रों द्वारा भरोसेमंद"
    }
  };

  const t = content?.[currentLanguage];

  const badges = [
    {
      icon: "Shield",
      title: t?.governmentCertified,
      color: "text-success"
    },
    {
      icon: "Lock",
      title: t?.secureRegistration,
      color: "text-primary"
    },
    {
      icon: "Award",
      title: t?.officialPortal,
      color: "text-secondary"
    },
    {
      icon: "Users",
      title: t?.trustedBy,
      color: "text-accent"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {badges?.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border hover:shadow-card transition-all duration-200"
          >
            <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 ${badge?.color}`}>
              <Icon name={badge?.icon} size={24} />
            </div>
            <p className="text-xs lg:text-sm font-medium text-foreground leading-tight">
              {badge?.title}
            </p>
          </div>
        ))}
      </div>
      {/* Government Branding */}
      <div className="flex items-center justify-center mt-8 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Flag" size={16} color="white" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              {currentLanguage === 'en' ? 'Government of India Initiative' : 'भारत सरकार की पहल'}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'PM Internship Scheme 2024' : 'पीएम इंटर्नशिप योजना 2024'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;