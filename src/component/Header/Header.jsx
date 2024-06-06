import React from 'react'
import './Header.css'
import { AiOutlineWallet } from "react-icons/ai";
import { VscTarget } from "react-icons/vsc";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { DecimalAppButton } from '../../rainbowKit/customButton';

export default function Header() {
  
  React.useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.h-wrapper');
      if (window.scrollY > 0) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const redirectToAnotherSite = () => {
    window.location.href = 'https://decimal.at/';
};
  
  return (
    <section  className="h-wrapper">
        <div className="flexCenter h-container">
          <div style={{position:'relative', left:'1%'}}>
          <img className='h-logo' src='./DecimalIcon2000x1469.png'  alt='logo' width={50} onClick={ redirectToAnotherSite }/>

          </div>
       
            <div className="flexCenter h-menu">
              <div style={{display:'flex', position:'relative', right:'10%', gap:'10px'}}>
              <AiOutlineWallet size={25} color='#2a5ce9'/>
                <a href='#jobs' className='poppins-regular'>JOBS</a>
                <VscTarget size={25} color='#2a5ce9'/>
                <a href='' className='poppins-regular'>FEEDS</a>
                <RiArchiveDrawerLine size={25} color='#2a5ce9'/>
                <a href='#intents' className='poppins-regular'>INTENT</a>

              </div>
              <div style={{display:'flex', position:'relative', right:'5%' }}>
              <DecimalAppButton/>
              </div>
            </div>
        </div>
    </section>
  )
}
