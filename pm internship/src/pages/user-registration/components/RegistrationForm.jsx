import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const content = {
    en: {
      title: "Create Your Account",
      subtitle: "Join PM Internship Scheme and discover your perfect internship match",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      mobileNumber: "Mobile Number",
      mobileNumberPlaceholder: "+91 Enter your mobile number",
      email: "Email Address",
      emailPlaceholder: "Enter your email address",
      password: "Create Password",
      passwordPlaceholder: "Create a strong password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter your password",
      agreeToTerms: "I agree to the Terms & Conditions and Privacy Policy",
      createAccount: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      loginHere: "Login here",
      voiceInput: "Voice input available",
      errors: {
        fullNameRequired: "Full name is required",
        mobileRequired: "Mobile number is required",
        mobileInvalid: "Please enter a valid 10-digit mobile number",
        emailRequired: "Email address is required",
        emailInvalid: "Please enter a valid email address",
        passwordRequired: "Password is required",
        passwordWeak: "Password must be at least 8 characters with letters and numbers",
        confirmPasswordRequired: "Please confirm your password",
        passwordMismatch: "Passwords do not match",
        termsRequired: "Please accept the terms and conditions"
      }
    },
    hi: {
      title: "अपना खाता बनाएं",
      subtitle: "पीएम इंटर्नशिप योजना में शामिल हों और अपना सही इंटर्नशिप मैच खोजें",
      fullName: "पूरा नाम",
      fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
      mobileNumber: "मोबाइल नंबर",
      mobileNumberPlaceholder: "+91 अपना मोबाइल नंबर दर्ज करें",
      email: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल पता दर्ज करें",
      password: "पासवर्ड बनाएं",
      passwordPlaceholder: "एक मजबूत पासवर्ड बनाएं",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      confirmPasswordPlaceholder: "अपना पासवर्ड फिर से दर्ज करें",
      agreeToTerms: "मैं नियम व शर्तों और गोपनीयता नीति से सहमत हूं",
      createAccount: "खाता बनाएं",
      alreadyHaveAccount: "पहले से खाता है?",
      loginHere: "यहां लॉगिन करें",
      voiceInput: "आवाज इनपुट उपलब्ध",
      errors: {
        fullNameRequired: "पूरा नाम आवश्यक है",
        mobileRequired: "मोबाइल नंबर आवश्यक है",
        mobileInvalid: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें",
        emailRequired: "ईमेल पता आवश्यक है",
        emailInvalid: "कृपया एक वैध ईमेल पता दर्ज करें",
        passwordRequired: "पासवर्ड आवश्यक है",
        passwordWeak: "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए जिसमें अक्षर और संख्याएं हों",
        confirmPasswordRequired: "कृपया अपने पासवर्ड की पुष्टि करें",
        passwordMismatch: "पासवर्ड मेल नहीं खाते",
        termsRequired: "कृपया नियम और शर्तों को स्वीकार करें"
      }
    }
  };

  const t = content?.[currentLanguage];

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = t?.errors?.fullNameRequired;
    }

    // Mobile number validation
    if (!formData?.mobileNumber?.trim()) {
      newErrors.mobileNumber = t?.errors?.mobileRequired;
    } else if (!/^[6-9]\d{9}$/?.test(formData?.mobileNumber?.replace(/\D/g, '')?.slice(-10))) {
      newErrors.mobileNumber = t?.errors?.mobileInvalid;
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = t?.errors?.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = t?.errors?.emailInvalid;
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = t?.errors?.passwordRequired;
    } else if (formData?.password?.length < 8 || !/(?=.*[a-zA-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = t?.errors?.passwordWeak;
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = t?.errors?.confirmPasswordRequired;
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = t?.errors?.passwordMismatch;
    }

    // Terms validation
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = t?.errors?.termsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const userData = {
        id: Date.now(),
        fullName: formData?.fullName,
        email: formData?.email,
        mobileNumber: formData?.mobileNumber,
        registeredAt: new Date()?.toISOString()
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('authToken', 'mock-auth-token-' + Date.now());
      
      navigate('/profile-setup');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (field) => {
    // Mock voice input functionality
    console.log(`Voice input activated for ${field}`);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
          {t?.title}
        </h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          {t?.subtitle}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="relative">
          <Input
            label={t?.fullName}
            type="text"
            placeholder={t?.fullNamePlaceholder}
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => handleVoiceInput('fullName')}
            className="absolute right-3 top-9 p-1 text-muted-foreground hover:text-primary transition-colors"
            title={t?.voiceInput}
          >
            <Icon name="Mic" size={16} />
          </button>
        </div>

        {/* Mobile Number */}
        <div className="relative">
          <Input
            label={t?.mobileNumber}
            type="tel"
            placeholder={t?.mobileNumberPlaceholder}
            value={formData?.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e?.target?.value)}
            error={errors?.mobileNumber}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => handleVoiceInput('mobileNumber')}
            className="absolute right-3 top-9 p-1 text-muted-foreground hover:text-primary transition-colors"
            title={t?.voiceInput}
          >
            <Icon name="Mic" size={16} />
          </button>
        </div>

        {/* Email Address */}
        <div className="relative">
          <Input
            label={t?.email}
            type="email"
            placeholder={t?.emailPlaceholder}
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => handleVoiceInput('email')}
            className="absolute right-3 top-9 p-1 text-muted-foreground hover:text-primary transition-colors"
            title={t?.voiceInput}
          >
            <Icon name="Mic" size={16} />
          </button>
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            label={t?.password}
            type={showPassword ? "text" : "password"}
            placeholder={t?.passwordPlaceholder}
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 p-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Input
            label={t?.confirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t?.confirmPasswordPlaceholder}
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 p-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <Checkbox
            label={t?.agreeToTerms}
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          fullWidth
          className="mt-8"
        >
          {t?.createAccount}
        </Button>

        {/* Login Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            {t?.alreadyHaveAccount}{' '}
            <Link 
              to="/user-login" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t?.loginHere}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;