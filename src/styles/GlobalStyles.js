import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colors */
    --color-bg-primary: #1a1028;
    --color-bg-secondary: #2a1b3d;
    --color-text-primary: #ffffff;
    --color-text-secondary: rgba(255, 255, 255, 0.7);
    --color-accent-primary: #b19dd8;
    --color-accent-secondary: #8a7cb8;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, #1a1028 0%, #2a1b3d 100%);
    --gradient-accent: linear-gradient(135deg, #b19dd8 0%, #8a7cb8 100%);
    
    /* Shadows */
    --shadow-neon: 0 0 20px rgba(177, 157, 216, 0.3);
    --shadow-strong: 0 8px 32px rgba(26, 16, 40, 0.3);
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 8rem;
    
    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    
    /* Container Widths */
    --container-sm: 640px;
    --container-md: 768px;
    --container-lg: 1024px;
    --container-xl: 1280px;
    
    /* Z-index */
    --z-header: 1000;
    --z-modal: 2000;
    --z-tooltip: 3000;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    
    @media (max-width: 1024px) {
      font-size: 15px;
    }
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
  }

  ::selection {
    background: var(--color-accent-primary);
    color: var(--color-bg-primary);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg-primary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-accent-secondary);
    border-radius: var(--radius-md);
    
    &:hover {
      background: var(--color-accent-primary);
    }
  }

  /* Container Classes */
  .container {
    width: 100%;
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    
    @media (max-width: 1280px) {
      max-width: var(--container-lg);
    }
    
    @media (max-width: 1024px) {
      max-width: var(--container-md);
    }
    
    @media (max-width: 768px) {
      max-width: var(--container-sm);
      padding: 0 var(--spacing-sm);
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
  }

  h1 {
    font-size: 4rem;
    
    @media (max-width: 1024px) {
      font-size: 3.5rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 3rem;
    
    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 2rem;
    
    @media (max-width: 1024px) {
      font-size: 1.75rem;
    }
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    margin-bottom: var(--spacing-sm);
  }

  /* Utility Classes */
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .hidden {
    display: none;
  }

  .visible-mobile {
    display: none;
    
    @media (max-width: 768px) {
      display: block;
    }
  }

  .hidden-mobile {
    @media (max-width: 768px) {
      display: none;
    }
  }

  /* Animation Classes */
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity var(--transition-normal);
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity var(--transition-normal);
  }
`;

export default GlobalStyles; 