import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  const steps = ['Email', 'OTP', 'Details', 'Create Site'];

  return (
    <div className="signup-progress">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const status =
          currentStep === stepNum
            ? 'active'
            : currentStep > stepNum
            ? 'completed'
            : '';
        return (
          <div key={stepNum} className={`progress-step ${status}`}>
            <div className="step-number">{stepNum}</div>
            <div className="step-label">{label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
