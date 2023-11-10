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
  const [musicList, setMusicList] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Fetch playlists data
    fetch('/api/playlist', {credentials: "include"})
      .then((response) => response.json())
      .then((data) => setPlaylists(data))
      .catch((error) => console.error('Error fetching playlists:', error));
  }, []);

  useEffect(() => {
    // Fetch music data
    fetch('/api/music', {credentials: "include"})
      .then((response) => response.json())
      .then((data) => setMusicList(data))
      .catch((error) => console.error('Error fetching music:', error));
  }, []);

  const handleCreatePlaylist = () => {

    // Check for empty inputs
    if (!newPlaylistName || !newPlaylistImage) {
      console.log('Please provide values for both name and image.');
      return;
    }

    // To create a new playlist
    fetch('/api/playlist', {
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
    // To update selected playlist
    if (selectedPlaylist) {
      fetch(`/api/playlist/${selectedPlaylist.id}`, {
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
    // To delete a playlist
    fetch(`/api/playlist/${playlistId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
      })
      .catch((error) => console.error('Error deleting playlist:', error));
  };

  const handleEditPlaylist = (playlist) => {
    // To set playlist for editing
    setSelectedPlaylist(playlist);
    setNewPlaylistName(playlist.name);
    setNewPlaylistImage(playlist.image);
  };

  const [showMusic, setShowMusic] = useState(null);

  const handleShowMusic = (playlist) => {
    setShowMusic(playlist.id === showMusic ? null : playlist.id);
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
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleShowMusic(playlist)}
            >
              {showMusic === playlist.id ? 'Hide Music' : 'Show Music'}
            </Button>
            {showMusic === playlist.id && (
              <List>
                {musicList
                  .filter(
                    (music) =>
                      music.playlist && music.playlist.id === playlist.id
                  )
                  .map((music) => (
                    <ListItem key={music.id}>
                      <img
                        src={music.image}
                        alt={music.title}
                        style={{
                          width: '100px',
                          height: '100px',
                          marginRight: '10px',
                        }}
                      />
                      <ListItemText
                        primary={music.title}
                        secondary={
                          <>
                            <div>{music.artist}</div>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            )}

          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Playlist;
