import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import PianoKeyboard from '../components/PianoKeyboard';
import ChatbotUI from '../components/ChatbotUI';
import DrumMachine from '../components/DrumMachine';
import TrackArrangement from '../components/TrackArrangement';

const ResponsiveGridLayout = WidthProvider(Responsive);

const StudioContainer = styled.div`
  min-height: 100vh;
  background: var(--gradient-primary);
  color: var(--color-text-primary);
  position: relative;
  overflow: hidden;
  
  .react-grid-item {
    background: rgba(26, 16, 40, 0.6);
    border: 1px solid rgba(177, 157, 216, 0.2);
    border-radius: 10px;
    padding: 1rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--color-accent-primary);
      box-shadow: var(--shadow-neon);
    }
    
    &.react-draggable-dragging {
      z-index: 100;
      border-color: var(--color-accent-primary);
      box-shadow: var(--shadow-strong);
    }
  }
  
  .react-grid-item.react-grid-placeholder {
    background: rgba(177, 157, 216, 0.2);
    border: 2px dashed var(--color-accent-primary);
    border-radius: 10px;
  }
  
  .react-resizable-handle {
    background-image: none;
    &:after {
      content: '';
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 12px;
      height: 12px;
      border-right: 2px solid var(--color-accent-primary);
      border-bottom: 2px solid var(--color-accent-primary);
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }
    &:hover:after {
      opacity: 1;
    }
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: rgba(26, 16, 40, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(177, 157, 216, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  text-shadow: var(--shadow-neon);
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: rgba(177, 157, 216, 0.1);
  color: var(--color-text-primary);
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid rgba(177, 157, 216, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(177, 157, 216, 0.2);
    border-color: var(--color-accent-primary);
    text-shadow: var(--shadow-neon);
    box-shadow: var(--shadow-neon);
  }
`;

const MainContent = styled.main`
  padding: 80px 1rem 1rem;
  min-height: 100vh;
`;

const GridItemContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
    text-shadow: var(--shadow-neon);
    cursor: move;
    user-select: none;
  }
`;

const StudioPage = () => {
  const navigate = useNavigate();
  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'track-arrangement', x: 0, y: 0, w: 6, h: 4 },
      { i: 'piano-roll', x: 6, y: 0, w: 6, h: 4 },
      { i: 'drum-machine', x: 0, y: 4, w: 4, h: 4 },
      { i: 'piano-keyboard', x: 4, y: 4, w: 4, h: 4 },
      { i: 'chatbot', x: 8, y: 4, w: 4, h: 4 },
    ],
    md: [
      { i: 'track-arrangement', x: 0, y: 0, w: 6, h: 4 },
      { i: 'piano-roll', x: 6, y: 0, w: 6, h: 4 },
      { i: 'drum-machine', x: 0, y: 4, w: 4, h: 4 },
      { i: 'piano-keyboard', x: 4, y: 4, w: 4, h: 4 },
      { i: 'chatbot', x: 8, y: 4, w: 4, h: 4 },
    ],
    sm: [
      { i: 'track-arrangement', x: 0, y: 0, w: 6, h: 4 },
      { i: 'piano-roll', x: 0, y: 4, w: 6, h: 4 },
      { i: 'drum-machine', x: 0, y: 8, w: 6, h: 4 },
      { i: 'piano-keyboard', x: 0, y: 12, w: 6, h: 4 },
      { i: 'chatbot', x: 0, y: 16, w: 6, h: 4 },
    ],
  });

  const handleLogout = () => {
    navigate('/');
  };

  const handleLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
  };

  return (
    <StudioContainer>
      <Header>
        <Logo>Consequence Studio v2</Logo>
        <NavButtons>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </NavButtons>
      </Header>

      <MainContent>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 12, md: 12, sm: 6 }}
          rowHeight={100}
          margin={[16, 16]}
          containerPadding={[16, 16]}
          isDraggable={true}
          isResizable={true}
          draggableHandle=".drag-handle"
          onLayoutChange={handleLayoutChange}
        >
          <div key="track-arrangement">
            <GridItemContent>
              <h3 className="drag-handle">Track Arrangement</h3>
              <TrackArrangement />
            </GridItemContent>
          </div>
          <div key="piano-roll">
            <GridItemContent>
              <h3 className="drag-handle">Piano Roll</h3>
              <div>MIDI note editor will go here</div>
            </GridItemContent>
          </div>
          <div key="drum-machine">
            <GridItemContent>
              <h3 className="drag-handle">Drum Machine</h3>
              <DrumMachine />
            </GridItemContent>
          </div>
          <div key="piano-keyboard">
            <GridItemContent>
              <h3 className="drag-handle">Piano Keyboard</h3>
              <PianoKeyboard />
            </GridItemContent>
          </div>
          <div key="chatbot">
            <GridItemContent>
              <h3 className="drag-handle">AI Assistant</h3>
              <ChatbotUI />
            </GridItemContent>
          </div>
        </ResponsiveGridLayout>
      </MainContent>
    </StudioContainer>
  );
};

export default StudioPage; 