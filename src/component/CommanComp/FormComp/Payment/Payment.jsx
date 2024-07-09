import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useSpring, animated } from "@react-spring/web";
import { TextInput, Tooltip, Center, Text, Box, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { GoAlert } from "react-icons/go";
import { useBalance, useChains,  useChainId  } from 'wagmi'
import { useSendTransaction, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { ConnectButton } from '@rainbow-me/rainbowkit';


const Payment = ({ isStepValid, setIsStepValid, steps, currentStep, handleNext, handlePrevious, propertyDetails, setPropertyDetails }) => {

    const { address: walletAddress, isConnected } = useAccount();
    const [contractAddress, setContractAddress] = useState('');
    const [fetchWalletBalance, setWalletBalance] = useState('');
    const [currentChain, setCurrentChain] = useState(null);


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
                totalRewardAllocated: form.values.totalRewardAllocated
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



    useEffect(() => {
        form.setValues({
            totalRewardAllocated: propertyDetails.totalRewardAllocated || '',
        });
    }, [propertyDetails]);


    useEffect(() => {
        if (walletAddress) {
            setContractAddress('0xFetchedContractAddress'); // Example placeholder
        }
    }, [walletAddress]);

    const { data} = useBalance({
        address: walletAddress,
      })


    
  const chainId = useChainId();

  const chains = useChains();

  useEffect(() => {
    if (chains && chainId) {
      const foundChain = chains.find(chain => chain.id === chainId);
      setCurrentChain(foundChain);
    }

  }, [chainId, chains]);


  const isTestnet = currentChain && currentChain.testnet;






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

    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction()


    const handleApprove = async () => {
        if (!isConnected) {
            console.error('Wallet is not connected.');
            return;
        }


        const totalRewardAllocated = form.values.totalRewardAllocated;
        if (!totalRewardAllocated) {
            console.error('Total value allocation is required.');
            return;
        }
        try {
            sendTransaction({
                request: {
                    to: contractAddress, // Replace with your contract address
                    value: parseEther(totalRewardAllocated) // Replace with the amount you want to send
                }
            });
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    }


    const RightSide = (text) => {
        return (
            <p style={{fontFamily:"poppins", color:"white"}}>{text}</p>
        )
    }





    return (
        <animated.div style={styles}>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <Box className="form-header">Payment</Box>
                    <Flex direction="row" align="center" className="form-row">
                        <p className="form-label">Rate Card</p>
                        <TextInput
                            className="form-input"
                            value = {!isTestnet ? " 0.0003 USDC" : " 0.0003 B10"}
                            // value={"50dai"}
                            disabled={true}
                            placeholder="Rate Card"
                            rightSection={RightSide("/sec")}
                            // rightSection={"/sec"}
                        />
                    </Flex>
                    <Flex direction="row" align="center" className="form-row">
                        <p className="form-label">Total value allocated</p>
                        <TextInput
                            className="form-input"
                            placeholder="Rate Card"
                            {...form.getInputProps('totalRewardAllocated')}
                            errorProps={{ display: 'none' }}
                            rightSection={rightSection(form.errors.totalRewardAllocated)}
                            type="number"
                            value={fetchWalletBalance}
                            // defaultValue={fetchWalletBalance}
                            min="0"
                            step="0.00001"
                        />
                        <button type="button" disabled={!isConnected ?true : false} onClick={() => setWalletBalance(data?.formatted)}  className='button maxbutton'>Max</button>
                    </Flex>
                    <div className="button-container">
                        {!isConnected ? (
                            <ConnectButton />
                        ) : (
                            <button type='button' className='button' onClick={handleApprove} disabled={isPending}>
                                {isPending ? 'Approving...' : 'Approve'}
                            </button>
                        )}
                    </div>
                </div>
                <div className="step-navigation">
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