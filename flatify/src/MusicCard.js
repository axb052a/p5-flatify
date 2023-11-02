import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

function MusicCard({ id, title, artist }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{id}</Typography>
        <Typography variant="subtitle1">{artist}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Play</Button>
      </CardActions>
    </Card>
  );
}

export default MusicCard;
