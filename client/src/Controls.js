// Controls.js
import React from 'react';
import { Button, IconButton, Slider } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeOff';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const Controls = ({
  onPrev,
  onPlayPause,
  onNext,
  onShuffle,
  isPlaying,
  onVolumeToggle,
  isMuted,
  onVolumeChange,
  volume,
  isShuffleActive,
}) => (
  <div className="controls-container">
    <Button variant="contained" onClick={onPrev}>
      Previous
    </Button>
    <Button variant="contained" onClick={onPlayPause}>
      {isPlaying ? 'Pause' : 'Play'}
    </Button>
    <Button variant="contained" onClick={onNext}>
      Next
    </Button>
    <div className="shuffle-container">
      <IconButton
        onClick={onShuffle}
        className={`shuffle-icon ${isShuffleActive ? 'active' : ''}`}
      >
        <ShuffleIcon />
      </IconButton>
      <div className="shuffle-message">
        {isShuffleActive ? 'Shuffle On' : 'Shuffle Off'}
      </div>
    </div>
    <IconButton onClick={onVolumeToggle} color="inherit">
      {isMuted ? <VolumeMuteIcon /> : <VolumeDownIcon />}
    </IconButton>
    <Slider
      value={volume}
      onChange={onVolumeChange}
      min={0}
      max={100}
      step={1}
      aria-labelledby="continuous-slider"
      className="volume-slider"
    />
    <IconButton onClick={onVolumeToggle} color="inherit">
      <VolumeUpIcon />
    </IconButton>
  </div>
);

export default Controls;
