import React, { useContext, useEffect, useState } from 'react';
import styles from "./Library.module.css";
import Navbar from "../komponente/Navbar";
import { AuthContext } from '../context/authContext';
import { SongContext } from '../context/SongContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AudioPlayerContext } from '../context/audioContext';

const Kartica = ({ id, naziv, ocjena, trajanje, artist, url, naziv_zanra, onPlaySong, onSongDelete, onRatingChange }) => {
  const { currentUser } = useContext(AuthContext);
  const {removeSong}=useContext(SongContext);
  const [editing, isEditing]=useState(false);
  const [newRating, setNewRating]=useState(ocjena);

  const handlePlaySong = () => {
    onPlaySong(url);
  };
  
  const unlikeSong=async()=>{
    try{
      const res=await axios.delete(`/library/${currentUser.username}/${id}`);
      alert("Pjesma obrisana!");
      if (onSongDelete) {
        onSongDelete(id);
      }
      removeSong(id);
    } catch(err){
      alert("Greska pri brisanju!");
      console.error("Greska pri brisanju!", err);
    }
  }
  
  const handleRatingClick=()=>{
    isEditing(true);
  };

  const handleRatingSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.put(`library/${currentUser.username}/${id}`,{ocjena:newRating});
      onRatingChange(id, newRating);
      isEditing(false);
    } catch(err){
      alert("Greska pri azuriranju ocjene!");
      console.error(err);
    }
  }

  return (
    <div className={styles.SongItem}>
      <h4 className={styles.SongName} onClick={handlePlaySong}>{naziv}</h4>
      <h5 className={styles.SongArtist}>{artist}</h5>
      <h5 className={styles.SongRate} title='Izmijeni ocjenu' onClick={()=>isEditing(!editing)}>{ocjena?ocjena:"dodaj"}</h5>
     {editing && (
      <form action="" onSubmit={handleRatingSubmit}>
        <input type="number" step={0.1} value={newRating} onChange={(e)=>setNewRating(e.target.value)} />
        <button type="submit">Update</button>  
      </form>
     )}
      <h5 className={styles.SongDuration}>{trajanje}</h5>
      <h5>{naziv_zanra}</h5>
      <button className={styles.delete} onClick={unlikeSong}>Unlike</button>
    </div>
  );
};

const Library = () => {
  const { removeSong } = useContext(SongContext);
  const { playSong } = useContext(AudioPlayerContext);
  const [library, setLibrary] = useState([]);
  const [likedcnt, setLikedCnt] = useState();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [filter, setFilter] = useState({ search: '', filter: '', sort: '' });
  const [slika, setSlika] = useState();
  const [edit, setEdit]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }

    const loadSongs = async () => {
      try {
        const res = await axios.get(`/library/${currentUser.username}`, { params: filter });
        setLibrary(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching songs!", err);
      }
    };

    const loadLikedCount = async () => {
      try {
        const res = await axios.get(`/library/${currentUser.username}/count`);
        setLikedCnt(res.data.LikedCnt);
      } catch (err) {
        console.error("Greska pri countu", err);
      }
    }

    loadSongs();
    loadLikedCount();
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const handleSongDelete = async (id) => {
    try {
      setLibrary(prevLibrary => prevLibrary.filter(song => song.ID !== id));
      setLikedCnt(prevLikedCnt => (prevLikedCnt - 1) >= 0 ? prevLikedCnt - 1 : 0);
      removeSong(id);
    } catch (err) {
      console.error("Error deleting song!", err);
    }
  };

  const handlePlaySong = (url) => {
    playSong(url);
  };

  const handleFile = (e) => {
    setSlika(e.target.files[0]);
  };

  const handleChangeImage = async (e) => {
    const formdata = new FormData();
    formdata.append('slika', slika);
    try{
     await axios.post("/image/", formdata);
     await axios.put("/users/pfp/", {
      slika:`http://localhost:8800/public/slike/${slika.name}`,
     });
     setCurrentUser({
      ...currentUser,
        slika: `http://localhost:8800/public/slike/${slika.name}`,
      });
      localStorage.setItem("user", JSON.stringify(currentUser));
      setEdit(false)
    } catch (err) {
      console.error(err);
    }
  }

  const handleRatingUpdate = (id, newRating) => {
    setLibrary(prevLibrary =>
      prevLibrary.map(song =>
        song.ID === id ? { ...song, ocjena: newRating } : song
      )
    );
  };

  return (
    <div className={styles.LibraryContainer}>
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
            {edit?(<>
            <label htmlFor="slika">Change pfp</label>
            <input type="file" name="slika" id="slika" onChange={handleFile} className={styles.editpfp} />
            <button onClick={handleChangeImage}>promijeni</button>
            <button onClick={()=>setEdit(false)}>cancel</button>
            </>):<button className={styles.editbtn} onClick={()=>setEdit(true)}>Edit pfp</button>}
          </div>
        </div>
        <div className={styles.FilterContainer}>
          <input
            type="text"
            name="search"
            placeholder="Filter by genre, artist, title"
            value={filter.search}
            onChange={handleFilterChange}
          />
          <select name="filter" value={filter.filter} onChange={handleFilterChange}>
            <option value="-">-</option>
            <option value="Title">Title</option>
            <option value="Artist">Artist</option>
            <option value="Duration">Duration</option>
            <option value="Rating">Rating</option>
            <option value="Genre">Genre</option>
          </select>
          <div className={styles.OrderRadioButtons}>
            <label htmlFor='sort' style={{"fontFamily":"sans-serif"}}>Λ
              </label>
              <input
                type="radio"
                name="sort"
                value="asc"
                checked={filter.sort === 'asc'}
                onChange={handleFilterChange}
              />
            <label htmlFor='sort'>V
            </label>
              <input
                type="radio"
                name="sort"
                value="desc"
                checked={filter.sort === 'desc'}
                onChange={handleFilterChange}
              />
              
          </div>
        </div>
        </div>
        <div className={styles.SongsContainer}>
          <div className={styles.SongList}>
            {library.map(song => (
              <Kartica
              key={song.ID}
              id={song.ID}
              naziv={song.naziv}
              ocjena={song.ocjena}
              artist={song.artist}
              trajanje={song.trajanje}
              naziv_zanra={song.naziv_zanra}
              url={song.url}
              onPlaySong={handlePlaySong}
              onSongDelete={handleSongDelete}
              onRatingChange={handleRatingUpdate}
              />
            ))}
          </div>
        </div>
      </div>

  );
};

export default Library;