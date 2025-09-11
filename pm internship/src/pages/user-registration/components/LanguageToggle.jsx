import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' }
  ];

  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      <Icon name="Globe" size={20} className="text-muted-foreground" />
      <div className="flex bg-muted rounded-lg p-1">
        {languages?.map((lang) => (
          <Button
            key={lang?.code}
            variant={currentLanguage === lang?.code ? "default" : "ghost"}
            size="sm"
            onClick={() => onLanguageChange(lang?.code)}
            className="px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            {lang?.nativeLabel}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;