
import React from "react";
import { animated, useSpring } from "@react-spring/web";
import './VrfSpecific.css'


export  const VrfSpecific = ({ steps, currentStep, handleNext, handlePrevious, isStepValid , setIsStepValid  }) => {
    const styles = useSpring({
      from: { maxHeight: 0, opacity: 0 },
      to: { maxHeight: 500, opacity: 1 },
      config: { tension: 200, friction: 20 },
      overflow: 'hidden',
    });

    const handleSubmit = () => {
           // Stepper Logic 
           const isValid = true; 
           const updatedValidation = [...isStepValid];
           updatedValidation[currentStep-1] = isValid;
           setIsStepValid(updatedValidation);
        handleNext()
    }
    return (
      <animated.div style={styles}>
        <div style={{ gap: '15px' }} className='flexColStart vrfIntro'>
          <span>VRF (Verified Random Function)</span>
          <div className='flexColStart'>
            <span>Generates a verified random number between </span>
            <span> 0 and 2<sup>256</sup></span>
          </div>
  
        </div>
        <div className="step-navigation ">
        {currentStep !== 1 ? (
                            <button className='button' onClick={handlePrevious}>
                                Previous
                            </button>
                        ) : (
                            <div className="empty-div"></div>
                        )}
          {/* {currentStep !== 1 &&
            <button className='button' onClick={handlePrevious}>
              Previous
            </button>} */}
  
          <button className='button next-button' onClick={handleSubmit} disabled={currentStep === steps.length}>
            Next
          </button>
        </div>
  
      </animated.div>
    )
  }