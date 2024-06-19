import { useState } from 'react';
import React from 'react'
import './SbUrl.css';
import { TextInput, Box, Textarea, Group, Button, NumberInput, Radio, Tooltip, Center, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSpring, animated } from '@react-spring/web';
import { GoAlert } from "react-icons/go";
export default function SbUrl({ currentStep, propertyDetails, setPropertyDetails, handleNext, handlePrevious, steps }) {

    const [showHeaderInputs, setShowHeaderInputs] = useState(false);

    const validateGitHubUrl = (value) => {
        const githubUrlPattern = /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+(\.git)?\/?$/;
        if (value === null || value === undefined || value.length === 0) {
            return "URL cannot be empty";
        } else if (!githubUrlPattern.test(value)) {
            return "Invalid GitHub URL";
        } else {
            return null;
        }
    };

    const validateString = (value) => {
        return value && value.length >= 3 ? null : "Must have at least 3 characters";
    };


    const form = useForm({
        initialValues: {
            gitUrl: propertyDetails.gitUrl,
            headerKey: propertyDetails.header.key,
            headerValue: propertyDetails.header.value,
        },
        validate: {
            gitUrl: (value) => validateGitHubUrl(value),
            headerKey: (value) => (showHeaderInputs ? validateString(value) : null),
            headerValue: (value) => (showHeaderInputs ? validateString(value) : null),
        },
    });

    const { gitUrl, description, price, headerKey, headerValue } = form.values



    const handleSubmit = () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
            console.log("Has no error!")
            setPropertyDetails((prev) => ({ ...prev, gitUrl, 
                header: {
                    key: headerKey,
                    value: headerValue,
                },
                // headerKey, headerKey, description, price 
            }))
            handleNext()
        }
    }
   
    const handleRadioChange = (value) => {
        setShowHeaderInputs(value === 'yes');
    };


    const headerInputsAnimation = useSpring({
        opacity: showHeaderInputs ? 1 : 0,
        transform: showHeaderInputs ? 'translateY(0)' : 'translateY(-20px)',
        height: showHeaderInputs ? 'auto' : '0px',
    });

    const rightSection = (errorMessage,  styleRight) => {

        return (
            <Tooltip
                label={errorMessage}
                position="top-end"
                style={{ fontFamily: 'poppins' }}
                withArrow
                transitionProps={{ transition: 'pop-bottom-right' }}
            >
                <Text component="div" c="dimmed"
                 style={{ position:'relative',  right: styleRight, cursor: 'help' }}
                 >
                    <Center>
                        {errorMessage &&
                            <GoAlert color='red' stroke={1.5} />
                        }
                    </Center>
                </Text>
            </Tooltip>

        )

    }


    return (
        <div>
            <Box maw="100%" mx="auto" my="md">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <TextInput
                        style={{ fontFamily: 'poppins', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: "400%", gap: '20px' }}
                        size="md"
                        radius="sm"
                        label="Git Url"
                        placeholder="Enter Git Url"
                        {...form.getInputProps("gitUrl")}
                        rightSection={rightSection(form.errors.gitUrl, '-150px')}
                        rightSectionWidth={10}
                    />
                    <div className='radio-btn-background'>
                        <Radio.Group
                            style={{ position: 'relative', bottom: '30px', fontFamily: 'poppins', display: 'flex', alignItems: 'center', marginTop: '40px', gap: '20px' }}
                            name="favoriteFramework"
                            label="Header(Optional)"
                            onChange={handleRadioChange}
                        >
                            <Group mt="xs" style={{ fontFamily: 'poppins', position: 'relative', bottom: '5px' }}>
                                <Radio value="yes" label="Yes" />
                                <Radio value="no" label="No" />
                            </Group>
                        </Radio.Group>
                        <animated.div style={headerInputsAnimation}>
                            {showHeaderInputs && (
                                <div style={{ display: 'flex', gap: '100px' }}>
                                    <TextInput
                                        style={{
                                            fontFamily: 'Poppins',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '20%',
                                            gap: '20px',
                                            marginTop: '20px',
                                        }}
                                        errorProps={{display:'none'}}
                                        size="sm"
                                        radius="sm"
                                        label="Key"
                                        placeholder="Enter Header Key"
                                        {...form.getInputProps('headerKey')}
                                        rightSection={rightSection(form.errors.headerKey, '-56px')}
                                        rightSectionWidth={10}
                                    />
                                    <TextInput
                                        style={{
                                            fontFamily: 'Poppins',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '20%',
                                            gap: '20px',
                                            marginTop: '20px',
                                        }}
                                        errorProps={{display:'none'}}
                                        size="sm"
                                        radius="sm"
                                        label="Value"
                                        placeholder="Enter Header Value"
                                        {...form.getInputProps('headerValue')}
                                        rightSection={rightSection(form.errors.headerValue, '-62px')}
                                        rightSectionWidth={10}
                                    />
                                </div>
                            )}
                        </animated.div>
                    </div>
                    <div className="step-navigation ">
                        {currentStep !== 1 &&
                            <button className='button' onClick={handlePrevious}>
                                Previous
                            </button>}
                        <button className='button' type='submit' disabled={currentStep === steps.length}>
                            Next
                        </button>
                    </div>
                </form>
            </Box>
        </div>
    )
}
