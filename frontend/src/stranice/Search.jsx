import React, { useEffect, useState, useContext } from 'react';
import styles from "./Search.module.css";
import Navbar from "../komponente/Navbar";
import { AuthContext } from '../context/authContext';
import { SongContext } from '../context/SongContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const { addedSongs,addSong }=useContext(SongContext);
  const [listOfSongs, setListOfSongs] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getSongs = async () => {
    try {
      const res = await axios.get(`/songs/`);
      setListOfSongs(res.data);
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
  }, []);

  const addSongEvent = async (song_id) => {
    try {
      console.log(song_id);
      const res = await axios.post(`/library/${currentUser.username}/${song_id}`);
      alert(res.data);
      addSong(song_id);
    } catch (err) {
      console.error("Greska pri dodavanju!", err);
    }
  };

  const filterList = listOfSongs.filter((song) => {
    return (
      (song.ime_izvodjac.toLowerCase().includes(searchText.toLowerCase()) ||
        song.naziv.toLowerCase().includes(searchText.toLowerCase()) ||
        song.zanr_naziv.toLowerCase().includes(searchText.toLowerCase())) &&
      !addedSongs.has(song.ID)
    );
  });

  return (
    <>
      <Navbar />
      <div className={styles.SearchContainer}>
        <div className={styles.searchBar}>
          <label htmlFor="searchText" className={styles.SearchLabel}>Search:</label>
          <input type="text" name="searchText" id={styles.searchText} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className={styles.searchResults}>
          <div className={styles.ResultContainer}>
            <table className={styles.ListOfResults}>
              <tbody>
                {filterList?.map((song) => (
                  <tr className={styles.ListItemResult} key={song.ID}>
                    <td>{song.ime_izvodjac}</td>
                    <td>{song.naziv}</td>
                    <td>{song.trajanje}</td>
                    <td>{song.zanr_naziv}</td>
                    <td>{song.ocjena}</td>
                    <td><button onClick={() => addSongEvent(song.ID)}>Dodaj pjesmu</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
