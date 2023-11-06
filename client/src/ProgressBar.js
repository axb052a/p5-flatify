// ProgressBar.js
import React from 'react';
import { Slider, Typography } from '@mui/material';

const ProgressBar = ({ currentTime, duration, onSeek }) => (
  <div className="progress-bar">
    <Slider
      min={0}
      max={duration}
      step={1}
      value={currentTime}
      onChange={(e) => onSeek(e.target.value)}
    />
    <Typography>
      {formatTime(currentTime)} / {formatTime(duration)}
    </Typography>
  </div>
);

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

export default ProgressBar;
