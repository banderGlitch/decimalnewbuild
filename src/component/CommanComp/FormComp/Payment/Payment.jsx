import React from 'react';
import './Payment.css';
import { useSpring, animated } from "@react-spring/web";
import { TextInput, PasswordInput, Tooltip, Center, Text, rem, Box, Flex } from '@mantine/core';

const Payment = ({ isStepValid, setIsStepValid, steps, currentStep, handleNext, handlePrevious }) => {

    const styles = useSpring({
        from: { maxHeight: 0, opacity: 0 },
        to: { maxHeight: 500, opacity: 1 },
        config: { tension: 200, friction: 20 },
        overflow: "hidden",
    });

    const handleSubmit = () => {
        const isValid = true;
        const updatedValidation = [...isStepValid];
        updatedValidation[currentStep - 1] = isValid;
        setIsStepValid(updatedValidation);

    }


    return (
        <animated.div style={styles}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Box style={{ display: "flex", fontSize: "150%", fontWeight: "bold" }}>Payment</Box>
                <Flex direction="row" align="center" style={{ gap: '12px' }}>
                    <p style={{ fontFamily: "Poppins", width: "150px", margin: 0 }}>Rate Card</p>
                    <TextInput
                        style={{ width: "90px" }}
                        value={"50dai"}
                        disabled={true}
                        placeholder="Rate Card"
                    />
                </Flex>
                <Flex direction="row" align="center" style={{ gap: '12px' }}>
                    <p style={{ fontFamily: "Poppins", width: "150px", margin: 0 }}>Total value allocated</p>
                    <TextInput
                        style={{ width: "90px" }}
                        placeholder="Rate Card"
                    />
                </Flex>
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                <button className='button'>Approve</button>
                </div>
               
            </div>
            <div className="step-navigation ">
                {currentStep !== 1 &&
                    <button className='button' onClick={handlePrevious}>
                        Previous
                    </button>}

                <button className='button' onClick={handleSubmit}>Submit</button>
            </div>
        </animated.div>
    )

}


export default Payment