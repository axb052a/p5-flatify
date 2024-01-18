// MusicCard.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CardMedia, Paper, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const MusicCard = ({ id, title, artist, image, genre, playlist, onFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Check local storage for favorite status on component mount
    const storedFavorite = localStorage.getItem(`favorite_${id}`);
    if (storedFavorite !== null) {
      setIsFavorited(JSON.parse(storedFavorite));
    }
  }, [id]);

  const handleFavorite = () => {
    const newFavoriteStatus = !isFavorited;

    // Save the favorite status to local storage
    localStorage.setItem(`favorite_${id}`, JSON.stringify(newFavoriteStatus));

    setIsFavorited(newFavoriteStatus);
    onFavorite(id, newFavoriteStatus); // Notify parent component about the favorite status change
  };

  return (
    <Card
      style={{
        width: '350px',
        height: '575px',
        perspective: '2000px',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        cursor: 'pointer',
        transform: 'rotateY(0)', // Removed flip functionality
      }}
    >
      <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
          <Typography variant="subtitle1">Genre: {genre ? genre.name : 'No Genre'}</Typography>
          <Typography variant="subtitle1">Playlist: {playlist ? playlist.name : 'No Playlist'}</Typography>
          <IconButton onClick={handleFavorite} style={{ marginLeft: 'auto', color: isFavorited ? 'gold' : 'grey' }}>
            {isFavorited ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </CardContent>
      </Paper>
    </Card>
  );
};

export default MusicCard;
