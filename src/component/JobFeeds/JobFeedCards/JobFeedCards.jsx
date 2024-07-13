import React from 'react'
import './JobFeedCards.css';

export default function JobFeedCards() {
    return (
        <div className="Jobcard">
            <div className="jobvcard-content">
                <span style={{ color: 'grey' }}>Job Id</span>
                <span className='jobcard-element'>VRF</span>
            </div>
            <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', gap: '60px' }}>
                <div>
                    <p>123456</p>
                </div>
                <div>
                    <p style={{ color: 'grey' }}>Enclave IP</p>
                    <p>1234567890</p>
                </div>

            </div>
            {/* <br />
            <br />
            <br /> */}
        </div>
    )
}

