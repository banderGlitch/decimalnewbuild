import React from 'react'
import './Card.css';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GoArrowUp } from 'react-icons/go';
import { Tooltip as ReactTooltip } from "react-tooltip";
// import 'react-tooltip/dist/react-tooltip.css'
import { FaArrowLeft } from "react-icons/fa";


const Card = ({ 
  title = "Custom Jobs", 
  description
 }) => {

  return (
    <div className="card">
      <div className="card-content">
        <h3>{title} <IoIosInformationCircleOutline data-tooltip-id="my-tooltip-1" size={20} className="info-icon" /></h3>
        <h6>Build job to execute your custom code.</h6>
      </div>
      <div className="arrow-icon">
        <FaArrowLeft size={"20px"}  className="rotated-arrow" />
      </div>
      <br />
      <br />
      <br />
      <ReactTooltip
        style={{fontFamily: "Poppins", borderRadius:'50px', fontSize:'60%'}}
        id="my-tooltip-1"
        place="top"
        content="For more Info!"
      />
    </div>
  );
};

export default Card; 