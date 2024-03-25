import React from 'react';
import { Typography, Container, Paper, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            width: '100%',
            height: 'calc(100% - 64px)',
            backgroundImage: 'url("https://wallpapercave.com/wp/wp7937446.jpg")', 
            backgroundSize: 'cover',
            overflow: 'auto',
            padding: '20px',
          }}
      >
        <Grid item xs={10}>
          <Paper
            elevation={3}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              padding: '20px',
            }}
          >
            <Typography variant="h4" gutterBottom>
              About Flatify: A Music Full-Stack Application
            </Typography>
            <Typography variant="body1" paragraph>
              Flatify is my final culmination project for my program, demonstrating everything I've learned from the curriculum. It's a Full-Stack Music Application designed to provide users with a platform to explore, discover, and see their favorite music.
            </Typography>
            <Typography variant="body1" paragraph>
              The application offers a range of features, including user authentication, music browsing, playlist creation, genre categorization, and more. One of the new things I had to learn to implement into the project was the React Player component, which enhances the user experience by allowing users to play music directly within the application.
            </Typography>
            <Typography variant="body1" paragraph>
              As I continue to learn and grow in my career, I'll be making improvements and adjustments to Flatify to enhance the user experience and add new features.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
