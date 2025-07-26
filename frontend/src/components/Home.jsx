import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CatergoryCarousel from './CatergoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs(); // fetch jobs on mount

  return (
    <>
      <Navbar />
      <HeroSection />
      <CatergoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
}

export default Home;
