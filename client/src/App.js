// App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useTheme } from './ThemeContext';
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
import MusicPlayer from './MusicPlayer';
import musicList from './musicData';
import Favorite from './Favorite';

function App() {
  const [user, setUser] = useState();
  const { isDarkMode } = useTheme();


  useEffect(  ()=> {
  fetch("/api/check_session", {
    method: 'GET',
    credentials: 'include',
  })
  .then((r) => {
    if (r.ok) {
      r.json().then((userData) => {
        setUser(userData);
      });
    } else {
      setUser(null)
    }
  })} , [])

  if(user === undefined) {
    return null
  }

  return (
    <Router>
      <div className={isDarkMode ? 'dark-theme' : 'light-theme'}></div>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser}  />}
        />
        <Route path="/logout" element={<Logout setUser={setUser}  />} />
        <Route
          path="/signup"
          element={<Signup user={user} setUser={setUser}  />}
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
            <Route path="/favorite" element={<Favorite user={user}/>} />
            <Route path="/musicplayer" element={<MusicPlayer musicList={musicList}/>} />
          </>
        )}
        <Route path="/search" element={<SearchPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
