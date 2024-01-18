// MusicPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import NextSongPreview from './NextSongPreview';
import MusicForm from './MusicForm';
import './MusicPlayer.css';

const MusicPlayer = ({ musicList: initialMusicList }) => {
  const [musicList] = useState(() => {
    const storedMusicList = localStorage.getItem('musicList');
    return storedMusicList ? JSON.parse(storedMusicList) : initialMusicList;
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
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

  const handleShuffle = () => {
    setIsShuffleActive(!isShuffleActive);

    if (isShuffleActive) {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musicList.length);
      localStorage.setItem('musicList', JSON.stringify(musicList));
    } else {
      const shuffledList = [...musicList];
      for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
      }
      setCurrentSongIndex(0);
      localStorage.setItem('musicList', JSON.stringify(shuffledList));
    }
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
  const currentSong = musicList[currentSongIndex];

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="music-player-container">
      <button className="toggle-form-button" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Hide Form' : 'Add Song'}
      </button>

      {isFormVisible && (
        <MusicForm
          onSubmit={(newSong) => {
            console.log('New song added:', newSong);
          }}
        />
      )}

      <div className="song-info">
        {currentSong && (
          <img
            alt="Album Cover"
            height="140"
            src={currentSong.image}
          />
        )}
        <div>
          {currentSong && (
            <>
              <h5>{currentSong.title}</h5>
              <p>{currentSong.artist}</p>
            </>
          )}
        </div>
      </div>
      <ReactPlayer
        ref={audioRef}
        url={currentSong ? currentSong.audioSrc : ''}
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
        onShuffle={handleShuffle}
        isPlaying={isPlaying}
        onVolumeToggle={handleVolumeToggle}
        isMuted={isMuted}
        onVolumeChange={handleVolumeChange}
        volume={volume * 100}
        isShuffleActive={isShuffleActive}
      />
      <NextSongPreview nextSong={nextSong} />
    </div>
  );
};

export default MusicPlayer;
