import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import './PianoKeyboard.css';

const PianoKeyboard = () => {
  const [activeNotes, setActiveNotes] = useState({});
  const [octave, setOctave] = useState(4);
  const [mode, setMode] = useState('click'); // 'click', 'keyboard', 'sound'
  const [synth, setSynth] = useState(null);
  
  // Piano keyboard layout
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
  const blackKeyPositions = {
    'C#': 1,
    'D#': 2,
    'F#': 4,
    'G#': 5,
    'A#': 6
  };
  
  // Key mapping for computer keyboard
  const keyboardMap = {
    a: 'C', w: 'C#', s: 'D', e: 'D#', d: 'E', f: 'F', 
    t: 'F#', g: 'G', y: 'G#', h: 'A', u: 'A#', j: 'B', 
    k: 'C', o: 'C#', l: 'D', p: 'D#', ';': 'E'
  };
  
  const keyOctaveMap = {
    a: octave, w: octave, s: octave, e: octave, d: octave, f: octave,
    t: octave, g: octave, y: octave, h: octave, u: octave, j: octave,
    k: octave+1, o: octave+1, l: octave+1, p: octave+1, ';': octave+1
  };

  // Initialize Tone.js synth
  useEffect(() => {
    // Create polyphonic synth
    const newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
    newSynth.set({
      oscillator: {
        type: 'triangle8'
      },
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.4,
        release: 0.5
      }
    });
    setSynth(newSynth);
    
    // Initialize audio context on user interaction for browsers that require it
    const initAudio = () => {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      document.removeEventListener('click', initAudio);
    };
    document.addEventListener('click', initAudio);
    
    return () => {
      document.removeEventListener('click', initAudio);
      if (newSynth) {
        newSynth.dispose();
      }
    };
  }, []);
  
  // Handle note on/off
  const playNote = (note, octave) => {
    if (!synth) return;
    
    const fullNote = `${note}${octave}`;
    synth.triggerAttack(fullNote);
    setActiveNotes(prev => ({ ...prev, [fullNote]: true }));
  };
  
  const stopNote = (note, octave) => {
    if (!synth) return;
    
    const fullNote = `${note}${octave}`;
    synth.triggerRelease(fullNote);
    setActiveNotes(prev => {
      const newState = { ...prev };
      delete newState[fullNote];
      return newState;
    });
  };
  
  // Handle keyboard events
  useEffect(() => {
    if (mode !== 'keyboard' || !synth) return;
    
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keyboardMap[key] && !activeNotes[`${keyboardMap[key]}${keyOctaveMap[key]}`]) {
        playNote(keyboardMap[key], keyOctaveMap[key]);
      }
    };
    
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keyboardMap[key]) {
        stopNote(keyboardMap[key], keyOctaveMap[key]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [mode, activeNotes, octave, keyOctaveMap, synth]);
  
  const changeOctave = (delta) => {
    setOctave(prev => {
      const newOctave = prev + delta;
      return Math.min(Math.max(newOctave, 1), 7); // Limit range to 1-7
    });
  };
  
  return (
    <div className="piano-container">
      <div className="piano-controls">
        <button className="control-button" onClick={() => changeOctave(-1)}>◀ Oct</button>
        <span className="octave-display">Octave: {octave}</span>
        <button className="control-button" onClick={() => changeOctave(1)}>Oct ▶</button>
        
        <button 
          className={`mode-button ${mode === 'click' ? 'active' : ''}`}
          onClick={() => setMode('click')}
        >
          Mouse
        </button>
        <button 
          className={`mode-button ${mode === 'keyboard' ? 'active' : ''}`}
          onClick={() => setMode('keyboard')}
        >
          Keyboard
        </button>
        <button 
          className={`mode-button ${mode === 'sound' ? 'active' : ''}`}
          onClick={() => setMode('sound')}
        >
          Sound
        </button>
        
        <div className="status-text">
          {mode === 'keyboard' ? 'Type A-P to play' : 
           mode === 'sound' ? 'Listening...' : 'Click to play'}
        </div>
      </div>
      
      <div className="piano-keyboard">
        {/* White keys */}
        <div className="white-keys">
          {whiteKeys.map((note, i) => (
            <div 
              key={`white-${i}`}
              className={`white-key ${activeNotes[`${note}${octave}`] ? 'active' : ''}`}
              onMouseDown={() => mode === 'click' && playNote(note, octave)}
              onMouseUp={() => mode === 'click' && stopNote(note, octave)}
              onMouseLeave={() => mode === 'click' && activeNotes[`${note}${octave}`] && stopNote(note, octave)}
              data-note={note}
            >
              <div className="key-label">
                {Object.keys(keyboardMap).find(k => keyboardMap[k] === note && keyOctaveMap[k] === octave)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Black keys */}
        <div className="black-keys">
          {blackKeys.map((note, i) => (
            <div 
              key={`black-${i}`}
              className={`black-key ${activeNotes[`${note}${octave}`] ? 'active' : ''}`}
              style={{ left: `${(blackKeyPositions[note] * (100/7)) - 1.5}%` }}
              onMouseDown={() => mode === 'click' && playNote(note, octave)}
              onMouseUp={() => mode === 'click' && stopNote(note, octave)}
              onMouseLeave={() => mode === 'click' && activeNotes[`${note}${octave}`] && stopNote(note, octave)}
              data-note={note}
            >
              <div className="key-label">
                {Object.keys(keyboardMap).find(k => keyboardMap[k] === note && keyOctaveMap[k] === octave)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PianoKeyboard; 