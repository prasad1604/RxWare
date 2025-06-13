import React from 'react';
import rxLogo from '../../../../assets/rx-icon2.png';

const LogoHeader = () => {
  return (
    <>
      <div className="logo-container">
        <div className="rxware-logo">
          <img src={rxLogo} alt="RXWare Logo" className="logo-img" />
        </div>
      </div>
      <h2 className="container-welcome">
        Welcome to <span className="rxware-green">RxWare</span>
      </h2>
    </>
  );
};

export default LogoHeader;
