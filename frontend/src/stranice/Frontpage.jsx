import React from 'react'
import styles from "./Frontpage.module.css"
import Navbar from "../komponente/Navbar"
import Player from '../komponente/Player'
const Frontpage = () => {
    return (
        <>
            <Navbar />

            <div className={styles.homeContainer}>
                <div style={{ "background-color": "#202020", "color": "whitesmoke" }} className={styles.welcome_site}>

                    <div>
                        <h1>Welcome to the <span style={{"color":"green"}}>SoundSphere</span>!</h1>
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
            <Player/>
        </>
    )
}

export default Frontpage