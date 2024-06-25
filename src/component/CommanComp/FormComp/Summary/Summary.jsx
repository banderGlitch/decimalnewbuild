import React, { useState, useEffect } from 'react'
import { Switch } from '@mantine/core'
import './Summary.css'
import classes from './CustomSwitch.module.css';
import { useAccount, useChains } from 'wagmi'
import { useChainId } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'
import { TextInput, PasswordInput, Tooltip, Center, Text, rem } from '@mantine/core';
import { CiCircleInfo } from "react-icons/ci";
// import { TextInput, PasswordInput, Tooltip, Center, Text, rem } from '@mantine/core';


const Summary = () => {

  const chainId = useChainId();

  const chains = useChains();

  const account = useAccount()

  const [currentChain, setCurrentChain] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (chains && chainId) {
      const foundChain = chains.find(chain => chain.id === chainId);
      setCurrentChain(foundChain);
    }


    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1500);
    };
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [chainId, chains]);




  const isTestnet = currentChain && currentChain.testnet;
  
  console.log("account", account )



  const truncateWalletAddress = (address) => {
    if (isSmallScreen) {
      const start = address.substring(0, 4); // Keep the first 4 characters
      const end = address.substring(address.length - 4); // Keep the last 4 characters
      return `${start}...${end}`;
    } else {
      return address
    }
  };


  const walletAddress = account.address !== undefined ? account.address : 'NA';




  return (
    <div className="summary">
      <div className='switchwrapper'>
        <p style={{ display: 'flex', fontFamily: 'poppins', position: 'relative', right: '11px', top: "0px", fontSize: "89%", color: "#adb5bd" }}>Testnet</p>
        <Switch
          style={{ fontFamily: 'poppins', color: "white" }}
          label="Mainnet"
          checked={!isTestnet}
          disabled={true}
          classNames={classes}
        />
        <ToolTipSection style={{ display: 'flex' }} />
      </div>
      <div>
        <div style={{ paddingBottom: "12px" }}>
          <span style={{ fontFamily: 'poppins', fontWeight: 'bold' }}>HERE’S YOUR INTENT SUMMARY: LET’S GO!</span>
        </div>
        <div className="summary-info">
          <div className="info-items">
            <div>
              {/* <span style={{ fontFamily: 'poppins', fontSize: "85%", color: " #F15A24" }}>Your Wallet Address is</span> */}
              <span style={{ fontFamily: 'poppins', fontSize: "85%", color: " #F15A24" }}>Wallet Address </span>
            </div>
            <div>
            <span>{truncateWalletAddress(walletAddress)}</span>
              {/* <span>0x6ee67AFKFKJFJJVVJJV</span> */}
            </div>
          </div>
          <div className="info-items">
            <div>
            <span style={{ fontFamily: 'poppins', fontSize: "85%", color: " #F15A24" }}>Token Balance</span>
              {/* <span style={{ fontFamily: 'poppins', fontSize: "85%", color: " #F15A24" }}>with Token Balance</span> */}
            </div>
            <div>
              <span>{truncateWalletAddress("0.0458xDai")}</span>
            </div>
          </div>
        </div>

      </div>

    </div>

  )
}


export default Summary









const ToolTipSection = () => {

  const { isConnected } = useAccount()
  return (
    <Tooltip
      label="disconnected"
      position="top-end"
      withArrow
      transitionProps={{ transition: 'pop-bottom-right' }}
    >
      <Text component="div" c="dimmed">
        {!isConnected &&
          <Center>
            < CiCircleInfo color='red' style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </Center>
        }

      </Text>
    </Tooltip>

  )

}