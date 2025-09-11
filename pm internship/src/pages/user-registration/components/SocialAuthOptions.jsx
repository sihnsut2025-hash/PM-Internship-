import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialAuthOptions = ({ currentLanguage }) => {
  const content = {
    en: {
      orContinueWith: "Or continue with",
      aadhaarLogin: "Continue with Aadhaar",
      digilockerLogin: "Continue with DigiLocker",
      comingSoon: "Coming Soon"
    },
    hi: {
      orContinueWith: "या इसके साथ जारी रखें",
      aadhaarLogin: "आधार के साथ जारी रखें",
      digilockerLogin: "डिजीलॉकर के साथ जारी रखें",
      comingSoon: "जल्द आ रहा है"
    }
  };

  const t = content?.[currentLanguage];

  const handleSocialAuth = (provider) => {
    // Mock social authentication
    console.log(`${provider} authentication initiated`);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            {t?.orContinueWith}
          </span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {/* Aadhaar Authentication */}
        <div className="relative">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialAuth('aadhaar')}
            iconName="CreditCard"
            iconPosition="left"
            disabled
            className="relative"
          >
            {t?.aadhaarLogin}
          </Button>
          <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
            {t?.comingSoon}
          </span>
        </div>

        {/* DigiLocker Authentication */}
        <div className="relative">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialAuth('digilocker')}
            iconName="Folder"
            iconPosition="left"
            disabled
            className="relative"
          >
            {t?.digilockerLogin}
          </Button>
          <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
            {t?.comingSoon}
          </span>
        </div>
      </div>
      {/* Info Note */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            {currentLanguage === 'en' ?'Social authentication options will be available soon for faster registration.' :'तेज़ पंजीकरण के लिए सामाजिक प्रमाणीकरण विकल्प जल्द ही उपलब्ध होंगे।'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthOptions;