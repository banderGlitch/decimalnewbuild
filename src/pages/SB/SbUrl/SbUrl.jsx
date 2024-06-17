import { useState } from 'react';
import React from 'react'
import './SbUrl.css';
import { TextInput, Box, Textarea, Group, Button, NumberInput, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSpring, animated } from '@react-spring/web';
export default function SbUrl({ propertyDetails, setPropertyDetails }) {
    const [showHeaderInputs, setShowHeaderInputs] = useState(false);

    const form = useForm({
        initialValues: {
            gitUrl: propertyDetails.gitUrl,
            // key: propertyDetails.header.key,
            // header: propertyDetails.header.value,
            description: propertyDetails.description,
            price: propertyDetails.price,
            headerKey: '',
            headerValue: '',
        },
    });

    const { gitUrl, description, price, headerKey, headerValue } = form.values

    const handleSubmit = () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
            setPropertyDetails((prev) => ({ ...prev, gitUrl, description, price }))
            nextStep()
        }
    }
    const headerInputsAnimation = useSpring({
        opacity: showHeaderInputs ? 1 : 0,
        transform: showHeaderInputs ? 'translateY(0)' : 'translateY(-20px)',
        display: showHeaderInputs ? 'block' : 'none',
    });

    const handleRadioChange = (value) => {
        setShowHeaderInputs(value === 'yes');
    };

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
                    />
                    <Radio.Group
                        style={{ fontFamily: 'poppins', display: 'flex', alignItems: 'center', marginTop: '40px', gap: '20px' }}
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
                            <>
                                <TextInput
                                    style={{
                                        fontFamily: 'Poppins',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '100%',
                                        gap: '20px',
                                        marginTop: '20px',
                                        width:'295px'
                                    }}
                                    size="md"
                                    radius="sm"
                                    label="Header Key"
                                    placeholder="Enter Header Key"
                                    {...form.getInputProps('headerKey')}
                                />
                                <TextInput
                                    style={{
                                        fontFamily: 'Poppins',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '100%',
                                        gap: '20px',
                                        marginTop: '20px',
                                        width:'310px',
                                        position:'relative',
                                        right:'14px'
                                    }}
                                    size="md"
                                    radius="sm"
                                    label="Header Value"
                                    placeholder="Enter Header Value"
                                    {...form.getInputProps('headerValue')}
                                />
                            </>
                        )}
                    </animated.div>
                </form>
            </Box>
        </div>
    )
}
