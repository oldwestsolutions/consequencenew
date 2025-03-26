import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FeaturesContainer = styled.section`
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
      radial-gradient(circle at 70% 20%, rgba(177, 157, 216, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 30% 80%, rgba(138, 124, 184, 0.15) 0%, transparent 50%);
  }
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--color-text-primary);
  text-shadow: var(--shadow-neon);
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--gradient-accent);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(26, 16, 40, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(177, 157, 216, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(26, 16, 40, 0.6);
    border-color: var(--color-accent-primary);
    box-shadow: var(--shadow-neon);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: var(--shadow-neon);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  text-shadow: 0 0 10px rgba(177, 157, 216, 0.3);
`;

const FeatureDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
`;

const features = [
  {
    icon: "🎹",
    title: "MIDI Compatibility",
    description: "Supports most MIDI controllers via WebMIDI API"
  },
  {
    icon: "🔗",
    title: "Seamless DAW Integration",
    description: "Works with Logic Pro, Ableton Live, FL Studio"
  },
  {
    icon: "🌍",
    title: "No Downloads Required",
    description: "Runs entirely in the browser"
  },
  {
    icon: "⚡",
    title: "Low-Latency Performance",
    description: "Optimized for real-time MIDI interaction"
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description: "Ensures safe and encrypted MIDI data transmission"
  },
  {
    icon: "🛠",
    title: "Customizable Dashboard",
    description: "Users can personalize their experience"
  }
];

const FeaturesSection = () => {
  return (
    <FeaturesContainer id="features">
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Powerful Features
        </Title>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Icon>{feature.icon}</Icon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Content>
    </FeaturesContainer>
  );
};

export default FeaturesSection; 