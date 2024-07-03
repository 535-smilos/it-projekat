// src/components/AudioPlayer.js
import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { AudioPlayerContext } from '../context/audioContext.js';
import styles from './AudioPlayer.module.css';

const AudioPlayer = () => {
    const { currentSongUrl, isPlaying, stopSong} = useContext(AudioPlayerContext);
    const [hidden, setHidden] = useState(false);

    useEffect(()=>{
        const handleHkey=(e)=>{
            if(e.key==='h'||e.key==='H'){
                setHidden(hidden?!hidden:hidden);
            }
        };
        
        document.addEventListener('keydown', handleHkey);

        return () =>{
            document.removeEventListener('keydown', handleHkey);
        }
    });

    return (
        <div className={styles.playerContainer}>
            {currentSongUrl && (
                <>
                    <ReactPlayer
                        url={currentSongUrl}
                        playing={isPlaying}
                        height='120px'
                        width='100%'
                        controls={true}
                        style={{display:hidden?"none":""}}
                        onEnded={() => stopSong()}
                        config={{ youtube: { playerVars: { showinfo: 0, fs: 0 } } }}
                    />
                    <button className={styles.HideBtn} onClick={()=>{setHidden(!hidden)}}>{hidden?'Show Player':'Hide Player'}</button>
                </>
            )}
        </div>
    );
};

export default AudioPlayer;
