import React from 'react'
import './CreateIntent.css';
import Card from './Cards/Card/Card';
import CustomCard from './Cards/Card/CustomCard';
import SearchBar from '../../component/CommanComp/SearchBar/SearchBar'
// import SearchBar from '../CommanComp/SearchBar/SearchBar';
import { RiArchiveDrawerLine } from "react-icons/ri";

export default function CreateIntents() {
  return (
    <>
      <section id="intents" className="intent-wrapper">
        <div className="paddings innerWidth intent-container flexCenter">
          <div className="flexColStart paddings intent-left">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RiArchiveDrawerLine size={25} color='#2a5ce9' />
              <h1 style={{ position: 'relative', left: '4%' }}>Intent Template</h1>
            </div>

            <h5>Build your intent using any template</h5>
          </div>
          <div className='flexColEnd paddings'>
            <SearchBar />
            </div>
        </div>
        <div className='mainCardIntent'>
          <div className='card-container'>
            <CustomCard />
            <Card id= {0} app="vrf" info="VRF" />
            <Card id={1} app="stake&bake" info="Stake & Bake" />
            {/* <Card id={2} /> 
            <Card id={3}/>
            <Card id={4}/>
            <Card id={5}/>
            <Card id={6}/> */}
            {/* <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card /> */}
          </div>
          <div className='card-container'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </section>
    </>
  )
}
