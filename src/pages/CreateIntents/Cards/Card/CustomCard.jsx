import React from 'react'
import './Card.css';
import { IoIosInformationCircleOutline } from "react-icons/io";

const CustomCard = ({ title, description }) => {
    return (
        <div className="card custom-card">
        <div className="card-content">
          <h3>Chat INTENTS <IoIosInformationCircleOutline size={20}  className="info-icon"/></h3>
          <h6>Just ask your.</h6>
          <textarea className='chatinput'/>
        </div>
      </div>
    );
  };
  
export default CustomCard; 