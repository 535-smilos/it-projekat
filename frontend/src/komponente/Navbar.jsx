import React, { useContext } from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {

    const {currentUser, logout}=useContext(AuthContext);


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

                <>{currentUser? (
                    <>
                <li>{currentUser.username}</li>
                    {currentUser?<span onClick={logout}>Logout</span>:<Link to={"../login"}>Login</Link>}
                </>
                ) : (<><li>
                    <Link to={"../login"}>Login</Link>
                </li>
                <li>
                    <Link to={"../register"} className={styles.register}>Register</Link>
                </li></>)}
                </>
                
               
            </ul>
        </div>
    )
}

export default Navbar