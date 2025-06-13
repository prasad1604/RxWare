import React, { useContext } from 'react';
import { SignupContext } from '../../../../context/SignupContext';

const StepSite = ({ loading, onSubmit }) => {
  const { signupData, updateSignupData } = useContext(SignupContext);

  const formatSubdomain = (name) =>
    name?.toLowerCase().replace(/\s+/g, '-') || '';

  return (
    <div className="form-step">
      <h2>Set Up Your Warehouse</h2>
      <div className="form-group">
        <label>Organization Name</label>
        <input
          type="text"
          value={signupData.orgName || ''}
          onChange={(e) => updateSignupData({ orgName: e.target.value })}
          placeholder="Your company name"
        />
      </div>
      <div className="subdomain-preview">
        <label>Your Warehouse URL</label>
        <div className="preview-box">
          {signupData.orgName
            ? `${formatSubdomain(signupData.orgName)}.rxware.rigelx.io`
            : 'your-company.rxware.rigelx.io'}
        </div>
        <div className="availability-status">
          {signupData.orgName &&
            (signupData.isSubdomainAvailable ? (
              <span className="available">✓ Available</span>
            ) : (
              <span className="unavailable">✗ Already taken</span>
            ))}
        </div>
      </div>
      <button
        className="red-gradient-btn"
        onClick={onSubmit}
        disabled={loading || !signupData.isSubdomainAvailable}
      >
        {loading ? 'Creating...' : 'Complete Setup'}
      </button>
    </div>
  );
};

export default StepSite;
