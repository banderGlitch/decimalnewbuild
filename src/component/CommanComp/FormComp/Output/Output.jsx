import React, { useEffect, useState } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";
import TableReviews from "../Table/Table";
import "./Output.css";
import { CiTrash } from "react-icons/ci";
import { useForm } from "@mantine/form";
// import { useForm } from "@mantine/form";
import { IoIosAddCircleOutline } from "react-icons/io";
import Web3 from "web3";
import { GoAlert } from "react-icons/go";
import { CiCircleInfo } from "react-icons/ci";
import { useChains, useAccount, useChainId } from "wagmi";
import { GrPowerReset } from "react-icons/gr";
import { Tooltip } from "@mantine/core";
import {
  Button,
  TextInput,
  Grid,
  Box,
  Container,
  Title,
  Group,
  ActionIcon,
  Select,
  Switch,
  Textarea,
  Center,
} from "@mantine/core";
import classes from "./CustomSwitch.module.css";
// import { useAccount, useChains } from 'wagmi'
// import { useChainId } from 'wagmi'

const initialBlockchains = ["Ethereum", "Gnosis", "Berachain", "Bitcoin"];
const initialTestnetchains = ["Sepolia", "Linea Sepolia", "Linea Goerli"];

export const Output = ({
  propertyDetails,
  setPropertyDetails,
  isStepValid,
  setIsStepValid,
  steps,
  currentStep,
  handleNext,
  handlePrevious,
}) => {
  const chainId = useChainId();

  const chains = useChains();

  const [currentChain, setCurrentChain] = useState(null);

  const [rows, setRows] = useState(
    propertyDetails.rows || [
      { id: Date.now(), blockchain: "", contractAddress: "", functionName: "" },
    ]
  );
  const [isMainnet, setIsMainnet] = useState(true); // State to track the switch
  const [selectedMainnetChains, setSelectedMainnetChains] = useState([]);
  const [selectedTestnetChains, setSelectedTestnetChains] = useState([]);
  const [blockchainOptions, setBlockchainOptions] =
    useState(initialBlockchains);
  const [errorRows, setErrorRows] = useState({}); // New state to track error rows

  useEffect(() => {
    if (currentChain) {
      const isTestnet = currentChain && currentChain.testnet;
      // const isTestnet = currentChain.testnet;
      setBlockchainOptions(
        isTestnet ? initialTestnetchains : initialBlockchains
      );
    }
  }, [currentChain]);

  useEffect(() => {
    if (chains && chainId) {
      const foundChain = chains.find((chain) => chain.id === chainId);
      setCurrentChain(foundChain);
    }
  }, [chainId, chains]);

  useEffect(() => {
    setRows(
      propertyDetails.rows || [
        {
          id: Date.now(),
          blockchain: "",
          contractAddress: "",
          functionName: "",
        },
      ]
    );
  }, [propertyDetails]);

  const addRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), blockchain: "", contractAddress: "", functionName: "" },
    ]);
    // form.insertListItem('rows', { id: Date.now(), blockchain: '', contractAddress: '', functionName: '' });
  };

  const handleInputChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const deleteRow = (id) => {
    const rowToDelete = rows.find((row) => row.id === id);
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);

    if (rowToDelete?.blockchain) {
      if (!currentChain.testnet) {
        const updatedSelectedChains = selectedMainnetChains.filter(
          (chain) => chain !== rowToDelete.blockchain
        );
        setSelectedMainnetChains(updatedSelectedChains);
      } else {
        const updatedSelectedChains = selectedTestnetChains.filter(
          (chain) => chain !== rowToDelete.blockchain
        );
        setSelectedTestnetChains(updatedSelectedChains);
      }
    }
    updateOptions(
      !currentChain.testnet,
      !currentChain.testnet ? selectedMainnetChains : selectedTestnetChains
    );
  };

  const handleBlockchainChange = (id, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, blockchain: value } : row
    );
    setRows(updatedRows);

    const rowToUpdate = rows.find((row) => row.id === id);
    if (rowToUpdate.blockchain) {
      if (!currentChain.testnet) {
        const updatedSelectedChains = selectedMainnetChains.filter(
          (chain) => chain !== rowToUpdate.blockchain
        );
        setSelectedMainnetChains([...updatedSelectedChains, value]);
      } else {
        const updatedSelectedChains = selectedTestnetChains.filter(
          (chain) => chain !== rowToUpdate.blockchain
        );
        setSelectedTestnetChains([...updatedSelectedChains, value]);
      }
    } else {
      if (!currentChain.testnet) {
        setSelectedMainnetChains([...selectedMainnetChains, value]);
      } else {
        setSelectedTestnetChains([...selectedTestnetChains, value]);
      }
    }
    updateOptions(
      !currentChain.testnet,
      !currentChain.testnet
        ? [...selectedMainnetChains, value]
        : [...selectedTestnetChains, value]
    );
  };


  const getFilteredOptions = () => {
    if (!currentChain || currentChain.testnet) {
      return initialTestnetchains.filter(
        (option) => !selectedTestnetChains.includes(option)
      );
    } else {
      return initialBlockchains.filter(
        (option) => !selectedMainnetChains.includes(option)
      );
    }
  };

  const transitions = useTransition(rows, {
    keys: (row) => row.id,
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
  });

  const updateOptions = (isMainnetSelected, selectedChains) => {
    // Added
    if (isMainnetSelected) {
      setBlockchainOptions(
        initialBlockchains.filter((option) => !selectedChains.includes(option))
      );
    } else {
      setBlockchainOptions(
        initialTestnetchains.filter(
          (option) => !selectedChains.includes(option)
        )
      );
    }
  };

  const resetRows = () => {
    setRows([
      { id: Date.now(), blockchain: "", contractAddress: "", functionName: "" },
    ]);
    setSelectedMainnetChains([]);
    setSelectedTestnetChains([]);
    setBlockchainOptions(
      !currentChain || !currentChain.testnet
        ? initialBlockchains
        : initialTestnetchains
    );
  };

  const handleSubmit = () => {
    let allValid = true;
    const updatedErrors = {};
    rows.forEach((row, index) => {
      const rowErrors = {};
      if (!row.blockchain) rowErrors.blockchain = "Blockchain is required";
      if (!row.contractAddress)
        rowErrors.contractAddress = "Contract address is required";
      if (!row.functionName)
        rowErrors.functionName = "Function name is required";
      if (Object.keys(rowErrors).length > 0) {
        allValid = false;
        // updatedErrors[index] = rowErrors;
        updatedErrors[row.id] = rowErrors; // Set errors for each row with row id
      }
    });

    setErrorRows(updatedErrors); // Update state with errors

    if (!allValid) {
      return;
    }
    setPropertyDetails((prevDetails) => ({
      ...prevDetails,
      rows,
    }));
    const isValid = true;
    const updatedValidation = [...isStepValid];
    updatedValidation[currentStep - 1] = isValid;
    setIsStepValid(updatedValidation);
    handleNext();
  };

  return (
    <>
      <Container
        size="md"
        style={{
          position: "relative",
          left: "-5%",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        <Box style={{ display: "flex", fontSize: "150%", fontWeight: "bold" }}>
          Output
        </Box>
        <Box
          p="sm"
          style={{
            // backgroundColor: "#2c3e50",
            color: "white",
            borderRadius: "8px",
            width: "500px",
          }}
        >
          <Grid align="center" gutter="md">
            <Grid.Col span={1} style={{ paddingLeft: "10px" }} />
            <Grid.Col span={3}>
              <Box
                style={{
                  position: "relative",
                  left: "0%",
                  width: "100%",
                  fontWeight:"bold",
                  fontFamily: "poppins",
                  fontSize: "70%",
                  // backgroundColor: "#7f8c8d",
                  padding: "10px",
                  borderRadius: "4px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                Blockchain
                {/* <CiCircleInfo size={"25"} color="blue" /> */}
              </Box>
            </Grid.Col>
            <Grid.Col span={3}>
              <Box
                style={{
                  position: "relative",
                  left: "20%",
                  width: "100%",
                  fontFamily: "poppins",
                  fontSize: "70%",
                  fontWeight:"bold",
                // fontSize: "85%",
                  // backgroundColor: "#7f8c8d",
                  padding: "10px",
                  borderRadius: "4px",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                Contract Address
                {/* <CiCircleInfo size={"10"} color="blue" /> */}
              </Box>
            </Grid.Col>
            <Grid.Col span={3}>
              <Box
                style={{
                  position: "relative",
                  left: "50%",
                  width: "100%",
                  fontFamily: "poppins",
                  fontSize: "70%",
                  fontWeight:"bold",
                // fontSize: "85%",
                  // backgroundColor: "#7f8c8d",
                  padding: "10px",
                  borderRadius: "4px",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                Function Name
                {/* <CiCircleInfo size={"25"} color="blue" /> */}
              </Box>
            </Grid.Col>
            <Grid.Col span={1} />
          </Grid>
          {transitions((styles, row, index) => (
            <>
              <animated.div style={styles} key={row.id}>
                <Grid key={row.id} align="center" gutter="md" mt="xs">
                  <Grid.Col span={1} style={{}}>
                    <ActionIcon
                      color="#F15A24"
                      onClick={() => deleteRow(row.id)}
                    >
                      <CiTrash size={"20"} />
                    </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span={3} style={{ marginRight: "20px" }}>
                    <Select
                      placeholder={
                        row.blockchain ? row.blockchain : "Pick chain"
                      }
                      // placeholder={row.blockchain}
                      onChange={(value) =>
                        handleBlockchainChange(row.id, value)
                      }
                      data={getFilteredOptions().map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      // data={blockchainOptions.map(option => ({ value: option, label: option }))}
                      style={{
                        fontFamily: "poppins",
                        borderRadius: "12px",
                        backgroundColor: "white",
                        color: "black",
                        width: "65%",
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col span={3} style={{ marginRight: "20px" }}>
                    <TextInput
                      value={row.contractAddress}
                      onChange={(event) =>
                        handleInputChange(
                          row.id,
                          "contractAddress",
                          event.target.value
                        )
                      }
                      variant="filled"
                      placeholder="Enter Contract Address"
                      style={{
                        fontFamily: "poppins",
                        borderRadius: "12px",
                        backgroundColor: "white",
                        color: "black",
                        width: "65%",
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <div style={{}}>
                      <div>
                        <textarea
                          value={row.functionName}
                          onChange={(event) =>
                            handleInputChange(
                              row.id,
                              "functionName",
                              event.target.value
                            )
                          }
                          placeholder="Enter Function Name"
                          style={{
                            alignItems: "center",
                            fontFamily: "poppins",
                            fontSize: "80%",
                            borderRadius: "5px",
                            backgroundColor: "white",
                            color: "black",
                            height: "50%",
                            width: "130%",
                            resize: "none",
                            overflow: "visible",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                          onClick={(e) => (e.target.style.resize = "both")}
                          onBlur={(e) => (e.target.style.resize = "both")}
                          onFocus={(e) => (e.target.style.resize = "none")}
                        />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          right: "-10px",
                          bottom: "15px",
                        }}
                      >
                        {errorRows[index.item.id] && (
                          <Tooltip
                            label={"Please fill all field"}
                            position="top-end"
                            style={{ fontFamily: "poppins" }}
                            withArrow
                            transitionProps={{ transition: "pop-bottom-right" }}
                          >
                            <Center>
                              <GoAlert
                                color="red"
                                size="15"
                                style={{ marginLeft: "10px" }}
                              />
                            </Center>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </Grid.Col>
                </Grid>
              </animated.div>
            </>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Group position="center" mt="md">
              <IoIosAddCircleOutline
                disabled={rows.length >= 4}
                onClick={rows.length >= 4 ? "" : addRow}
                color={rows.length >= 4 ? "#d3d3d3" : "#1e90ff"}
                size={"25px"}
                styles={{ cursor: "pointer" }}
              />
            </Group>
            <Group position="flex-end" mt="md">
              <GrPowerReset onClick={resetRows} size={"21px"} color="#1e90ff" />
            </Group>
          </div>
        </Box>
      </Container>
      <div className="step-navigation ">
        {currentStep !== 1 && (
          <button className="button" onClick={handlePrevious}>
            Previous
          </button>
        )}

        <button
          className="button"
          onClick={handleSubmit}
          // onClick={handleNext}
          disabled={currentStep === steps.length}
        >
          Next
        </button>
      </div>
    </>
  );
};
