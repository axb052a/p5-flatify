import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import NextSongPreview from './NextSongPreview';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import './MusicPlayer.css';

const MusicPlayer = ({ musicList }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef();

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
      <NextSongPreview nextSong={nextSong} />
    </Container>
  );
};

export default MusicPlayer;
