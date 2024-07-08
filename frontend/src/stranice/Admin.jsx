import React, { useEffect, useState } from "react";
import Navbar from "../komponente/Navbar";
import styles from "./Admin.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const UserCard = ({ user, onDelete, getUsers }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/users/${user.username}`);
      onDelete(user.username);
      getUsers();
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
  const [editSong, setEditSong] = useState(song);
  const handleSongEdit = async () => {
    try {
      const res = await axios.put(`/songs/${song.ID}`, editSong);
      onEdit(editSong);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div key={song.ID} className={styles.songInfo}>
      {!editing ? (
        <>
          {song.ID}
          <h5>{song.naziv}</h5>
          <h5>{song.ime_izvodjac}</h5>
          <button onClick={handleSongDelete}>DELETE SONG</button>
          <button onClick={() => setEditing(true)}>EDIT SONG</button>
        </>
      ) : (
        <div className={styles.EditDiv}>
          <input
            type="text"
            name="naziv"
            value={editSong.naziv}
            className={styles.NewSongInput}
            onChange={(e) =>
              setEditSong({ ...editSong, naziv: e.target.value })
            }
          />
          <input
            type="text"
            name="url"
            value={editSong.url}
            className={styles.NewSongInput}
            onChange={(e) => setEditSong({ ...editSong, url: e.target.value })}
          />
          <input
            type="text"
            name="ocjena"
            value={editSong.ocjena}
            className={styles.NewSongInput}
            onChange={(e) =>
              setEditSong({ ...editSong, ocjena: e.target.value })
            }
          />
          <input
            type="text"
            name="trajanje"
            value={editSong.trajanje}
            className={styles.NewSongInput}
            onChange={(e) =>
              setEditSong({ ...editSong, trajanje: e.target.value })
            }
          />
          <input
            type="text"
            name="url"
            value={editSong.naziv_zanra}
            className={styles.NewSongInput}
            onChange={(e) =>
              setEditSong({ ...editSong, naziv_zanra: e.target.value })
            }
          />
          <button onClick={handleSongEdit}>SAVE</button>
          <button onClick={() => setEditing(false)}>CANCEL</button>
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
  const [editGenre, setEditGenre] = useState(genre);

  const handleGenreEdit = async () => {
    try {
      const res = await axios.put(`/genres/${genre.naziv}`, editGenre);
      onEdit(editGenre);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div key={genre.ID} className={styles.genreInfo}>
      {!editing ? (
        <>
          <h5>{genre.naziv}</h5>
          <button onClick={handleGenreDelete}>DELETE</button>
          <button onClick={() => setEditing(true)}>EDIT</button>
        </>
      ) : (
        <div className={styles.EditDiv}>
          <input
            type="text"
            name="naziv"
            value={editGenre.naziv_novi}
            onChange={(e) =>
              setEditGenre({ ...editGenre, naziv_novi: e.target.value })
            }
          />
          <button onClick={handleGenreEdit}>SAVE</button>
          <button onClick={() => setEditing(false)}>CANCEL</button>
        </div>
      )}
    </div>
  );
};

const ArtistCard = ({ artist, onDelete, onEdit }) => {
  const handleArtistDelete = async () => {
    try {
      const res = await axios.delete(`/artists/${artist.ime}`);
      onDelete(artist.ime);
    } catch (err) {
      console.error(err);
    }
  };
  const [editing, setEditing] = useState(false);
  const [editArtist, setEditArtist] = useState(artist);

  const handleArtistEdit = async () => {
    try {
      const res = await axios.put(`/artists/${artist.ime}`, editArtist);
      onEdit(editArtist);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div key={artist.ime} className={styles.artistInfo}>
      {!editing ? (
        <>
          <h5>{artist.ime}</h5>
          <button onClick={handleArtistDelete}>DELETE</button>
          <button onClick={() => setEditing(true)}>EDIT</button>
        </>
      ) : (
        <div className={styles.EditDiv}>
          <input
            type="text"
            value={editArtist.novo_ime}
            onChange={(e) =>
              setEditArtist({ ...editArtist, novo_ime: e.target.value })
            }
          />
          <button onClick={handleArtistEdit}>SAVE</button>
          <button onClick={() => setEditing(false)}>CANCEL</button>
        </div>
      )}
    </div>
  );
};

const PerformCard = ({ perform, onDelete, onEdit }) => {
  const handlePerformDelete = async () => {
    try {
      const res = await axios.delete(
        `/performs/${perform.id_pjesma}/${perform.ime_izvodjac}`
      );
      onDelete(perform);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePerformEdit = async () => {
    try {
      const res = await axios.put(`/performs/`, {
        song_id: perform.id_pjesma,
        ime_izvodjac: perform.ime_izvodjac,
        novi_song_id: performer.id_pjesma,
        novi_izvodjac: performer.ime_izvodjac,
      });
      onEdit(performer);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const [performer, setPerformer] = useState(perform);
  const [editing, setEditing] = useState(false);
  return (
    <>
      <div key={perform.id_pjesma} className={styles.artistInfo}>
        {!editing ? (
          <>
            <h5>{perform.ime_izvodjac}</h5>
            <h5>{perform.id_pjesma}</h5>
            <button onClick={handlePerformDelete}>DELETE</button>
            <button onClick={() => setEditing(true)}>EDIT</button>
          </>
        ) : (
          <div className={styles.EditDiv}>
            <input
              type="text"
              value={performer.id_pjesma}
              placeholder="novi_id"
              onChange={(e) =>
                setPerformer({ ...performer, id_pjesma: e.target.value })
              }
            />
            <input
              type="text"
              value={performer.ime_izvodjac}
              placeholder="novo_ime"
              onChange={(e) =>
                setPerformer({ ...performer, ime_izvodjac: e.target.value })
              }
            />
            <button onClick={handlePerformEdit}>SAVE</button>
            <button onClick={() => setEditing(false)}>CANCEL</button>
          </div>
        )}
      </div>
    </>
  );
};

const AddForm = ({getArtists, getSongs, getPerforms, getGenres}) => {
  const [isEditing, setEditing] = useState(-1);

  const [genre, setGenre] = useState();
  const [artist, setArtist] = useState();
  const [song, setSong] = useState({
    naziv: "",
    url: "",
    ocjena: "",
    trajanje: "",
    naziv_zanra: "",
  });
  const [perform, setPerform] = useState({
    song_id: "",
    izvodjac: "",
  });

  const GenreChange = (e) => {
    setGenre({ [e.target.name]: e.target.value });
  };

  const ArtistChange = (e) => {
    setArtist({ [e.target.name]: e.target.value });
  };

  const SongChange = (e) => {
    setSong((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const PerformChange = (e) => {
    setPerform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenreChange = async (e) => {
    e.preventDefault();
    try {
      alert((await axios.post("/genres/", genre)).data);
      getGenres();
    } catch (err) {
      alert(err.response.data);
    }
  };

  const handleArtistChange = async (e) => {
    e.preventDefault();
    try {
      alert((await axios.post("/artists/", artist)).data);
      getArtists();
    } catch (err) {
      alert(err.response.data);
    }
  };

  const handleSongChange = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post("/songs/", song);
      getSongs();

    } catch (err) {
      alert("Greska pri dodavanju pjesme!");
      console.log(err.response.data);
    }
  };

  const handlePerformChange = async (e) => {
    e.preventDefault();
    try {
      alert((await axios.post("/performs/", perform)).data);
      getPerforms();
    } catch (err) {
      alert(err.response.data);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  return (
    <>
      <div className={styles.Buttons}>
        <button onClick={() => setEditing(0)}>Add Genre</button>
        <button onClick={() => setEditing(1)}>Add Artist</button>
        <button onClick={() => setEditing(2)}>Add Song</button>
        <button onClick={() => setEditing(3)}>Add Perform</button>
      </div>

      {isEditing === 0 && (
        <div className={styles.addGenre}>
          <form>
            <label htmlFor="genre">Dodaj zanr(po imenu)</label>
            <input type="text" name="naziv" id="genre" onChange={GenreChange} />

            <button onClick={handleGenreChange}>Dodaj zanr</button>
            <button onClick={() => setEditing(-1)}>Cancel</button>
          </form>
        </div>
      )}
      {isEditing === 1 && (
        <div className={styles.addArtist}>
          <form>
            <label htmlFor="artist">Dodaj izvodjaca(po imenu)</label>
            <input type="text" name="ime" id="artist" onChange={ArtistChange} />

            <button onClick={handleArtistChange}>Dodaj izvodjaca</button>
            <button onClick={() => setEditing(-1)}>Cancel</button>
          </form>
        </div>
      )}
      {isEditing === 2 && (
        <div className={styles.addSong}>
          <form>
            <label htmlFor="name">Dodaj naziv pjesme</label>
            <input type="text" name="naziv" id="name" onChange={SongChange} />

            <label htmlFor="link">Dodaj URL pjesme</label>
            <input type="text" name="url" id="link" onChange={SongChange} />

            <label htmlFor="globalrate">Unesi opstu ocjenu pjesme</label>
            <input
              type="text"
              name="ocjena"
              id="globalrate"
              onChange={SongChange}
            />

            <label htmlFor="duration">Unesi trajanje pjesme</label>
            <input
              type="text"
              name="trajanje"
              id="duration"
              onChange={SongChange}
            />

            <label htmlFor="genrename">Unesi naziv zanra</label>
            <input
              type="text"
              name="naziv_zanra"
              id="genrename"
              onChange={SongChange}
            />

            <button onClick={handleSongChange}>Dodaj pjesmu</button>
            <button onClick={() => setEditing(-1)}>Cancel</button>
          </form>
        </div>
      )}
      {isEditing === 3 && (
        <div className={styles.addPerformer}>
          <form>
            <label htmlFor="pjesma">Unesi pjesmin ID</label>
            <input
              type="text"
              name="song_id"
              id="pjesma"
              onChange={PerformChange}
            />

            <label htmlFor="performer">Unesi ime izvodjaca</label>
            <input
              type="text"
              name="izvodjac"
              id="performer"
              onChange={PerformChange}
            />

            <button onClick={handlePerformChange}>
              Uvezi izvodjaca sa pjesmom
            </button>
            <button onClick={() => setEditing(-1)}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [perform, setPerform] = useState([]);
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

  const getPerforms = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/performs");
      setPerform(res.data);
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

  const handleDeletePerform = (id) => {
    setPerform(perform.filter((perf) => perf.id_pjesma !== id));
  };

  const handleEditPerform = (editedPerf) => {
    setPerform(
      perform.map((perf) =>
        perf.id_pjesma === editedPerf.id_pjesma ? editedPerf : perf
      )
    );
  };

  const handleEditSong = (editedSong) => {
    setSongs(
      songs.map((song) => (song.ID === editedSong.ID ? editedSong : song))
    );
  };

  const handleEditGenre = (editedGenre) => {
    setGenres(
      genres.map((genre) =>
        genre.naziv === editedGenre.naziv ? editedGenre : genre
      )
    );
  };

  const handleEditArtist = (editedArtist) => {
    setArtists(
      artists.map((artist) =>
        artist.ime === editedArtist.ime ? editedArtist : artist
      )
    );
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
    getPerforms();
  }, []);

  const [display, setDisplay] = useState(-1);

  return (
    <>
      <Navbar />
      <div className={styles.adminContainer}>
        <h2>ADMIN STRANICA</h2>
        <div className={styles.adminWrapper}>
          <AddForm getArtists={getArtists} getGenres={getGenres} getSongs={getSongs} getPerforms={getPerforms} />
          <div className={styles.Buttons}>
            <button onClick={() => setDisplay(0)}>Show User Management</button>
            <button onClick={() => setDisplay(1)}>Show Song Management</button>
            <button onClick={() => setDisplay(2)}>Show Genre Management</button>
            <button onClick={() => setDisplay(3)}>
              Show Artist Management
            </button>
            <button onClick={() => setDisplay(4)}>
              Show Perform Management
            </button>
            {display!==-1 &&
              <button onClick={() => setDisplay(-1)}>CANCEL</button>
            }
          </div>

          {display === 0 && (
            <div className={styles.UserManagement}>
              
              {users.map((user) => (
                <UserCard getUsers={getUsers}
                  key={user.username}
                  user={user}
                  onDelete={handleDeleteUser}
                />
              ))}
            </div>
          )}
          {display === 1 && (
            <div className={styles.SongManagement}>

              {songs.map((song) => (
                <SongCard
                  key={song.ID}
                  song={song}
                  onEdit={handleEditSong}
                  onDelete={handleDeleteSong}
                />
              ))}
            </div>
          )}
          {display === 2 && (
            <div className={styles.GenreManagement}>

              {genres.map((genre) => (
                <GenreCard
                  key={genre.ID}
                  genre={genre}
                  onDelete={handleDeleteGenre}
                  onEdit={handleEditGenre}
                />
              ))}
            </div>
          )}
          {display === 3 && (
            <div className={styles.ArtistManagement}>

              {artists.map((artist) => (
                <ArtistCard
                  key={artist.ime}
                  artist={artist}
                  onDelete={handleDeleteArtist}
                  onEdit={handleEditArtist}
                />
              ))}
            </div>
          )}
          {display === 4 && (
            <div className={styles.PerformManagement}>

              {perform.map((perf) => (
                <PerformCard
                  key={perf.id_pjesma}
                  perform={perf}
                  onDelete={handleDeletePerform}
                  onEdit={handleEditPerform}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
