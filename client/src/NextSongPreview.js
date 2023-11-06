// NextSongPreview.js
import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import './nextSongPreview.css';

const NextSongPreview = ({ nextSong }) => (
  <Card className="next-song-preview">
    <CardContent>
      <Typography variant="h6">Next:</Typography>
      <CardMedia
        component="img"
        alt="Next Song Cover"
        height="140"
        image={nextSong.image}
      />
      <div>
        <Typography variant="subtitle1">{nextSong.title}</Typography>
        <Typography variant="caption">{nextSong.artist}</Typography>
      </div>
    </CardContent>
  </Card>
);

export default NextSongPreview;
