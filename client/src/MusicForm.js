// MusicForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const MusicForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSong = { title, artist, audioSrc, image };
    onSubmit(newSong);
    // Clear form fields
    setTitle('');
    setArtist('');
    setAudioSrc('');
    setImage('');
  };

  return (
    <Paper
      elevation={3}
      className="music-form-container" 
    >
      <form onSubmit={handleSubmit} className="music-form">
         <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Song
        </Button>
        <TextField
          type="text"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="text"
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="text"
          label="Audio Source"
          value={audioSrc}
          onChange={(e) => setAudioSrc(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="text"
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
       
      </form>
    </Paper>
  );
};

export default MusicForm;
