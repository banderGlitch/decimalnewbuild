import './App.css'
import React, { Suspense } from 'react';
import JobsFeeds from '../src/pages/JobFeeds/JobsFeeds';
import CreateIntents from './pages/CreateIntents/CreateIntents';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora, gnosis, goerli, sepolia, lineaGoerli } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import NotFound from './pages/404/404';
import CreateApp from './routes.jsx';
import { Loader } from '@mantine/core';
import '@mantine/core/styles.css';
import 'react-js-cron/dist/styles.css'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { MantineProvider } from '@mantine/core';

const config = getDefaultConfig({
  appName: 'decimalAt-web',
  projectId: '1e696e3657a96f5ea6d833e37d8a85c4',
  chains: [
    mainnet,
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
    <Provider store={store}>
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
    </Provider>

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
                  <Loader color="blue" />;
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
                  <Loader color="blue" />;
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
                  <Loader color="blue" />;
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
                  <Loader color="blue" />;
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

