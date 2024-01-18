// Favorite.js

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const Favorite = ({ user }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch user's favorite music based on userId
      fetch(`/api/favorite/${user.id}`, { credentials: 'include' })  
        .then((response) => response.json())
        .then((data) => setFavorites(data))
        .catch((error) => console.error('Error fetching favorites:', error));
    }
  }, [user]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Favorite Songs
      </Typography>
      <List>
        {favorites.map((favorite) => (
          <ListItem key={favorite.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={`${favorite.title} Album Cover`} src={favorite.image} />
            </ListItemAvatar>
            <ListItemText
              primary={favorite.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Artist: {favorite.artist}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Favorite;
