import React, {useEffect, useState } from 'react'
import { animated, useSpring, useTransition } from '@react-spring/web';
import TableReviews from '../Table/Table';
import './Output.css';
import { CiTrash } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import Web3 from 'web3'
// import { useNetwork, useSwitchNetwork, useChains } from 'wagmi'
// import { useTransition, animated } from 'react-spring';
// import { useNetwork } from 'wagmi'
// import {useChains } from 'wagmi';
import { useAccount, useConnect } from 'wagmi';
import { useChains } from 'wagmi'
import { GrPowerReset } from "react-icons/gr";
// import { useNetwork } from 'wagmi'
import { useChainId } from 'wagmi'
import { Button, TextInput, Grid, Box, Container, Title, Group, ActionIcon, Select, Switch, Textarea } from '@mantine/core';
import classes from './CustomSwitch.module.css';

const initialBlockchains = ['Ethereum', 'Gnosis', 'Berachain', 'Bitcoin'];
const initialTestnetchains = ['Sepolia','Linea Sepolia', 'Linea Goerli']



export const Output = ({
    isStepValid,
    setIsStepValid,
    steps,
    currentStep,
    handleNext,
    handlePrevious,

}) => {




    const [rows, setRows] = useState([{ id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);
    const [isMainnet, setIsMainnet] = useState(true); // State to track the switch
    const [selectedMainnetChains, setSelectedMainnetChains] = useState([]);
    const [selectedTestnetChains, setSelectedTestnetChains] = useState([]);
    const [blockchainOptions, setBlockchainOptions] = useState(initialBlockchains);;

    // const handleSwitchChange = (event) => {
    //     const isChecked = event.currentTarget.checked;
    //     setIsMainnet(isChecked);
    //     setBlockchainOptions(isChecked ? initialBlockchains : initialTestnetchains);
    // };

    const handleSwitchChange = (event) => {
        const isChecked = event.currentTarget.checked;
        setIsMainnet(isChecked);
        updateOptions(isChecked, isChecked ? selectedMainnetChains : selectedTestnetChains); // Added
    };

    const addRow = () => {
        setRows([...rows, { id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);
    };

    const handleInputChange = (id, field, value) => {
        setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    };


    const deleteRow = (id) => {
        const rowToDelete = rows.find(row => row.id === id);
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    
        if (rowToDelete.blockchain) {
            if (isMainnet) {
                const updatedSelectedChains = selectedMainnetChains.filter(chain => chain !== rowToDelete.blockchain); // Modified
                setSelectedMainnetChains(updatedSelectedChains); // Modified
            } else {
                const updatedSelectedChains = selectedTestnetChains.filter(chain => chain !== rowToDelete.blockchain); // Modified
                setSelectedTestnetChains(updatedSelectedChains); // Modified
            }
        }
        updateOptions(isMainnet, isMainnet ? selectedMainnetChains : selectedTestnetChains); // Added
    };


    const handleBlockchainChange = (id, value) => {
        const updatedRows = rows.map(row => row.id === id ? { ...row, blockchain: value } : row);
        setRows(updatedRows);
    
        const rowToUpdate = rows.find(row => row.id === id); // Added
        if (rowToUpdate.blockchain) { // Added
            if (isMainnet) { // Added
                const updatedSelectedChains = selectedMainnetChains.filter(chain => chain !== rowToUpdate.blockchain); // Added
                setSelectedMainnetChains([...updatedSelectedChains, value]); // Added
            } else { // Added
                const updatedSelectedChains = selectedTestnetChains.filter(chain => chain !== rowToUpdate.blockchain); // Added
                setSelectedTestnetChains([...updatedSelectedChains, value]); // Added
            } // Added
        } else { // Added
            if (isMainnet) {
                setSelectedMainnetChains([...selectedMainnetChains, value]);
            } else {
                setSelectedTestnetChains([...selectedTestnetChains, value]);
            }
        }
        updateOptions(isMainnet, isMainnet ? [...selectedMainnetChains, value] : [...selectedTestnetChains, value]); // Added
    };
    
    const getFilteredOptions = () => {
        if (isMainnet) {
            return initialBlockchains.filter(option => !selectedMainnetChains.includes(option));
        } else {
            return initialTestnetchains.filter(option => !selectedTestnetChains.includes(option));
        }
    };

    const transitions = useTransition(rows, {
        keys: row => row.id,
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    });

    const updateOptions = (isMainnetSelected, selectedChains) => { // Added
        if (isMainnetSelected) {
            setBlockchainOptions(initialBlockchains.filter(option => !selectedChains.includes(option)));
        } else {
            setBlockchainOptions(initialTestnetchains.filter(option => !selectedChains.includes(option)));
        }
    };


    const resetRows = () => {
        setRows([{ id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);
        setSelectedMainnetChains([]);
        setSelectedTestnetChains([]);
        setBlockchainOptions(isMainnet ? initialBlockchains : initialTestnetchains);
    };




    // const checkNetwork = async () => {
    //     if (window.ethereum) {
    //       try {
    //         const currentChainId = await window.ethereum.request({
    //           method: 'eth_chainId',
    //         });
      
    //         console.log("currentChainId", currentChainId);
    //         return currentChainId;
        
      
    //       } catch (error) {
    //         console.error("Error fetching chain ID:", error);
    //         return null; 
    //       }
    //     } else {
    //       console.error("window.ethereum is not available");
    //       return null;
    //     }
    //   }
      
    //   useEffect(() => {
    //     const fetchChainId = async () => {
    //       const chainId = await checkNetwork();
    //       console.log("checkNetwork", chainId);
    //       // You can further process chainId here if needed
    //     };
      
    //     fetchChainId();
    //   }, []);

    //   const chainId = useChainId()

    //   console.log("chainId------------------------->",chainId)



    


   
    




    return (
        <>
            {/* <Group justify="flex-end" p="md" style={{position:'relative', right:"6%"}}>
                <p>Testnet</p>
                <Switch 
                  style={{fontFamily:'poppins'}} 
                  label="Mainnet" 
                  checked={isMainnet}
                  classNames={classes} 
                  onChange={handleSwitchChange}
                  />
            </Group> */}
            <Container size="md" style={{ position: 'relative', left: "-5%", marginTop: '20px', alignItems: "center" }}>
                <Box p="sm" style={{ backgroundColor: '#2c3e50', color: 'white', borderRadius: '8px', width: "500px" }}>
                    <Grid align="center" gutter="md">
                        <Grid.Col span={1} style={{ paddingLeft: '10px' }} />
                        <Grid.Col span={3}>
                        <Box style={{position:'relative', left:"11%",  width: "100%",fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Blockchain</Box>
                            {/* <Box style={{ width: "120%",fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Blockchain</Box> */}
                        </Grid.Col>
                        <Grid.Col span={3}>
                        <Box style={{position:'relative', left:"30%",  width: "100%", fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Contract Address</Box>
                            {/* <Box style={{ width: "147%", fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Contract Address</Box> */}
                        </Grid.Col>
                        <Grid.Col span={3}>
                            {/* <Box style={{ width: "160%", fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Function Name</Box> */}
                            <Box style={{ position:'relative', left:"50%", width: "100%", fontFamily: 'poppins', fontSize: "62%", backgroundColor: '#7f8c8d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>Function Name</Box>
                        </Grid.Col>
                        <Grid.Col span={1} />
                    </Grid>     
                    {transitions((styles, row) => (
                        <animated.div style={styles} key={row.id}>
                            <Grid key={row.id} align="center" gutter="md" mt="xs">
                                <Grid.Col span={1} style={{ paddingLeft: '10px' }}>
                                    <ActionIcon color="#F15A24" onClick={() => deleteRow(row.id)}>
                                        <CiTrash size={"20"} />
                                    </ActionIcon>
                                </Grid.Col>
                                <Grid.Col span={3} style={{ marginRight: '20px' }}>
                                    <Select
                                        placeholder={row.blockchain ? row.blockchain : 'Pick chain'}
                                        // placeholder={row.blockchain}
                                        onChange={(value) => handleBlockchainChange(row.id, value)}
                                        data={getFilteredOptions().map(option => ({ value: option, label: option }))}
                                        // data={blockchainOptions.map(option => ({ value: option, label: option }))}
                                        style={{ fontFamily: 'poppins', borderRadius: "12px", backgroundColor: 'white', color: 'black', width: "65%" }}
                                    />
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
                                     <textarea
                                        value={row.functionName}
                                        onChange={(event) => handleInputChange(row.id, 'functionName', event.target.value)}
                                        placeholder="Enter Function Name"
                                        style={{ alignItems:'center', fontFamily: 'poppins', fontSize:"80%", borderRadius: "5px", backgroundColor: 'white', color: 'black', height:'50%', width: "130%", resize: 'none', overflow: 'hidden', display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center', }}
                                        onClick={(e) => e.target.style.resize = 'both'}
                                        // onBlur={(e) => e.target.style.resize = 'none'} 
                                        onBlur={(e) => e.target.style.resize = 'both'}
                                        onFocus={(e) => e.target.style.resize = 'none'}
                                    />
                                </Grid.Col>
                            </Grid>

                        </animated.div>

                    ))}
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Group position="center" mt="md">
                        <IoIosAddCircleOutline
                            disabled={rows.length >= 4}
                            onClick={rows.length >= 4 ? "" : addRow}
                            color={rows.length >= 4 ? '#d3d3d3' : '#1e90ff'}
                            size={"25px"}
                            styles={{ cursor: 'pointer' }}
                        />
                    </Group>
                    <Group position="flex-end" mt="md">
                     <GrPowerReset onClick={resetRows}  size={"21px"} color='#1e90ff'/>
                    </Group>
                    </div>
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


    
    // const [blockchainOptions, setBlockchainOptions] = useState(initialBlockchains);
    // const [rows, setRows] = useState([{ id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);
    // const [isMainnet, setIsMainnet] = useState(true); // State to track the switch

    

    // const addRow = () => {
    //     setRows([...rows, { id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);
    // };

    // const handleInputChange = (id, field, value) => {
    //     setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    // }



    // // const deleteRow = (id) => {
    // //     const rowToDelete = rows.find(row => row.id === id);
    // //     const updatedRows = rows.filter(row => row.id !== id);
    // //     setRows(updatedRows);
    // //     const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
    // //     const newBlockchainOptions = initialBlockchains.filter(blockchain => !selectedBlockchains.includes(blockchain));
    // //     if (rowToDelete.blockchain && !newBlockchainOptions.includes(rowToDelete.blockchain)) {
    // //         newBlockchainOptions.push(rowToDelete.blockchain);
    // //         newBlockchainOptions.sort(); // Optional: keep options sorted
    // //     }
    // //     setBlockchainOptions(newBlockchainOptions);
    // // };
    // const deleteRow = (id) => {
    //     const rowToDelete = rows.find(row => row.id === id);
    //     const updatedRows = rows.filter(row => row.id !== id);
    //     setRows(updatedRows);
    //     const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
    //     const newBlockchainOptions = isMainnet
    //         ? initialBlockchains.filter(blockchain => !selectedBlockchains.includes(blockchain))
    //         : initialTestnetchains.filter(blockchain => !selectedBlockchains.includes(blockchain));
    //     if (rowToDelete.blockchain && !newBlockchainOptions.includes(rowToDelete.blockchain)) {
    //         newBlockchainOptions.push(rowToDelete.blockchain);
    //         newBlockchainOptions.sort(); // Optional: keep options sorted
    //     }
    //     isMainnet ? setMainnetOptions(newBlockchainOptions) : setTestnetOptions(newBlockchainOptions);
    //     setBlockchainOptions(newBlockchainOptions);
    // };


    // const transitions = useTransition(rows, {
    //     keys: row => row.id,
    //     from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    //     enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    //     leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    // });

    // // const handleBlockchainChange = (id, value) => {
    // //     const updatedRows = rows.map(row => row.id === id ? { ...row, blockchain: value } : row);
    // //     setRows(updatedRows);
    // //     const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
    // //     setBlockchainOptions(initialBlockchains.filter(blockchain => !selectedBlockchains.includes(blockchain)));
    // // };

    // const handleBlockchainChange = (id, value) => {
    //     const updatedRows = rows.map(row => row.id === id ? { ...row, blockchain: value } : row);
    //     setRows(updatedRows);
    //     const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
    //     const newOptions = (isMainnet ? initialBlockchains : initialTestnetchains).filter(blockchain => !selectedBlockchains.includes(blockchain));
    //     isMainnet ? setMainnetOptions(newOptions) : setTestnetOptions(newOptions);
    //     setBlockchainOptions(newOptions);
    // };


    // const handleSwitchChange = (event) => {
    //     // const isChecked = event.currentTarget.checked;
    //     // setIsMainnet(isChecked);
    //     // setBlockchainOptions(isChecked ? mainnetOptions : testnetOptions);
    //     setIsMainnet(event.currentTarget.checked);
    //     if (event.currentTarget.checked) {
    //         setBlockchainOptions(initialBlockchains);
    //     } else {
    //         setBlockchainOptions(initialTestnetchains);
    //     }
    // }

    // const [mainnetOptions, setMainnetOptions] = useState(initialBlockchains);
    // const [testnetOptions, setTestnetOptions] = useState(initialTestnetchains);
    // const [blockchainOptions, setBlockchainOptions] = useState(mainnetOptions);
    // const [rows, setRows] = useState([{ id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);
    // const [isMainnet, setIsMainnet] = useState(true); // State to track the switch

    // const [selectedMainnetChains, setSelectedMainnetChains] = useState([]);
    // const [selectedTestnetChains, setSelectedTestnetChains] = useState([]);

    // const handleSwitchChange = (event) => {
    //     const isChecked = event.currentTarget.checked;
    //     setIsMainnet(isChecked);
    //     setBlockchainOptions(isChecked ? mainnetOptions : testnetOptions);
    // };

    // const addRow = () => {
    //     setRows([...rows, { id: Date.now(), blockchain: '', contractAddress: '', functionName: '' }]);
    // };

    // const handleInputChange = (id, field, value) => {
    //     setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    // };

    // const deleteRow = (id) => {
    //     const rowToDelete = rows.find(row => row.id === id);
    //     const updatedRows = rows.filter(row => row.id !== id);
    //     setRows(updatedRows);
        
    //     if (isMainnet) {
    //         setSelectedMainnetChains(selectedMainnetChains.filter(chain => chain !== rowToDelete.blockchain));
    //     } else {
    //         setSelectedTestnetChains(selectedTestnetChains.filter(chain => chain !== rowToDelete.blockchain));
    //     }

    //     const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
    //     const newBlockchainOptions = isMainnet
    //         ? initialBlockchains.filter(blockchain => !selectedBlockchains.includes(blockchain))
    //         : initialTestnetchains.filter(blockchain => !selectedBlockchains.includes(blockchain));
    //     setBlockchainOptions(newBlockchainOptions);
    // };

    // const handleBlockchainChange = (id, value) => {
    //     const updatedRows = rows.map(row => row.id === id ? { ...row, blockchain: value } : row);
    //     setRows(updatedRows);

    //     if (isMainnet) {
    //         setSelectedMainnetChains([...selectedMainnetChains, value]);
    //     } else {
    //         setSelectedTestnetChains([...selectedTestnetChains, value]);
    //     }

    //     const selectedBlockchains = updatedRows.map(row => row.blockchain).filter(Boolean);
    //     const newOptions = (isMainnet ? initialBlockchains : initialTestnetchains).filter(blockchain => !selectedBlockchains.includes(blockchain));
    //     setBlockchainOptions(newOptions);
    // };

    // const transitions = useTransition(rows, {
    //     keys: row => row.id,
    //     from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    //     enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    //     leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },