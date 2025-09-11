import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EducationalBackgroundForm = ({ data, onUpdate, onNext, onPrevious, currentLanguage }) => {
  const [formData, setFormData] = useState({
    highestQualification: data?.highestQualification || '',
    instituteName: data?.instituteName || '',
    fieldOfStudy: data?.fieldOfStudy || '',
    graduationYear: data?.graduationYear || '',
    percentage: data?.percentage || '',
    currentStatus: data?.currentStatus || '',
    ...data
  });
  
  const [errors, setErrors] = useState({});

  const qualificationOptions = [
    { value: '10th', label: currentLanguage === 'hi' ? '10वीं कक्षा' : '10th Class' },
    { value: '12th', label: currentLanguage === 'hi' ? '12वीं कक्षा' : '12th Class' },
    { value: 'diploma', label: currentLanguage === 'hi' ? 'डिप्लोमा' : 'Diploma' },
    { value: 'graduation', label: currentLanguage === 'hi' ? 'स्नातक' : 'Graduation' },
    { value: 'post-graduation', label: currentLanguage === 'hi' ? 'स्नातकोत्तर' : 'Post Graduation' }
  ];

  const fieldOfStudyOptions = [
    { value: 'science', label: currentLanguage === 'hi' ? 'विज्ञान' : 'Science' },
    { value: 'commerce', label: currentLanguage === 'hi' ? 'वाणिज्य' : 'Commerce' },
    { value: 'arts', label: currentLanguage === 'hi' ? 'कला' : 'Arts' },
    { value: 'engineering', label: currentLanguage === 'hi' ? 'इंजीनियरिंग' : 'Engineering' },
    { value: 'medical', label: currentLanguage === 'hi' ? 'चिकित्सा' : 'Medical' },
    { value: 'management', label: currentLanguage === 'hi' ? 'प्रबंधन' : 'Management' },
    { value: 'computer-science', label: currentLanguage === 'hi' ? 'कंप्यूटर साइंस' : 'Computer Science' },
    { value: 'other', label: currentLanguage === 'hi' ? 'अन्य' : 'Other' }
  ];

  const statusOptions = [
    { value: 'student', label: currentLanguage === 'hi' ? 'छात्र' : 'Student' },
    { value: 'graduate', label: currentLanguage === 'hi' ? 'स्नातक' : 'Graduate' },
    { value: 'job-seeker', label: currentLanguage === 'hi' ? 'नौकरी की तलाश में' : 'Job Seeker' },
    { value: 'working', label: currentLanguage === 'hi' ? 'कार्यरत' : 'Working' }
  ];

  const currentYear = new Date()?.getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => {
    const year = currentYear - i;
    return { value: year?.toString(), label: year?.toString() };
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.highestQualification) {
      newErrors.highestQualification = currentLanguage === 'hi' ? 'योग्यता चुनें' : 'Select qualification';
    }
    
    if (!formData?.instituteName?.trim()) {
      newErrors.instituteName = currentLanguage === 'hi' ? 'संस्थान का नाम आवश्यक है' : 'Institute name is required';
    }
    
    if (!formData?.fieldOfStudy) {
      newErrors.fieldOfStudy = currentLanguage === 'hi' ? 'अध्ययन क्षेत्र चुनें' : 'Select field of study';
    }
    
    if (!formData?.graduationYear) {
      newErrors.graduationYear = currentLanguage === 'hi' ? 'स्नातक वर्ष चुनें' : 'Select graduation year';
    }
    
    if (!formData?.percentage?.trim()) {
      newErrors.percentage = currentLanguage === 'hi' ? 'प्रतिशत आवश्यक है' : 'Percentage is required';
    } else if (isNaN(formData?.percentage) || formData?.percentage < 0 || formData?.percentage > 100) {
      newErrors.percentage = currentLanguage === 'hi' ? 'वैध प्रतिशत दर्ज करें' : 'Enter valid percentage';
    }
    
    if (!formData?.currentStatus) {
      newErrors.currentStatus = currentLanguage === 'hi' ? 'वर्तमान स्थिति चुनें' : 'Select current status';
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

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="GraduationCap" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {currentLanguage === 'hi' ? 'शैक्षणिक पृष्ठभूमि' : 'Educational Background'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'hi' ?'अपनी शिक्षा की जानकारी दर्ज करें' :'Enter your educational details'}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label={currentLanguage === 'hi' ? 'उच्चतम योग्यता' : 'Highest Qualification'}
            options={qualificationOptions}
            value={formData?.highestQualification}
            onChange={(value) => handleInputChange('highestQualification', value)}
            error={errors?.highestQualification}
            required
          />

          <Input
            label={currentLanguage === 'hi' ? 'संस्थान का नाम' : 'Institute Name'}
            type="text"
            placeholder={currentLanguage === 'hi' ? 'अपने संस्थान का नाम दर्ज करें' : 'Enter your institute name'}
            value={formData?.instituteName}
            onChange={(e) => handleInputChange('instituteName', e?.target?.value)}
            error={errors?.instituteName}
            required
          />

          <Select
            label={currentLanguage === 'hi' ? 'अध्ययन क्षेत्र' : 'Field of Study'}
            options={fieldOfStudyOptions}
            value={formData?.fieldOfStudy}
            onChange={(value) => handleInputChange('fieldOfStudy', value)}
            error={errors?.fieldOfStudy}
            required
          />

          <Select
            label={currentLanguage === 'hi' ? 'स्नातक वर्ष' : 'Graduation Year'}
            options={yearOptions}
            value={formData?.graduationYear}
            onChange={(value) => handleInputChange('graduationYear', value)}
            error={errors?.graduationYear}
            required
          />

          <Input
            label={currentLanguage === 'hi' ? 'प्रतिशत/CGPA' : 'Percentage/CGPA'}
            type="number"
            placeholder={currentLanguage === 'hi' ? '85.5' : '85.5'}
            value={formData?.percentage}
            onChange={(e) => handleInputChange('percentage', e?.target?.value)}
            error={errors?.percentage}
            required
            min="0"
            max="100"
            step="0.1"
          />

          <Select
            label={currentLanguage === 'hi' ? 'वर्तमान स्थिति' : 'Current Status'}
            options={statusOptions}
            value={formData?.currentStatus}
            onChange={(value) => handleInputChange('currentStatus', value)}
            error={errors?.currentStatus}
            required
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                {currentLanguage === 'hi' ? 'महत्वपूर्ण सूचना:' : 'Important Note:'}
              </p>
              <p>
                {currentLanguage === 'hi' ?'आपकी शैक्षणिक जानकारी का उपयोग उपयुक्त इंटर्नशिप अवसरों की सिफारिश के लिए किया जाएगा।' :'Your educational information will be used to recommend suitable internship opportunities.'}
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

export default EducationalBackgroundForm;