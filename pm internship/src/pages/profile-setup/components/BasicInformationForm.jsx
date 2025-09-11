import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BasicInformationForm = ({ data, onUpdate, onNext, currentLanguage }) => {
  const [formData, setFormData] = useState({
    fullName: data?.fullName || '',
    email: data?.email || '',
    phone: data?.phone || '',
    dateOfBirth: data?.dateOfBirth || '',
    gender: data?.gender || '',
    category: data?.category || '',
    aadharNumber: data?.aadharNumber || '',
    ...data
  });
  
  const [errors, setErrors] = useState({});
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const genderOptions = [
    { value: 'male', label: currentLanguage === 'hi' ? 'पुरुष' : 'Male' },
    { value: 'female', label: currentLanguage === 'hi' ? 'महिला' : 'Female' },
    { value: 'other', label: currentLanguage === 'hi' ? 'अन्य' : 'Other' }
  ];

  const categoryOptions = [
    { value: 'general', label: currentLanguage === 'hi' ? 'सामान्य' : 'General' },
    { value: 'obc', label: 'OBC' },
    { value: 'sc', label: 'SC' },
    { value: 'st', label: 'ST' },
    { value: 'ews', label: 'EWS' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = currentLanguage === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Enter valid email';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = currentLanguage === 'hi' ? 'फोन नंबर आवश्यक है' : 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone)) {
      newErrors.phone = currentLanguage === 'hi' ? 'वैध फोन नंबर दर्ज करें' : 'Enter valid phone number';
    }
    
    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = currentLanguage === 'hi' ? 'जन्म तिथि आवश्यक है' : 'Date of birth is required';
    }
    
    if (!formData?.gender) {
      newErrors.gender = currentLanguage === 'hi' ? 'लिंग चुनें' : 'Select gender';
    }
    
    if (!formData?.category) {
      newErrors.category = currentLanguage === 'hi' ? 'श्रेणी चुनें' : 'Select category';
    }

    if (!formData?.aadharNumber?.trim()) {
      newErrors.aadharNumber = currentLanguage === 'hi' ? 'आधार नंबर आवश्यक है' : 'Aadhar number is required';
    } else if (!/^\d{12}$/?.test(formData?.aadharNumber)) {
      newErrors.aadharNumber = currentLanguage === 'hi' ? 'वैध आधार नंबर दर्ज करें' : 'Enter valid Aadhar number';
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

  const startVoiceInput = (field) => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.onstart = () => setIsVoiceActive(true);
      recognition.onend = () => setIsVoiceActive(false);
      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        handleInputChange(field, transcript);
      };
      recognition?.start();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {currentLanguage === 'hi' ? 'बुनियादी जानकारी' : 'Basic Information'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'hi' ?'अपनी व्यक्तिगत जानकारी दर्ज करें' :'Enter your personal details'}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              label={currentLanguage === 'hi' ? 'पूरा नाम' : 'Full Name'}
              type="text"
              placeholder={currentLanguage === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              error={errors?.fullName}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => startVoiceInput('fullName')}
              className="absolute right-2 top-8"
            >
              <Icon name={isVoiceActive ? 'MicOff' : 'Mic'} size={16} />
            </Button>
          </div>

          <Input
            label={currentLanguage === 'hi' ? 'ईमेल पता' : 'Email Address'}
            type="email"
            placeholder={currentLanguage === 'hi' ? 'your.email@example.com' : 'your.email@example.com'}
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label={currentLanguage === 'hi' ? 'फोन नंबर' : 'Phone Number'}
            type="tel"
            placeholder={currentLanguage === 'hi' ? '9876543210' : '9876543210'}
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />

          <Input
            label={currentLanguage === 'hi' ? 'जन्म तिथि' : 'Date of Birth'}
            type="date"
            value={formData?.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            error={errors?.dateOfBirth}
            required
          />

          <Select
            label={currentLanguage === 'hi' ? 'लिंग' : 'Gender'}
            options={genderOptions}
            value={formData?.gender}
            onChange={(value) => handleInputChange('gender', value)}
            error={errors?.gender}
            required
          />

          <Select
            label={currentLanguage === 'hi' ? 'श्रेणी' : 'Category'}
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
          />
        </div>

        <Input
          label={currentLanguage === 'hi' ? 'आधार नंबर' : 'Aadhar Number'}
          type="text"
          placeholder={currentLanguage === 'hi' ? '1234 5678 9012' : '1234 5678 9012'}
          value={formData?.aadharNumber}
          onChange={(e) => handleInputChange('aadharNumber', e?.target?.value)}
          error={errors?.aadharNumber}
          required
          description={currentLanguage === 'hi' ?'आपकी जानकारी सुरक्षित और गोपनीय रखी जाएगी' :'Your information will be kept secure and confidential'}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" iconName="ArrowRight" iconPosition="right">
            {currentLanguage === 'hi' ? 'सेव करें और आगे बढ़ें' : 'Save and Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicInformationForm;