import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';


const LoginForm = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    credential: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    student: { email: 'student@example.com', password: 'Student123' },
    admin: { email: 'admin@internmatch.gov.in', password: 'Admin123' },
    employer: { email: 'hr@company.com', password: 'Employer123' }
  };

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your InternMatch AI account',
      credentialLabel: 'Mobile Number or Email',
      credentialPlaceholder: 'Enter your mobile number or email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      loginButton: 'Sign In',
      forgotPassword: 'Forgot Password?',
      newUser: "Don\'t have an account?",
      register: 'Register here',
      invalidCredentials: 'Invalid credentials. Please try again.',
      credentialRequired: 'Mobile number or email is required',
      passwordRequired: 'Password is required',
      mockCredentialsTitle: 'Demo Credentials:',
      studentCreds: 'Student: student@example.com / Student123',
      adminCreds: 'Admin: admin@internmatch.gov.in / Admin123',
      employerCreds: 'Employer: hr@company.com / Employer123'
    },
    hi: {
      title: 'वापस स्वागत है',
      subtitle: 'अपने InternMatch AI खाते में साइन इन करें',
      credentialLabel: 'मोबाइल नंबर या ईमेल',
      credentialPlaceholder: 'अपना मोबाइल नंबर या ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      rememberMe: 'मुझे याद रखें',
      loginButton: 'साइन इन करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      newUser: 'खाता नहीं है?',
      register: 'यहाँ रजिस्टर करें',
      invalidCredentials: 'गलत क्रेडेंशियल। कृपया पुनः प्रयास करें।',
      credentialRequired: 'मोबाइल नंबर या ईमेल आवश्यक है',
      passwordRequired: 'पासवर्ड आवश्यक है',
      mockCredentialsTitle: 'डेमो क्रेडेंशियल:',
      studentCreds: 'छात्र: student@example.com / Student123',
      adminCreds: 'एडमिन: admin@internmatch.gov.in / Admin123',
      employerCreds: 'नियोक्ता: hr@company.com / Employer123'
    }
  };

  const t = content?.[currentLanguage];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.credential?.trim()) {
      newErrors.credential = t?.credentialRequired;
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = t?.passwordRequired;
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
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isValidCredential = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.credential && cred?.password === formData?.password
      );
      
      if (isValidCredential) {
        // Store auth token and user data
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userData', JSON.stringify({
          email: formData?.credential,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));
        
        navigate('/recommendation-dashboard');
      } else {
        setErrors({ general: t?.invalidCredentials });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">{t?.title}</h1>
          <p className="text-muted-foreground">{t?.subtitle}</p>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">{t?.mockCredentialsTitle}</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>{t?.studentCreds}</p>
            <p>{t?.adminCreds}</p>
            <p>{t?.employerCreds}</p>
          </div>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3">
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        )}

        {/* Credential Input */}
        <Input
          label={t?.credentialLabel}
          type="text"
          placeholder={t?.credentialPlaceholder}
          value={formData?.credential}
          onChange={(e) => handleInputChange('credential', e?.target?.value)}
          error={errors?.credential}
          required
          className="w-full"
        />

        {/* Password Input */}
        <Input
          label={t?.passwordLabel}
          type="password"
          placeholder={t?.passwordPlaceholder}
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          className="w-full"
        />

        {/* Remember Me */}
        <Checkbox
          label={t?.rememberMe}
          checked={formData?.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          className="text-sm"
        />

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {t?.loginButton}
        </Button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
            onClick={() => {
              // Handle forgot password
              alert('Forgot password functionality would be implemented here');
            }}
          >
            {t?.forgotPassword}
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">{t?.newUser}</p>
          <Button
            variant="outline"
            onClick={() => navigate('/user-registration')}
            fullWidth
          >
            {t?.register}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;