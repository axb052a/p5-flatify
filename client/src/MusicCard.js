import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Paper,
} from '@mui/material';

function MusicCard({ id, title, artist, image }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.6s',
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          alt={`${title} by ${artist}`}
          height="350"
          image={image}
          style={{ objectFit: 'cover' }}
        />
        <CardActions>
          <Button size="small">Play</Button>
        </CardActions>
      </Paper>
      <Paper
        elevation={3}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transform: 'rotateY(180deg)',
        }}
      >
        <CardContent>
          <Typography variant="subtitle1">ID: {id}</Typography>
          <Typography variant="subtitle1">Title: {title}</Typography>
          <Typography variant="subtitle1">Artist: {artist}</Typography>
        </CardContent>
      </Paper>
    </Card>
  );
}

export default MusicCard;
