import React, {createContext, useState} from "react";

export const SongContext=createContext();

export const SongProvider = ({ children }) => {
    const [addedSongs, setAddedSongs] = useState(new Set());
  
    const addSong = (id) => {
      setAddedSongs((prev) => new Set(prev).add(id));
    };
  
    const removeSong = (id) => {
      setAddedSongs((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    };
  
    return (
      <SongContext.Provider value={{ addedSongs, addSong, removeSong }}>
        {children}
      </SongContext.Provider>
    );
};