import React from 'react'
import styles from "./Library.module.css"
import Navbar from "../komponente/Navbar"
import Player from '../komponente/Player'

const Library = () => {
  return (
    <>
      <Navbar/>
      
      <div className={styles.PageContainer}>
        <div className={styles.ProfileContainer}>
          <div className={styles.ProfileInfo}>
            <img src={require("./sceSSpeng.png")} alt='' className={styles.ProfileImage}/>
            <div className={styles.username}>
              <h1 className={styles.name}>SMILOS</h1>
              <h5 className={styles.numofsongs}>214342 songs</h5>
            </div>
          </div>  
            <div className={styles.changePFP}>
              <label htmlFor="editpfp">Change pfp</label>
              <input type="file" name="editpfp" id="editpfp" className={styles.editpfp} />
            </div>
        </div>  
        <div className={styles.SongsContainer}>
          <ul className={styles.SongList}>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
            <li className={styles.SongItem}>
              <h4 className={styles.SongName}>Ime pjesme</h4>
              <h5 className={styles.SongArtist}>Izvodjac</h5>
              <h5 className={styles.SongRate}>ocjena</h5>
              <h5 className={styles.SongDuration}>4:20</h5>
            </li>
          </ul>
        </div>
      </div>
      <Player/>
    </>
  )
}

export default Library