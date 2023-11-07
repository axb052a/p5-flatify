import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';

function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    fetch("http://localhost:5555/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        // Navigate to the home page after successful logout
        navigate('/');
      }
    });
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundImage: `url("https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg")`,
        backgroundSize: 'cover',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
        >
          Flatify
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={NavLink} to="/search">
              Search
            </Button>
            <Button color="inherit" component={NavLink} to="/musicplayer">
              Music Player
            </Button>
            <Button color="inherit" component={NavLink} to="/music">
              Music
            </Button>
            <Button color="inherit" component={NavLink} to="/genre">
              Genre
            </Button>
            <Button color="inherit" component={NavLink} to="/playlist">
              Playlist
            </Button>
            <Button color="inherit" component={NavLink} to="/favorite">
              Favorite
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Avatar
              src={user?.profileImage || 'https://cdn-icons-png.flaticon.com/256/3003/3003035.png'}
              alt={user?.username}
              sx={{
                mx: 1,
                cursor: 'pointer',
                width: '32px',
                height: '32px',
              }}
              onClick={handleMenuClick}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={NavLink} to="/profile">Profile</MenuItem>
            </Menu>
          </Box>
        )}
        {user ? (
          null
        ) : (
          <>
            <Button color="inherit" component={NavLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;