// src/components/AudioPlayer.js
import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { AudioPlayerContext } from "../context/audioContext.js";
import styles from "./AudioPlayer.module.css";

const AudioPlayer = () => {
  const { currentSongUrl, isPlaying, stopSong } =
    useContext(AudioPlayerContext);
  const [hidden, setHidden] = useState(false);
  const [playerHeight, setPlayerHeight] = useState("120px");

  useEffect(() => {
    const handleHkey = (e) => {
      if (e.key === "h" || e.key === "H") {
        setHidden((prevHidden) => !prevHidden);
      }
    };

    document.addEventListener("keydown", handleHkey);

    return () => {
      document.removeEventListener("keydown", handleHkey);
    };
  }, [hidden]);

  useEffect(() => {
    const updatePlayerHeight = () => {
      if (window.innerWidth <= 600) {
        setPlayerHeight("80px");
      } else {
        setPlayerHeight("120px");
      }
    };
    updatePlayerHeight(); // Initial check
    window.addEventListener("resize", updatePlayerHeight);
    return()=>{
        window.removeEventListener("resize", updatePlayerHeight);
    }
  },[]);

  return (
    <div className={styles.playerContainer}>
      {currentSongUrl && (
        <>
          <ReactPlayer
            className={styles.Player}
            url={currentSongUrl}
            playing={isPlaying}
            height={playerHeight}
            width="100%"
            controls={true}
            style={{ display: hidden ? "none" : "" }}
            onEnded={() => stopSong()}
            config={{ youtube: { playerVars: { showinfo: 0, fs: 0 } } }}
          />
          <button
            className={styles.HideBtn}
            onClick={() => {
              setHidden((prevHidden)=>!prevHidden)
            }}
          >
            {hidden ? "Show Player" : "Hide Player"}
          </button>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
