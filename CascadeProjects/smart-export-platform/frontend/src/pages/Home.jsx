import React from 'react'
import { HeroSection } from '../components/sections/HeroSection'
import { AboutSection } from '../components/sections/AboutSection'
import Calculator from './Calculator'

function Home() {
  return (
    <div>
      <HeroSection />
      
      <section id="calculator" className="py-20 bg-gradient-to-br from-maritime-cream to-white">
        <Calculator />
      </section>
      
      <AboutSection />
    </div>
  )
}

export default Home
