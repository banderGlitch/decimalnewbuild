import React, { useEffect, useState, useCallback } from 'react';
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from "@react-spring/web";
import { TextInput, Tooltip, Center, Text, Box, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { GoAlert } from "react-icons/go";
import { bigNumberToString } from '../../../../helper/contractReference';
import { useBalance, useChains, useChainId } from 'wagmi'
import { useSendTransaction, useAccount } from 'wagmi'
import { erc20Abi } from 'viem';
import { parseEther } from 'viem'
import { ethers } from 'ethers';
import { updateTotalValueAllocated, updateRatecard ,updateApprovedRewards } from '../../../../redux/paymemtSlice';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useFormSelectors } from '../../../../redux/selector';
import { useEthersSigner } from '../../../../helper/walletInteraction/ethers';
import { DECIMALS, erc20USDC, decimalContractAddress , stringToBigNumber } from '../../../../helper/contractReference';



const Payment = ({ isStepValid, setIsStepValid, steps, currentStep, handleNext, handlePrevious, propertyDetails, setPropertyDetails }) => {
    // const approvedRewards = useSelector((state) => state.approvedRewards)
    // console.log("approvedRewards", approvedRewards)
    // const approvedRewards = useSelector((state) => state.ApprovedRewards)
    // console.log("approvedRewards", approvedRewards)

    const { address: walletAddress, isConnected } = useAccount();
    const account = useAccount()
    console.log("account", account);
    const [isWaiting, setIsWaiting] = useState(false);
    const [balanceOfUser, setBalanceOfUser] = useState(0n);
    const [allowance, setAllowance] = useState(0n);
    const [buttonText, setButtonText] = useState('Approve');
    // const [contractAddress, setContractAddress] = useState('');
    // const [fetchWalletBalance, setWalletBalance] = useState('');
    const [currentChain, setCurrentChain] = useState(null);
    // const { payment } = useFormSelectors
    const dispatch = useDispatch();
    const signer = useEthersSigner({ chainId: account?.chain?.id });
    // let chain = account && account.chain ? account.chain.name?.toLowerCase().toString() : '';


    useEffect(() => {
        if ( account && signer) {
            let contractOfUser = new ethers.Contract(erc20USDC[currentChain.name.toLowerCase()], erc20Abi, signer);
            //To get the balance
            contractOfUser && contractOfUser.balanceOf(account.address).then((resp) => {
                setBalanceOfUser(resp);
            }, err => {
                console.log(err);
                setBalanceOfUser(0n);
            });
            //To Check Allowance
            contractOfUser && contractOfUser.allowance(account.address, decimalContractAddress[currentChain.name.toLowerCase()]).then((resp) => {
                // console.log("resp-------->", resp)
                setAllowance(resp);
                dispatch(updateApprovedRewards(resp.toString()));
                // dispatch(updateApprovedRewards(bigNumberToString(resp)))
            }, err => {
                console.log(err);
            });
        }
    }, [account, allowance]);

    // useEffect(() => {
    //     if (isConnected) {
    //       const totalRewardAllocated = form.values.totalRewardAllocated;
    //       if (totalRewardAllocated && BigInt(totalRewardAllocated) > allowance) {
    //         setButtonText('Approve');
    //       } else {
    //         setButtonText('Escrow Funds');
    //       }
    //     }
    //   }, [form.values.totalRewardAllocated, allowance, isConnected]);







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
            dispatch(updateTotalValueAllocated(form.values.totalRewardAllocated));
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



    const { data } = useBalance({
        address: walletAddress,
    })


    console.log("data------->", data)



    const chainId = useChainId();

    const chains = useChains();


    useEffect(() => {
        if (chains && chainId) {
            const foundChain = chains.find(chain => chain.id === chainId);
            setCurrentChain(foundChain);
        }

    }, [chainId, chains]);


    const isTestnet = currentChain && currentChain.testnet;


    const rateCardValue = isTestnet ? "0.0003 B10" : "0.0003 USDC";

    const updateRate = useCallback(() => {

        dispatch(updateRatecard(rateCardValue));

    }, [dispatch, rateCardValue]);

    useEffect(() => {

        updateRate();
       },

    [updateRate]);








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

    // const {
    //     data: hash,
    //     error,
    //     isPending,
    //     sendTransaction
    // } = useSendTransaction()


    const handleApprove = async () => {
        setIsWaiting(true);
        if (!isConnected) {
            console.error('Wallet is not connected.');
            setIsWaiting(false);
            return;
        }


        const totalRewardAllocated = form.values.totalRewardAllocated;
        if (!totalRewardAllocated) {
            console.error('Total value allocation is required.');
            setIsWaiting(false);
            return;
        }

        console.log("totalRewardAllocated", totalRewardAllocated)
        let contractOfDecimal;
        if (signer) {
            contractOfDecimal = new ethers.Contract(erc20USDC[currentChain.name.toLowerCase()], erc20Abi, signer);
            try {
                const expoValue = stringToBigNumber(totalRewardAllocated, DECIMALS[currentChain.name.toLowerCase()]);
                console.log("expoValue", expoValue)
                const resp = await contractOfDecimal.approve(decimalContractAddress[currentChain.name.toLowerCase()], expoValue);
                console.log("resp------<>",resp)
                if (resp && resp.wait) {
                    const response = await resp.wait();
                    if (response.status) {
                        console.log("approved!!!!!!")
                        setIsWaiting(false);
                    } else {
                        console.log("Please select a valid range for approval")
                        setIsWaiting(false);
                    }
                }
            } catch (err) {
                console.log(err);
                setIsWaiting(false);
            }
        }
         // try {
        //     sendTransaction({
        //         request: {
        //             to: contractAddress,
        //             value: parseEther(totalRewardAllocated) // Replace with the amount you want to send
        //         }
        //     });
        // } catch (error) {
        //     console.error('Transaction failed:', error);
        // }
    }


    const RightSide = (text) => {
        return (
            <p style={{ fontFamily: "poppins", color: "white" }}>{text}</p>
        )
    }



    const handleMaxClick = () => {
        form.setFieldValue('totalRewardAllocated', bigNumberToString(balanceOfUser));
        dispatch(updateTotalValueAllocated(bigNumberToString(balanceOfUser)));
      };





    return (
        <animated.div style={styles}>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <Box className="form-header">Payment</Box>
                    <Flex direction="row" align="center" className="form-row">
                        <p className="form-label">Rate Card</p>
                        <TextInput
                            className="form-input"
                            value={!isTestnet ? " 0.0003 USDC" : " 0.0003 B10"}
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
                            placeholder="Total Value allocated"
                            {...form.getInputProps('totalRewardAllocated')}
                            errorProps={{ display: 'none' }}
                            rightSection={rightSection(form.errors.totalRewardAllocated)}
                            // type="number"
                            // value={fetchWalletBalance}
                            onChange={(e) => {
                                form.setFieldValue('totalRewardAllocated', e.currentTarget.value);
                                dispatch(updateTotalValueAllocated(e.currentTarget.value));
                              }}
                            min="0"
                            step="0.00001"
                        />
                        {/* <button type="button" disabled={!isConnected ? true : false} onClick={() => setWalletBalance(data?.formatted)} className='button maxbutton'>Max</button> */}
                        <button type="button" disabled={!isConnected ? true : false} onClick={handleMaxClick} className='button maxbutton'>Max</button>
                    </Flex>
                    <div className="button-container">
                        {!isConnected ? (
                            <ConnectButton />
                        ) : (
                            <button type='button' className='button' onClick={handleApprove} >
                                {isWaiting ?'Approving...' : 'Approve'}
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