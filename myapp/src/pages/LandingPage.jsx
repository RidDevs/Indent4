import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import HowItWorks from "../components/HowItWorks";
import WhyPlatform from "../components/WhyPlatform";
import Features from "../components/Features";
import Disclaimer from "../components/Disclaimer";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <WhyPlatform />
      <Features />
      <Disclaimer />
      <Footer />
    </>
  );
};

export default LandingPage;