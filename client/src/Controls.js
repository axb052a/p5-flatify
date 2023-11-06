// Controls.js
import React from 'react';
import { Button, IconButton, Slider } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeOff';

const Controls = ({
  onPrev,
  onPlayPause,
  onNext,
  isPlaying,
  onVolumeToggle,
  isMuted,
  onVolumeChange,
  volume,
}) => (
  <div className="controls">
    <Button variant="contained" onClick={onPrev}>
      Previous
    </Button>
    <Button variant="contained" onClick={onPlayPause}>
      {isPlaying ? 'Pause' : 'Play'}
    </Button>
    <Button variant="contained" onClick={onNext}>
      Next
    </Button>
    {/* Volume button, icon, and slider */}
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
