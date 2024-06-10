import React from 'react'
import './SideSocialButton.css';
import { FaRegDotCircle } from "react-icons/fa";

export default function SideSocialButtons() {
    const redirectToDiscord = () => {
        window.location.href = 'https://decimal.at/';
    };
    const redirectToTelegram = () => {
        window.location.href = 'https://t.me/decimalat'
    }
    const redirectToTwitter = () => {
        window.location.href = 'https://x.com/decimalat'
    }
    return (
        <div className='side-button-wrapper'>
            <div className='social-button' onClick={redirectToTwitter}>
                <FaRegDotCircle/>
                <span>Twitter</span>
            </div>
            <div className='social-button' onClick={redirectToTelegram}>
                <FaRegDotCircle  />
                <span>Telegram</span>
            </div>
            <div className='social-button'onClick={redirectToDiscord}>
                <FaRegDotCircle />
                <span>Discord</span>
            </div>

        </div>
    )
}
