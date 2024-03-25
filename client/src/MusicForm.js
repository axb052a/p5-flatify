// MusicForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import './MusicForm.css';

const MusicForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('audioFile', audioFile);
    formData.append('image', image);

    // onSubmit will now receive formData
    onSubmit(formData);

    // Clear form fields
    setTitle('');
    setArtist('');
    setAudioFile(null);
    setImage('');

    // Alert the user
    alert('Form submitted successfully!');
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  return (
    <Paper elevation={3} className="music-form-container">
      <form onSubmit={handleSubmit} className="music-form">
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
        {/* Replace TextField for audioSrc with input of type file */}
        <input
          type="file"
          accept="audio/mp3"
          onChange={handleAudioFileChange}
          style={{ margin: '10px 0' }}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Add Song
        </Button>
      </form>
    </Paper>
  );
};

export default MusicForm;
