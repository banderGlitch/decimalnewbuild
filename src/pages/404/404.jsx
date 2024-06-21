import React from 'react';
import './404.css';
import Logo from '../../../public/DecimalIcon2000x1469.png'
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
    const navigate = useNavigate();
    return (
        <section className='not-found-wrapper '>
            <div className='not-found'>
                <div className='first-headings'>
                    <h1>Oops... You seem to have </h1>
                    <h1>  stumbled on some buggy </h1>
                    <h1> link here.</h1>
                </div>
                {/* 2nd child */}
                <div>
                    <span>#404 ERROR</span>
                </div>
                {/* 3rd child */}
                <div>
                   <span>Our apologies!</span> 
                </div>
                {/* 4th child */}
                <div>
                    <span>Please continue to explore; while we look into it. Thanks.</span>
                </div>


                <button onClick={() => navigate('/')} className='button' style={{ display: 'flex', alignItems: 'center', gap: '5px', height:"70px", width:"230px" }}>
                    Return to Intent Page
                    <FaArrowUp onClick={() => navigate('/')} style={{ transform: 'rotate(45deg)' }} />
                </button>
            </div>


        </section>
    )
}
