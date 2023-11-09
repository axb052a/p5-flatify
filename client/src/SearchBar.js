// SearchBar.js
import React, { useState } from 'react';
import { TextField } from '@mui/material';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <TextField
        label="Search songs or artists"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter a song title or artist"
        fullWidth
      />
    </div>
  );
}

export default SearchBar;