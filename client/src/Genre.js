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

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [newGenreName, setNewGenreName] = useState('');
  const [newGenreImage, setNewGenreImage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    // Fetch genres data
    fetch('http://localhost:5555/genre')
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  const handleCreateGenre = () => {
    // Implement logic to create a new genre
    fetch('http://localhost:5555/genre', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: newGenreName, 
        image: newGenreImage }),
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
    // Implement logic to update selected genre
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
          setGenres(genres.map((genre) => (genre.id === selectedGenre.id ? data : genre)));
          setNewGenreName('');
          setNewGenreImage('');
          setSelectedGenre(null);
        })
        .catch((error) => console.error('Error updating genre:', error));
    }
  };

  const handleDeleteGenre = (genreId) => {
    // Implement logic to delete a genre
    fetch(`http://localhost:5555/genre/${genreId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setGenres(genres.filter((genre) => genre.id !== genreId));
      })
      .catch((error) => console.error('Error deleting genre:', error));
  };

  const handleEditGenre = (genre) => {
    // Set selected genre for editing
    setSelectedGenre(genre);
    setNewGenreName(genre.name);
    setNewGenreImage(genre.image);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
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
              style={{ width: '100px', height: '100px', marginRight: '10px' }}
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
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Genre;
