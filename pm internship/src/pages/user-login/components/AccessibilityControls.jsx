import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccessibilityControls = ({ currentLanguage }) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const content = {
    en: {
      highContrast: 'High Contrast',
      voiceInput: 'Voice Input',
      accessibilityOptions: 'Accessibility Options'
    },
    hi: {
      highContrast: 'उच्च कंट्रास्ट',
      voiceInput: 'वॉयस इनपुट',
      accessibilityOptions: 'पहुंच विकल्प'
    }
  };

  const t = content?.[currentLanguage];

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    // Apply high contrast theme
    if (!isHighContrast) {
      document.body?.classList?.add('high-contrast');
    } else {
      document.body?.classList?.remove('high-contrast');
    }
  };

  const toggleVoiceInput = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    // Voice input functionality would be implemented here
    if (!isVoiceEnabled) {
      alert('Voice input activated. Speak your credentials.');
    }
  };

  return (
    <div className="flex justify-center space-x-2 mb-4">
      <Button
        variant={isHighContrast ? "default" : "ghost"}
        size="sm"
        onClick={toggleHighContrast}
        className="flex items-center space-x-1"
      >
        <Icon name="Eye" size={16} />
        <span className="text-xs hidden sm:inline">{t?.highContrast}</span>
      </Button>
      <Button
        variant={isVoiceEnabled ? "default" : "ghost"}
        size="sm"
        onClick={toggleVoiceInput}
        className="flex items-center space-x-1"
      >
        <Icon name="Mic" size={16} />
        <span className="text-xs hidden sm:inline">{t?.voiceInput}</span>
      </Button>
    </div>
  );
};

export default AccessibilityControls;