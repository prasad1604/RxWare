import React, { useContext, useState, useEffect, useRef } from 'react';
import { SignupContext } from '../../../../context/SignupContext';

const StepOTP = ({ loading, onSubmit, onResend, clearError }) => {
  const { signupData, updateSignupData } = useContext(SignupContext);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [expiryTime, setExpiryTime] = useState(900);
  const [resendTime, setResendTime] = useState(60);
  const [error, setLocalError] = useState('');
  const inputsRef = useRef([]);

  useEffect(() => {
    updateSignupData({ otp: otp.join('') }); // Ensure this sends string like "1234"
  }, [otp, updateSignupData]);

  useEffect(() => {
    const timer = expiryTime > 0 && setInterval(() => setExpiryTime(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [expiryTime]);

  useEffect(() => {
    const timer = resendTime > 0 && setInterval(() => setResendTime(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTime]);

  const focusInput = (index) => {
    const next = inputsRef.current[index];
    if (next) next.focus();
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^[0-9]{0,1}$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    clearError();
    setLocalError('');

    if (val && index < 3) focusInput(index + 1);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);
      if (index < 3) focusInput(index + 1);
    }
  };

  const handleResend = () => {
    setResendTime(60);
    setExpiryTime(900);
    setOtp(['', '', '', '']);
    clearError();
    setLocalError('');
    onResend();
    focusInput(0);
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="form-step" style={{ marginTop: '20px' }}>
      <h2>Verify Your Email</h2>
      <p className="otp-instructions">
        We've sent a 4-digit code to <strong>{signupData.email}</strong>
      </p>
      <p>Please enter the OTP to verify your account</p>

      <div className="form-group" style={{ marginTop: '10px' }}>
        <label>Verification Code</label>
        <div className="otp-container">
          {[0, 1, 2, 3].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              ref={(el) => (inputsRef.current[i] = el)}
              value={otp[i]}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="otp-input"
            />
          ))}
        </div>

        {/* Show error below boxes */}
        {error && (
          <div className="error-message" style={{ marginTop: '10px' }}>
            {error}
          </div>
        )}

        <p className="expiry-timer">
          {expiryTime > 0 ? `Your code will expire in ${formatTime(expiryTime)}` : 'OTP expired'}
        </p>
      </div>

      <button
        className="red-gradient-btn"
        onClick={onSubmit}
        disabled={loading || expiryTime <= 0 || otp.join('').length !== 4}
      >
        {loading ? 'Verifying...' : 'Validate OTP'}
      </button>

      <div className="resend-link" style={{ textAlign: 'center', marginTop: '1rem' }}>
        {resendTime > 0 ? (
          <span>Resend OTP in {formatTime(resendTime)}</span>
        ) : (
          <button type="button" onClick={handleResend} className="link-button">
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default StepOTP;
