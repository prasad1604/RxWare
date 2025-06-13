import {useState, useEffect, useCallback } from 'react';
import api from '../Components/Auth/api';
import { SignupContext } from './SignupContext';

export const SignupProvider = ({ children }) => {
  const [signupData, setSignupData] = useState(() => {
    const saved = sessionStorage.getItem('signupData');
    return saved ? JSON.parse(saved) : {
      email: '',
      otp: '',
      otpToken: '',
      fullName: '',
      password: '',
      showPassword: false,
      orgName: '',
      isSubdomainAvailable: false
    };
  });

  // Save to session storage on update
  useEffect(() => {
    sessionStorage.setItem('signupData', JSON.stringify(signupData));
  }, [signupData]);

  // Check subdomain availability
  useEffect(() => {
    const checkSubdomain = async () => {
      if (signupData.orgName && signupData.orgName.length > 2) {
        try {
          const subdomain = signupData.orgName.toLowerCase().replace(/\s+/g, '-');
          // CORRECTED ENDPOINT: added '/auth' prefix
          const response = await api.get(`/auth/subdomain/check?name=${subdomain}`);
          setSignupData(prev => ({ 
            ...prev, 
            isSubdomainAvailable: response.data.available 
          }));
        } catch {
          setSignupData(prev => ({ ...prev, isSubdomainAvailable: false }));
        }
      }
    };
    
    const timer = setTimeout(checkSubdomain, 500);
    return () => clearTimeout(timer);
  }, [signupData.orgName]);

  const updateSignupData = useCallback((newData) => {
    setSignupData(prev => ({ ...prev, ...newData }));
  }, []);

  return (
    <SignupContext.Provider value={{ signupData, updateSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};