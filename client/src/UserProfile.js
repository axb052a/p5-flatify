// UserProfile.js
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const UserProfile = ({ user }) => {
  const [favoriteMusic, setFavoriteMusic] = useState([]);

  useEffect(() => {
    // Fetch user's favorite music
    fetch(`http://localhost:5555/favorite`)
      .then((response) => response.json())
      .then((data) => setFavoriteMusic(data))
      .catch((error) => console.error('Error fetching favorite music:', error));
  }, [user.id]);

  return (
    <Grid container spacing={3} mt={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px', margin: '20px', height: '100%' }}>
          <Card style={{ height: '100%' }}>
            <CardHeader title="Your Profile" />
            <CardContent>
              <Avatar
                src={user.profileImage || 'https://cdn-icons-png.flaticon.com/256/3003/3003035.png'}
                alt="Profile"
                style={{ width: '200px', height: '200px', borderRadius: '50%', margin: '0 auto' }}
              />
              <Typography variant="h6">Name: {user.username}</Typography>
              <Typography variant="h6">Email: {user.email}</Typography>
              <Typography variant="h6">User ID: {user.id}</Typography>

              {/* Add other profile information as needed */}
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      {/* Favorite Music */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px', margin: '20px', height: '100%' }}>
          <Card style={{ height: '100%' }}>
            <CardHeader title="Favorite Music" />
            <CardContent>
              <List>
                {favoriteMusic.map((music) => (
                  <ListItem key={music.id}>
                    <ListItemText
                      primary={music.title}
                      secondary={
                        <>
                          <div>Title: {music.title}</div>
                          <div>Artist: {music.artist}</div>
                          {/* Add other information about the favorite music */}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
