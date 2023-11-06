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

const Music = ({ user }) => {
  const [musicList, setMusicList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newMusicTitle, setNewMusicTitle] = useState('');
  const [newMusicArtist, setNewMusicArtist] = useState('');
  const [newMusicImage, setNewMusicImage] = useState('');
  const [newMusicGenre, setNewMusicGenre] = useState('');
  const [newMusicPlaylist, setNewMusicPlaylist] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);

  useEffect(() => {
    // Fetch music, genres, and playlists data
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
    // Set selected music for editing
    setSelectedMusic(music);
    setNewMusicTitle(music.title);
    setNewMusicArtist(music.artist);
    setNewMusicImage(music.image);
    setNewMusicGenre(music.genre ? music.genre.id : ''); // Set the initial genre value
    setNewMusicPlaylist(music.playlist ? music.playlist.id : ''); // Set the initial playlist value
  };

  const handleFavoriteMusic = (musicId) => {
    // Implement logic to mark a music item as a favorite
    fetch('http://localhost:5555/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
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
