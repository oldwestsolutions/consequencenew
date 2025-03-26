import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  padding: 2rem;
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
      radial-gradient(circle at 20% 30%, rgba(177, 157, 216, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(138, 124, 184, 0.15) 0%, transparent 40%);
  }
`;

const LoginCard = styled(motion.div)`
  background: rgba(26, 16, 40, 0.6);
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(177, 157, 216, 0.2);
  box-shadow: 0 8px 32px rgba(26, 16, 40, 0.5);
  position: relative;
  z-index: 1;
`;

const Logo = styled(motion(Link))`
  display: block;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  text-decoration: none;
  text-shadow: 0 0 20px rgba(177, 157, 216, 0.5);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: var(--gradient-accent);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid rgba(177, 157, 216, 0.2);
  background: rgba(26, 16, 40, 0.4);
  color: var(--color-text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-accent-primary);
    box-shadow: var(--shadow-neon);
    background: rgba(26, 16, 40, 0.6);
  }
  
  &::placeholder {
    color: rgba(177, 157, 216, 0.5);
  }
`;

const LoginButton = styled(motion.button)`
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: var(--gradient-accent);
  color: var(--color-text-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
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
    box-shadow: var(--shadow-strong);
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const ForgotPassword = styled(motion.a)`
  display: block;
  color: var(--color-text-secondary);
  text-align: center;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-text-primary);
    text-shadow: var(--shadow-neon);
  }
`;

const BackButton = styled(motion(Link))`
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 10;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: rgba(26, 16, 40, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(177, 157, 216, 0.2);
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-text-primary);
    background: rgba(26, 16, 40, 0.6);
    border-color: var(--color-accent-primary);
    text-shadow: var(--shadow-neon);
    transform: translateY(-2px);
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple login - no validation, just navigate to studio
    navigate('/studio');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <LoginContainer>
      <BackButton
        to="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Home
      </BackButton>
      
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Logo
          to="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Consequence
        </Logo>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <LoginButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Sign In
          </LoginButton>
        </Form>
        <ForgotPassword
          href="/forgot-password"
          whileHover={{ scale: 1.05 }}
        >
          Forgot your password?
        </ForgotPassword>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 