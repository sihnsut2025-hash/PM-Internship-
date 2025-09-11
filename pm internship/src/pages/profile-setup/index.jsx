import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from './components/ProgressIndicator';
import BasicInformationForm from './components/BasicInformationForm';
import EducationalBackgroundForm from './components/EducationalBackgroundForm';
import SkillsAssessmentForm from './components/SkillsAssessmentForm';
import PreferencesForm from './components/PreferencesForm';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [profileData, setProfileData] = useState({
    basicInfo: {},
    education: {},
    skills: {},
    preferences: {}
  });
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const steps = [
    { id: 1, label: currentLanguage === 'hi' ? 'बुनियादी' : 'Basic', key: 'basicInfo' },
    { id: 2, label: currentLanguage === 'hi' ? 'शिक्षा' : 'Education', key: 'education' },
    { id: 3, label: currentLanguage === 'hi' ? 'कौशल' : 'Skills', key: 'skills' },
    { id: 4, label: currentLanguage === 'hi' ? 'प्राथमिकताएं' : 'Preferences', key: 'preferences' }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Load saved draft if exists
    const savedDraft = localStorage.getItem('profileDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setProfileData(parsedDraft?.data || profileData);
        setCurrentStep(parsedDraft?.currentStep || 1);
        setIsDraftSaved(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }

    // Check authentication
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/user-login');
    }
  }, [navigate]);

  const saveDraft = (stepData, step) => {
    const updatedData = {
      ...profileData,
      [steps?.[step - 1]?.key]: stepData
    };
    
    const draftData = {
      data: updatedData,
      currentStep: step,
      lastSaved: new Date()?.toISOString()
    };
    
    localStorage.setItem('profileDraft', JSON.stringify(draftData));
    setIsDraftSaved(true);
    
    // Show save confirmation
    setTimeout(() => setIsDraftSaved(false), 2000);
  };

  const handleStepUpdate = (stepData) => {
    const updatedData = {
      ...profileData,
      [steps?.[currentStep - 1]?.key]: stepData
    };
    setProfileData(updatedData);
    saveDraft(stepData, currentStep);
  };

  const handleNext = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save complete profile
    const completeProfile = {
      ...profileData,
      completedAt: new Date()?.toISOString(),
      isComplete: true
    };
    
    localStorage.setItem('userProfile', JSON.stringify(completeProfile));
    localStorage.removeItem('profileDraft');
    
    // Navigate to dashboard
    navigate('/recommendation-dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformationForm
            data={profileData?.basicInfo}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            currentLanguage={currentLanguage}
          />
        );
      case 2:
        return (
          <EducationalBackgroundForm
            data={profileData?.education}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentLanguage={currentLanguage}
          />
        );
      case 3:
        return (
          <SkillsAssessmentForm
            data={profileData?.skills}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentLanguage={currentLanguage}
          />
        );
      case 4:
        return (
          <PreferencesForm
            data={profileData?.preferences}
            onUpdate={handleStepUpdate}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {currentLanguage === 'hi' ? 'प्रोफाइल सेटअप' : 'Profile Setup'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {currentLanguage === 'hi' ?'अपनी जानकारी दर्ज करें और AI-संचालित इंटर्नशिप सिफारिशें प्राप्त करें' :'Enter your information and get AI-powered internship recommendations'}
            </p>
          </div>

          {/* Draft Save Indicator */}
          {isDraftSaved && (
            <div className="fixed top-20 right-4 z-40 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in-from-right">
              <Icon name="Check" size={16} />
              <span className="text-sm font-medium">
                {currentLanguage === 'hi' ? 'ड्राफ्ट सेव हो गया' : 'Draft Saved'}
              </span>
            </div>
          )}

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={steps?.length}
            steps={steps}
          />

          {/* Current Step Form */}
          <div className="mb-8">
            {renderCurrentStep()}
          </div>

          {/* Help Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={24} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {currentLanguage === 'hi' ? 'सहायता चाहिए?' : 'Need Help?'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {currentLanguage === 'hi' ?'यदि आपको प्रोफाइल भरने में कोई समस्या आ रही है, तो हमारी सहायता टीम से संपर्क करें।' :'If you are facing any issues while filling your profile, contact our support team.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" size="sm" iconName="Phone">
                    {currentLanguage === 'hi' ? 'हेल्पलाइन: 1800-XXX-XXXX' : 'Helpline: 1800-XXX-XXXX'}
                  </Button>
                  <Button variant="outline" size="sm" iconName="Mail">
                    {currentLanguage === 'hi' ? 'ईमेल सहायता' : 'Email Support'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Input Help */}
          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Mic" size={20} color="var(--color-primary)" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {currentLanguage === 'hi' ? 'वॉयस इनपुट:' : 'Voice Input:'}
                </span>
                {' '}
                {currentLanguage === 'hi' ?'माइक आइकन पर क्लिक करके बोलकर जानकारी दर्ज करें' :'Click the mic icon to enter information by speaking'}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSetup;