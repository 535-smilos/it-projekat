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

const SongCard = ({ song, onDelete, onEdit }) => {
  const handleSongDelete = async () => {
    try {
      const res = await axios.delete(`/songs/${song.ID}`);
      onDelete(song.ID);
    } catch (err) {
      console.error(err);
    }
  };
  const [editing, setEditing] = useState(false);
  const [editSong, setEditSong]=useState(song);
  const handleSongEdit=async()=>{
    try{
      const res=await axios.put(`/songs/${song.ID}`, editSong);
      onEdit(editSong);
      setEditing(false);
    } catch(err){
      console.error(err);
    }
  };



  return (
    <div key={song.ID} className={styles.songInfo}>
      {!editing ? (
        <>
          <h5>{song.naziv}</h5>
          <h5>{song.ime_izvodjac}</h5>
          <button onClick={handleSongDelete}>DELETE SONG</button>
          <button onClick={()=>setEditing(true)}>EDIT SONG</button>
        </>
      ) : (
        <div className={styles.EditDiv}>
          <input type="text" name="naziv" value={editSong.naziv} className={styles.NewSongInput} onChange={(e)=>setEditSong({...editSong,naziv:e.target.value})}/>
          <input type="text" name="url" value={editSong.url} className={styles.NewSongInput} onChange={(e)=>setEditSong({...editSong,url:e.target.value})}/>
          <input type="text" name="ocjena" value={editSong.ocjena} className={styles.NewSongInput} onChange={(e)=>setEditSong({...editSong, ocjena:e.target.value})}/>
          <input type="text" name="trajanje" value={editSong.trajanje} className={styles.NewSongInput} onChange={(e)=>setEditSong({...editSong, trajanje:e.target.value})}/>
          <input type="text" name="url" value={editSong.naziv_zanra} className={styles.NewSongInput} onChange={(e)=>setEditSong({...editSong, naziv_zanra:e.target.value})}/>
          <button onClick={handleSongEdit}>SAVE</button>
          <button onClick={()=>setEditing(false)}>CANCEL</button>
        </div>
      )}
    </div>
  );
};

const GenreCard = ({ genre, onDelete, onEdit }) => {
  const handleGenreDelete = async () => {
    try {
      const res = await axios.delete(`/genres/${genre.naziv}`);
      onDelete(genre.naziv);
    } catch (err) {
      console.error(err);
    }
  };
  const [editing, setEditing] = useState(false);
  const [editGenre, setEditGenre]=useState(genre);

  const handleGenreEdit=async()=>{
    try{
      const res=await axios.put(`/genres/${genre.naziv}`, editGenre);
      onEdit(editGenre);
      setEditing(false);
    } catch(err){
      console.error(err);
    }
  }

  return (
    <div key={genre.ID} className={styles.genreInfo}>
      {!editing ? (
        <>
          <h5>{genre.naziv}</h5>
          <button onClick={handleGenreDelete}>DELETE</button>
          <button onClick={()=>setEditing(true)}>EDIT</button>
        </>
      ) : (
       <div className={styles.EditDiv}>
          <input type="text" name="naziv" value={editGenre.naziv_novi} onChange={(e)=>setEditGenre({...editGenre, naziv_novi:e.target.value})} />
          <button onClick={handleGenreEdit}>SAVE</button>
          <button onClick={()=>setEditing(false)}>CANCEL</button>
       </div>
      )}
    </div>
  );
};

const ArtistCard = ({ artist, onDelete , onEdit}) => {
  const handleArtistDelete = async () => {
    try {
      const res = await axios.delete(`/artists/${artist.ime}`);
      onDelete(artist.ime);
    } catch (err) {
      console.error(err);
    }
  };
  const [editing, setEditing] = useState(false);
  const [editArtist, setEditArtist]=useState(artist);

  const handleArtistEdit=async()=>{
    try{
      const res=await axios.put(`/artists/${artist.ime}`, editArtist);
      onEdit(editArtist);
      setEditing(false);
    } catch(err){
      console.error(err);
    }
  }

  return (
    <div key={artist.ime} className={styles.artistInfo}>
      {!editing ? (
        <>
          <h5>{artist.ime}</h5>
          <button onClick={handleArtistDelete}>DELETE</button>
          <button onClick={()=>setEditing(true)}>EDIT</button>
        </>
      ) : (
        <div className={styles.EditDiv}>
          <input type="text" value={editArtist.novo_ime} onChange={(e)=>setEditArtist({...editArtist, novo_ime:e.target.value})}/>
          <button onClick={handleArtistEdit}>SAVE</button>
          <button onClick={()=>setEditing(false)}>CANCEL</button>
        </div>
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

  const handleEditSong = (editedSong)=>{
    setSongs(songs.map(song=>song.ID===editedSong.ID?editedSong:song));
  }

  const handleEditGenre=(editedGenre)=>{
    setGenres(genres.map(genre=>genre.naziv===editedGenre.naziv?editedGenre:genre));
  }

  const handleEditArtist=(editedArtist)=>{
    setArtists(artists.map(artist=>artist.ime===editedArtist.ime?editedArtist:artist));
  }

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
              <SongCard key={song.ID} song={song} onEdit={handleEditSong} onDelete={handleDeleteSong} />
            ))}
          </div>
          <div className={styles.GenreManagement}>
          <h3>Manage Genres</h3>
            {genres.map((genre) => (
              <GenreCard
                key={genre.ID}
                genre={genre}
                onDelete={handleDeleteGenre}
                onEdit={handleEditGenre}
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
                        onEdit={handleEditArtist}
                    />
                ))}
                </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
