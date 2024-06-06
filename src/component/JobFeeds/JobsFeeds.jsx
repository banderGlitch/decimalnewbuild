import React from 'react'
import './JobsFeeds.css'
import ToggleButtons from '../ToggleButton/ToggleButton'
import JobFeedCards from './JobFeedCards/JobFeedCards'
import SearchBar from '../CommanComp/SearchBar/SearchBar'
import { AiOutlineWallet } from "react-icons/ai";

export default function JobsFeeds() {
  return (
    <>
    <div id="jobs"/>
      <section className="job-wrapper">
        <div className="paddings innerWidth job-container flexCenter">
          {/*Left Side */}
          <div className="flexColStart job-left">
            <div style={{display:'flex', alignItems:'center'}}>
            <AiOutlineWallet size={25} color='#2a5ce9'/>
            <h1 style={{position:'relative', left:'12%'}}>Jobs</h1>
            </div>
            <h5>You can switch jobs on and off</h5>
            <ToggleButtons />
          </div>
          <div className='flexColEnd paddings'>
            <SearchBar />
          </div>
        </div>
        <div className='paddings  job-cards-container'>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            <JobFeedCards/>
            
          </div>
      </section>
    </>
  )
}
