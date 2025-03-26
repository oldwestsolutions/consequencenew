import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CTAContainer = styled.section`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: var(--gradient-primary);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 50% 0%, rgba(177, 157, 216, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(138, 124, 184, 0.1) 0%, transparent 50%);
  }
`;

const Content = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
  text-shadow: var(--shadow-neon);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: var(--gradient-accent);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(177, 157, 216, 0.1);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 1.2rem 2.5rem;
  font-size: 1.3rem;
  background: var(--gradient-accent);
  border: none;
  border-radius: 30px;
  color: var(--color-text-primary);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-weight: 600;
  
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
    box-shadow: var(--shadow-strong);
  }
  
  &:hover:before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
`;

const CTASection = () => {
  return (
    <CTAContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to Make Music?
        </Title>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start making music instantly. No installations required.
          Connect your MIDI device and begin creating your masterpiece.
        </Description>
        
        <CTAButton
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Connect Your MIDI Device
        </CTAButton>
      </Content>
    </CTAContainer>
  );
};

export default CTASection; 