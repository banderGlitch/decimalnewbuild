import React, { useState, useEffect } from "react";
import { Switch } from "@mantine/core";
import "./Summary.css";
import classes from "./CustomSwitch.module.css";
import { useAccount, useChains } from "wagmi";
import { useSelector } from 'react-redux';
import { useChainId  } from "wagmi";
import cronstrue from 'cronstrue';
import { mainnet } from "@wagmi/core/chains";
import {
  TextInput,
  PasswordInput,
  Tooltip,
  Center,
  Text,
  rem,
} from "@mantine/core";
import { CiCircleInfo } from "react-icons/ci";
import { useBalance } from "wagmi";
import { useLocation } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useFormSelectors } from "../../../../redux/selector";
import { bigNumberToString } from "../../../../helper/contractReference";



const Summary = ({ index, isStepValid, currentStep }) => {





  const location = useLocation();
  const { isConnected } = useAccount();
  const queryParams = new URLSearchParams(location.search);

  const pathParts = location.pathname.split("/");
  var param = pathParts[pathParts.length - 1];

  param = decodeURIComponent(param)
    .replace(/&/g, "and")
    .toLowerCase()
    .replace(/\s/g, "");

  const chainId = useChainId();

  const chains = useChains();

  const account = useAccount();

  const [currentChain, setCurrentChain] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [renderedSteps, setRenderedSteps] = useState([]);

  const { apiUrl, IniheaderKey, IniheaderValue, timerSetting, rows, payment, approvedRewards } = useFormSelectors();

  console.log("paymentApprovedRewards------------------>", payment.ApprovedRewards)
  // console.log("approvedRewards--------->",approvedRewards)



  useEffect(() => {
    if (chains && chainId) {
      const foundChain = chains.find((chain) => chain.id === chainId);
      setCurrentChain(foundChain);
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1500);
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chainId, chains]);

  const isTestnet = currentChain && currentChain.testnet;

  const truncateWalletAddress = (address) => {
    if (isSmallScreen) {
      const start = address.substring(0, 4); // Keep the first 4 characters
      const end = address.substring(address.length - 4); // Keep the last 4 characters
      return `${start}...${end}`;
    } else {
      return address;
    }
  };
  // const truncateWalletAddressAllscreen = (address, startChars = 4, endChars = 4) => {
  //   const start = address.substring(0, startChars); // Keep the first `startChars` characters
  //   const end = address.substring(address.length - endChars); // Keep the last `endChars` characters
  //   return `${start}...${end}`;
  // };

  const truncateWalletAddressAllscreen = (address, startChars = 4, endChars = 4) => {
    // If the address length is less than or equal to the sum of startChars and endChars
    if (address.length <= startChars + endChars) {
      return address;
    }

    // If the address length is less than or equal to 3, return the address as is
    if (address.length <= 3) {
      return address;
    }

    const start = address.substring(0, startChars); // Keep the first `startChars` characters
    const end = address.substring(address.length - endChars); // Keep the last `endChars` characters
    return `${start}...${end}`;
  };


  const walletAddress = account.address !== undefined ? account.address : "NA";

  // const result = account.address ? useBalance({ address: account.address }) : 'NA';

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    // config: { duration: 500 },
    config: { duration: 1500, easing: (t) => t * (2 - t) }, // Ease-out effect
  });



  console.log("currentStep", currentStep)



  useEffect(() => {
    if (!renderedSteps.includes(currentStep)) {
      setRenderedSteps((prev) => [...prev, currentStep]);
    }
  }, [currentStep, renderedSteps]);




  return (
    <div className="summary">
      <div className="switchwrapper">
        <p className="testnet-label">Testnet</p>
        <Tooltip label="Please change using wallet" position="top" withArrow>
          <div>
            <Switch
              style={{ fontFamily: "poppins", color: "white" }}
              label="Mainnet"
              checked={!isTestnet}
              disabled={true}
              classNames={classes}
            />
          </div>
        </Tooltip>
        <ToolTipSection style={{ display: "flex" }} />
      </div>
      <div>
        <div className="summary-header">
          <span>HERE’S YOUR INTENT SUMMARY: LET’S GO!</span>
        </div>
        <div className="summary-content">
          <animated.div style={fadeIn}>
            <SummaryComp1
              truncateWalletAddress={truncateWalletAddress}
              walletAddress={walletAddress}
              tokenPrice={"0"}
            />
          </animated.div>
          {renderedSteps.includes(1) && (
            <animated.div style={fadeIn}>
              <SummaryFormSpecific formtype={param} apiUrl={apiUrl} headerKey={IniheaderKey} headerValue={IniheaderValue} />
            </animated.div>
          )}
          {renderedSteps.includes(2) && (
            <animated.div style={fadeIn}>
              <SummaryComp2 timerSetting={timerSetting} />
            </animated.div>
          )}
          {renderedSteps.includes(3) && (
            <animated.div style={fadeIn}>
              <SummaryComp3 rows={rows} truncateWalletAddressAllscreen={truncateWalletAddressAllscreen} />
            </animated.div>
          )}
          {renderedSteps.includes(4) && (
            <animated.div style={fadeIn}>
              <SummaryComp4 isConnected = {isConnected} payment={payment} truncateWalletAddressAllscreen={truncateWalletAddressAllscreen} />
            </animated.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;

const ToolTipSection = () => {
  const { isConnected } = useAccount();
  return (
    <Tooltip
      label="disconnected"
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text component="div" c="dimmed">
        {!isConnected && (
          <Center>
            <CiCircleInfo
              color="red"
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </Center>
        )}
      </Text>
    </Tooltip>
  );
};

const SummaryComp1 = ({ truncateWalletAddress, walletAddress, tokenPrice }) => {
  return (
    <div className="summary-info">
      <div className="info-items">
        <div>
          <strong
            style={{
              fontFamily: "poppins",
              fontSize: "85%",
              color: " #F15A24",
            }}
          >
            Wallet Address{" "}
          </strong>
        </div>
        <div>
          <span>{truncateWalletAddress(walletAddress)}</span>
        </div>
      </div>
      <div className="info-items">
        <div>
          <strong
            style={{
              fontFamily: "poppins",
              fontSize: "85%",
              color: " #F15A24",
            }}
          >
            Token Balance
          </strong>
        </div>
        <div>
          <span>{truncateWalletAddress(tokenPrice)}</span>
        </div>
      </div>
    </div>
  );
};
const SummaryFormSpecific = ({ formtype, apiUrl, headerKey, headerValue }) => {

  return (
    <div className="summary-info">
      <div className="info-items">
        {formtype === "vrf" && (
          <strong style={{ fontFamily: "poppins", fontSize: "85%" }}>
            <p style={
              { color: "#F15A24" }
            }>Verifiable Random Function </p>It generates a function that produces a random number which cannot be repeated at any cost.
          </strong>
        )}
        {formtype === "stakeandbake" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <strong style={{ fontFamily: "poppins", fontSize: "85%", color: "#F15A24" }}>
              Stake N' Bake
            </strong>
            <div className="breakable-text" style={{ fontFamily: "poppins", fontSize: "85%", display: "flex", flexDirection: 'column' }}>
              <strong style={{ color: "#F15A24" }}>The contract is deployed at this url : </strong>
              <span>{apiUrl}</span>

            </div>
            <div style={{ fontFamily: "poppins", fontSize: "85%" }}>
              <strong style={{ color: "#F15A24" }}>with header : </strong>
            </div>
            <div className="breakable-text" style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", gap: "10px" }}>
              <div className="breakable-text" style={{ fontFamily: "poppins", fontSize: "85%" }}>
                <strong style={{ color: "#F15A24" }}>Key: </strong>
                <span>{headerKey || 'none'}</span>
              </div>
              <div className="breakable-text" style={{ fontFamily: "poppins", fontSize: "85%" }}>
                <strong style={{ color: "#F15A24" }}>Value: </strong>
                <span>{headerValue || 'none'}</span>
              </div>
            </div>


          </div>

        )}
      </div>
    </div>
  );
};

const SummaryComp2 = ({ timerSetting }) => {
  console.log("timerSetting", timerSetting)
  var finalExpression = cronstrue.toString(timerSetting);
  finalExpression = finalExpression.charAt(0).toLowerCase() + finalExpression.slice(1);
  return (
    <div className="summary-info">
      <div className="breakable-text summary-text">
        {/* <p style={{color:"#F15A24"}}>Every Hour at </p> */}
        {/* <p>Get me the price feed for&nbsp;</p>
        <p className="highlight">token 0&nbsp;</p>
        <p>vs&nbsp;</p>
        <p className="highlight">token 1&nbsp;</p>
        <p>every&nbsp;</p>
        <p className="highlight">0&nbsp;</p>
        <p>Blocks</p> */}
        <span><strong style={{ color: "#F15A24" }}>Every hour {" "} </strong>{finalExpression}</span>
      </div>
    </div>
  );
};

const SummaryComp3 = ({ rows, truncateWalletAddressAllscreen }) => {
  return (
    <div className="summary-info">
      <div className="summary-text">
        <span className="highlight">
          <p style={{ fontFamily: "poppins", fontWeight: "bold" }}>Contract is diployed at particular {" "}</p>
        </span>
        <div>
          <table>
            <thead>
              <tr>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <th style={{ padding: "2px" }}>Blockchain</th>
                  <th style={{ padding: "2px" }}>Contract Address</th>
                  <th style={{ padding: "2px" }}>Function Name</th>
                </div>

              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <td style={{ width: "30%" }} className="breakable-text">{row.blockchain}</td>
                    <td style={{ width: "30%" }} className="breakable-text">{truncateWalletAddressAllscreen(row.contractAddress)}</td>
                    <td style={{ width: "30%" }} className="breakable-text">{truncateWalletAddressAllscreen(row.functionName)}</td>
                  </div>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

const SummaryComp4 = ({ payment, isConnected }) => {
  return (
    <>
      <div className="summary-info">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="breakable-text" style={{ fontFamily: "poppins", fontSize: "85%" }}>
            <strong style={{ color: "#F15A24" }}>Rate Card : </strong>
            <span>{payment.Ratecard} /sec</span>
          </div>
          <div className="breakable-text" style={{ fontFamily: "poppins", fontSize: "85%" }}>
            <strong style={{ color: "#F15A24" }}>Total Value allocated : </strong>
            <span>{payment.TotalValueAllocated}</span>
          </div>
        </div>
      </div>
      {payment.ApprovedRewards && isConnected &&
        <div style={{marginTop:"22px"}} className="summary-info">
          <div style={{display:"flex"}}>
          <p style={{fontFamily:"poppins"}}>
          There are total {bigNumberToString(payment.ApprovedRewards)} DPT approved rewards for this job.
          </p>
          </div>
         
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="breakable-text" style={{ fontFamily: "poppins", fontSize: "85%" }}>
              <strong style={{ color: "#F15A24" }}>Rate Card : </strong>
              <span>{payment.Ratecard} /sec</span>
            </div>
            <div className="breakable-text" style={{ fontFamily: "poppins", fontSize: "85%" }}>
              <strong style={{ color: "#F15A24" }}>Total Value allocated : </strong>
              <span>{payment.TotalValueAllocated}</span>
            </div>
          </div> */}
        </div>
      }
    </>

  )

}
