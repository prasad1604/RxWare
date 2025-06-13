import React, { useContext } from 'react';
import { SignupContext } from '../../../../context/SignupContext';

const StepEmail = ({ loading, onSubmit }) => {
  const { signupData, updateSignupData } = useContext(SignupContext);

  return (
    <div className="form-step step1-container">
      <div className="form-content-wrapper">
        <h2>Create Your RXWare Account</h2>
        <div className="form-group email-input">
          <label className="step1-label">Enter your email</label>
          <input
            type="email"
            value={signupData.email || ''}
            onChange={(e) => updateSignupData({ email: e.target.value })}
            placeholder="your@company.com"
          />
        </div>
        <button
          className="red-gradient-btn"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Verification Code'}
        </button>
      </div>
    </div>
  );
};

export default StepEmail;
