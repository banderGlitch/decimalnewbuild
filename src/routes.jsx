import React from 'react';
import { useParams } from 'react-router-dom';
import VRFForm from './pages/VRF/VRFForm';
import SBFrom from './pages/SB/SBFrom';
import NotFound from './pages/404/404';
import JobsFeeds from './pages/JobFeeds/JobsFeeds';
import SwapCard from './pages/Swap/Swap';



const  CreateApp =() => {

  let { appName } = useParams();

  const formattedAppName = appName?.toLowerCase().replace(/\s/g, '');
 
  switch (formattedAppName) {
    case 'vrf':
      return <VRFForm/>;
    case 'stake&bake':
      return <SBFrom/>;
    case 'swap':
      return <SwapCard/>
    default:
      return <JobsFeeds/>;
  }
}


export default CreateApp

