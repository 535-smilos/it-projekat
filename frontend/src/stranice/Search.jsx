import React, { useEffect, useState, useContext } from 'react';
import styles from "./Search.module.css";
import Navbar from "../komponente/Navbar";
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Search = () => {
  const { currentUser } = useContext(AuthContext);

  const [listOfSongs, setListOfSongs] = useState([]);

  const getSongs = async () => {
    try {
      const res = await axios.get(`/songs/`);
      setListOfSongs(res.data);
      console.log(res.data.map(data=>data.ID));
    } catch (err) {
      console.error("Greska pri fetchovanju pjesama!", err);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  const addSongEvent = async (song_id) => {
    try {
      console.log(song_id);
      const res = await axios.post(`/library/${currentUser.username}/${song_id}`);
      console.log(res.data);
    } catch (err) {
      console.error("Greska pri dodavanju!", err);
    }
  };

  return (
    <>
      <Navbar/>

      <div className={styles.searchBar}>
        <label htmlFor="searchText" className={styles.SearchLabel}>Search:</label>
        <input type="text" name="searchText" id={styles.searchText} />
        <button type="button" className={styles.buttonSearch}>🔎</button>
      </div>

      <div className={styles.searchResults}>
        <div className={styles.ResultContainer}>
          <table className={styles.ListOfResults}>
            {listOfSongs?.map((song) => (
              <tr className={styles.ListItemResult}>
                <td>{song.ime_izvodjac}</td>
                <td>{song.naziv}</td>
                <td>{song.trajanje}</td>
                <td>{song.zanr_naziv}</td>
                <td>{song.ocjena}</td>
                <td><button onClick={()=>addSongEvent(song.ID)}>Dodaj pjesmu</button></td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Search;
