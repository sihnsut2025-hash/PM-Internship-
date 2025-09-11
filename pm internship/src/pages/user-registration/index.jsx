import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RegistrationForm from './components/RegistrationForm';
import TrustBadges from './components/TrustBadges';
import LanguageToggle from './components/LanguageToggle';
import SocialAuthOptions from './components/SocialAuthOptions';

const UserRegistration = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const pageTitle = currentLanguage === 'en' ?'Create Account - InternMatch AI' :'खाता बनाएं - InternMatch AI';

  const pageDescription = currentLanguage === 'en' ?'Join PM Internship Scheme and create your account to discover personalized internship recommendations powered by AI.' :'पीएम इंटर्नशिप योजना में शामिल हों और AI द्वारा संचालित व्यक्तिगत इंटर्नशिप सिफारिशों को खोजने के लिए अपना खाता बनाएं।';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="PM Internship Scheme, registration, create account, internship, government scheme, youth employment" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Language Toggle */}
            <LanguageToggle 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column - Registration Form */}
              <div className="order-2 lg:order-1">
                <RegistrationForm currentLanguage={currentLanguage} />
                <SocialAuthOptions currentLanguage={currentLanguage} />
              </div>

              {/* Right Column - Trust Badges and Branding */}
              <div className="order-1 lg:order-2 lg:sticky lg:top-8">
                <TrustBadges currentLanguage={currentLanguage} />
                
                {/* Additional Information */}
                <div className="mt-8 p-6 bg-card rounded-xl border border-border shadow-card">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {currentLanguage === 'en' ?'Why Choose InternMatch AI?' :'InternMatch AI क्यों चुनें?'
                      }
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span>
                          {currentLanguage === 'en' ?'AI-powered personalized internship recommendations' :'AI-संचालित व्यक्तिगत इंटर्नशिप सिफारिशें'
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
                        <span>
                          {currentLanguage === 'en' ?'Direct integration with PM Internship Scheme portal' :'पीएम इंटर्नशिप योजना पोर्टल के साथ सीधा एकीकरण'
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                        <span>
                          {currentLanguage === 'en' ?'Real-time application tracking and updates' :'रियल-टाइम एप्लिकेशन ट्रैकिंग और अपडेट'
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                        <span>
                          {currentLanguage === 'en' ?'Multi-language support for better accessibility' :'बेहतर पहुंच के लिए बहुभाषी समर्थन'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                © {new Date()?.getFullYear()} InternMatch AI - PM Internship Scheme. 
                {currentLanguage === 'en' ? ' All rights reserved.' : ' सभी अधिकार सुरक्षित।'}
              </p>
              <p className="mt-1">
                {currentLanguage === 'en' ?'A Government of India Initiative for Youth Employment' :'युवा रोजगार के लिए भारत सरकार की एक पहल'
                }
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UserRegistration;