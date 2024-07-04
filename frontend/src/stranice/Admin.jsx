import React, { useEffect, useState } from 'react';
import Navbar from '../komponente/Navbar';
import styles from "./Admin.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router';
import {jwtDecode} from 'jwt-decode';

const UserCard = ({ username, email, onDelete }) => {
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/users/${username}`);
            onDelete(username);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.userInfo}>
            <h5>{username}</h5>
            <h5>{email}</h5>
            <button onClick={handleDelete}>DELETE USER</button>
        </div>
    );
};

const SongCard=({id,naziv, ime_izvodjac, onDelete})=>{

    const handleSongDelete=async()=>{
        try{
            const res=await axios.delete(`/songs/${id}`);
            onDelete(id);
        } catch(err){
            console.error(err);
        }
    }

    return (
        <div key={id} className={styles.songInfo}>
            <h5>{naziv}</h5>
            <h5>{ime_izvodjac}</h5>
            <button onClick={handleSongDelete}>DELETE SONG</button>
        </div>
    );

}

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8800/api/users");
            const nonAdminUsers = res.data.filter(user => user.je_admin === 0);
            setUsers(nonAdminUsers);
        } catch (err) {
            console.error(err);
        }
    };

    const getSongs = async () => {
        try {
            const res = await axios.get("http://localhost:8800/api/songs");
            setSongs(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteUser = (username) => {
        setUsers(users.filter(user => user.username !== username));
    };
   
    const handleDeleteSong = (id) => {
        setSongs(songs.filter(song => song.ID !== id));
    };

    const checkAdmin = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            if (decoded.je_admin !== 1) { // Assuming 1 means admin
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            navigate('/login');
        }
    };

    useEffect(() => {
        checkAdmin();
        getUsers();
        getSongs();
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles.adminContainer}>
                <h2>ADMIN STRANICA</h2>
                <div className={styles.adminWrapper}>
                    <h3>Manage Users</h3>
                    <div className={styles.UserManagement}>
                        {users.map(user => (
                            <UserCard
                                key={user.username}
                                username={user.username}
                                email={user.email}
                                onDelete={handleDeleteUser}
                            />
                        ))}
                    </div>
                    <h3>Manage Songs</h3>
                    <div className={styles.SongManagement}>
                        {songs.map(song => (
                            <SongCard
                                key={song.ID}
                                id={song.ID}
                                naziv={song.naziv}
                                ime_izvodjac={song.ime_izvodjac}
                                onDelete={handleDeleteSong}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
