import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import './TrackArrangement.css';
import projectService from '../services/projectService';

const TrackArrangement = ({ projectId }) => {
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Drums', color: '#8a2be2', mute: false, solo: false, clips: [
      { id: 1, start: 0, length: 16, name: 'Intro' },
      { id: 2, start: 32, length: 32, name: 'Verse' }
    ]},
    { id: 2, name: 'Bass', color: '#4b0082', mute: false, solo: false, clips: [
      { id: 3, start: 16, length: 48, name: 'Main' }
    ]},
    { id: 3, name: 'Lead', color: '#9370db', mute: false, solo: false, clips: [
      { id: 4, start: 32, length: 16, name: 'Melody' },
      { id: 5, start: 56, length: 8, name: 'Fill' }
    ]},
    { id: 4, name: 'FX', color: '#6a5acd', mute: false, solo: false, clips: [
      { id: 6, start: 8, length: 8, name: 'Sweep' },
      { id: 7, start: 48, length: 16, name: 'Ambient' }
    ]}
  ]);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedClip, setSelectedClip] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(64);
  
  const timelineRef = useRef(null);
  const playheadRef = useRef(null);
  const animationRef = useRef(null);
  
  const totalBars = 16;
  const beatsPerBar = 4;
  const totalBeats = totalBars * beatsPerBar;
  
  // Load project data from Firestore if projectId is provided
  useEffect(() => {
    if (projectId) {
      loadProjectData();
    }
  }, [projectId]);
  
  // Load project data from Firestore
  const loadProjectData = async () => {
    if (!projectId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const projectArrangement = await projectService.loadProjectArrangement(projectId);
      if (projectArrangement && projectArrangement.length > 0) {
        setTracks(projectArrangement);
      }
    } catch (err) {
      console.error('Error loading project data:', err);
      setError('Failed to load project data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Save project data to Firestore
  const saveProjectData = async () => {
    if (!projectId) {
      setError('No project ID provided. Cannot save arrangement.');
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      await projectService.saveProjectArrangement(projectId, tracks);
    } catch (err) {
      console.error('Error saving project data:', err);
      setError('Failed to save project data. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  // Timeline markers for bars and beats
  const timelineMarkers = [];
  for (let i = 0; i <= totalBars; i++) {
    timelineMarkers.push({ position: i * beatsPerBar, isMajor: true, label: i });
    
    if (i < totalBars) {
      for (let j = 1; j < beatsPerBar; j++) {
        timelineMarkers.push({ 
          position: i * beatsPerBar + j, 
          isMajor: false, 
          label: j 
        });
      }
    }
  }
  
  // Handle transport controls
  const togglePlay = () => {
    if (playing) {
      Tone.Transport.pause();
    } else {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      Tone.Transport.start();
    }
    setPlaying(!playing);
  };
  
  const stop = () => {
    Tone.Transport.stop();
    setPlaying(false);
    setCurrentPosition(loopStart);
  };
  
  const handleTempoChange = (newTempo) => {
    Tone.Transport.bpm.value = newTempo;
  };
  
  // Initialize Tone.js transport and schedule
  useEffect(() => {
    // Set up initial transport settings
    Tone.Transport.bpm.value = 120;
    Tone.Transport.timeSignature = 4;
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = loopStart * Tone.Time('4n').toSeconds();
    Tone.Transport.loopEnd = loopEnd * Tone.Time('4n').toSeconds();
    
    // Schedule playhead movement
    const interval = Tone.Transport.scheduleRepeat((time) => {
      const position = Tone.Transport.position;
      const bars = parseInt(position.split(':')[0]);
      const beats = parseInt(position.split(':')[1]);
      const sixteenths = parseInt(position.split(':')[2].split('.')[0]);
      
      const totalBeats = bars * beatsPerBar + beats + sixteenths / 4;
      setCurrentPosition(totalBeats);
    }, '16n');
    
    return () => {
      Tone.Transport.clear(interval);
      Tone.Transport.stop();
    };
  }, [loopStart, loopEnd]);
  
  // Track management
  const addTrack = () => {
    const newTrack = {
      id: Date.now(),
      name: `Track ${tracks.length + 1}`,
      color: generateRandomColor(),
      mute: false,
      solo: false,
      clips: []
    };
    
    setTracks([...tracks, newTrack]);
  };
  
  const removeTrack = (trackId) => {
    setTracks(tracks.filter(track => track.id !== trackId));
    
    if (selectedTrack === trackId) {
      setSelectedTrack(null);
    }
  };
  
  const toggleTrackMute = (trackId) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        return { ...track, mute: !track.mute };
      }
      return track;
    }));
  };
  
  const toggleTrackSolo = (trackId) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        return { ...track, solo: !track.solo };
      }
      return track;
    }));
  };
  
  // Clip management
  const selectClip = (trackId, clipId) => {
    setSelectedTrack(trackId);
    setSelectedClip(clipId);
  };
  
  const addClip = (trackId) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;
    
    const newClip = {
      id: Date.now(),
      start: currentPosition,
      length: 8,
      name: 'New Clip'
    };
    
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        return {
          ...track,
          clips: [...track.clips, newClip]
        };
      }
      return track;
    }));
  };
  
  const removeClip = (trackId, clipId) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        return {
          ...track,
          clips: track.clips.filter(clip => clip.id !== clipId)
        };
      }
      return track;
    }));
    
    if (selectedClip === clipId) {
      setSelectedClip(null);
    }
  };
  
  // Utilities
  const generateRandomColor = () => {
    const colors = ['#8a2be2', '#4b0082', '#9370db', '#6a5acd', '#483d8b', '#9400d3'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.25, 2.5));
  };
  
  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.25, 0.5));
  };
  
  // Calculate clip width based on length and zoom
  const getClipWidth = (length) => {
    const beatWidth = 30 * zoom; // Base width per beat
    return length * beatWidth;
  };
  
  // Calculate clip position based on start time and zoom
  const getClipPosition = (start) => {
    const beatWidth = 30 * zoom; // Base width per beat
    return start * beatWidth;
  };
  
  // Format time display
  const formatTimeDisplay = (beats) => {
    const bars = Math.floor(beats / beatsPerBar);
    const remainingBeats = beats % beatsPerBar;
    return `${bars + 1}.${remainingBeats + 1}`;
  };
  
  // Handle status message
  const getStatusMessage = () => {
    if (loading) return 'Loading project...';
    if (saving) return 'Saving project...';
    if (error) return error;
    return '';
  };
  
  return (
    <div className="arrangement-container">
      <div className="arrangement-toolbar">
        <div className="transport-controls">
          <button className="transport-button" onClick={stop}>■</button>
          <button 
            className={`transport-button ${playing ? 'active' : ''}`} 
            onClick={togglePlay}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <div className="position-display">
            {formatTimeDisplay(currentPosition)}
          </div>
        </div>
        
        <div className="zoom-controls">
          <button className="zoom-button" onClick={handleZoomOut}>−</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button className="zoom-button" onClick={handleZoomIn}>+</button>
        </div>
        
        <div className="action-buttons">
          <button className="add-track-button" onClick={addTrack}>
            Add Track
          </button>
          {projectId && (
            <button 
              className="save-button" 
              onClick={saveProjectData}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          )}
        </div>
      </div>
      
      {getStatusMessage() && (
        <div className={`status-message ${error ? 'error' : ''}`}>
          {getStatusMessage()}
        </div>
      )}
      
      <div className="arrangement-content">
        <div className="tracks-header">
          <div className="track-controls-header">
            <span>Tracks</span>
          </div>
          <div className="timeline-header" ref={timelineRef}>
            {timelineMarkers.map((marker, index) => (
              <div 
                key={index}
                className={`timeline-marker ${marker.isMajor ? 'major' : 'minor'}`}
                style={{ left: `${getClipPosition(marker.position)}px` }}
              >
                {marker.isMajor && <span>{marker.label}</span>}
              </div>
            ))}
            <div 
              className="playhead"
              ref={playheadRef}
              style={{ left: `${getClipPosition(currentPosition)}px` }}
            />
          </div>
        </div>
        
        <div className="tracks-container">
          {tracks.map(track => (
            <div 
              key={track.id} 
              className={`track-row ${selectedTrack === track.id ? 'selected' : ''}`}
            >
              <div className="track-controls">
                <div className="track-color" style={{ backgroundColor: track.color }}></div>
                <div className="track-name">{track.name}</div>
                <button 
                  className={`track-button ${track.mute ? 'active' : ''}`}
                  onClick={() => toggleTrackMute(track.id)}
                >
                  M
                </button>
                <button 
                  className={`track-button ${track.solo ? 'active' : ''}`}
                  onClick={() => toggleTrackSolo(track.id)}
                >
                  S
                </button>
                <button 
                  className="track-button"
                  onClick={() => addClip(track.id)}
                >
                  +
                </button>
                <button 
                  className="track-button remove"
                  onClick={() => removeTrack(track.id)}
                >
                  ×
                </button>
              </div>
              
              <div className="track-clips">
                {track.clips.map(clip => (
                  <div 
                    key={clip.id}
                    className={`clip ${selectedClip === clip.id ? 'selected' : ''}`}
                    style={{ 
                      width: `${getClipWidth(clip.length)}px`,
                      left: `${getClipPosition(clip.start)}px`,
                      backgroundColor: track.color
                    }}
                    onClick={() => selectClip(track.id, clip.id)}
                  >
                    <div className="clip-name">{clip.name}</div>
                    <button 
                      className="clip-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeClip(track.id, clip.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackArrangement; 