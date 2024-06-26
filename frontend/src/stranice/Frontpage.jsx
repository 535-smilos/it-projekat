import React, { useEffect, useState } from 'react'
import styles from "./Frontpage.module.css"
import Navbar from "../komponente/Navbar"
import axios from 'axios'
const Frontpage = () => {

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
                            <div key={n.id_novost}>
                                <h2>{n.naslov}</h2>
                                <p>{n.opis}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Frontpage