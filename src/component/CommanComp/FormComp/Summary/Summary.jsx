import React, { useState, useEffect } from 'react'
import { Switch } from '@mantine/core'
import './Summary.css'
import classes from './CustomSwitch.module.css';
import { useAccount, useChains } from 'wagmi'
import { useChainId } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'
import { TextInput, PasswordInput, Tooltip, Center, Text, rem } from '@mantine/core';
import { CiCircleInfo } from "react-icons/ci";
import { useBalance } from 'wagmi'
import { useSpring, animated } from '@react-spring/web';
// import { TextInput, PasswordInput, Tooltip, Center, Text, rem } from '@mantine/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const Summary = ({ index, isStepValid }) => {

  // console.log("index and isStepValid-------------->", isStepValid)

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

  // console.log("account", account )



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

  // const result = account.address ? useBalance({ address: account.address }) : 'NA';


  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    // config: { duration: 500 },
    config: { duration: 1500, easing: t => t * (2 - t) }, // Ease-out effect
  });






  return (
    <div className="summary">
      <div className='switchwrapper'>
      <p className="testnet-label">Testnet</p>
      <Tooltip label="Please change using wallet" position="top" withArrow>
      <div>
        <Switch
          style={{ fontFamily: 'poppins', color: "white" }}
          label="Mainnet"
          checked={!isTestnet}
          disabled={true}
          classNames={classes}
        />
        </div>
        </Tooltip>
        <ToolTipSection style={{ display: 'flex' }} />
      </div>
      <div>
        <div className='summary-header'>
          <span>HERE’S YOUR INTENT SUMMARY: LET’S GO!</span>
        </div>
        <div className='summary-content'>
          {isStepValid[0] &&
            <animated.div style={fadeIn}>
              <SummaryComp1 truncateWalletAddress={truncateWalletAddress} walletAddress={walletAddress} tokenPrice={"0"} />
            </animated.div>}
          {isStepValid[1] &&
            <animated.div style={fadeIn}>
              <SummaryComp2 />
            </animated.div>
          }
          {isStepValid[2] &&
            <animated.div style={fadeIn}>
              <SummaryComp3 />
            </animated.div>
          }
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




const SummaryComp1 = ({ truncateWalletAddress, walletAddress, tokenPrice }) => {

  return (
    <div className="summary-info">
      <div className="info-items">
        <div>
          <span style={{ fontFamily: 'poppins', fontSize: "85%", color: " #F15A24" }}>Wallet Address </span>
        </div>
        <div>
          <span>{truncateWalletAddress(walletAddress)}</span>
        </div>
      </div>
      <div className="info-items">
        <div>
          <span style={{ fontFamily: 'poppins', fontSize: "85%", color: " #F15A24" }}>Token Balance</span>
        </div>
        <div>
          <span>{truncateWalletAddress(tokenPrice)}</span>
        </div>
      </div>
    </div>
  )
}

const SummaryComp2 = ({ ...props }) => {

  return (
    //   <div className="summary-info">
    //   <div style={{display:"flex"}}>
    //     <p style={{ fontFamily: 'poppins', fontSize: "85%" }}> Get me the price feed for &nbsp; </p>
    //     <p style={{ fontFamily: 'poppins', color: "#F15A24", fontSize: "85%" }}>token 0&nbsp;</p>
    //     <p  style={{ fontFamily: 'poppins', fontSize: "85%" }}>vs&nbsp;</p>
    //     <p style={{ fontFamily: 'poppins', color: "#F15A24", fontSize: "85%" }}>token 1&nbsp;</p> 
    //     <p style={{ fontFamily: 'poppins', fontSize: "85%" }} >every&nbsp;</p> 
    //     <p style={{ fontFamily: 'poppins', fontSize: "85%", color: "#F15A24" }}>0&nbsp;
    //     </p> <p style={{ fontFamily: 'poppins', fontSize: "85%" }}> Blocks</p>
    //   </div>
    // </div>

    <div className="summary-info">
    <div className="summary-text">
      <p>Get me the price feed for&nbsp;</p>
      <p className="highlight">token 0&nbsp;</p>
      <p>vs&nbsp;</p>
      <p className="highlight">token 1&nbsp;</p>
      <p>every&nbsp;</p>
      <p className="highlight">0&nbsp;</p>
      <p>Blocks</p>
    </div>
  </div>




  )
}

const SummaryComp3 = ({ ...props }) => {

  return (
    // <div className="summary-info">
    //   <div style={{display:"flex",  gap:"5px"}}>
    //     <span style={{ fontFamily: 'poppins', fontSize: "85%", color: " #F15A24" }}>
    //       Of my current rewards balance:34.787,878,789.000
    //     </span>
    //     <p style={{ fontFamily: 'poppins', fontSize: "85%", color: "white" }}>DPT</p>
    //   </div>
    // </div>
    <div className="summary-info">
    <div className="summary-text">
      <span className="highlight">
        Of my current rewards balance: 34.787,878,789.000 <span className='dpt'>DPT</span> 
      </span>
    </div>
  </div>

  )
}


