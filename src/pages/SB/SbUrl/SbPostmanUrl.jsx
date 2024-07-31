import React, { useState, useEffect, act } from 'react';
import './SbPostmanUrl.css';
import HeaderTable from '../../../component/CommanComp/HeaderComp/HeaderComp';
import { Container, Grid, TextInput, Textarea, Select, Button, Tabs, Text, Flex } from '@mantine/core';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import ReactJson from 'react-json-view';
import { useDispatch } from 'react-redux';
import { updateApiUrl } from '../../../redux/formSlice';
import Authorization from '../../../component/CommanComp/AuthorizationComp/Authorization';
import BodyComp from '../../../component/CommanComp/BodyComp/BodyComp';
import QueryParamsTable from '../../../component/CommanComp/QueryParamsComp/QueryParams';
import useApiRequest from '../../../service/apiService';


const ApiUrl = ({

}) => {
    const [activeTab, setActiveTab] = useState('Query Params');
    const [jsonText, setJsonText] = useState(''); // State to hold the JSON text
    const [showHeaders, setShowHeaders] = useState(true);
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const { sendRequest } = useApiRequest(); // Use the custom hook
    const [statusText, setStatusText] = useState('No status'); // State to hold the status text



    useEffect(() => {
        const simulatedResponse = {
            status: "success",
            data: {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com"
            }
        };
        setJsonText(JSON.stringify(simulatedResponse, null, 2)); // Format JSON with indentation
    }, []);


    const handleJsonChange = (edit) => {
        if (edit.updated_src) {
            setJsonText(edit.updated_src);
        }
    };

    const toggleHeaders = () => {
        setShowHeaders(!showHeaders);
    };

    const updateUrlWithParams = (params) => {
        const baseUrl = url.split('?')[0];
        const queryParams = params
            .filter(param => param.checked && param.key && param.value)
            .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
            .join('&');

        setUrl(queryParams ? `${baseUrl}?${queryParams}` : baseUrl);
        dispatch(updateApiUrl(queryParams ? `${baseUrl}?${queryParams}` : baseUrl))
    };

    const dispatch = useDispatch()

    const handleSendRequest = async () => {
        try {
            const response = await sendRequest(method, url);
            // console.log("response",response)
            setJsonText(JSON.stringify(response.data, null, 2));
            console.log("response", response.status)
            setStatusText(`Status: ${response.status} ${response.statusText}`);

        } catch (error) {
            setJsonText(JSON.stringify(error.response?.data || error.message, null, 2));
        }
    };



    return (
        <Container style={{ position: "relative", right: "46px", width: "100%", flexGrow:1 }}>
            <Grid gutter="xl"  >
                <Grid.Col style={{ zIndex: 0 }} span={2}>
                    <Select
                        style={{ fontStyle: "poppins", fontWeight: "bold" }}
                        placeholder="Method"
                        data={['GET', 'POST', 'PUT', 'DEL']}
                        value={method}
                        onChange={(value ) => setMethod(value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput placeholder="Enter URL" value={url} onChange={(event) => { setUrl(event.target.value) , dispatch(updateApiUrl(event.target.value))}}/>
                </Grid.Col>
                <Grid.Col style={{ position: 'relative', left: "140px" }} span={2}>
                    <Button onClick={handleSendRequest} style={{ fontStyle: "poppins" }} >Send</Button>
                </Grid.Col>
            </Grid>

            <Tabs defaultValue="Query Params" onChange={(value) => setActiveTab(value)}>
                <Tabs.List>
                    <Tabs.Tab style={{ fontStyle: "poppins" }} value='Query Params'>Params</Tabs.Tab>
                    <Tabs.Tab style={{ fontStyle: "poppins" }} value='Authorization'>Authorization</Tabs.Tab>
                    <Tabs.Tab style={{ fontStyle: "poppins" }} value="Body">Body</Tabs.Tab>
                    <Tabs.Tab style={{ fontStyle: "poppins" }} value="Headers">Headers</Tabs.Tab>
                </Tabs.List>
            </Tabs>
            <Flex style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: '20px 0' }}>
                <Text style={{ fontStyle: "poppins", marginLeft: "22px", marginBottom: "13px" }}>
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </Text>

                {activeTab === 'Headers' && (
                    <Button
                        onClick={toggleHeaders}
                        style={{ backgroundColor: "transparent", position: "relative", bottom: "5px", marginLeft: "22px", display: "flex", alignItems: "center" }}
                    >
                        {showHeaders ? <FiEyeOff style={{ marginRight: '5px' }} /> : <FiEye style={{ marginRight: '5px' }} />}
                        {showHeaders ? 'Hide Auto Generated Headers' : 'Show Auto Generated Headers'}
                    </Button>
                )}

            </Flex>

            {activeTab === 'Query Params' && <QueryParamsTable updateUrlWithParams={updateUrlWithParams}  />}
            {activeTab === 'Authorization' && <Authorization />}
            {activeTab === 'Body' && <BodyComp />}
            {activeTab === 'Headers' && <HeaderTable showHeaders={showHeaders} />}


            <Grid style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ marginTop: '20px', fontStyle: "poppins", marginLeft: "22px", marginBottom: "13px" }}>
                    Response
                </Text >
                <Text style={{ color: "green", fontWeight: "bold", marginTop: '20px', fontStyle: "poppins", marginLeft: "22px", marginBottom: "13px", position: "relative", left: "70%" }}>{statusText}</Text>
            </Grid>
            <textarea
                value={jsonText}
                onChange={handleJsonChange}
                style={{borderRadius:"4px", fontSize:"12px", outline: 'none', resize: 'none', height:"300px", border: '1px solid #ccc', width: '100%', marginTop: '20px', fontFamily: 'poppins' }}
                readOnly
            />
        </Container>

    )
}


export default ApiUrl