import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 16, 40, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(177, 157, 216, 0.1);
  box-shadow: 0 4px 30px rgba(26, 16, 40, 0.5);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(motion(Link))`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  text-decoration: none;
  text-shadow: 0 0 20px rgba(177, 157, 216, 0.5);
  position: relative;
  z-index: 1001;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const LoginButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  background: var(--gradient-accent);
  border: none;
  border-radius: 20px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1001;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
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

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Logo
        to="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Consequence
      </Logo>
      
      <LoginButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/login')}
      >
        Login
      </LoginButton>
    </HeaderContainer>
  );
};

export default Header; 