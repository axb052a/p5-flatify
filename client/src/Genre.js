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

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [newGenreName, setNewGenreName] = useState('');
  const [newGenreImage, setNewGenreImage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [musicList, setMusicList] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Fetch genres data
    fetch('http://localhost:5555/genre')
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  useEffect(() => {
    // Fetch music data
    fetch('http://localhost:5555/music')
      .then((response) => response.json())
      .then((data) => setMusicList(data))
      .catch((error) => console.error('Error fetching music:', error));
  }, []);

  const handleCreateGenre = () => {
    // Check for empty inputs
    if (!newGenreName || !newGenreImage) {
      console.log('Please provide values for both name and image.');
      return;
    }

    // To create a new genre
    fetch('http://localhost:5555/genre', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newGenreName,
        image: newGenreImage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGenres([...genres, data]);
        setNewGenreName('');
        setNewGenreImage('');
      })
      .catch((error) => console.error('Error creating genre:', error));
  };

  const handleUpdateGenre = () => {
    // To update selected genre
    if (selectedGenre) {
      fetch(`http://localhost:5555/genre/${selectedGenre.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newGenreName,
          image: newGenreImage,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setGenres(
            genres.map((genre) =>
              genre.id === selectedGenre.id ? data : genre
            )
          );
          setNewGenreName('');
          setNewGenreImage('');
          setSelectedGenre(null);
        })
        .catch((error) => console.error('Error updating genre:', error));
    }
  };

  const handleDeleteGenre = (genreId) => {
    // To delete a genre
    fetch(`http://localhost:5555/genre/${genreId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setGenres(genres.filter((genre) => genre.id !== genreId));
      })
      .catch((error) => console.error('Error deleting genre:', error));
  };

  const handleEditGenre = (genre) => {
    // To set genre for editing
    setSelectedGenre(genre);
    setNewGenreName(genre.name);
    setNewGenreImage(genre.image);
  };

  const [showMusic, setShowMusic] = useState(null);

  const handleShowMusic = (genre) => {
    setShowMusic(genre.id === showMusic ? null : genre.id);
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '5px',
        margin: '5px',
        background: isDarkMode ? '#444444' : '#fff',
        color: isDarkMode ? '#F5F5DC' : '#333',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={toggleTheme} color="primary">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
      <Typography variant="h5" gutterBottom>
        Genres
      </Typography>
      <TextField
        label="New Genre Name"
        variant="outlined"
        value={newGenreName}
        onChange={(e) => setNewGenreName(e.target.value)}
      />
      <TextField
        label="Image"
        variant="outlined"
        value={newGenreImage}
        onChange={(e) => setNewGenreImage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={selectedGenre ? handleUpdateGenre : handleCreateGenre}
      >
        {selectedGenre ? 'Update Genre' : 'Create Genre'}
      </Button>
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.id}>
            <img
              src={genre.image}
              alt={genre.image}
              style={{
                width: '100px',
                height: '100px',
                marginRight: '10px',
              }}
            />
            <ListItemText primary={genre.name} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteGenre(genre.id)}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditGenre(genre)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleShowMusic(genre)}
            >
              {showMusic === genre.id ? 'Hide Music' : 'Show Music'}
            </Button>
            {showMusic === genre.id && (
              <List>
                {musicList
                  .filter(
                    (music) =>
                      music.genre && music.genre.id === genre.id
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

export default Genre;
