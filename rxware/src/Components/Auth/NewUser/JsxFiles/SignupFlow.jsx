import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupContext } from '../../../../context/SignupContext';
import api from '../../api';

import '../Styles/Global.css';
import '../Styles/Progress.css';
import '../Styles/Step1.css';
import '../Styles/Step2.css';
import '../Styles/Step3.css';
import '../Styles/Step4.css';

import StepEmail from './StepEmail';
import StepOTP from './StepOTP';
import StepDetails from './StepDetails';
import StepSite from './StepSite';
import LogoHeader from './LogoHeader';
import ProgressSteps from './ProgressSteps';

const SignupFlow = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signupData, updateSignupData } = useContext(SignupContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      document.body.style.backgroundSize = 'cover';
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEmailSubmit = async () => {
    if (!signupData.email || !/^\S+@\S+\.\S+$/.test(signupData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      await api.signup.email(signupData.email);
      setStep(2);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (!signupData.otp || signupData.otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.signup.verifyOTP({
        email: signupData.email,
        otp: signupData.otp,
      });
      updateSignupData({ otpToken: data.token });
      setStep(3);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = () => {
    if (!signupData.fullName || signupData.fullName.trim().length < 2) {
      setError('Please enter your full name');
      return;
    }
    if (!signupData.password || signupData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setStep(4);
    setError('');
  };

  const handleSiteSubmit = async () => {
    if (!signupData.orgName || signupData.orgName.trim().length < 2) {
      setError('Please enter an organization name');
      return;
    }
    setLoading(true);
    try {
      await api.signup.createSite({
        orgName: signupData.orgName,
        token: signupData.otpToken,
      });
      navigate('/profile/update');
    } catch (err) {
      setError(err.response?.data?.message || 'Site creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="welcome-message">
        <h1>Warehouse wisdom, at your fingertips</h1>
        <p>Manage inventory with ease,<br />unlock team potential</p>
      </div>
      <div className="signup-flow-container">
        <LogoHeader />
        <ProgressSteps currentStep={step} />
        <div className="signup-form">
          {error && <div className="error-message">{error}</div>}
          {step === 1 && (
            <StepEmail loading={loading} onSubmit={handleEmailSubmit} />
          )}
          {step === 2 && (
            <StepOTP
              loading={loading}
              onResend={handleEmailSubmit}
              onSubmit={handleOTPSubmit}
            />
          )}
          {step === 3 && <StepDetails onSubmit={handleDetailsSubmit} />}
          {step === 4 && (
            <StepSite loading={loading} onSubmit={handleSiteSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupFlow;
