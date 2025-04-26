import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as Tone from 'tone';
import './DrumMachine.css';

const DrumMachineContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const PadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  flex: 1;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const DrumPad = styled(motion.div)`
  border-radius: 6px;
  background: linear-gradient(135deg, #472073, #2d1546);
  border: 1px solid rgba(177, 157, 216, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease;
  
  &.active {
    background: linear-gradient(135deg, #8a2be2, #4b0082);
    transform: scale(0.95);
    box-shadow: var(--shadow-neon), inset 0 0 10px rgba(255, 255, 255, 0.3);
  }
  
  .pad-number {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: auto;
  }
  
  .pad-name {
    font-size: 0.9rem;
    font-weight: bold;
    color: white;
    text-align: center;
    text-shadow: 0 0 5px rgba(177, 157, 216, 0.8);
  }
`;

const Controls = styled.div`
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  background: rgba(20, 12, 30, 0.5);
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: rgba(106, 27, 154, 0.4);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 0.25rem;
  
  &:hover {
    background: rgba(106, 27, 154, 0.7);
  }
  
  &.active {
    background: rgba(106, 27, 154, 0.9);
    box-shadow: var(--shadow-neon);
  }
`;

const VolumeSlider = styled.input.attrs({ type: 'range', min: 0, max: 100 })`
  width: 100px;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, #8a2be2, #4b0082);
  margin: 0 1rem;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

const DrumMachine = () => {
  const [activePad, setActivePad] = useState(null);
  const [volume, setVolume] = useState(75);
  const [bankActive, setBankActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(-1);
  
  // 16 beats per bar * 4 bars = 64 steps
  const totalSteps = 16; 
  const totalBars = 4;
  
  // Create ref for Tone.js sequencer
  const sequencerRef = useRef(null);
  const samplerRef = useRef(null);
  
  // Define drum pads with their sounds
  const pads = [
    { id: 1, name: 'Kick', keyCode: 49, sample: 'kick' }, // 1
    { id: 2, name: 'Snare', keyCode: 50, sample: 'snare' }, // 2
    { id: 3, name: 'Clap', keyCode: 51, sample: 'clap' }, // 3
    { id: 4, name: 'Hi-Hat', keyCode: 52, sample: 'hihat' }, // 4
    { id: 5, name: 'Rim', keyCode: 81, sample: 'rim' }, // Q
    { id: 6, name: 'Perc 1', keyCode: 87, sample: 'perc1' }, // W
    { id: 7, name: 'Perc 2', keyCode: 69, sample: 'perc2' }, // E
    { id: 8, name: 'Crash', keyCode: 82, sample: 'crash' }, // R
    { id: 9, name: '808 1', keyCode: 65, sample: '8081' }, // A
    { id: 10, name: '808 2', keyCode: 83, sample: '8082' }, // S
    { id: 11, name: 'FX 1', keyCode: 68, sample: 'fx1' }, // D
    { id: 12, name: 'FX 2', keyCode: 70, sample: 'fx2' }, // F
    { id: 13, name: 'Vocal 1', keyCode: 90, sample: 'vocal1' }, // Z
    { id: 14, name: 'Vocal 2', keyCode: 88, sample: 'vocal2' }, // X
    { id: 15, name: 'Loop 1', keyCode: 67, sample: 'loop1' }, // C
    { id: 16, name: 'Loop 2', keyCode: 86, sample: 'loop2' }, // V
  ];
  
  // Initialize sequence pattern with empty values
  const [sequence, setSequence] = useState(() => {
    // Create a 16x16 grid (16 pads x 16 steps per bar x 4 bars)
    const emptySequence = {};
    pads.forEach(pad => {
      emptySequence[pad.id] = Array(totalSteps * totalBars).fill(false);
    });
    return emptySequence;
  });

  // Initialize Tone.js
  useEffect(() => {
    // This would normally load actual samples, but for now we'll create a simple sampler
    const sampler = new Tone.Sampler({
      urls: {
        "C1": "kick.mp3",
        "C#1": "snare.mp3",
        "D1": "clap.mp3",
        "D#1": "hihat.mp3",
        "E1": "rim.mp3",
        "F1": "perc1.mp3",
        "F#1": "perc2.mp3",
        "G1": "crash.mp3",
        "G#1": "8081.mp3",
        "A1": "8082.mp3",
        "A#1": "fx1.mp3",
        "B1": "fx2.mp3",
        "C2": "vocal1.mp3",
        "C#2": "vocal2.mp3",
        "D2": "loop1.mp3",
        "D#2": "loop2.mp3",
      },
      release: 1,
      onload: () => {
        console.log("Sampler loaded (simulated)");
      },
      baseUrl: "/",
    }).toDestination();
    
    // Since we don't have actual audio files, we'll use Tone.js synths as fallback
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    
    // Create a mapping from pad IDs to notes
    const padToNote = {
      1: "C1", 2: "C#1", 3: "D1", 4: "D#1",
      5: "E1", 6: "F1", 7: "F#1", 8: "G1",
      9: "G#1", 10: "A1", 11: "A#1", 12: "B1",
      13: "C2", 14: "C#2", 15: "D2", 16: "D#2",
    };
    
    // Initialize sequencer
    const seq = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        
        // Check which pads should play on this step
        pads.forEach(pad => {
          if (sequence[pad.id][step]) {
            try {
              // Try to play from sampler first (would work with real samples)
              // sampler.triggerAttackRelease(padToNote[pad.id], "8n", time);
              
              // For demo, we'll use the synth with different pitches
              const baseNote = 40; // Some base MIDI note number
              const note = Tone.Frequency(baseNote + pad.id, "midi").toNote();
              synth.triggerAttackRelease(note, "16n", time);
              
              // Visual feedback
              setTimeout(() => {
                setActivePad(pad.id);
                setTimeout(() => setActivePad(null), 100);
              }, time * 1000);
            } catch (error) {
              console.error("Error playing sound:", error);
            }
          }
        });
      },
      // Create array of steps from 0 to totalSteps*totalBars-1
      [...Array(totalSteps * totalBars).keys()],
      "16n"
    );
    
    sequencerRef.current = seq;
    samplerRef.current = synth; // Using synth as fallback
    
    // Initialize audio context when user interacts
    const initAudio = () => {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      document.removeEventListener('click', initAudio);
    };
    document.addEventListener('click', initAudio);
    
    return () => {
      seq.dispose();
      synth.dispose();
      document.removeEventListener('click', initAudio);
    };
  }, [sequence]);
  
  // Update BPM
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);
  
  // Toggle playing state
  const togglePlay = () => {
    if (playing) {
      Tone.Transport.stop();
      sequencerRef.current.stop();
      setCurrentStep(-1);
    } else {
      Tone.Transport.start();
      sequencerRef.current.start(0);
    }
    setPlaying(!playing);
  };
  
  // Handle pad click in the sequencer
  const toggleSequenceStep = (padId, step) => {
    setSequence(prev => {
      const newSequence = { ...prev };
      newSequence[padId] = [...prev[padId]];
      newSequence[padId][step] = !newSequence[padId][step];
      return newSequence;
    });
  };
  
  // Handle pad activation for immediate sound
  const handlePadClick = (padId) => {
    setActivePad(padId);
    
    // Play sound immediately
    if (samplerRef.current) {
      // Map pad ID to a note (could be replaced with actual sample names)
      const baseNote = 40; // Some base MIDI note number
      const note = Tone.Frequency(baseNote + padId, "midi").toNote();
      samplerRef.current.triggerAttackRelease(note, "16n");
    }
    
    // Visual feedback
    setTimeout(() => {
      setActivePad(null);
    }, 150);
  };
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      const pad = pads.find(p => p.keyCode === e.keyCode);
      if (pad) {
        handlePadClick(pad.id);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Calculate which measure and beat we're on
  const currentBar = Math.floor(currentStep / totalSteps) + 1;
  const currentBeat = (currentStep % totalSteps) + 1;
  
  // Get visible steps based on current view
  const [visibleBar, setVisibleBar] = useState(1);
  const startStep = (visibleBar - 1) * totalSteps;
  const endStep = startStep + totalSteps - 1;
  
  return (
    <div className="drum-machine-container">
      {/* Drum pad grid */}
      <div className="pad-grid">
        {pads.map(pad => (
          <motion.div
            key={pad.id}
            className={`drum-pad ${activePad === pad.id ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePadClick(pad.id)}
          >
            <div className="pad-number">{pad.id}</div>
            <div className="pad-name">{pad.name}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Sequencer */}
      <div className="sequencer-container">
        <div className="sequencer-controls">
          <button 
            className={`control-button ${playing ? 'active' : ''}`}
            onClick={togglePlay}
          >
            {playing ? 'Stop' : 'Play'}
          </button>
          
          <div className="bpm-control">
            <span>BPM:</span>
            <input 
              type="number" 
              min="60" 
              max="200" 
              value={bpm} 
              onChange={e => setBpm(parseInt(e.target.value))} 
            />
          </div>
          
          <div className="bar-navigation">
            <button 
              className="bar-button"
              disabled={visibleBar === 1}
              onClick={() => setVisibleBar(prev => Math.max(prev - 1, 1))}
            >
              ◀
            </button>
            <span>Bar {visibleBar}/{totalBars}</span>
            <button 
              className="bar-button"
              disabled={visibleBar === totalBars}
              onClick={() => setVisibleBar(prev => Math.min(prev + 1, totalBars))}
            >
              ▶
            </button>
          </div>
          
          <div className="position-display">
            {playing ? `${currentBar}:${currentBeat}` : '--:--'}
          </div>
        </div>
        
        <div className="sequencer-grid">
          <div className="beat-markers">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div 
                key={i} 
                className={`beat-marker ${(i === (currentStep % totalSteps) && playing) ? 'current' : ''}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          
          {pads.map(pad => (
            <div key={pad.id} className="sequence-row">
              <div className="row-label">{pad.name}</div>
              <div className="step-buttons">
                {Array.from({ length: totalSteps }, (_, i) => {
                  const stepIndex = startStep + i;
                  return (
                    <button
                      key={i}
                      className={`step-button ${sequence[pad.id][stepIndex] ? 'active' : ''} ${(i === (currentStep % totalSteps) && playing) ? 'current' : ''}`}
                      onClick={() => toggleSequenceStep(pad.id, stepIndex)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main controls */}
      <div className="controls">
        <button 
          className={`control-button ${bankActive ? 'active' : ''}`}
          onClick={() => setBankActive(!bankActive)}
        >
          Bank B
        </button>
        
        <div className="volume-control">
          <span>Vol</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={(e) => {
              const vol = parseInt(e.target.value);
              setVolume(vol);
              Tone.Destination.volume.value = Tone.gainToDb(vol/100);
            }} 
          />
        </div>
        
        <button className="control-button">Clear</button>
      </div>
    </div>
  );
};

export default DrumMachine; 