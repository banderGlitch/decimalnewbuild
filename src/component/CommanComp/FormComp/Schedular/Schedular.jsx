import React, { useState, useEffect } from 'react'
import './Schedular.css';
import { useSpring, animated } from '@react-spring/web';
import { Box } from '@mantine/core';
import CronJobSettings from './Cronjob';
import cronstrue from 'cronstrue';
// import  from './UsecronReducer';
import ToggleButtons from '../../../ToggleButton/ToggleButton';
export const Schedular = ({
    roleType_1,
    roleType_2,
    steps,
    currentStep,
    handleNext,
    handlePrevious,
    propertyDetails,
    setPropertyDetails,
    isStepValid,
    setIsStepValid
}) => {



    const [activeButton, set_ActiveButton] = useState(roleType_1);
    const [humanReadable, setHumanReadable] = useState('');

    const [cronvalue,setCroneValue ] = useState();


    useEffect(() => {
        const cronExpression = cronvalue || propertyDetails.timer || '@daily';
        const result = cronstrue.toString(cronExpression);
        setHumanReadable(result);
      }, [cronvalue, propertyDetails.timer]);


    const styles = useSpring({
        from: { maxHeight: 0, opacity: 0 },
        to: { maxHeight: 500, opacity: 1 },
        config: { tension: 200, friction: 20 },
        overflow: 'hidden',
    });

    

    const handleSubmit = () => {
        setPropertyDetails((prev) => ({ ...prev, timer : cronvalue }))
        const result = cronstrue.toString(cronvalue);
        setHumanReadable(result);
        const isValid = true;
        const updatedValidation = [...isStepValid];
        updatedValidation[currentStep - 1] = isValid;
        setIsStepValid(updatedValidation);
        handleNext()
    }

    const textStyles = useSpring({
        from: { opacity: 0 },
        to: { opacity: humanReadable ? 1 : 0 },
        reset: true,
        config: { duration: 500 },
    });


    return (
        <animated.div style={styles}>
           
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="flexColStart schedular-wrapper">
                    <Box style={{ display: "flex", fontSize: "150%", fontWeight: "bold" }}>Scheduler</Box>
                    <span>Specify the trigger conditions as when to run job</span>
                    <div style={{ padding: '15px' , gap:"25px"}} className='flexColStart'>
                        <ToggleButtons disabled={true} roleType_1={roleType_1} roleType_2={roleType_2} activeButton={activeButton} setActiveButton={set_ActiveButton} />
                        <div style={{display:'flex', alignItems:'center', gap:"12px"}}>
                         <CronJobSettings setCroneValue = {setCroneValue}  defaultCronValue = { propertyDetails.timer}/>
                         </div>
                    </div>
                </div>
                <div style={{position:'relative', top:"50px", fontFamily:'poppins'}}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                {/* <animated.p style={textStyles}>{humanReadable && humanReadable}</animated.p> */}
                </div>
           
                <div className="step-navigation ">
                    {currentStep !== 1 &&
                        <button className='button' type='button' onClick={handlePrevious}>
                            Previous
                        </button>}

                    <button type="submit" className='button'
                        disabled={currentStep === steps.length}>
                        Next
                    </button>
                </div>
            </form>


        </animated.div>
    )

}