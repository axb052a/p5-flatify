import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useTheme } from './ThemeContext'; 
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Music = () => {
  const [musicList, setMusicList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newMusicTitle, setNewMusicTitle] = useState('');
  const [newMusicArtist, setNewMusicArtist] = useState('');
  const [newMusicImage, setNewMusicImage] = useState('');
  const [newMusicGenre, setNewMusicGenre] = useState('');
  const [newMusicPlaylist, setNewMusicPlaylist] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Fetch music data
    fetch('http://localhost:5555/music')
      .then((response) => response.json())
      .then((data) => setMusicList(data))
      .catch((error) => console.error('Error fetching music:', error));

    // Fetch genres data
    fetch('http://localhost:5555/genre')
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error('Error fetching genres:', error));

    // Fetch playlists data
    fetch('http://localhost:5555/playlist')
      .then((response) => response.json())
      .then((data) => setPlaylists(data))
      .catch((error) => console.error('Error fetching playlists:', error));
  }, []);

  const handleCreateMusic = () => {

    // Check for empty inputs
    if (!newMusicTitle || !newMusicArtist || !newMusicImage || !newMusicGenre || !newMusicPlaylist) {
      console.log('Please provide values for title, artist, image, genre, and playlist.');
      return;
    }

    // To create a new music
    fetch('http://localhost:5555/music', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newMusicTitle,
        artist: newMusicArtist,
        image: newMusicImage,
        genre_id: newMusicGenre,
        playlist_id: newMusicPlaylist,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMusicList([...musicList, data]);
        setNewMusicTitle('');
        setNewMusicArtist('');
        setNewMusicImage('');
        setNewMusicGenre('');
        setNewMusicPlaylist('');
      })
      .catch((error) => console.error('Error creating music:', error));
  };

  const handleUpdateMusic = () => {
    // To update selected music
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
          genre_id: newMusicGenre,
          playlist_id: newMusicPlaylist,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMusicList(musicList.map((music) => (music.id === selectedMusic.id ? data : music)));
          setNewMusicTitle('');
          setNewMusicArtist('');
          setNewMusicImage('');
          setNewMusicGenre('');
          setNewMusicPlaylist('');
          setSelectedMusic(null);
        })
        .catch((error) => console.error('Error updating music:', error));
    }
  };

  const handleEditMusic = (music) => {
    // To set music for editing
    setSelectedMusic(music);
    setNewMusicTitle(music.title);
    setNewMusicArtist(music.artist);
    setNewMusicImage(music.image);
    setNewMusicGenre(music.genre ? music.genre.id : '');
    setNewMusicPlaylist(music.playlist ? music.playlist.id : ''); 
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
      <FormControl variant="outlined" style={{ minWidth: '120px', marginRight: '10px' }}>
        <InputLabel htmlFor="genre">Genre</InputLabel>
        <Select
          label="Genre"
          value={newMusicGenre}
          onChange={(e) => setNewMusicGenre(e.target.value)}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ minWidth: '120px' }}>
        <InputLabel htmlFor="playlist">Playlist</InputLabel>
        <Select
          label="Playlist"
          value={newMusicPlaylist}
          onChange={(e) => setNewMusicPlaylist(e.target.value)}
        >
          {playlists.map((playlist) => (
            <MenuItem key={playlist.id} value={playlist.id}>
              {playlist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
                  <div>{music.genre ? music.genre.name : 'No Genre'}</div>
                  <div>{music.playlist ? music.playlist.name : 'No Playlist'}</div>
                </>
              }
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditMusic(music)}
            >
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Music;
