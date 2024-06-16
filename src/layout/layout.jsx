import React from 'react'
import './layout.css';
import TopBanner from '../component/Topbanner/TopBanner';
// import TopBanner from './component/Topbanner/TopBanner'
import Header from '../component/Header/Header';
// import Header from './component/Header/Header'
// import JobsFeeds from './component/JobFeeds/JobsFeeds'
// import CreateIntents from './component/CreateIntents/CreateIntents'
import Footer from '../component/Footer/Footer';
import SideSocialButtons from '../component/CommanComp/SearchBar/SideSocialButtons/SideSocialButtons';

export default function Layout({ children }) {
    return (
        <div className="layout">
            <TopBanner />
            <Header />
            <main className="containerWrapper">
                {children}
            </main>
            <Footer />
            <div className="sideSocialButtonsWrapper">
                <SideSocialButtons />
            </div>
        </div>


    )
}
    
    
