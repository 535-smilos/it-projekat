import React from 'react'
import styles from "./Search.module.css"
import Navbar from "../komponente/Navbar"

function ojd(){
  alert("ojd!");
}

const Search = () => {
  return (
    <>
      <Navbar/>

      <div className={styles.searchBar}>
        <label for="searchText" className={styles.SearchLabel}>Search:</label>
        <input type="text" name="searchText" id={styles.searchText} />
        <button type="button" className={styles.buttonSearch} onClick={ojd}>🔎</button>
      </div>

      <div className={styles.searchResults}>
       <div className={styles.ResultContainer}>
        <ul className={styles.ListOfResults}>
          <li className={styles.ListItemResult}>
            <h5>1rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Liked?</h5>
            <h5>Rating</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>2rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Liked?</h5>
            <h5>Rating</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>3rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>4rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>5rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>6rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>7rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>8rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>9rtist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>Artist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>Artist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>Artist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>Artist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
          <li className={styles.ListItemResult}>
            <h5>Artist</h5>
            <h5>Song</h5>
            <h5>Duration</h5>
            <h5>Genre</h5>
            <h5>Rating</h5>
            <h5>Liked?</h5>
          </li>
        </ul>
       </div>
      </div>
    </>
  )
}

export default Search