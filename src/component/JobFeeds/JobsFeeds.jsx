import React, { useState } from 'react'
import './JobsFeeds.css'
import ToggleButtons from '../ToggleButton/ToggleButton'
import JobFeedCards from './JobFeedCards/JobFeedCards'
import SearchBar from '../CommanComp/SearchBar/SearchBar'
import { AiOutlineWallet } from "react-icons/ai";
import { DecimalAppButton } from '../../rainbowKit/customButton'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
// import { useState } from 'react'

export default function JobsFeeds() {
  const { address, connector, isConnected } = useAccount()
  const [activeButton, setActiveButton] = useState('all');
  return (
    <>
      <div id="jobs" />
      <section className="job-wrapper">
        <div className="paddings   job-container flexCenter">
          {/*Left Side */}
          <div className="flexColStart job-left">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AiOutlineWallet size={25} color='#2a5ce9' />
              <h1 style={{ position: 'relative', left: '12%' }}>Jobs</h1>
            </div>
            <h5>You can switch jobs on and off</h5>
            <ToggleButtons activeButton={activeButton} setActiveButton={setActiveButton} />
          </div>
          <div className='flexColEnd paddings responsive'>
            <SearchBar />
          </div>
        </div>
        {
          activeButton === 'all' ?
            <div className='paddings  job-cards-container'>
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />
              <JobFeedCards />

            </div> :
            <WalletNotConnected />
        }

      </section>
    </>
  )
}


export function WalletNotConnected() {

  const { address, connector, isConnected } = useAccount()
  return (
    <section className="paddings">
      {isConnected === false ?
       <WalletConnect/>
        :
        <div className='job-cards-container'>
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
          <JobFeedCards />
        </div>

      }

    </section>
  )
}

export function WalletConnect() {
  return (
    <div className='walletConnect'>
      <span>Connect your wallet to see My Jobs</span>
      <DecimalAppButton/>
    </div>
  )
}

