import React, { useState, useEffect } from 'react';

const Favorite = ({user}) => {
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState({
    user_id: '', // You need to get the user ID from your authentication system
    music_id: '',
  });

  useEffect(() => {
    if (user) {
      // Fetch user's favorite music based on userId
      fetch(`http://localhost:5555/favorite/${user.id}`)  // Include the user ID in the request
        .then((response) => response.json())
        .then((data) => setFavorites(data))
        .catch((error) => console.error('Error fetching favorites:', error));
    }
  }, [user]);
  
  const handleAddFavorite = () => {
    // Make a POST request to add a new favorite
    fetch('http://localhost:5555/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFavorite),
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites([...favorites, data]);
        setNewFavorite({
          user_id:  '', // Reset the user ID or get it from your authentication system
          music_id: '',
        });
      })
      .catch((error) => console.error('Error adding favorite:', error));
  };

  const handleRemoveFavorite = (favoriteId) => {
    // Make a DELETE request to remove a favorite
    fetch(`http://localhost:5555/favorite`, {
      method: 'DELETE',
    })
      .then(() => {
        setFavorites(favorites.filter((favorite) => favorite.id !== favoriteId));
      })
      .catch((error) => console.error('Error removing favorite:', error));
  };

  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            {favorite.music_id && <p>Music: {favorite.music.title}</p>}
            <button onClick={() => handleRemoveFavorite(favorite.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Add New Favorite</h2>
      <label>
        Music ID:
        <input
          type="text"
          value={newFavorite.music_id}
          onChange={(e) => setNewFavorite({ ...newFavorite, music_id: e.target.value })}
        />
      </label>
      <button onClick={handleAddFavorite}>Add Favorite</button>
    </div>
  );
};

export default Favorite;
