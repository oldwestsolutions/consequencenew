import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: rgba(26, 16, 40, 0.95);
  padding: 4rem 2rem 2rem;
  color: var(--color-text-primary);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(177, 157, 216, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(177, 157, 216, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(138, 124, 184, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Section = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: var(--color-text-primary);
    text-shadow: var(--shadow-neon);
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background: var(--gradient-accent);
      
      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-text-primary);
    text-shadow: var(--shadow-neon);
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled.div`
  p {
    margin-bottom: 0.8rem;
    color: var(--color-text-secondary);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      color: var(--color-text-primary);
      text-shadow: var(--shadow-neon);
      transform: translateX(5px);
      
      @media (max-width: 768px) {
        transform: translateX(0) scale(1.05);
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(177, 157, 216, 0.1);
  color: var(--color-text-secondary);
  position: relative;
  z-index: 1;
  
  a {
    color: var(--color-accent-primary);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--color-text-primary);
      text-shadow: var(--shadow-neon);
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Content>
        <Section>
          <h3>Connect With Us</h3>
          <SocialLinks>
            <SocialLink
              href="https://twitter.com/consequencecc"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🐦
            </SocialLink>
            <SocialLink
              href="https://instagram.com/consequencecc"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              📸
            </SocialLink>
            <SocialLink
              href="https://discord.gg/consequencecc"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              💬
            </SocialLink>
          </SocialLinks>
        </Section>
        
        <Section>
          <h3>Contact</h3>
          <ContactInfo>
            <motion.p whileHover={{ x: 5 }}>Email: support@consequence.cc</motion.p>
            <motion.p whileHover={{ x: 5 }}>Location: San Francisco, CA</motion.p>
            <motion.p whileHover={{ x: 5 }}>Hours: Mon-Fri, 9am-5pm PST</motion.p>
          </ContactInfo>
        </Section>
        
        <Section>
          <h3>Quick Links</h3>
          <ContactInfo>
            <motion.p whileHover={{ x: 5 }}>Documentation</motion.p>
            <motion.p whileHover={{ x: 5 }}>API Reference</motion.p>
            <motion.p whileHover={{ x: 5 }}>Community Forum</motion.p>
          </ContactInfo>
        </Section>
      </Content>
      
      <Copyright>
        <p>
          © {new Date().getFullYear()} Consequence.cc. All rights reserved. |{' '}
          <motion.a 
            href="/terms"
            whileHover={{ scale: 1.05 }}
          >
            Terms of Use
          </motion.a> |{' '}
          <motion.a 
            href="/privacy"
            whileHover={{ scale: 1.05 }}
          >
            Privacy Policy
          </motion.a>
        </p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 