import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: var(--gradient-primary);
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
      radial-gradient(circle at 30% 20%, rgba(177, 157, 216, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(138, 124, 184, 0.15) 0%, transparent 50%);
  }
`;

const Content = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  color: var(--color-text-primary);
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
  text-shadow: var(--shadow-neon);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 2px;
    background: var(--gradient-accent);
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(177, 157, 216, 0.1);
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  font-size: 1.1rem;
  
  &:before {
    content: "•";
    color: var(--color-accent-primary);
    margin-right: 0.5rem;
    font-size: 1.5rem;
    text-shadow: var(--shadow-neon);
  }
`;

const Illustration = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(26, 16, 40, 0.3);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(177, 157, 216, 0.2);
  box-shadow: var(--shadow-strong);
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(177, 157, 216, 0.1), rgba(138, 124, 184, 0.1));
    z-index: 1;
  }
`;

const MIDIFlow = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: "";
    position: absolute;
    width: 2px;
    height: 80%;
    background: linear-gradient(to bottom, transparent, var(--color-accent-primary), transparent);
    animation: flow 2s infinite;
  }
  
  @keyframes flow {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;

const AboutSection = () => {
  return (
    <AboutContainer id="about">
      <Content>
        <TextContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Revolutionizing MIDI Integration
          </Title>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Consequence.cc enables musicians to harness the power of WebMIDI API, 
            seamlessly connecting your MIDI devices to your favorite DAWs.
          </Description>
          
          <FeatureList>
            <FeatureItem
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Direct MIDI device support via WebMIDI API
            </FeatureItem>
            <FeatureItem
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Seamless integration with Logic Pro and other DAWs
            </FeatureItem>
            <FeatureItem
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Real-time MIDI data transmission with minimal latency
            </FeatureItem>
          </FeatureList>
        </TextContent>
        
        <Illustration
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <MIDIFlow />
        </Illustration>
      </Content>
    </AboutContainer>
  );
};

export default AboutSection; 