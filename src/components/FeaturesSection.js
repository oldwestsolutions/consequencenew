import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FeaturesContainer = styled.section`
  padding: 6rem 2rem;
  background: var(--gradient-primary);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
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
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  text-align: center;
  color: var(--color-text-primary);
  font-size: 3rem;
  margin-bottom: 3rem;
  text-shadow: 0 0 30px rgba(177, 157, 216, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(26, 16, 40, 0.4);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(177, 157, 216, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-neon);
    border-color: var(--color-accent-primary);
  }
`;

const FeatureTitle = styled.h3`
  color: var(--color-text-primary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(177, 157, 216, 0.2);
`;

const FeatureDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
`;

const features = [
  {
    title: 'MIDI Compatibility',
    description: 'Connect any MIDI device directly through your browser with full WebMIDI API support.'
  },
  {
    title: 'DAW Integration',
    description: 'Seamlessly integrate with popular DAWs like Ableton Live, Logic Pro, and FL Studio.'
  },
  {
    title: 'Real-time Control',
    description: 'Control your devices in real-time with ultra-low latency and precise timing.'
  },
  {
    title: 'Device Management',
    description: 'Easily manage and configure multiple MIDI devices from a single interface.'
  },
  {
    title: 'Custom Mapping',
    description: 'Create custom MIDI mappings for your specific workflow and preferences.'
  },
  {
    title: 'Cross-platform',
    description: 'Works on any modern browser across desktop and mobile devices.'
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
          transition={{ duration: 0.6 }}
        >
          Powerful Features
        </Title>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
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