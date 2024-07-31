import React, { useState, useEffect, act } from 'react';
import { Select, TextInput, Text, Box, Alert, Flex } from '@mantine/core';
import './Authorization.css';
import { setAuthHeader, setAuthType, setToken, setUsername, setPassword } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useFormSelectors } from '../../../redux/selector';
import { useAccount } from 'wagmi';


const Authorization = () => {
    const { authType, token, username, password } = useFormSelectors()
    const dispatch = useDispatch();
    // const authType = useSelector((state) => state.auth.authType);
    // const [authType, setAuthType] = useState('No Auth');
    // const [token, setToken] = useState('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const handleAuthChange = (type) => {
        setAuthType(type);
        dispatch(setAuthType(type));

        if (type === 'No Auth') {
            dispatch(setAuthHeader(null));
        }
    };

    useEffect(() => {
        if (authType === 'Basic Auth') {
            if (username && password) {
                dispatch(setAuthHeader(true));
            } else {
                dispatch(setAuthHeader(false));
            }
        } else if (authType === 'Bearer Token') {
            if (token) {
                dispatch(setAuthHeader(true));
            } else {
                dispatch(setAuthHeader(false));
            }
        } else {
            dispatch(setAuthHeader(false));
        }
    }, [authType, username, password, token, dispatch]);


    const handleInputChange = (field, value) => {
        if (field === 'username') {
            dispatch(setUsername(value));
        }
        if (field === 'password') {
            dispatch(setPassword(value));
        }
        if (field === 'token') {
            dispatch(setToken(value));
        }
    };


    return (
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Select
                label="Auth Type"
                className="override-width"
                placeholder="Select Auth Type"
                data={['No Auth', 'Basic Auth', 'Bearer Token']}
                value={authType}
                onChange={handleAuthChange}
            />
            <Flex style={{ gap: '20px' }}>
                <Box style={{ flex: 1 }}>
                    {authType === 'No Auth' && (
                        <Alert title="No Authorization" color="gray">
                            <p style={{ color: "white" }}>This request does not use any authorization. Learn more about authorization.</p>
                        </Alert>
                    )}
                    {authType === 'Basic Auth' && (
                        <>
                            <Alert title="Basic Auth" color="gray">
                                <p style={{ color: "white" }}>Heads up! These parameters hold sensitive data. To keep this data secure while working in a collaborative environment, we recommed using variables.</p>
                            </Alert>
                            <TextInput className="override-width1" value={username} label="Username" placeholder="Enter Username" onChange={(e) => handleInputChange('username', e.target.value)} />
                            <TextInput className="override-width1" value={password} label="Password" placeholder="Enter Password" type="password" mt="md" onChange={(e) => handleInputChange('password', e.target.value)} />
                        </>
                    )}
                    {authType === 'Bearer Token' && (
                        <>
                            <Alert title="Bearer Token" color="gray">
                                <p style={{ color: "white" }}>Heads up! These parameters hold sensitive data. To keep this data secure while working in a collaborative environment, we recommed using variables.</p>
                            </Alert>
                            <TextInput className="override-width2" value={token} placeholder="Enter Token" onChange={(e) => handleInputChange('token', e.target.value)} />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

export default Authorization 