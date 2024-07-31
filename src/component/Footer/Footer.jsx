import React from 'react'
import './Footer.css';


export default function Footer() {
  const decimalImg = 'https://decimal.at/wp-content/uploads/2024/03/decimalDarkLogo1000x188.png'

  return (
    <section className="f-wrapper">
      <div className="f-container Footerpadding flexColStart">
        <img className='decimal-logo' src={decimalImg} />
        <span className='poppins-regular'>Decimal© 2023-2024. All Rights Reserved.</span>
        <span className='poppins-regular'>
          These materials are for general information purposes only and are not investment advice or a recommendation or solicitation to buy, sell, stake or hold any cryptoasset or to engage in any specific trading strategy. Decimal does not and will not work to increase or decrease the price of any particular cryptoasset it makes available. Some crypto products and markets are unregulated, and you may not be protected by government compensation and/or regulatory protection schemes. The unpredictable nature of the crypto-asset markets can lead to loss of funds. Tax may be payable on any return and/or on any increase in the value of your cryptoassets and you should seek independent advice on your taxation position. Geographic restrictions may apply.
        </span>
      </div>
    </section>
  )
}
