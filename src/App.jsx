import './App.css'
import React, { useRef, useEffect, Suspense } from 'react';
import TopBanner from './component/Topbanner/TopBanner'
import Header from './component/Header/Header'
import JobsFeeds from '../src/pages/JobFeeds/JobsFeeds';
// import JobsFeeds from './component/JobFeeds/JobsFeeds'
import CreateIntents from './pages/CreateIntents/CreateIntents';
// import CreateIntents from './component/CreateIntents/CreateIntents'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import Footer from './component/Footer/Footer'
import { mainnet, polygon, optimism, arbitrum, base, zora,gnosis, goerli,sepolia , lineaGoerli } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import NotFound from './pages/404/404';
// import VRFform from './pages/VRF/VRFForm';
import CreateApp from './routes.jsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const config = getDefaultConfig({
  appName: 'decimalAt-web',
  projectId: '1e696e3657a96f5ea6d833e37d8a85c4',
  chains: [
    mainnet,
    // testnet,
    goerli,
    sepolia,
    lineaGoerli,
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
          <BrowserRouter>
          <MantineProvider>
            <MainApp />
            </MantineProvider>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </ WagmiProvider>

  )
}

export default App



export function MainApp() {


  return (
    <Routes>
       <Route
        path='/'
        element={
          <Layout>
            <Suspense
              fallback={
                <div className='loading-loader-section'>
                </div>
              }
            >
              <CreateIntents />
            </Suspense>
          </Layout>
        }
      />
      <Route
        path='/Jobs'
        element={
          <Layout>
            <Suspense
              fallback={
                <div className='loading-loader-section'>
                </div>
              }
            >
                 <JobsFeeds />
            </Suspense>
          </Layout>
        }
      />
      <Route
        path='/create/:appName'
        element={
          <Layout>
            <Suspense
              fallback={
                <div className='loading-loader-section'>
                </div>
              }
            >
              <CreateApp />
            </Suspense>
          </Layout>
        }
      />
       <Route
        path='*'
        element={
          <Layout>
            <Suspense
              fallback={
                <div className='loading-loader-section'>
                </div>
              }
            >
              <NotFound />
            </Suspense>
          </Layout>
        }
      /> 
    </Routes>
  )
}

