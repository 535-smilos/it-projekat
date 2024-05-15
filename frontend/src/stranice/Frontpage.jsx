import React from 'react'
import styles from "./Frontpage.module.css"
import Navbar from "../komponente/Navbar"
const Frontpage = () => {
    return (
        <body>

            <style>
                @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
            </style>

            <Navbar />

            <div className={styles.homeContainer}>
                <div style={{ "background-color": "#202020", "color": "whitesmoke" }} className={styles.welcome_site}>

                    <div>
                        <h1>Welcome to the ojd!</h1>
                    </div>

                    <div>
                        <p>OVo je moj pokusaj sajta</p>
                    </div>
                    <div>
                        <p> da kreiram spotify raspali</p>
                    </div>
                    <div>
                        <p>ne znam nista da napravim pa da vidimo mogu li mu sta</p>
                    </div>
                    <div>
                        <p>brodski podovi morski plodovi</p>
                    </div>

                    <div>
                        <p>dodati dolje footer za plejer!</p>
                    </div>
                </div>

                <br /><br />

                <div className={styles.kartice} style={{ "background-color": "#202020" }}>
                    <div>
                        <h2>Prva kartica</h2>
                        <p>odje ce da ide da biras umjetnika nekog</p>
                        <button>Pusti random lika</button>
                    </div>
                    <div>
                        <h2>Druga kartica</h2>
                        <p>odje ce da ide da biras neku pjesmu random</p>
                        <button>Pusti random pjesmu</button>
                    </div>
                    <div>
                        <h2>Treca kartica</h2>
                        <p>odje ce da ide da biras neki zanr random</p>
                        <button>Pusti random zanr</button>
                    </div>
                </div>

            </div>
        </body>
    )
}

export default Frontpage