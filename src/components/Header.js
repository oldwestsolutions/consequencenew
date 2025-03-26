import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(motion.nav)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 16, 40, 0.98);
  backdrop-filter: blur(20px);
  padding: 5rem 2rem 2rem;
  z-index: 1000;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const NavLink = styled(motion.a)`
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--gradient-accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--color-text-primary);
    text-shadow: 0 0 10px rgba(177, 157, 216, 0.3);
  }
  
  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
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
  
  @media (max-width: 768px) {
    padding: 0.5rem 1.2rem;
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

const MenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  div {
    width: 24px;
    height: 2px;
    background: currentColor;
    margin: 6px 0;
    transition: 0.3s;
    
    &:first-child {
      transform: ${props => props.isOpen ? 'rotate(45deg) translate(7px, 7px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }
    
    &:last-child {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'};
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Logo
        to="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={closeMenu}
      >
        Consequence
      </Logo>
      
      <Nav>
        <NavLink
          href="#features"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Features
        </NavLink>
        <NavLink
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          About
        </NavLink>
        <NavLink
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
        </NavLink>
      </Nav>
      
      <MenuButton
        onClick={toggleMenu}
        isOpen={isMenuOpen}
        aria-label="Toggle menu"
      >
        <div />
        <div />
        <div />
      </MenuButton>
      
      <LoginButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          navigate('/login');
          closeMenu();
        }}
      >
        Login
      </LoginButton>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileNav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink
              href="#features"
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </NavLink>
            <NavLink
              href="#about"
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </NavLink>
            <NavLink
              href="#contact"
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </NavLink>
          </MobileNav>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header; 