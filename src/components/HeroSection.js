import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--gradient-primary);
  overflow: hidden;
  padding-top: 80px;
`;

const StarryBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%);
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

const Star = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
`;

const Content = styled.div`
  text-align: left;
  z-index: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(500px, 2fr) minmax(300px, 1fr);
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const LogoContainer = styled(motion.div)`
  width: 400px;
  height: 400px;
  position: relative;
  justify-self: center;
  order: 2;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(177, 157, 216, 0.2) 0%, transparent 70%);
    pointer-events: none;
  }
  
  @media (max-width: 968px) {
    width: 300px;
    height: 300px;
    order: 1;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  order: 1;
  justify-content: center;
  max-width: 600px;
  
  @media (max-width: 968px) {
    order: 2;
    text-align: center;
    align-items: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  color: var(--color-text-primary);
  text-shadow: var(--shadow-neon);
  margin: 0;
  line-height: 1.2;
  
  @media (max-width: 968px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  
  @media (max-width: 968px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
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
`;

const HeroSection = () => {
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <HeroContainer>
      <StarryBackground>
        {stars.map((star) => (
          <Star
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </StarryBackground>
      
      <Content>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>
            Seamless MIDI Integration in Your Browser
          </Title>
          
          <Subtitle>
            Connect, Create, and Control MIDI Instruments Directly from Consequence
          </Subtitle>
          
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </CTAButton>
        </TextContent>

        <LogoContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
        >
          <motion.img
            src="/images/consequence.jpeg"
            alt="Consequence"
            animate={{ 
              filter: [
                "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))",
                "drop-shadow(0 0 30px rgba(177, 157, 216, 0.5))",
                "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </LogoContainer>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection; 