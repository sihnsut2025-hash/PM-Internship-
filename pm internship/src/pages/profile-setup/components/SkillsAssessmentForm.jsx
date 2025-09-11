import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SkillsAssessmentForm = ({ data, onUpdate, onNext, onPrevious, currentLanguage }) => {
  const [formData, setFormData] = useState({
    technicalSkills: data?.technicalSkills || [],
    softSkills: data?.softSkills || [],
    languages: data?.languages || [],
    certifications: data?.certifications || [],
    ...data
  });
  
  const [errors, setErrors] = useState({});

  const technicalSkillsOptions = [
    { id: 'ms-office', label: currentLanguage === 'hi' ? 'MS Office' : 'MS Office', icon: 'FileText' },
    { id: 'data-entry', label: currentLanguage === 'hi' ? 'डेटा एंट्री' : 'Data Entry', icon: 'Keyboard' },
    { id: 'basic-computer', label: currentLanguage === 'hi' ? 'बेसिक कंप्यूटर' : 'Basic Computer', icon: 'Monitor' },
    { id: 'internet-browsing', label: currentLanguage === 'hi' ? 'इंटरनेट ब्राउज़िंग' : 'Internet Browsing', icon: 'Globe' },
    { id: 'email', label: currentLanguage === 'hi' ? 'ईमेल' : 'Email', icon: 'Mail' },
    { id: 'social-media', label: currentLanguage === 'hi' ? 'सोशल मीडिया' : 'Social Media', icon: 'Share2' },
    { id: 'photography', label: currentLanguage === 'hi' ? 'फोटोग्राफी' : 'Photography', icon: 'Camera' },
    { id: 'video-editing', label: currentLanguage === 'hi' ? 'वीडियो एडिटिंग' : 'Video Editing', icon: 'Video' }
  ];

  const softSkillsOptions = [
    { id: 'communication', label: currentLanguage === 'hi' ? 'संवाद कौशल' : 'Communication', icon: 'MessageCircle' },
    { id: 'teamwork', label: currentLanguage === 'hi' ? 'टीम वर्क' : 'Teamwork', icon: 'Users' },
    { id: 'leadership', label: currentLanguage === 'hi' ? 'नेतृत्व' : 'Leadership', icon: 'Crown' },
    { id: 'problem-solving', label: currentLanguage === 'hi' ? 'समस्या समाधान' : 'Problem Solving', icon: 'Lightbulb' },
    { id: 'time-management', label: currentLanguage === 'hi' ? 'समय प्रबंधन' : 'Time Management', icon: 'Clock' },
    { id: 'adaptability', label: currentLanguage === 'hi' ? 'अनुकूलनशीलता' : 'Adaptability', icon: 'Shuffle' },
    { id: 'creativity', label: currentLanguage === 'hi' ? 'रचनात्मकता' : 'Creativity', icon: 'Palette' },
    { id: 'customer-service', label: currentLanguage === 'hi' ? 'ग्राहक सेवा' : 'Customer Service', icon: 'Headphones' }
  ];

  const languageOptions = [
    { id: 'hindi', label: currentLanguage === 'hi' ? 'हिंदी' : 'Hindi', level: 'native' },
    { id: 'english', label: currentLanguage === 'hi' ? 'अंग्रेजी' : 'English', level: 'intermediate' },
    { id: 'regional', label: currentLanguage === 'hi' ? 'क्षेत्रीय भाषा' : 'Regional Language', level: 'native' }
  ];

  const handleSkillToggle = (category, skillId) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev?.[category]?.includes(skillId)
        ? prev?.[category]?.filter(id => id !== skillId)
        : [...prev?.[category], skillId]
    }));
    
    if (errors?.[category]) {
      setErrors(prev => ({ ...prev, [category]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData?.technicalSkills?.length === 0) {
      newErrors.technicalSkills = currentLanguage === 'hi' ?'कम से कम एक तकनीकी कौशल चुनें' :'Select at least one technical skill';
    }
    
    if (formData?.softSkills?.length === 0) {
      newErrors.softSkills = currentLanguage === 'hi' ?'कम से कम एक सॉफ्ट स्किल चुनें' :'Select at least one soft skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
  };

  const SkillCard = ({ skill, isSelected, onToggle, category }) => (
    <div
      onClick={() => onToggle(category, skill?.id)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/30'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={skill?.icon} size={20} />
        </div>
        <span className={`text-sm font-medium ${
          isSelected ? 'text-primary' : 'text-foreground'
        }`}>
          {skill?.label}
        </span>
        {isSelected && (
          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={12} color="white" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Award" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {currentLanguage === 'hi' ? 'कौशल मूल्यांकन' : 'Skills Assessment'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'hi' ?'अपने कौशल का चयन करें' :'Select your skills'}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Technical Skills */}
        <div>
          <h4 className="text-md font-semibold text-foreground mb-4">
            {currentLanguage === 'hi' ? 'तकनीकी कौशल' : 'Technical Skills'}
          </h4>
          {errors?.technicalSkills && (
            <p className="text-error text-sm mb-3">{errors?.technicalSkills}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technicalSkillsOptions?.map((skill) => (
              <SkillCard
                key={skill?.id}
                skill={skill}
                isSelected={formData?.technicalSkills?.includes(skill?.id)}
                onToggle={handleSkillToggle}
                category="technicalSkills"
              />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h4 className="text-md font-semibold text-foreground mb-4">
            {currentLanguage === 'hi' ? 'सॉफ्ट स्किल्स' : 'Soft Skills'}
          </h4>
          {errors?.softSkills && (
            <p className="text-error text-sm mb-3">{errors?.softSkills}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {softSkillsOptions?.map((skill) => (
              <SkillCard
                key={skill?.id}
                skill={skill}
                isSelected={formData?.softSkills?.includes(skill?.id)}
                onToggle={handleSkillToggle}
                category="softSkills"
              />
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h4 className="text-md font-semibold text-foreground mb-4">
            {currentLanguage === 'hi' ? 'भाषाएं' : 'Languages'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {languageOptions?.map((language) => (
              <div key={language?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <Checkbox
                  checked={formData?.languages?.includes(language?.id)}
                  onChange={(e) => handleSkillToggle('languages', language?.id)}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">{language?.label}</span>
                  <p className="text-xs text-muted-foreground">
                    {language?.level === 'native' 
                      ? (currentLanguage === 'hi' ? 'मातृभाषा' : 'Native') 
                      : (currentLanguage === 'hi' ? 'मध्यम' : 'Intermediate')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                {currentLanguage === 'hi' ? 'सुझाव:' : 'Tip:'}
              </p>
              <p>
                {currentLanguage === 'hi' ?'अपने वास्तविक कौशल का चयन करें। यह आपको बेहतर इंटर्नशिप अवसर दिलाने में मदद करेगा।' :'Select your actual skills. This will help us find better internship opportunities for you.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious} iconName="ArrowLeft">
            {currentLanguage === 'hi' ? 'पिछला' : 'Previous'}
          </Button>
          <Button type="submit" iconName="ArrowRight" iconPosition="right">
            {currentLanguage === 'hi' ? 'सेव करें और आगे बढ़ें' : 'Save and Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SkillsAssessmentForm;