import React, { createContext, useState } from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (url) => {
    setCurrentSongUrl(url);
    setIsPlaying(true);
  };

  const stopSong = () => {
    setCurrentSongUrl(null);
    setIsPlaying(false);
  };

  return (
    <AudioPlayerContext.Provider value={{ currentSongUrl, isPlaying, playSong, stopSong}}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
