import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const languages = {
    en: { label: 'English', shortLabel: 'EN', flag: '🇺🇸' },
    hi: { label: 'हिंदी', shortLabel: 'हिं', flag: '🇮🇳' }
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    onLanguageChange(newLanguage);
  };

  return (
    <div className="flex justify-center mb-6">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="flex items-center space-x-2 px-4 py-2"
      >
        <Icon name="Globe" size={16} />
        <span className="text-sm font-medium">
          {languages?.[currentLanguage]?.flag} {languages?.[currentLanguage]?.shortLabel}
        </span>
        <Icon name="ChevronDown" size={14} />
      </Button>
    </div>
  );
};

export default LanguageToggle;