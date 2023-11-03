// Music.js
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const Music = ({ user }) => {
  const [musicList, setMusicList] = useState([]);
  const [newMusicTitle, setNewMusicTitle] = useState('');
  const [newMusicArtist, setNewMusicArtist] = useState('');
  const [newMusicImage, setNewMusicImage] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);

  useEffect(() => {
    // Fetch music data
    fetch('http://localhost:5555/music')
      .then((response) => response.json())
      .then((data) => setMusicList(data))
      .catch((error) => console.error('Error fetching music:', error));
  }, []);

  const handleCreateMusic = () => {
    // Implement logic to create a new music
    fetch('http://localhost:5555/music', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newMusicTitle,
        artist: newMusicArtist,
        image: newMusicImage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMusicList([...musicList, data]);
        setNewMusicTitle('');
        setNewMusicArtist('');
        setNewMusicImage('');
      })
      .catch((error) => console.error('Error creating music:', error));
  };

  const handleUpdateMusic = () => {
    // Implement logic to update selected music
    if (selectedMusic) {
      fetch(`http://localhost:5555/music/${selectedMusic.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newMusicTitle,
          artist: newMusicArtist,
          image: newMusicImage,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMusicList(musicList.map((music) => (music.id === selectedMusic.id ? data : music)));
          setNewMusicTitle('');
          setNewMusicArtist('');
          setNewMusicImage('');
          setSelectedMusic(null);
        })
        .catch((error) => console.error('Error updating music:', error));
    }
  };

  const handleDeleteMusic = (musicId) => {
    console.log('Deleting music with ID:', musicId);
  
    // Implement logic to delete music
    fetch(`http://localhost:5555/music/${musicId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          // Music deleted successfully, update the state to reflect the change
          setMusicList(musicList.filter((music) => music.id !== musicId));
        } else {
          // Handle errors, e.g., music not found or other server errors
          console.error('Error deleting music:', response.status);
        }
      })
      .catch((error) => console.error('Error deleting music:', error));
  };
      
  const handleEditMusic = (music) => {
    // Set selected music for editing
    setSelectedMusic(music);  // Keep the entire music object for consistency
    setNewMusicTitle(music.title);
    setNewMusicArtist(music.artist);
    setNewMusicImage(music.image);
  };

  const handleFavoriteMusic = (musicId) => {
    // Implement logic to mark a music item as a favorite
    fetch('http://localhost:5555/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id, // Assuming user object is available in the scope
        music_id: musicId,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(`Music with ID ${musicId} added to favorites.`, data))
      .catch((error) => console.error('Error adding music to favorites:', error));
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Music
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        value={newMusicTitle}
        onChange={(e) => setNewMusicTitle(e.target.value)}
      />
      <TextField
        label="Artist"
        variant="outlined"
        value={newMusicArtist}
        onChange={(e) => setNewMusicArtist(e.target.value)}
      />
      <TextField
        label="Image"
        variant="outlined"
        value={newMusicImage}
        onChange={(e) => setNewMusicImage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={selectedMusic ? handleUpdateMusic : handleCreateMusic}
      >
        {selectedMusic ? 'Update Music' : 'Create Music'}
      </Button>
      <List>
        {musicList.map((music) => (
          <ListItem key={music.id}>
            <img
              src={music.image}
              alt={music.title}
              style={{ width: '100px', height: '100px', marginRight: '10px' }}
            />
            <ListItemText
              primary={music.title}
              secondary={
                <>
                  <div>{music.artist}</div>
                </>
              }
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteMusic(music.id)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditMusic(music)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleFavoriteMusic(music.id)}
            >
              Favorite
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Music;
