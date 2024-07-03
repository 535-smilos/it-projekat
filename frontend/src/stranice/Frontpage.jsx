import React, { useEffect, useState, useContext } from 'react'
import styles from "./Frontpage.module.css"
import Navbar from "../komponente/Navbar"
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const NewsCard = ({ id_novost, naslov, opis, onDelete, onEdit, currentUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editNaslov, setEditNaslov] = useState(naslov);
    const [editOpis, setEditOpis] = useState(opis);

    const handleDelete = async () => {
        try {
            await axios.delete(`/news/${id_novost}`);
            onDelete(id_novost);
        } catch (err) {
            console.error(err);
        }
    }

    const handleEdit = async () => {
        try {
            await axios.put(`/news/${id_novost}`, { noviNaslov: editNaslov, noviOpis: editOpis });
            onEdit(id_novost, editNaslov, editOpis);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div key={id_novost}>
            {isEditing ? (
                <div className={styles.EditDiv}>
                    <input
                        className={styles.newNaslov} type="text" name='noviNaslov' value={editNaslov} onChange={(e) => setEditNaslov(e.target.value)}
                    />
                    <textarea
                        className={styles.newOpis} value={editOpis} name='noviOpis' onChange={(e) => setEditOpis(e.target.value)}
                    />
                    <div className={styles.Buttons}>
                        <button className={styles.editBtn} onClick={handleEdit}>Save</button>
                        <button className={styles.deleteBtn} onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <h2>{naslov}</h2>
                    <p>{opis}</p>
                    {currentUser.je_admin === 1 && (
                        <div className={styles.Buttons}>
                            <button onClick={handleDelete} className={styles.deleteBtn}>Delete</button>
                            <button onClick={() => setIsEditing(true)} className={styles.editBtn}>Edit</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

const Frontpage = () => {
    const { currentUser } = useContext(AuthContext);
    const [newsList, setNews] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newNaslov, setNewNaslov] = useState('');
    const [newOpis, setNewOpis] = useState('');

    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await axios.get('/news/');
                setNews(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        getNews();
    }, []);

    const handleNewsDelete = (id_novost) => {
        setNews(newsList.filter(news => news.id_novost !== id_novost));
    }

    const handleNewsEdit = (id_novost, newNaslov, newOpis) => {
        setNews(newsList.map(news =>
            news.id_novost === id_novost ? { ...news, naslov: newNaslov, opis: newOpis } : news
        ));
    };

    const handleNewsAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/news/', { noviNaslov: newNaslov, noviOpis: newOpis });
            setNews([{naslov:newNaslov, opis:newOpis},...newsList]);
            setIsEditing(false);
            setNewNaslov('');
            setNewOpis('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.FrontpageContainer}>
            <Navbar />
            <div className={styles.homeContainer}>
                <div style={{ "background-color": "#202020", "color": "whitesmoke" }} className={styles.welcome_site}>
                    <h1>Welcome to the <span style={{ "color": "green" }}>SoundSphere</span>!</h1>
                </div>
            </div>
            <h1 className={styles.novostheading}>Novosti zvucne sfere</h1>
            {currentUser.je_admin === 1 && (
                <div className={styles.AddNovost}>
                    {!isEditing && (
                        <button className={styles.addBtn} onClick={() => setIsEditing(true)}>Dodaj Novost</button>
                    )}
                    {isEditing && (
                        <div className={styles.AddForm}>
                            <input
                                className={styles.newNaslov}
                                type="text"
                                name="noviNaslov"
                                id="noviNaslov"
                                value={newNaslov}
                                onChange={(e) => setNewNaslov(e.target.value)}
                            />
                            <textarea
                                className={styles.newOpis}
                                name="noviOpis"
                                id="noviOpis"
                                value={newOpis}
                                onChange={(e) => setNewOpis(e.target.value)}
                            ></textarea>
                            <div className={styles.Buttons}>
                                <button className={styles.editBtn} onClick={handleNewsAdd}>Upload</button>
                                <button onClick={() => setIsEditing(false)} className={styles.deleteBtn}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <div className={styles.NewsContainer}>
                <div className={styles.kartice} style={{ "background-color": "#202020" }}>
                    {newsList?.map((n) => (
                        <NewsCard
                            key={n.id_novost}
                            id_novost={n.id_novost}
                            naslov={n.naslov}
                            opis={n.opis}
                            onDelete={handleNewsDelete}
                            currentUser={currentUser}
                            onEdit={handleNewsEdit}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Frontpage
