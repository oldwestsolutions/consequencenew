import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const HomePageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </HomePageContainer>
  );
};

export default HomePage; 