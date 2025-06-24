import React, { useContext } from 'react';
import { SignupContext } from '../../../../context/SignupContext';

const StepDetails = ({ onSubmit }) => {
  const { signupData, updateSignupData } = useContext(SignupContext);

  // Password strength indicator
  const passwordStrength = () => {
    if (!signupData.password) return 0;
    if (signupData.password.length < 4) return 1;
    if (signupData.password.length < 8) return 2;
    if (!/[^A-Za-z0-9]/.test(signupData.password)) return 3;
    return 4;
  };

  const strength = passwordStrength();
  const strengthMessages = [
    'Must be 8 characters long',
    'Must be 8 characters long',
    'Must be 8 characters long',
    'Password is strong',
    'Password is very strong'
  ];

  return (
    <div className="form-step">
      <h2>Complete Your Profile</h2>
      <div className="form-group name-group">
        <div className="name-row">
          <div className="form-group name-field">
            <label>First Name <span className="required-star">*</span></label>
            <input
              type="text"
              value={signupData.firstName || ''}
              onChange={(e) => updateSignupData({ firstName: e.target.value })}
              placeholder="Enter your first name"
              className="white-input"
            />
          </div>
          <div className="form-group name-field">
            <label>Last Name</label>
            <input
              type="text"
              value={signupData.lastName || ''}
              onChange={(e) => updateSignupData({ lastName: e.target.value })}
              placeholder="Enter your last name"
              className="white-input"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Password <span className="required-star">*</span></label>
        <div className="password-input">
          <input
            type={signupData.showPassword ? 'text' : 'password'}
            value={signupData.password || ''}
            onChange={(e) => updateSignupData({ password: e.target.value })}
            placeholder="Enter your password"
            className="white-input"
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => updateSignupData({ showPassword: !signupData.showPassword })}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 8.74 9.24 6.5 12 6.5C14.76 6.5 17 8.74 17 11.5C17 14.26 14.76 16.5 12 16.5ZM12 8.5C10.34 8.5 9 9.84 9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5C15 9.84 13.66 8.5 12 8.5Z"
                fill="currentColor"
              />
              {!signupData.showPassword && (
                <path
                  d="M19.5 4.5L4.5 19.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="password-strength">
          <div className="strength-meter">
            {[1, 2, 3, 4].map((level) => (
              <div 
                key={level} 
                className={`strength-section ${
                  level <= strength ? 'active' : ''
                } ${
                  strength === 1 ? 'weak' :
                  strength === 2 ? 'weak' :
                  strength === 3 ? 'medium' : 'strong'
                }`}
              />
            ))}
          </div>
          <div className={`strength-text ${
            strength < 3 ? 'invalid' : 
            strength === 3 ? 'medium-text' : 'strong-text'
          }`}>
            {strengthMessages[strength]}
          </div>
        </div>
      </div>
      <button className="red-gradient-btn" onClick={onSubmit}>
        Continue
      </button>
    </div>
  );
};

export default StepDetails;