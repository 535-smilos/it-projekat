import React, { useEffect, useState } from 'react'
import Navbar from '../komponente/Navbar'
import styles from "./Admin.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router';


function Admin() {

    const [genre, setGenre] = useState();
    const [artist, setArtist] = useState();
    const [song, setSong] = useState({
        naziv: "", url: "", ocjena: "", trajanje: "", zanr_id: ""
    });
    const [perform, setPerform] = useState({
        song_id: "", izvodjac: ""
    })


    const GenreChange = e => {
        setGenre({ [e.target.name]: e.target.value });
    };

    const ArtistChange = e => {
        setArtist({ [e.target.name]: e.target.value });
    };

    const SongChange = e => {
        setSong(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const PerformChange = e => {
        setPerform(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleGenreChange = async e => {
        e.preventDefault();
        try {
            alert((await axios.post("/genres/", genre)).data);
        } catch (err) {
            alert(err.response.data);
        }
    };

    const handleArtistChange = async e => {
        e.preventDefault();
        try {
            alert((await axios.post("/artists/", artist)).data);
        } catch (err) {
            alert(err.response.data);
        }
    };

    const handleSongChange = async e => {
        e.preventDefault();
        try {
            alert((await axios.post("/songs/", song)).data);
        } catch (err) {
            alert(err.response.data);
        }
    };

    const handlePerformChange = async e => {
        e.preventDefault();
        try {
            alert((await axios.post("/performs/", perform)).data);
        } catch (err) {
            alert(err.response.data);
        }
    };

    const navigate=useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login');
        }
    });

    return (
        <>
            <Navbar />
            <div className={styles.adminContainer}>
                <h2>ADMIN STRANICA</h2>
                <div className={styles.adminWrapper}>
                    <div className={styles.addGenre}>
                        <form>
                            <label htmlFor="genre">Dodaj zanr(po imenu)</label>
                            <input type="text" name="naziv" id="genre" onChange={GenreChange} />

                            <button onClick={handleGenreChange}>Dodaj zanr</button>
                        </form>
                    </div>
                    <div className={styles.addArtist}>
                        <form>
                            <label htmlFor="artist">Dodaj izvodjaca(po imenu)</label>
                            <input type="text" name="ime" id="artist" onChange={ArtistChange} />

                            <button onClick={handleArtistChange}>Dodaj izvodjaca</button>
                        </form>
                    </div>
                    <div className={styles.addSong}>
                        <form>
                            <label htmlFor="name">Dodaj naziv pjesme</label>
                            <input type="text" name="naziv" id="name" onChange={SongChange} />

                            <label htmlFor="link">Dodaj URL pjesme</label>
                            <input type="text" name="url" id="link" onChange={SongChange} />

                            <label htmlFor="globalrate">Unesi opstu ocjenu pjesme</label>
                            <input type="text" name="ocjena" id="globalrate" onChange={SongChange} />

                            <label htmlFor="duration">Unesi trajanje pjesme</label>
                            <input type="text" name="trajanje" id="duration" onChange={SongChange} />

                            <label htmlFor="genreID">Unesi ID zanra</label>
                            <input type="text" name="zanr_id" id="genreID" onChange={SongChange} />

                            <button onClick={handleSongChange}>Dodaj pjesmu</button>
                        </form>
                    </div>

                    <div className={styles.addPerformer}>
                        <form>

                            <label htmlFor="pjesma">Unesi pjesmin ID</label>
                            <input type="text" name="song_id" id="pjesma" onChange={PerformChange} />

                            <label htmlFor="performer">Unesi ime izvodjaca</label>
                            <input type="text" name="izvodjac" id="performer" onChange={PerformChange} />

                            <button onClick={handlePerformChange}>Uvezi izvodjaca sa pjesmom</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Admin