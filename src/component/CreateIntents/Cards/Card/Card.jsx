import React from 'react'
import './Card.css';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GoArrowUp } from 'react-icons/go';

const Card = ({ title, description }) => {
    return (
        <div className="card">
        <div className="card-content">
          <h3>Custom Jobs <IoIosInformationCircleOutline size={20}  className="info-icon"/></h3>
          <h6>Build job to execute your custom code.</h6>
        </div>
        <div className="arrow-icon">
            <GoArrowUp style={{transform:' rotate(90deg)'}}/>
        </div>
        <br/>
        <br/>
        <br/>
      </div>
    );
  };
  
export default Card; 