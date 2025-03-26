import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 4rem;
  position: relative;
  overflow: hidden;
  background: var(--gradient-primary);
  
  @media (max-width: 768px) {
    padding: 5rem 1rem 3rem;
    text-align: center;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 20%, rgba(177, 157, 216, 0.1) 0%, transparent 50%);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 80%, rgba(177, 157, 216, 0.1) 0%, transparent 50%);
  }
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  z-index: 1;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
  text-shadow: 0 0 30px rgba(177, 157, 216, 0.3);
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    margin: 0 auto 1.5rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: var(--gradient-accent);
  border: none;
  border-radius: 25px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.8rem;
    font-size: 1rem;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-neon);
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const Illustration = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    margin: 0 auto 2rem;
    order: -1;
  }
  
  img {
    width: 100%;
    height: auto;
    max-width: 500px;
    filter: drop-shadow(0 0 20px rgba(177, 157, 216, 0.3));
    
    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroContainer id="hero">
      <Content>
        <TextContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Connect Your Music
            <br />
            With WebMIDI
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience seamless MIDI integration directly in your browser.
            Connect your devices, control your DAW, and create music without barriers.
          </Description>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => navigate('/studio')}
          >
            Try Studio Now
          </CTAButton>
        </TextContent>
        <Illustration
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src="/images/consequence.jpeg" alt="Consequence Logo" />
        </Illustration>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection; 