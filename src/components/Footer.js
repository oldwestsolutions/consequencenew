import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: rgba(26, 16, 40, 0.95);
  backdrop-filter: blur(10px);
  padding: 4rem 2rem 2rem;
  color: var(--color-text-secondary);
  border-top: 1px solid rgba(177, 157, 216, 0.1);
  
  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: var(--color-text-primary);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FooterLink = styled(motion(Link))`
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-text-primary);
    text-shadow: 0 0 10px rgba(177, 157, 216, 0.3);
    transform: translateX(5px);
  }
  
  @media (max-width: 480px) {
    &:hover {
      transform: none;
    }
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: var(--color-text-secondary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-text-primary);
    text-shadow: 0 0 10px rgba(177, 157, 216, 0.3);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(177, 157, 216, 0.1);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  
  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About</FooterTitle>
          <FooterText>
            Consequence is a cutting-edge WebMIDI integration platform that connects your music devices directly through your browser.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/features">Features</FooterLink>
          <FooterLink to="/studio">Studio</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/docs">Documentation</FooterLink>
          <FooterLink to="/tutorials">Tutorials</FooterLink>
          <FooterLink to="/support">Support</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Connect</FooterTitle>
          <FooterText>
            Follow us on social media for updates and news.
          </FooterText>
          <SocialLinks>
            <SocialLink
              href="https://twitter.com/consequence"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink
              href="https://github.com/consequence"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-github"></i>
            </SocialLink>
            <SocialLink
              href="https://discord.gg/consequence"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-discord"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} Consequence. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 