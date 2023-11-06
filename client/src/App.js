// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import SearchPage from './SearchPage';
import Login from './Login';
import Logout from './Logout';
import NavBar from './NavBar';
import Signup from './Signup';
import UserProfile from './UserProfile';
import Genre from './Genre';
import Playlist from './Playlist';
import Music from './Music';
import Favorite from './Favorite';
import MusicPlayer from './MusicPlayer';
import musicList from './musicData';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information when the app starts
    fetchUser();
  }, []);

  const fetchUser = () =>
    fetch('http://localhost:5555/check_session').then((r) => {
      if (r.ok) {
        r.json().then((userData) => {
          setUser(userData);
        });
      }
    });

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} fetchUser={fetchUser} />}
        />
        <Route path="/logout" element={<Logout setUser={setUser} fetchUser={fetchUser} />} />
        <Route
          path="/signup"
          element={<Signup user={user} setUser={setUser} fetchUser={fetchUser} />}
        />
        <Route
          path="/"
          element={user ? <UserProfile user={user} /> : <Home user={user} />}
        />
        {user && (
          <>
            <Route path="/profile" element={<UserProfile user={user} />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/music" element={<Music />} />
            <Route path="/musicplayer" element={<MusicPlayer musicList={musicList}/>} />
            <Route path="/favorite" element={<Favorite user={user}/>} />
          </>
        )}
        <Route path="/search" element={<SearchPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
