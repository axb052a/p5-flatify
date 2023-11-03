// MusicCard.js
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia, Paper } from '@mui/material';

function MusicCard({ id, title, artist, image }) {
  return (
    <Card>
      <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          alt={`${title} by ${artist}`}
          height="350"
          image={image}
          style={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="subtitle1">ID: {id}</Typography>
          <Typography variant="subtitle1">Title: {title}</Typography>
          <Typography variant="subtitle1">Artist: {artist}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Favorite</Button>
        </CardActions>
      </Paper>
    </Card>
  );
}

export default MusicCard;
