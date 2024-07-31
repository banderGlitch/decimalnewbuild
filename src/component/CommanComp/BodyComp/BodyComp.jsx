import React, { useState, useEffect, act } from 'react';
import { FaRegDotCircle } from "react-icons/fa";
import { useFormSelectors } from '../../../redux/selector';
import { setJsonBody } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';

const BodyComp = ({ ...props }) => {
    const dispatch = useDispatch();
    const {jsonText} = useFormSelectors()
    const [error, setError] = useState(''); // State to hold the error message
  
    const handleJsonChange = (event) => {
      const value = event.target.value;
      dispatch(setJsonBody(value)); 
      // setJsonBody(value);
  
      try {
        JSON.parse(value);
        setError('');
      } catch (e) {
        setError('Invalid JSON');
      }
    };
  

    return (
        <div style={{position:"relative", bottom:"40px"}} >
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <div style={{display:"flex", alignItems:"center", gap:"6px"}}>
                <FaRegDotCircle size={"14px"}/>
                <p style={{fontSize:"poppins", position:"relative", bottom:"2px"}}>raw</p>
                </div>
                <p style={{fontSize:"poppins"}}>Json</p>
            </div>
            <div>
                <textarea
                    value={jsonText}
                    onChange={handleJsonChange}
                    style={{ borderRadius: "4px", fontSize: "12px", outline: 'none', resize: 'none', height: "300px", border: '1px solid #ccc', width: '100%', fontFamily: 'poppins' }}
                />

            </div>
        </div>

    )

}

export default BodyComp;

