import React, { useEffect } from 'react';
import './Payment.css';
import { useSpring, animated } from "@react-spring/web";
import { TextInput, PasswordInput, Tooltip, Center, Text, rem, Box, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { GoAlert } from "react-icons/go";

const Payment = ({ isStepValid, setIsStepValid, steps, currentStep, handleNext, handlePrevious, propertyDetails, setPropertyDetails }) => {

    const styles = useSpring({
        from: { maxHeight: 0, opacity: 0 },
        to: { maxHeight: 500, opacity: 1 },
        config: { tension: 200, friction: 20 },
        overflow: "hidden",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const { hasErrors } = form.validate();

        if (!hasErrors) {
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                totalRewardAllocated : form.values.totalRewardAllocated
              }));
            const isValid = true;
            const updatedValidation = [...isStepValid];
            updatedValidation[currentStep - 1] = isValid;
            setIsStepValid(updatedValidation);
            handleNext();

        }
       

    }

    const form = useForm({
        initialValues: {
            totalRewardAllocated: propertyDetails.totalRewardAllocated
        },
        validate: {
            totalRewardAllocated: (value) => (value ? null : 'Total value allocation is required'),
        },
    });


    // const { totalRewardAllocated } = form.values;


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const { hasErrors } = form.validate();
        
    //     if (!hasErrors) {
    //         const isValid = true;
    //         const updatedValidation = [...isStepValid];
    //         updatedValidation[currentStep - 1] = isValid;
    //         setIsStepValid(updatedValidation);
    //         handleNext();
    //     }
    // };


    // useEffect(() => {
    //     console.log("propertiesDetails", propertyDetails)

    // },[propertyDetails])

    useEffect(() => {
        form.setValues({
            totalRewardAllocated: propertyDetails.totalRewardAllocated || '',
        });
    }, [propertyDetails]);


    const rightSection = (errorMessage) => {
        return (
            <Tooltip
                label={errorMessage}
                position="top-end"
                withArrow
                transition="pop-bottom-right"
            >
                <Text component="div" style={{ fontFamily: 'Poppins' }}>
                    <Center>
                        {errorMessage && (
                            <GoAlert color='red' stroke={1.5} />
        
                        )}
                    </Center>
                </Text>
            </Tooltip>
        );
    };



    return (
        <animated.div style={styles}>
            <form onSubmit={handleSubmit}>
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
                        {...form.getInputProps('totalRewardAllocated')}
                        errorProps={{display:'none'}}
                        rightSection={rightSection(form.errors.totalRewardAllocated)}
                    />
                </Flex>
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                <button type='button' className='button'>Approve</button>
                </div>
               
            </div>
            <div className="step-navigation ">
                {currentStep !== 1 &&
                    <button className='button' onClick={handlePrevious}>
                        Previous
                    </button>}

                <button type="submit" className='button' onClick={handleSubmit}>Submit</button>
            </div>
            </form>
        </animated.div>
    )

}


export default Payment