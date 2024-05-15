import React from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <ul className={styles.navbarList} style={{ "height": "50px" }}>
                <div>
                    <li>
                        <Link to={"../frontpage"} className={styles.naslov}>SoundSphere</Link>
                    </li>

                    <li>
                        <Link to={"../library"}>Library</Link>
                    </li>

                    <li>
                        <Link to={"../search"}>Search</Link>
                    </li>

                </div>
                <li>
                    <Link to={"../login"}>Login</Link>
                </li>
                <li>
                    <Link to={"../register"} className={styles.register}>Register</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar