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
import { useTheme } from './ThemeContext'; 
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistImage, setNewPlaylistImage] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Fetch playlists data
    fetch('http://localhost:5555/playlist')
      .then((response) => response.json())
      .then((data) => setPlaylists(data))
      .catch((error) => console.error('Error fetching playlists:', error));
  }, []);

  const handleCreatePlaylist = () => {
    // Implement logic to create a new playlist
    fetch('http://localhost:5555/playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: newPlaylistName, 
        image: newPlaylistImage }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlaylists([...playlists, data]);
        setNewPlaylistName('');
        setNewPlaylistImage('');
      })
      .catch((error) => console.error('Error creating playlist:', error));
  };

  const handleUpdatePlaylist = () => {
    // Implement logic to update selected playlist
    if (selectedPlaylist) {
      fetch(`http://localhost:5555/playlist/${selectedPlaylist.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: newPlaylistName,
          image: newPlaylistImage,
         }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPlaylists(playlists.map((playlist) => (playlist.id === selectedPlaylist.id ? data : playlist)));
          setNewPlaylistName('');
          setNewPlaylistImage('');
          setSelectedPlaylist(null);
        })
        .catch((error) => console.error('Error updating playlist:', error));
    }
  };

  const handleDeletePlaylist = (playlistId) => {
    // Implement logic to delete a playlist
    fetch(`http://localhost:5555/playlist/${playlistId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
      })
      .catch((error) => console.error('Error deleting playlist:', error));
  };

  const handleEditPlaylist = (playlist) => {
    // Set selected playlist for editing
    setSelectedPlaylist(playlist);
    setNewPlaylistName(playlist.name);
    setNewPlaylistImage(playlist.image);
  };

  return (
    <Paper  elevation={3}
    style={{
      padding: '5px',
      margin: '5px',
      background: isDarkMode ? '#444444' : '#fff', 
      color: isDarkMode ? '#F5F5DC' : '#333', 
    }}>
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
      <IconButton onClick={toggleTheme} color="primary">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </div>
      <Typography variant="h5" gutterBottom>
        Playlists
      </Typography>
      <TextField
        label="New Playlist Name"
        variant="outlined"
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
      />
      <TextField
        label="Image"
        variant="outlined"
        value={newPlaylistImage}
        onChange={(e) => setNewPlaylistImage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={selectedPlaylist ? handleUpdatePlaylist : handleCreatePlaylist}>
        {selectedPlaylist ? 'Update Playlist' : 'Create Playlist'}
      </Button>
      <List>
        {playlists.map((playlist) => (
          <ListItem key={playlist.id}>
            <img src={playlist.image} alt={playlist.name} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
            <ListItemText primary={playlist.name} />
            <Button variant="outlined" color="secondary" onClick={() => handleDeletePlaylist(playlist.id)}>
              Delete
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleEditPlaylist(playlist)}>
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Playlist;
