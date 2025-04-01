import React from 'react'
import { SignInButton } from '@clerk/clerk-react'
import Header from './components/Header'
import { Button } from './components/ui/button'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'

function Home() {
  return (
    <div>

      {/*Headder Section*/}
      <Header/>

      {/*Hero Section*/}
      <Hero/>

      {/*Category Section*/}
      <Category/>

      {/*MostSearchedCar Section*/}
      <MostSearchedCar />

      {/* Info Section */}
      <InfoSection/>
      
      {/* Footer Section */}
      <Footer/>


    </div>
  )
}

export default Home