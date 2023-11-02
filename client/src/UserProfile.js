import React from 'react';
import {
  Avatar,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

const generateRandomStats = () => ({
  age: Math.floor(Math.random() * 50) + 18,
  height: Math.floor(Math.random() * 30) + 150,
  favoriteArtists: generateRandomFavorites(),
});

const generateRandomFavorites = () => {
  const favorites = [
    'The Marias',
    'The Drums',
    'The 1975',
    'King Krule',
    'Raveena',
    'Alina Baraz',
    'Snoh Aalegra'
  ];

  const numberOfFavorites = Math.floor(Math.random() * favorites.length) + 1;
  return favorites.slice(0, numberOfFavorites);
};

const UserProfile = ({ user }) => {
  const userStats = generateRandomStats();

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
                style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto' }}
              />
              <Typography variant="h5">Name: {user.username}</Typography>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                Age: {user.age || userStats.age}
              </Typography>
              <Typography variant="body1">
                Height: {user.height || userStats.height} cm
              </Typography>
              {/* Add other profile information as needed */}
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
