import React from 'react';
import { Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import img0470 from './IMG_R_0001.jpg'; 

const Biography = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3} mt={3}>
      <Grid item xs={12} md={8}>
        <Paper
          elevation={3}
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            width: '100%',
            height: 'calc(100% - 64px)',
            backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/190/860/19/music-house-love-minimalist-wallpaper-preview.jpg")', 
            backgroundSize: 'cover',
            overflow: 'auto',
            padding: '20px',
          }}
        >
          <Card elevation={0} style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '15px', borderRadius: '15px' }}>
            <CardContent style={{ textAlign: 'center' }}>
              <img src={img0470} alt="Biography" style={{ width: '100%', maxWidth: '300px', borderRadius: '12px' }} /> 
              <Typography variant="h5" gutterBottom style={{ color: '#fff', marginTop: '20px' }}>
                Biography
              </Typography>
              <Typography variant="body1" style={{ color: '#fff' }}>
            Hi, my name is Anthony. As a software engineer, I completed a four-month remote-live software engineering boot camp at Flatiron School in November 2023, where I honed my skills in JavaScript, Python, Flask, and React. During this intensive program, I also gained proficiency in using tools such as Discord, GitHub, Git, and VSCode to collaborate with teammates and manage projects efficiently.

            Throughout the boot camp, I participated in collaborative projects within my cohort, allowing me to apply my newly acquired skills to real-world scenarios. Additionally, I tackled numerous code challenges, which served as opportunities to reinforce my understanding of the curriculum and enhance my problem-solving abilities.

            Prior to enrolling in the boot camp, I embarked on my journey into the world of coding and programming by taking introductory computer science classes at a community college. It was during this time that I discovered my passion for software development and engineering.

            What draws me to this field is the prospect of continuous learning, the opportunity to work in diverse teams, the challenge of critical thinking, and the sense of fulfillment derived from debugging and solving complex problems. I am driven by the ever-evolving nature of technology and the ability to contribute to innovative solutions that positively impact people's lives.              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Biography;
