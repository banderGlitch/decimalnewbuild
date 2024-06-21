import React, { useEffect, useState } from 'react'
import { animated, useSpring, useTransition } from '@react-spring/web';
import TableReviews from '../Table/Table';
import './Output.css';
import { CiTrash } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { useTransition, animated } from 'react-spring';
import { Button, TextInput, Grid, Box, Container, Title, Group, ActionIcon, Select } from '@mantine/core';

const initialBlockchains = ['Ethereum', 'Gnosis', 'Berachain', 'Bitcoin'];


export const Output = ({
    isStepValid,
    setIsStepValid,
    steps,
    currentStep,
    handleNext,
    handlePrevious,

}) => {
    const [blockchainOptions, setBlockchainOptions] = useState(initialBlockchains);
    const [rows, setRows] = useState([{ id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);

    useEffect(() => {

        console.log("rows", rows)

    },[rows])

    const addRow = () => {
        setRows([...rows, { id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);
    };

    const handleInputChange = (id, field, value) => {
        setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    // const deleteRow = (id) => {
    //     setRows(rows.filter(row => row.id !== id));
    //     const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
    //     setBlockchainOptions(initialBlockchains.filter(blockchain => !selectedBlockchains.includes(blockchain)));
    // };

    // const deleteRow = (id) => {
    //     const rowToDelete = rows.find(row => row.id === id);
    //     const updatedRows = rows.filter(row => row.id !== id);
    //     setRows(updatedRows);
    //     const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
    //     const newBlockchainOptions = initialBlockchains.filter(blockchain => !selectedBlockchains.includes(blockchain));
    //     if (rowToDelete.blockchain) {
    //         newBlockchainOptions.push(rowToDelete.blockchain);
    //         newBlockchainOptions.sort(); // Optional: keep options sorted
    //     }
    //     setBlockchainOptions(newBlockchainOptions);
    // };

    const deleteRow = (id) => {
        const rowToDelete = rows.find(row => row.id === id);
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
        const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
        const newBlockchainOptions = initialBlockchains.filter(blockchain => !selectedBlockchains.includes(blockchain));
        if (rowToDelete.blockchain && !newBlockchainOptions.includes(rowToDelete.blockchain)) {
            newBlockchainOptions.push(rowToDelete.blockchain);
            newBlockchainOptions.sort(); // Optional: keep options sorted
        }
        setBlockchainOptions(newBlockchainOptions);
    };


    const transitions = useTransition(rows, {
        keys: row => row.id,
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    });

    const handleBlockchainChange = (id, value) => {
        const updatedRows = rows.map(row => row.id === id ? { ...row, blockchain: value } : row);
        setRows(updatedRows);
        const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
        setBlockchainOptions(initialBlockchains.filter(blockchain => !selectedBlockchains.includes(blockchain)));
    };

    return (
        <>
            <Container size="md" style={{ position: 'relative', left: "-5%", marginTop: '20px', alignItems: "center" }}>
                <Box p="sm" style={{ backgroundColor: '#2c3e50', color: 'white', borderRadius: '8px', width: "500px" }}>
                    <Grid align="center" gutter="md">
                        <Grid.Col span={1} style={{ paddingLeft: '10px' }} />
                        <Grid.Col span={3}>
                            <Box style={{ width: "120%", fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Blockchain</Box>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Box style={{ width: "147%", fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Contract Address</Box>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Box style={{ width: "160%", fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Function Name</Box>
                        </Grid.Col>
                        <Grid.Col span={1} />
                    </Grid>
                    {transitions((styles, row) => (
                        <animated.div style={styles} key={row.id}>
                            <Grid key={row.id} align="center" gutter="md" mt="xs">
                                <Grid.Col span={1} style={{ paddingLeft: '10px' }}>
                                    <ActionIcon color="red" onClick={() => deleteRow(row.id)}>
                                        <CiTrash size={16} />
                                    </ActionIcon>
                                </Grid.Col>
                                <Grid.Col span={3} style={{ marginRight: '20px' }}>
                                    <Select
                                        placeholder={row.blockchain ? row.blockchain : 'Pick chain'}
                                        // placeholder={row.blockchain}
                                        onChange={(value) => handleBlockchainChange(row.id, value)}
                                        data={blockchainOptions.map(option => ({ value: option, label: option }))}
                                        style={{ fontFamily: 'poppins', borderRadius: "12px", backgroundColor: 'white', color: 'black', width: "65%" }}
                                    />
                                    {/* <Select
                                        value={row.blockchain || null}
                                        onChange={(value) => handleBlockchainChange(row.id, value)}
                                        data={blockchainOptions.map(option => ({ value: option, label: option }))}
                                        // data={blockchainOptions}
                                        placeholder="Select Blockchain"
                                        style={{ fontFamily: 'poppins', borderRadius: "12px", backgroundColor: 'white', color: 'black', width: "65%" }}
                                    /> */}
                                    {/* <TextInput
                                        value={row.blockchain}
                                        onChange={(event) => handleInputChange(row.id, 'blockchain', event.target.value)}
                                        variant="filled"
                                        placeholder="Enter Blockchain"
                                        style={{ fontFamily: 'poppins', borderRadius: "12px", backgroundColor: 'white', color: 'black', width: "65%" }}
                                    /> */}
                                </Grid.Col>
                                <Grid.Col span={3} style={{ marginRight: '20px' }}>
                                    <TextInput
                                        value={row.contractAddress}
                                        onChange={(event) => handleInputChange(row.id, 'contractAddress', event.target.value)}
                                        variant="filled"
                                        placeholder="Enter Contract Address"
                                        style={{ fontFamily: 'poppins', borderRadius: "12px", backgroundColor: 'white', color: 'black', width: "65%" }}
                                    />
                                </Grid.Col>
                                <Grid.Col span={3} >
                                    <TextInput
                                        value={row.functionName}
                                        onChange={(event) => handleInputChange(row.id, 'functionName', event.target.value)}
                                        variant="filled"
                                        placeholder="Enter Function Name"
                                        style={{ fontFamily: 'poppins', borderRadius: "12px", backgroundColor: 'white', color: 'black', width: "65%" }}
                                    />
                                </Grid.Col>
                            </Grid>

                        </animated.div>

                    ))}
                    <Group position="center" mt="md">
                        <IoIosAddCircleOutline 
                        disabled = {rows.length>= 4}
                        onClick= {rows.length>= 4 ? "" : addRow}
                        color= {rows.length >= 4 ? '#d3d3d3' : '#1e90ff'} 
                        size={"25px"} 
                        styles={{cursor:'pointer'}}
                        />
                        {/* <Button onClick={addRow} style={{ fontFamily: 'poppins', backgroundColor: '#1e90ff' }}>Add Row</Button> */}
                    </Group>
                </Box>
            </Container>
            <div className="step-navigation ">
                {currentStep !== 1 &&
                    <button className='button' onClick={handlePrevious}>
                        Previous
                    </button>}

                <button className='button' onClick={handleNext} disabled={currentStep === steps.length}>
                    Next
                </button>
            </div>

        </>

        // <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        //     <Box p="md" style={{ backgroundColor: '#2c3e50', color: 'white', borderRadius: '8px', width: '490px' }}>
        //         <Grid align="center">
        //             <Grid.Col span={1} />
        //             <Grid.Col span={3}>
        //                 <Box style={{ backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Blockchain</Box>
        //             </Grid.Col>
        //             <Grid.Col span={4}>
        //                 <Box style={{ backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Contract Address</Box>
        //             </Grid.Col>
        //             <Grid.Col span={4}>
        //                 <Box style={{ backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Function Name</Box>
        //             </Grid.Col>
        //         </Grid>
        //         {rows.map(row => (
        //             <Grid key={row.id} align="center" mt="xs" spacing="">
        //                 <Grid.Col span={1} />
        //                 <Grid.Col span={2}>
        //                     <TextInput
        //                         value={row.blockchain}
        //                         onChange={(event) => handleInputChange(row.id, 'blockchain', event.target.value)}
        //                         variant="filled"
        //                         style={{ backgroundColor: 'white', color: 'black', width:'50px' }}
        //                     />
        //                 </Grid.Col>
        //                 <Grid.Col span={3}>
        //                     <TextInput
        //                         value={row.contractAddress}
        //                         onChange={(event) => handleInputChange(row.id, 'contractAddress', event.target.value)}
        //                         variant="filled"
        //                         style={{ backgroundColor: 'white', color: 'black',  width:'90px'  }}
        //                     />
        //                 </Grid.Col>
        //                 <Grid.Col span={3}>
        //                     <TextInput
        //                         value={row.functionName}
        //                         onChange={(event) => handleInputChange(row.id, 'functionName', event.target.value)}
        //                         variant="filled"
        //                         style={{ backgroundColor: 'white', color: 'black' ,  width:'40px' }}
        //                     />
        //                 </Grid.Col>
        //             </Grid>
        //         ))}
        //         <Button onClick={addRow} style={{ backgroundColor: '#1e90ff', marginTop: '10px' }}>Add</Button>
        //     </Box>
        // </div>
        //   <Box p="md" style={{ backgroundColor: '#2c3e50', color: 'white', borderRadius: '8px' }}>
        //     <Grid align="center">
        //       {/* <Grid.Col span={0}>
        //         <Button onClick={addRow} style={{ backgroundColor: '#1e90ff' }}>Add</Button>
        //       </Grid.Col> */}
        //       <Grid.Col span={4} spacing="xs"  breakpoints={[{ maxWidth: 'sm', span: 12 }]}>
        //         <TextInput label="Blockchain" variant="filled" disabled style={{ backgroundColor: '#34495e', color: 'white', width:"50%" }}  />
        //       </Grid.Col>
        //       <Grid.Col span={4}  breakpoints={[{ maxWidth: 'sm', span: 12 }]}>
        //         <TextInput label="Contract Address" variant="filled" disabled style={{ backgroundColor: '#34495e', color: 'white',  width:"50%" }} />
        //       </Grid.Col>
        //       <Grid.Col span={4}  breakpoints={[{ maxWidth: 'sm', span: 12 }]}>
        //         <TextInput label="Function Name" variant="filled" disabled style={{ backgroundColor: '#34495e', color: 'white', width:"45%" }} />
        //       </Grid.Col>
        //     </Grid>
        //     {rows.map(row => (
        //       <Grid key={row.id} align="center" mt="xs">
        //         <Grid.Col span={1} breakpoints={[{ maxWidth: 'sm', span: 12 }]} />
        //         <Grid.Col span={3} breakpoints={[{ maxWidth: 'sm', span: 12 }]}>
        //           <TextInput
        //             value={row.blockchain}
        //             onChange={(event) => handleInputChange(row.id, 'blockchain', event.target.value)}
        //             variant="filled"
        //             style={{ backgroundColor: 'white', color: 'black' }}
        //           />
        //         </Grid.Col>
        //         <Grid.Col span={4} breakpoints={[{ maxWidth: 'sm', span: 12 }]}>
        //           <TextInput
        //             value={row.contractAddress}
        //             onChange={(event) => handleInputChange(row.id, 'contractAddress', event.target.value)}
        //             variant="filled"
        //             style={{ backgroundColor: 'white', color: 'black' }}
        //           />
        //         </Grid.Col>
        //         <Grid.Col span={4} breakpoints={[{ maxWidth: 'sm', span: 12 }]}>
        //           <TextInput
        //             value={row.functionName}
        //             onChange={(event) => handleInputChange(row.id, 'functionName', event.target.value)}
        //             variant="filled"
        //             style={{ backgroundColor: 'white', color: 'black' }}
        //           />
        //         </Grid.Col>
        //       </Grid>
        //     ))}
        //   </Box>
    );
}