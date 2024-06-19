import React, { useState, useEffect } from 'react'
import './Schedular.css';
import { useSpring, animated } from '@react-spring/web';
import { Slider, Text } from '@mantine/core';
import ToggleButtons from '../../../ToggleButton/ToggleButton';
export const Schedular = ({ 
    roleType_1, 
    roleType_2 ,
    steps ,
    currentStep,
    handleNext,
    handlePrevious, 
    propertyDetails, 
    setPropertyDetails
}) => {

    const [activeButton, set_ActiveButton] = useState(roleType_1);
    const styles = useSpring({
        from: { maxHeight: 0, opacity: 0 },
        to: { maxHeight: 500, opacity: 1 },
        config: { tension: 200, friction: 20 },
        overflow: 'hidden',
    });

    const marks = [
        { value: 0, label: '0s' },
        { value: 5, label: '5s' },
        { value: 10, label: '10s' },
        { value: 15, label: '15s' },
        { value: 20, label: '20s' },
        { value: 25, label: '25s' },
        { value: 30, label: '30s' },
        { value: 35, label: '35s' },
        { value: 40, label: '40s' },
        { value: 45, label: '45s' },
        { value: 50, label: '50s' },
        { value: 55, label: '55s' },
        { value: 60, label: '60s' },
    ];


    return (
        <animated.div style={styles}>
            <div className="flexColStart schedular-wrapper">
                <span>Specify the trigger conditions as when to run job</span>
                <div style={{ padding: '15px' }} className='flexColStart'>
                    <ToggleButtons disabled={true} roleType_1={roleType_1} roleType_2={roleType_2} activeButton={activeButton} setActiveButton={set_ActiveButton} />
                    <div style={{ padding: '25px', gap: '12px' }} className='flexColStart'>
                        <Text c="#888ca9" mt="md">Every</Text>
                        <Slider
                            min={0}
                            max={60}
                            style={{ width: "400px" }}
                            defaultValue={0}
                            label={(val) => {
                                const mark = marks.find((mark) => mark.value === val);
                                return mark ? mark.label : '';
                            }}
                            step={5}
                            marks={marks}
                        // styles={{ markLabel: { display: '' } }}
                        />
                    </div>

                </div>

            </div>
            <div className="step-navigation ">
                {currentStep !== 1 &&
                    <button className='button' onClick={handlePrevious}>
                        Previous
                    </button>}

                <button className='button' onClick={handleNext} disabled={currentStep === steps.length}>
                    Next
                </button>
            </div>


        </animated.div>
    )
}