import React from 'react'
import './SideSocialButton.css';
import { FaRegDotCircle } from "react-icons/fa";

export default function SideSocialButtons() {
    return (
        <div className='side-button-wrapper'>
            <div className='social-button'>
                <FaRegDotCircle/>
                <span>Twitter</span>
            </div>
            <div className='social-button'>
                <FaRegDotCircle  />
                <span>Telegram</span>
            </div>
            <div className='social-button'>
                <FaRegDotCircle />
                <span>Discord</span>
            </div>

        </div>
    )
}
