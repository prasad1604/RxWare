import React, { useContext } from 'react';
import { SignupContext } from '../../../../context/SignupContext';

const StepDetails = ({ onSubmit }) => {
  const { signupData, updateSignupData } = useContext(SignupContext);

  return (
    <div className="form-step">
      <h2>Complete Your Profile</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={signupData.fullName || ''}
          onChange={(e) => updateSignupData({ fullName: e.target.value })}
          placeholder="Your full name"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <div className="password-input">
          <input
            type={signupData.showPassword ? 'text' : 'password'}
            value={signupData.password || ''}
            onChange={(e) => updateSignupData({ password: e.target.value })}
            placeholder="Create password (min 8 characters)"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() =>
              updateSignupData({ showPassword: !signupData.showPassword })
            }
          >
            {signupData.showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <button className="red-gradient-btn" onClick={onSubmit}>
        Continue
      </button>
    </div>
  );
};

export default StepDetails;
