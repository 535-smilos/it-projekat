import React, { useContext, useEffect, useState } from 'react';
import styles from "./Library.module.css";
import Navbar from "../komponente/Navbar";
import { AuthContext } from '../context/authContext';
import { SongContext } from '../context/SongContext';
import axios from 'axios';
import ReactPlayer from "react-player";
import { useNavigate } from 'react-router';

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
      <button onClick={unlikeSong}>REMOVE SONG</button>
    </div>
  );
};

const Library = () => {
  
  const {removeSong}=useContext(SongContext);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [library, setLibrary] = useState([]);
  const [likedcnt, setLikedCnt]=useState();
  const { currentUser } = useContext(AuthContext);
  
  const [profilepic, setProfilePic]=useState();
  
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
    setCurrentSongUrl(url);
  };

  const ImageChange=e=>{
    setProfilePic(prev=>({...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.put(`/users/pfp/${currentUser.username}`);
      console.log(res.data);
    } catch(err){
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.PageContainer}>
        <div className={styles.ProfileContainer}>
          <div className={styles.ProfileInfo}>
            <img src={require(`${currentUser.slika}`)} alt='' className={styles.ProfileImage} />
            <div className={styles.username}>
              <h1 className={styles.name}>{currentUser.username}</h1>
              <h5 className={styles.numofsongs}>Liked songs: {likedcnt}</h5>
            </div>
          </div>
          <div className={styles.changePFP}>
            <label htmlFor="slika">Change pfp</label>
            <input type="file" name="slika" id="slika" onChange={ImageChange} className={styles.editpfp} />
            <button onClick={handleImageChange}>promijeni</button>
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
