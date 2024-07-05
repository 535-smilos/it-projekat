import React, { useEffect, useState } from "react";
import Navbar from "../komponente/Navbar";
import styles from "./Admin.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const UserCard = ({ user, onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/users/${user.username}`);
      onDelete(user.username);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.userInfo}>
      <h5>{user.username}</h5>
      <h5>{user.email}</h5>
      <button onClick={handleDelete}>DELETE USER</button>
    </div>
  );
};

const SongCard = ({ song, onDelete }) => {
  const handleSongDelete = async () => {
    try {
      const res = await axios.delete(`/songs/${song.ID}`);
      onDelete(song.ID);
    } catch (err) {
      console.error(err);
    }
  };
  const [editing, setEditing] = useState(false);

  return (
    <div key={song.ID} className={styles.songInfo}>
      {!editing ? (
        <>
          <h5>{song.naziv}</h5>
          <h5>{song.ime_izvodjac}</h5>
          <button onClick={handleSongDelete}>DELETE SONG</button>
          <button>EDIT SONG</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const GenreCard = ({ genre, onDelete }) => {
  const handleGenreDelete = async () => {
    try {
      const res = await axios.delete(`/genres/${genre.naziv}`);
      onDelete(genre.naziv);
    } catch (err) {
      console.error(err);
    }
  };
  const [editing, setEditing] = useState(false);

  return (
    <div key={genre.ID} className={styles.genreInfo}>
      {!editing ? (
        <>
          <h5>{genre.naziv}</h5>
          <button onClick={handleGenreDelete}>DELETE GENRE</button>
          <button>EDIT GENRE</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const ArtistCard = ({ artist, onDelete }) => {
  const handleArtistDelete = async () => {
    try {
      const res = await axios.delete(`/artists/${artist.ime}`);
      onDelete(artist.ime);
    } catch (err) {
      console.error(err);
    }
  };
  const [editing, setEditing] = useState(false);

  return (
    <div key={artist.ime} className={styles.artistInfo}>
      {!editing ? (
        <>
          <h5>{artist.ime}</h5>
          <button onClick={handleArtistDelete}>DELETE ARTIST</button>
          <button>EDIT ARTIST</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/users");
      const nonAdminUsers = res.data.filter((user) => user.je_admin === 0);
      setUsers(nonAdminUsers);
    } catch (err) {
      console.error(err);
    }
  };

  const getSongs = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/songs");
      setSongs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getGenres = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/genres");
      setGenres(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getArtists = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/artists");
      setArtists(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  const handleDeleteSong = (id) => {
    setSongs(songs.filter((song) => song.ID !== id));
  };

  const handleDeleteGenre = (naziv) => {
    setGenres(genres.filter((genre) => genre.naziv !== naziv));
  };

  const handleDeleteArtist = (ime) => {
    setArtists(artists.filter((artist) => artist.ime !== ime));
    };

  const checkAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.je_admin !== 1) {
        // Assuming 1 means admin
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAdmin();
    getUsers();
    getSongs();
    getGenres();
    getArtists();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.adminContainer}>
        <h2>ADMIN STRANICA</h2>
        <div className={styles.adminWrapper}>
          <div className={styles.UserManagement}>
          <h3>Manage Users</h3>
            {users.map((user) => (
              <UserCard
                key={user.username}
                user={user}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
          <div className={styles.SongManagement}>
          <h3>Manage Songs</h3>
            {songs.map((song) => (
              <SongCard key={song.ID} song={song} onDelete={handleDeleteSong} />
            ))}
          </div>
          <div className={styles.GenreManagement}>
          <h3>Manage Genres</h3>
            {genres.map((genre) => (
              <GenreCard
                key={genre.ID}
                genre={genre}
                onDelete={handleDeleteGenre}
              />
            ))}
          </div>
            <div className={styles.ArtistManagement}>
            <h3>Manage Artists</h3>
                {artists.map((artist) => (
                    <ArtistCard
                        key={artist.ime}
                        artist={artist}
                        onDelete={handleDeleteArtist}
                    />
                ))}
                </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
