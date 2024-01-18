import React from 'react';
import './nextSongPreview.css';

const NextSongPreview = ({ nextSong }) => (
  <div className="next-song-preview">
    <div>
      <h6>Next:</h6>
      <img alt="Next Song Cover" height="140" src={nextSong.image} />
    </div>
    <div className="next-song-details">
      <p>{nextSong.title}</p>
      <p>{nextSong.artist}</p>
    </div>
  </div>
);

export default NextSongPreview;
