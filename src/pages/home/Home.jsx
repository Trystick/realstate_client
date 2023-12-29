import React from 'react'

import "./home.css"
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import SlideShow from '../../components/slide/SlideShow'
import Impress from '../../components/impress/Impress'
import Footer from '../../components/footer/Footer'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import ImpressLandLease from '../../components/impresslandlease/ImpressLandLease'
import ImpressLandSale from '../../components/impresslandsale/ImpressLandSale'


const Home = () => {
  return (
    <div>
      <div className="header">
      <Header/>
      </div>
      <div className="homeContainer">
        <Featured/>
      </div>
      <div className='slide'>
      <SlideShow/>
      </div>
      <div className='impresslandsale'>
        <ImpressLandSale/>
      </div>
      <div className='impresslandlease'>
        <ImpressLandLease/>
      </div>
      <div className='impress'>
        <Impress/>
      </div>
      <ScrollToTop/>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
