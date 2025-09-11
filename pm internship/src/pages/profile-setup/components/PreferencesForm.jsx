import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PreferencesForm = ({ data, onUpdate, onComplete, onPrevious, currentLanguage }) => {
  const [formData, setFormData] = useState({
    preferredLocation: data?.preferredLocation || '',
    pinCode: data?.pinCode || '',
    willingToRelocate: data?.willingToRelocate || false,
    transportMode: data?.transportMode || '',
    preferredIndustries: data?.preferredIndustries || [],
    internshipDuration: data?.internshipDuration || '',
    workMode: data?.workMode || '',
    ...data
  });
  
  const [errors, setErrors] = useState({});

  const stateOptions = [
    { value: 'andhra-pradesh', label: currentLanguage === 'hi' ? 'आंध्र प्रदेश' : 'Andhra Pradesh' },
    { value: 'bihar', label: currentLanguage === 'hi' ? 'बिहार' : 'Bihar' },
    { value: 'delhi', label: currentLanguage === 'hi' ? 'दिल्ली' : 'Delhi' },
    { value: 'gujarat', label: currentLanguage === 'hi' ? 'गुजरात' : 'Gujarat' },
    { value: 'haryana', label: currentLanguage === 'hi' ? 'हरियाणा' : 'Haryana' },
    { value: 'karnataka', label: currentLanguage === 'hi' ? 'कर्नाटक' : 'Karnataka' },
    { value: 'kerala', label: currentLanguage === 'hi' ? 'केरल' : 'Kerala' },
    { value: 'maharashtra', label: currentLanguage === 'hi' ? 'महाराष्ट्र' : 'Maharashtra' },
    { value: 'punjab', label: currentLanguage === 'hi' ? 'पंजाब' : 'Punjab' },
    { value: 'rajasthan', label: currentLanguage === 'hi' ? 'राजस्थान' : 'Rajasthan' },
    { value: 'tamil-nadu', label: currentLanguage === 'hi' ? 'तमिल नाडु' : 'Tamil Nadu' },
    { value: 'uttar-pradesh', label: currentLanguage === 'hi' ? 'उत्तर प्रदेश' : 'Uttar Pradesh' },
    { value: 'west-bengal', label: currentLanguage === 'hi' ? 'पश्चिम बंगाल' : 'West Bengal' }
  ];

  const transportOptions = [
    { value: 'public-transport', label: currentLanguage === 'hi' ? 'सार्वजनिक परिवहन' : 'Public Transport' },
    { value: 'own-vehicle', label: currentLanguage === 'hi' ? 'अपना वाहन' : 'Own Vehicle' },
    { value: 'walking', label: currentLanguage === 'hi' ? 'पैदल' : 'Walking' },
    { value: 'bicycle', label: currentLanguage === 'hi' ? 'साइकिल' : 'Bicycle' }
  ];

  const industryOptions = [
    { id: 'technology', label: currentLanguage === 'hi' ? 'प्रौद्योगिकी' : 'Technology', icon: 'Laptop' },
    { id: 'healthcare', label: currentLanguage === 'hi' ? 'स्वास्थ्य सेवा' : 'Healthcare', icon: 'Heart' },
    { id: 'education', label: currentLanguage === 'hi' ? 'शिक्षा' : 'Education', icon: 'BookOpen' },
    { id: 'finance', label: currentLanguage === 'hi' ? 'वित्त' : 'Finance', icon: 'DollarSign' },
    { id: 'retail', label: currentLanguage === 'hi' ? 'खुदरा' : 'Retail', icon: 'ShoppingBag' },
    { id: 'manufacturing', label: currentLanguage === 'hi' ? 'विनिर्माण' : 'Manufacturing', icon: 'Settings' },
    { id: 'agriculture', label: currentLanguage === 'hi' ? 'कृषि' : 'Agriculture', icon: 'Wheat' },
    { id: 'government', label: currentLanguage === 'hi' ? 'सरकारी' : 'Government', icon: 'Building' }
  ];

  const durationOptions = [
    { value: '3-months', label: currentLanguage === 'hi' ? '3 महीने' : '3 Months' },
    { value: '6-months', label: currentLanguage === 'hi' ? '6 महीने' : '6 Months' },
    { value: '12-months', label: currentLanguage === 'hi' ? '12 महीने' : '12 Months' }
  ];

  const workModeOptions = [
    { value: 'office', label: currentLanguage === 'hi' ? 'ऑफिस में काम' : 'Work from Office' },
    { value: 'remote', label: currentLanguage === 'hi' ? 'घर से काम' : 'Work from Home' },
    { value: 'hybrid', label: currentLanguage === 'hi' ? 'हाइब्रिड' : 'Hybrid' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleIndustryToggle = (industryId) => {
    setFormData(prev => ({
      ...prev,
      preferredIndustries: prev?.preferredIndustries?.includes(industryId)
        ? prev?.preferredIndustries?.filter(id => id !== industryId)
        : [...prev?.preferredIndustries, industryId]
    }));
    
    if (errors?.preferredIndustries) {
      setErrors(prev => ({ ...prev, preferredIndustries: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.preferredLocation) {
      newErrors.preferredLocation = currentLanguage === 'hi' ? 'पसंदीदा स्थान चुनें' : 'Select preferred location';
    }
    
    if (!formData?.pinCode?.trim()) {
      newErrors.pinCode = currentLanguage === 'hi' ? 'पिन कोड आवश्यक है' : 'PIN code is required';
    } else if (!/^\d{6}$/?.test(formData?.pinCode)) {
      newErrors.pinCode = currentLanguage === 'hi' ? 'वैध पिन कोड दर्ज करें' : 'Enter valid PIN code';
    }
    
    if (!formData?.transportMode) {
      newErrors.transportMode = currentLanguage === 'hi' ? 'परिवहन साधन चुनें' : 'Select transport mode';
    }
    
    if (formData?.preferredIndustries?.length === 0) {
      newErrors.preferredIndustries = currentLanguage === 'hi' ?'कम से कम एक उद्योग चुनें' :'Select at least one industry';
    }
    
    if (!formData?.internshipDuration) {
      newErrors.internshipDuration = currentLanguage === 'hi' ? 'इंटर्नशिप अवधि चुनें' : 'Select internship duration';
    }
    
    if (!formData?.workMode) {
      newErrors.workMode = currentLanguage === 'hi' ? 'कार्य मोड चुनें' : 'Select work mode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
      onComplete();
    }
  };

  const IndustryCard = ({ industry, isSelected, onToggle }) => (
    <div
      onClick={() => onToggle(industry?.id)}
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
          <Icon name={industry?.icon} size={20} />
        </div>
        <span className={`text-sm font-medium ${
          isSelected ? 'text-primary' : 'text-foreground'
        }`}>
          {industry?.label}
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
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {currentLanguage === 'hi' ? 'प्राथमिकताएं' : 'Preferences'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'hi' ?'अपनी कार्य प्राथमिकताएं सेट करें' :'Set your work preferences'}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label={currentLanguage === 'hi' ? 'पसंदीदा स्थान' : 'Preferred Location'}
            options={stateOptions}
            value={formData?.preferredLocation}
            onChange={(value) => handleInputChange('preferredLocation', value)}
            error={errors?.preferredLocation}
            required
            searchable
          />

          <Input
            label={currentLanguage === 'hi' ? 'पिन कोड' : 'PIN Code'}
            type="text"
            placeholder={currentLanguage === 'hi' ? '110001' : '110001'}
            value={formData?.pinCode}
            onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
            error={errors?.pinCode}
            required
            maxLength="6"
          />

          <Select
            label={currentLanguage === 'hi' ? 'परिवहन साधन' : 'Transport Mode'}
            options={transportOptions}
            value={formData?.transportMode}
            onChange={(value) => handleInputChange('transportMode', value)}
            error={errors?.transportMode}
            required
          />

          <Select
            label={currentLanguage === 'hi' ? 'इंटर्नशिप अवधि' : 'Internship Duration'}
            options={durationOptions}
            value={formData?.internshipDuration}
            onChange={(value) => handleInputChange('internshipDuration', value)}
            error={errors?.internshipDuration}
            required
          />
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            checked={formData?.willingToRelocate}
            onChange={(e) => handleInputChange('willingToRelocate', e?.target?.checked)}
          />
          <label className="text-sm font-medium text-foreground">
            {currentLanguage === 'hi' ?'मैं स्थानांतरित होने के लिए तैयार हूं' :'I am willing to relocate'}
          </label>
        </div>

        <div>
          <h4 className="text-md font-semibold text-foreground mb-4">
            {currentLanguage === 'hi' ? 'पसंदीदा उद्योग' : 'Preferred Industries'}
          </h4>
          {errors?.preferredIndustries && (
            <p className="text-error text-sm mb-3">{errors?.preferredIndustries}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industryOptions?.map((industry) => (
              <IndustryCard
                key={industry?.id}
                industry={industry}
                isSelected={formData?.preferredIndustries?.includes(industry?.id)}
                onToggle={handleIndustryToggle}
              />
            ))}
          </div>
        </div>

        <Select
          label={currentLanguage === 'hi' ? 'कार्य मोड' : 'Work Mode'}
          options={workModeOptions}
          value={formData?.workMode}
          onChange={(value) => handleInputChange('workMode', value)}
          error={errors?.workMode}
          required
        />

        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                {currentLanguage === 'hi' ? 'प्रोफाइल पूर्ण करने के लिए तैयार!' : 'Ready to Complete Profile!'}
              </p>
              <p>
                {currentLanguage === 'hi' ?'आपकी जानकारी के आधार पर हम आपके लिए सबसे उपयुक्त इंटर्नशिप अवसर खोजेंगे।' :'Based on your information, we will find the most suitable internship opportunities for you.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious} iconName="ArrowLeft">
            {currentLanguage === 'hi' ? 'पिछला' : 'Previous'}
          </Button>
          <Button type="submit" variant="success" iconName="CheckCircle" iconPosition="right">
            {currentLanguage === 'hi' ? 'प्रोफाइल पूर्ण करें' : 'Complete Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;