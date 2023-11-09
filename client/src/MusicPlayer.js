// MusicPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import NextSongPreview from './NextSongPreview';
import MusicForm from './MusicForm';
import { Container, Typography, Card, CardContent, CardMedia} from '@mui/material';
import './MusicPlayer.css';

const MusicPlayer = ({ musicList: initialMusicList }) => {
  const [musicList, setMusicList] = useState(() => {
    // Retrieve musicList from localStorage 
    const storedMusicList = localStorage.getItem('musicList');
    return storedMusicList ? JSON.parse(storedMusicList) : initialMusicList;
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    // Save musicList to localStorage
    localStorage.setItem('musicList', JSON.stringify(musicList));
  }, [musicList]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musicList.length);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? musicList.length - 1 : prevIndex - 1
    );
  };

  const handleSeek = (value) => {
    audioRef.current.seekTo(value);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
    if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleSongEnd = () => {
    handleNextSong();
  };

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddSong = (newSong) => {
    const updatedMusicList = [...musicList, newSong];
    setMusicList(updatedMusicList);
    setIsFormVisible(false);
  };

  const nextSongIndex = (currentSongIndex + 1) % musicList.length;
  const nextSong = musicList[nextSongIndex];

  return (
    <Container className={`music-player-container`}>
      <Card className="song-info">
        <CardMedia
          component="img"
          alt="Album Cover"
          height="140"
          image={musicList[currentSongIndex].image}
        />
        <CardContent>
          <Typography variant="h5">
            {musicList[currentSongIndex].title}
          </Typography>
          <Typography variant="subtitle1">
            {musicList[currentSongIndex].artist}
          </Typography>
        </CardContent>
      </Card>
      <ReactPlayer
        ref={audioRef}
        url={musicList[currentSongIndex].audioSrc}
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        onProgress={(e) => setCurrentTime(e.playedSeconds)}
        onEnded={handleSongEnd}
        width="100%"
        height="60px"
        className="audio-player"
      />
      <ProgressBar
        currentTime={currentTime}
        duration={audioRef.current ? audioRef.current.getDuration() : 0}
        onSeek={handleSeek}
      />
      <Controls
        onPrev={handlePrevSong}
        onPlayPause={handlePlayPause}
        onNext={handleNextSong}
        isPlaying={isPlaying}
        onVolumeToggle={handleVolumeToggle}
        isMuted={isMuted}
        onVolumeChange={handleVolumeChange}
        volume={volume * 100}
      />
      <button
      style={{
        fontSize: '14px',
        padding: '10px 20px',
      }}
      onClick={handleFormToggle}
    >
      {isFormVisible ? 'Hide Form' : 'Add New Song'}
    </button>

      <NextSongPreview nextSong={nextSong} />

      {isFormVisible && <MusicForm onSubmit={handleAddSong} />}
    </Container>
  );
};

export default MusicPlayer;
