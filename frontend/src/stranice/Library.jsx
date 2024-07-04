import React, { useContext, useEffect, useState } from 'react';
import styles from "./Library.module.css";
import Navbar from "../komponente/Navbar";
import { AuthContext } from '../context/authContext';
import { SongContext } from '../context/SongContext';
import axios from 'axios';
import ReactPlayer from "react-player/lazy";
import { useNavigate } from 'react-router';
import { AudioPlayerContext } from '../context/audioContext';

const Kartica = ({ id, naziv, ocjena, trajanje, artist, url, onPlaySong, onSongDelete }) => {
  const { currentUser } = useContext(AuthContext);
  const {removeSong}=useContext(SongContext);
  
  const handlePlaySong = () => {
    onPlaySong(url);
  };
  
  const unlikeSong=async()=>{
    try{
      const res=await axios.delete(`/library/${currentUser.username}/${id}`);
      alert("Song deleted!");
      console.log(res.data);
      if (onSongDelete) {
        onSongDelete(id);
      }
      removeSong(id);
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
      <button className={styles.delete} onClick={unlikeSong}>REMOVE SONG</button>
    </div>
  );
};

const Library = () => {
  
  const {removeSong}=useContext(SongContext);
  const {playSong}=useContext(AudioPlayerContext);
  const [library, setLibrary] = useState([]);
  const [likedcnt, setLikedCnt]=useState();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  
  const [slika, setSlika]=useState();
  
  const navigate=useNavigate();
  
  useEffect(() => {

    if(!localStorage.getItem("token")){
      navigate('/login');
    }
 
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
        setLikedCnt(res.data.LikedCnt);
      } catch(err){
        console.error("Greska pri countu", err);
      }
    }


    loadSongs();
    loadLikedCount();
  }, []);

  const handleSongDelete = async (id) => {
    try {
      setLibrary(prevLibrary => prevLibrary.filter(song => song.ID !== id));
      setLikedCnt(prevLikedCnt=>(prevLikedCnt-1)>=0?prevLikedCnt-1:0);
      removeSong(id);
    } catch (err) {
      console.error("Error deleting song!", err);
    }
  };

  const handlePlaySong = (url) => {
    playSong(url);
  };

  const handleFile=(e)=>{
    setSlika(e.target.files[0]);
  };

  const handleChangeImage=async(e)=>{
    const formdata=new FormData();
    formdata.append('slika', slika);
    try{
     await axios.post("http://localhost:8800/api/image/", formdata);
     await axios.put("http://localhost:8800/api/users/pfp/", {
      slika:`http://localhost:8800/api/public/slike/${slika.name}`,
     });
     setCurrentUser({
      ...currentUser,
      slika:`http://localhost:8800/api/public/slike/${slika.name}`,
     });
     localStorage.setItem("user", JSON.stringify(currentUser));
    } catch(err){
      console.error(err);
    }
  }

  return (
    <div className={styles.LibraryContainer} >
      <Navbar />
      <div className={styles.PageContainer}>
        <div className={styles.ProfileContainer}>
          <div className={styles.ProfileInfo}>
            <img src={currentUser.slika} alt='' className={styles.ProfileImage} />
            <div className={styles.username}>
              <h1 className={styles.name}>{currentUser.username}</h1>
              <h5 className={styles.numofsongs}>Liked songs: {likedcnt}</h5>
            </div>
          </div>
          <div className={styles.changePFP}>
            <label htmlFor="slika">Change pfp</label>
            <input type="file" name="slika" id="slika" onChange={handleFile} className={styles.editpfp} />
            <button onClick={handleChangeImage}>promijeni</button>
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
                onSongDelete={handleSongDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
