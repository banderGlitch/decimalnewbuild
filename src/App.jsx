import './App.css'
import React, { useRef } from 'react';
import TopBanner from './component/Topbanner/TopBanner'
import Header from './component/Header/Header'
import JobsFeeds from './component/JobFeeds/JobsFeeds'
import CreateIntents from './component/CreateIntents/CreateIntents'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import Footer from './component/Footer/Footer'
import { mainnet, polygon, optimism, arbitrum, base, zora, gnosis } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import useScrollSnap from './helper/Scoller'

const config = getDefaultConfig({
  appName: 'decimalAt-web',
  projectId: '1e696e3657a96f5ea6d833e37d8a85c4',
  chains: [
    mainnet,
    // polygon, 
    // optimism, 
    // arbitrum, 
    // base, 
    // zora, 
    gnosis
  ],
  //ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {

  return (
    < WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider showRecentTransactions={true}>
          <MainApp />
        </RainbowKitProvider>
      </QueryClientProvider>
    </ WagmiProvider>

  )
}

export default App


export function MainApp() {
  const { containerRef, setRef } = useScrollSnap();
  // const containerRef = useRef(null);
  // useScrollSnap(containerRef);
  return (
    <div className="app" ref={containerRef}>
      <TopBanner />
      <Header />
      <div className='containerWrapper'  >
        <JobsFeeds />
        <CreateIntents />
      </div>
      <Footer />
    </div>

  )
}