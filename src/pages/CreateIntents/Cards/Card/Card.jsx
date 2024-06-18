import React from 'react'
import './Card.css';
import {  useNavigate} from 'react-router-dom'; 
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GoArrowUp } from 'react-icons/go';
import { Tooltip as ReactTooltip } from "react-tooltip";
// import 'react-tooltip/dist/react-tooltip.css'
import { FaArrowLeft } from "react-icons/fa";


const Card = ({ 
  app="",
  title = "Custom Jobs", 
  description,
  info="For more info",
  // info="For more Info",
  id
 }) => {

  console.log("Info-==-->",info)

  const navigate = useNavigate();

  const handleNavigate = (appnName) => {
      navigate(`/create/${appnName}`)
      
  }

  return (
    <div className="card">
      <div className="card-content">
        {/* <h3>{title} <IoIosInformationCircleOutline data-tooltip-id="my-tooltip-1" size={20} className="info-icon" /></h3> */}
        <h3>{title} <IoIosInformationCircleOutline data-tooltip-id="data-tooltip-id" size={20} className="info-icon" /></h3>
        <h6>Build job to execute your custom code.</h6>
      </div>
      <div className="arrow-icon" onClick={() => handleNavigate(app)}>
        <FaArrowLeft onClick={() => handleNavigate(app)} size={"20px"}  className="rotated-arrow" />
      </div>
      <ReactTooltip
        style={{fontFamily: "Poppins", borderRadius:'50px', fontSize:'60%'}}
        id= "data-tooltip-id"
        place="top"
        content={info}
      />
    </div>
  );
};

export default Card; 