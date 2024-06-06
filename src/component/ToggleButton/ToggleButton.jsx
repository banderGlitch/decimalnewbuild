import React, { useState } from 'react';
import './ToggleButton.css';

export default function ToggleButtons() {
  const [activeButton, setActiveButton] = useState('all');

  return (
    <div className="toggle-container">
      <div
        className={`slider ${activeButton}`}
      ></div>
      <div
        className={`toggle-button ${activeButton === 'all' ? 'active' : 'inactive'}`}
        onClick={() => setActiveButton('all')}
      >
        All
      </div>
      <div
        className={`toggle-button ${activeButton === 'my-jobs' ? 'active' : 'inactive'}`}
        onClick={() => setActiveButton('my-jobs')}
      >
        My Jobs
      </div>
    </div>
  );
}