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
            const res = await axios.delete(`/news/${id_novost}`);
            onDelete(id_novost);
        } catch (err) {
            console.err(err);
        }
    }

    const handleEdit=async()=>{
        try {
            const res = await axios.put(`/news/${id_novost}`, { noviNaslov: editNaslov, noviOpis: editOpis });
            onEdit(id_novost, editNaslov, editOpis);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div key={id_novost}>
        {isEditing ? (
            <>
                <input 
                    type="text"
                    name='noviNaslov'
                    value={editNaslov} 
                    onChange={(e) => setEditNaslov(e.target.value)} 
                />
                <textarea 
                    value={editOpis}
                    name='noviOpis' 
                    onChange={(e) => setEditOpis(e.target.value)} 
                />
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
        ) : (
            <>
                <h2>{naslov}</h2>
                <p>{opis}</p>
                {currentUser.je_admin === 1 && (
                    <>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    </>
                )}
            </>
        )}
    </div>
    );
}

const Frontpage = () => {

    const { currentUser } = useContext(AuthContext);
    const [newsList, setNews] = useState([]);

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

    return (
        <div className={styles.FrontpageContainer}>
            <Navbar />
            <div className={styles.homeContainer}>
                <div style={{ "background-color": "#202020", "color": "whitesmoke" }} className={styles.welcome_site}>
                    <div>
                        <h1>Welcome to the <span style={{ "color": "green" }}>SoundSphere</span>!</h1>
                    </div>
                </div>
                <br /><br />
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
        </div>
    )
}

export default Frontpage