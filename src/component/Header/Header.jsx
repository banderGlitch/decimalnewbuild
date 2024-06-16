import React, { useState } from 'react'
import './Header.css'
import { AiOutlineWallet } from "react-icons/ai";
import { VscTarget } from "react-icons/vsc";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { DecimalAppButton } from '../../rainbowKit/customButton';
import { BiMenuAltRight } from "react-icons/bi";
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from "react-router-dom";
import  decimalLogo  from '../../../public/DecimalIcon2000x1469.png'
import OutsideClickHandler from "react-outside-click-handler";


export default function Header() {
  const navigate = useNavigate();

  const [menuOpened, setMenuOpened] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };


  return (
    <section className="h-wrapper">
      <div className="flexCenter h-container">
        <div style={{ position: 'relative', left: '1%' }}>
          <img className='h-logo' src={decimalLogo} alt='logo' width={50} onClick={redirectToAnotherSite} />

        </div>

        <div className="flexCenter h-menu">
          <div className="menu-items">
            <RiArchiveDrawerLine size={25} color='#2a5ce9' />
            <p onClick={() => navigate('/createIntents')} className='poppins-regular'>INTENT</p>
            <VscTarget size={25} color='#2a5ce9' />
            <p className='poppins-regular'>FEEDS</p>
            <AiOutlineWallet size={25} color='#2a5ce9' />
            <p onClick={() => navigate('/')} className='poppins-regular'>JOBS</p>
            <div style={{ display: 'flex', position: 'relative', left: '4%' }}>
              <DecimalAppButton />
            </div>
          </div>
          <button className="menu-toggle" onClick={() => toggleMenu()}>
            <BiMenuAltRight size={25} color='#2a5ce9' />
          </button>
          <OutsideClickHandler onOutsideClick={() => {
            setMenuOpened(false);
          }}>
            <DropdownMenu isOpen={menuOpened} />
          </OutsideClickHandler>

        </div>
      </div>
    </section>
  )
}





// dropdown component we have 

export const DropdownMenu = ({ isOpen }) => {
  const navigate = useNavigate();
  const styles = useSpring({
    from: { maxHeight: 0, opacity: 0 },
    to: { maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0 },
    config: { tension: 200, friction: 20 },
    overflow: 'hidden',
    // maxHeight: isOpen ? 500 : 0,
    // opacity: isOpen ? 1 : 0,
    // overflow: 'hidden',
    // config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div style={styles} className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
      <div className="dropdown-item">
        <AiOutlineWallet size={25} color='#2a5ce9' />
        <p onClick={() => navigate('/createIntents')} className='poppins-regular'>INTENT</p>
        {/* <a href="#jobs" className="poppins-regular">JOBS</a> */}
      </div>
      <div className="dropdown-item">
        <VscTarget size={25} color='#2a5ce9' />
        <p className='poppins-regular'>FEEDS</p>
        {/* <a href="#feeds" className="poppins-regular">FEEDS</a> */}
      </div>
      <div className="dropdown-item">
        <RiArchiveDrawerLine size={25} color='#2a5ce9' />
        <p onClick={() => navigate('/')} className='poppins-regular'>JOBS</p>
        {/* <a href="#intents" className="poppins-regular">INTENT</a> */}
      </div>
      <div className="dropdown-item">
        <DecimalAppButton />
      </div>
    </animated.div>
  );
};

