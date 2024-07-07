import React, { useEffect, useState, useContext } from 'react';
import styles from "./Search.module.css";
import Navbar from "../komponente/Navbar";
import { AuthContext } from '../context/authContext';
import { SongContext } from '../context/SongContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AudioPlayerContext } from '../context/audioContext';

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const { addedSongs, addSong } = useContext(SongContext);
  const {playSong}=useContext(AudioPlayerContext);
  const [listOfSongs, setListOfSongs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("-");
  const [sortOption, setSortOption] = useState("asc");

  const getSongs = async () => {
    try {
      const res = await axios.get(`/library/${currentUser.username}/exc`, {
        params: {
          filter: filterOption,
          sort: sortOption,
          search: searchText,
        },
      });
      setListOfSongs(res.data);
      console.log("Loaded songs!");
    } catch (err) {
      console.error("Greska pri fetchovanju pjesama!", err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }
    getSongs();
  }, [filterOption, sortOption, searchText]);

  const addSongEvent = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(`/library/${currentUser.username}/${id}`);
      alert(res.data);
      addSong(id);
    } catch (err) {
      console.error("Greska pri dodavanju!", err);
    }
  };

  const handlePlaySong = (url) => {
    playSong(url);
  };

  const filterList = listOfSongs.filter((song)=>!addedSongs.has(song.ID));

  const ListItemResult = ({ song }) => (
    <div className={styles.ListItemResult} key={song.ID}>
      <h4 onDoubleClick={() => handlePlaySong(song.url)}>{song.ime_izvodjac}</h4>
      <h4 onDoubleClick={() => handlePlaySong(song.url)}>{song.naziv_pjesma}</h4>
      <h5>{song.trajanje}</h5>
      <h5>{song.zanr_naziv}</h5>
      <h5>{song.ocjena}</h5>
      <h4>{currentUser.je_admin === 0 ? (
        <button onClick={() => addSongEvent(song.ID)}>Dodaj pjesmu</button>
      ) : (
        ""
      )}
      </h4>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className={styles.SearchContainer}>
        <div className={styles.searchBar}>
          <label htmlFor="searchText" className={styles.SearchLabel}>Search:</label>
          <input type="text" name="searchText" id={styles.searchText} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className={styles.FilterTab}>
          <label htmlFor="selectFilter">Filter:</label>
          <select name="selectFilter" id="selectFilter" onChange={(e) => setFilterOption(e.target.value)}>
            <option value="-">-</option>
            <option value="Genre">Genre</option>
            <option value="Artist">Artist</option>
            <option value="Title">Title</option>
            <option value="Duration">Duration</option>
            <option value="Rating">Rating</option>
          </select>
          <form>
            <label htmlFor="asc">Λ</label>
            <input type="radio" name="sort" id="asc" value="asc" checked={sortOption === "asc"} onChange={(e) => setSortOption(e.target.value)} />
            <label htmlFor="desc">V</label>
            <input type="radio" name="sort" id="desc" value="desc" checked={sortOption === "desc"} onChange={(e) => setSortOption(e.target.value)} />
          </form>
        </div>
        <div className={styles.searchResults}>
          <div className={styles.ResultContainer}>
            <div className={styles.ListOfResults}>
              
                {filterList?.map((song) => (
                  <ListItemResult
                  key={song.ID}
                  song={song}
                />
                ))}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
