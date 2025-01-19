import React from 'react'
import Header from './_components/Header';
import Hero from './_components/Hero';
import Footer from './_components/Footer';
import Testimonials from './_components/Testimonials';
import StatSection from './_components/StatSection';


export default function Home() {
  return (
   <div>
    <Header/>

    <Hero/>
    <StatSection/>
    <Testimonials/>
    <Footer/>
   </div>
  );
}

