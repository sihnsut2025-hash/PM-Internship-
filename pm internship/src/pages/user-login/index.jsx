import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import LanguageToggle from './components/LanguageToggle';
import AccessibilityControls from './components/AccessibilityControls';
import TrustIndicators from './components/TrustIndicators';
import Icon from '../../components/AppIcon';

const UserLogin = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'hi']?.includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const content = {
    en: {
      pageTitle: 'Login - InternMatch AI',
      pageDescription: 'Sign in to your InternMatch AI account to access personalized internship recommendations and track your applications.',
      appName: 'InternMatch AI',
      tagline: 'PM Internship Scheme'
    },
    hi: {
      pageTitle: 'लॉगिन - InternMatch AI',
      pageDescription: 'व्यक्तिगत इंटर्नशिप सिफारिशों तक पहुंचने और अपने आवेदनों को ट्रैक करने के लिए अपने InternMatch AI खाते में साइन इन करें।',
      appName: 'InternMatch AI',
      tagline: 'पीएम इंटर्नशिप योजना'
    }
  };

  const t = content?.[currentLanguage];

  return (
    <>
      <Helmet>
        <title>{t?.pageTitle}</title>
        <meta name="description" content={t?.pageDescription} />
        <meta name="keywords" content="internship, login, PM scheme, government, youth employment" />
        <meta property="og:title" content={t?.pageTitle} />
        <meta property="og:description" content={t?.pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="w-full py-6 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Icon name="Briefcase" size={24} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-foreground">{t?.appName}</span>
                  <span className="text-sm text-muted-foreground font-mono">{t?.tagline}</span>
                </div>
              </div>

              {/* Language Toggle - Desktop */}
              <div className="hidden sm:block">
                <LanguageToggle 
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
              {/* Mobile Language Toggle */}
              <div className="sm:hidden mb-6">
                <LanguageToggle 
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                />
              </div>

              {/* Accessibility Controls */}
              <AccessibilityControls currentLanguage={currentLanguage} />

              {/* Trust Indicators */}
              <TrustIndicators currentLanguage={currentLanguage} />

              {/* Login Form */}
              <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
                <LoginForm currentLanguage={currentLanguage} />
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="w-full py-6 px-4 border-t border-border bg-card/50">
            <div className="max-w-7xl mx-auto text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} InternMatch AI - PM Internship Scheme Portal
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="Shield" size={12} />
                  <span>Government of India</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Lock" size={12} />
                  <span>Secure Platform</span>
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default UserLogin;