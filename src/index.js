import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-bg-primary: #1a1028;
    --color-bg-secondary: #2a1f3d;
    --color-accent-primary: #b19dd8;
    --color-accent-secondary: #8a7cb8;
    --color-text-primary: #ffffff;
    --color-text-secondary: #b19dd8;
    --gradient-primary: linear-gradient(135deg, #2a1f3d 0%, #1a1028 100%);
    --gradient-accent: linear-gradient(45deg, #b19dd8, #8a7cb8);
    --shadow-neon: 0 0 20px rgba(177, 157, 216, 0.3);
    --shadow-strong: 0 0 30px rgba(177, 157, 216, 0.5);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    min-height: 100vh;
    background-image: 
      radial-gradient(circle at 50% 0%, rgba(177, 157, 216, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(138, 124, 184, 0.1) 0%, transparent 50%);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg-primary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-accent-secondary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent-primary);
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
); 