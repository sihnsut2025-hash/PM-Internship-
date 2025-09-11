import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = ({ currentLanguage }) => {
  const content = {
    en: {
      governmentScheme: 'Official PM Internship Scheme Portal',
      secureLogin: 'Secure & Encrypted Login',
      dataProtection: 'Your data is protected under Government of India guidelines',
      certifiedBy: 'Certified by Ministry of Skill Development'
    },
    hi: {
      governmentScheme: 'आधिकारिक पीएम इंटर्नशिप योजना पोर्टल',
      secureLogin: 'सुरक्षित और एन्क्रिप्टेड लॉगिन',
      dataProtection: 'आपका डेटा भारत सरकार की दिशानिर्देशों के तहत सुरक्षित है',
      certifiedBy: 'कौशल विकास मंत्रालय द्वारा प्रमाणित'
    }
  };

  const t = content?.[currentLanguage];

  return (
    <div className="space-y-4 mb-6">
      {/* Government Badge */}
      <div className="flex items-center justify-center space-x-2 bg-primary/10 rounded-lg p-3">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Shield" size={16} color="white" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-primary">{t?.governmentScheme}</p>
          <p className="text-xs text-muted-foreground">{t?.certifiedBy}</p>
        </div>
      </div>
      {/* Security Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center space-x-2 bg-success/10 rounded-lg p-3">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-success font-medium">{t?.secureLogin}</span>
        </div>
        
        <div className="flex items-center space-x-2 bg-secondary/10 rounded-lg p-3">
          <Icon name="ShieldCheck" size={16} className="text-secondary" />
          <span className="text-xs text-secondary font-medium">{t?.dataProtection}</span>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;