import React from 'react';
import { Avatar, Typography, Grid, Card, CardContent } from '@mui/material';

const UserProfile = ({ user }) => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3} mt={3}>
      <Grid item xs={12} md={8}>
        <Card elevation={3} style={{ padding: '15px', margin: '15px', background: '#fff', color: '#333' }}>
          <CardContent style={{ textAlign: 'center' }}>
            <Avatar
              src={user.profileImage || 'https://cdn-icons-png.flaticon.com/256/3003/3003035.png'}
              alt="Profile"
              style={{ width: '200px', height: '200px', borderRadius: '50%', margin: '0 auto', marginBottom: '15px' }}
            />
            <Typography variant="h6">Name: {user.username}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">User ID: {user.id}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
