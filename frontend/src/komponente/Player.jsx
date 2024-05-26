import React from 'react'
import styles from "./Player.module.css"
function Player() {
    return (
        <>
           <div className={styles.PlayerContainer}>
            <div className={styles.SongTitle}>
                <span className={styles.SongName}>Ime pjesme</span>
                <span className={styles.SongArtist}>Ime umjetnika</span>
            </div>

            <div className={styles.Controls}>
                <button>⏮</button>
                <button>▶</button>
                <button>⏭</button>
            </div>

            <div className={styles.ProgressBar}>
                <div className={styles.Current}>0:00</div>
                <input type='range'className={styles.Progress}/>
                <div className={styles.Duration}>4:20</div>
            </div>

            <div className={styles.VolumeBar}>
                🔊<input type="range" name="volume" id="volume" />
            </div>

           </div>
        </>
    )
}

export default Player