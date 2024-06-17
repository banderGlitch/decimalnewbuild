import React, { useState } from 'react';
import './ToggleButton.css';

export default function ToggleButtons({
  disabled, 
  activeButton, setActiveButton, roleType_1, roleType_2
}) {
  // console.log("activeButton roleType_1, roleType_2 ", activeButton,
  //   roleType_1, roleType_2
  // )

  return (
    <div className="toggle-container">
      <div
        className={`slider ${activeButton}`}
      ></div>
      <div
       className={`toggle-button ${activeButton === roleType_1 ? 'active' : 'inactive'}`}
        // className={`toggle-button ${activeButton === 'all' ? 'active' : 'inactive'}`}
        // onClick={() => setActiveButton('all')}
        onClick={() =>
          {   
            !disabled && 
            setActiveButton(roleType_1)

          } 
         }
      >
        {/* All */}
        {roleType_1}
      </div>
      <div
        className={`toggle-button ${activeButton === roleType_2 ? 'active' : 'inactive'}`}
        onClick={() => {!disabled && setActiveButton(roleType_2)} }
        disabled={disabled}
      >
        {/* My Jobs */}
        {roleType_2}
      </div>
    </div>
  );
}