import React, { useContext, useEffect, useState } from 'react';
import styles from "./Library.module.css";
import Navbar from "../komponente/Navbar";
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import ReactPlayer from "react-player";

const Kartica = ({ id, naziv, ocjena, trajanje, artist, url, onPlaySong }) => {
  const { currentUser } = useContext(AuthContext);
  const handlePlaySong = () => {
    onPlaySong(url);
  };

  const [library, setLibrary] = useState([]);

  const loadSongs = async () => {
    try {
      const res = await axios.get(`/library/${currentUser.username}`);
      setLibrary(res.data);
    } catch (err) {
      console.error("Error fetching songs!", err);
    }
  };

  const unlikeSong=async()=>{
    try{

      const res=await axios.delete(`/library/${currentUser.username}/${id}`);
      console.log("Song deleted!"+res.data);
      loadSongs();
    } catch(err){
      console.error("Greska pri brisanju!", err);
    }
  }

  return (
    <div className={styles.SongItem}>
      <h4 className={styles.SongName} onClick={handlePlaySong}>{naziv}</h4>
      <h5 className={styles.SongArtist}>{artist}</h5>
      <h5 className={styles.SongRate}>{ocjena}</h5>
      <h5 className={styles.SongDuration}>{trajanje}</h5>
      <button onClick={unlikeSong}>REMOVE SONG</button>
    </div>
  );
};

const Library = () => {
  const { currentUser } = useContext(AuthContext);
  const [library, setLibrary] = useState([]);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [likedcnt, setLikedCnt]=useState();

  const loadSongs = async () => {
    try {
      const res = await axios.get(`/library/${currentUser.username}`);
      setLibrary(res.data);
    } catch (err) {
      console.error("Error fetching songs!", err);
    }
  };

  const loadLikedCount=async()=>{
    try{
      const res=await axios.get(`/library/${currentUser.username}/count`);
      console.log(res.data);
      setLikedCnt(res.data.LikedCnt);
      console.log(likedcnt);
    } catch(err){
      console.error("Greska pri countu", err);
    }
  }

  useEffect(() => {
    loadSongs();
    loadLikedCount();
  }, []);

  const handlePlaySong = (url) => {
    setCurrentSongUrl(url);
  };



  return (
    <>
      <Navbar />
      <div className={styles.PageContainer}>
        <div className={styles.ProfileContainer}>
          <div className={styles.ProfileInfo}>
            <img src={require("./sceSSpeng.png")} alt='' className={styles.ProfileImage} />
            <div className={styles.username}>
              <h1 className={styles.name}>{currentUser.username}</h1>
              <h5 className={styles.numofsongs}>Liked songs: {likedcnt}</h5>
            </div>
          </div>
          <div className={styles.changePFP}>
            <label htmlFor="editpfp">Change pfp</label>
            <input type="file" name="editpfp" id="editpfp" className={styles.editpfp} />
          </div>
        </div>
        <div className={styles.SongsContainer}>
          <div className={styles.SongList}>
            {library?.map(song => (
              <Kartica
                key={song.ID}
                id={song.ID}
                naziv={song.naziv}
                ocjena={song.ocjena}
                artist={song.artist}
                trajanje={song.trajanje}
                url={song.url}
                onPlaySong={handlePlaySong}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.playercontainer}>
        {currentSongUrl && (
          <ReactPlayer
            className='react-player'
            url={currentSongUrl}
            width='100%'
            height='50%'
            playing
            controls={true}
            config={{file:
              {forceAudio:true, forceVideo:false}}}
          />
        )}
      </div>
    </>
  );
};

export default Library;
