import React from 'react';
import './ToggleButton.css';

export default function ToggleButtons({ disabled,
  activeButton, setActiveButton, roleType_1, roleType_2
}) {

  const roleChecker = (roleType) => {
    if (roleType === 'all') {
      return 'All'
    } else if (roleType === 'my-jobs') {
      return 'My Jobs'
    } else {
      return roleType
    }

  }

  return (
    <div className="toggle-container">
      <div className={`slider ${activeButton}`}></div>
      <div
        className={`toggle-button ${activeButton === roleType_1 ? 'active' : 'inactive'}`}
        onClick={() => { !disabled && setActiveButton(roleType_1) }}>
          {roleChecker(roleType_1)}
      </div>
      <div
        className={`toggle-button ${activeButton === roleType_2 ? 'active' : 'inactive'}`}
        onClick={() => { !disabled && setActiveButton(roleType_2) }}
      >
        {roleChecker(roleType_2)}
      </div>
    </div>
  );
}