import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudioPage from './pages/StudioPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/studio" element={<StudioPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App; 