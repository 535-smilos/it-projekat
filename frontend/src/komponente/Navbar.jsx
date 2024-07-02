import React, { useContext } from 'react'
import styles from "./Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {

    const {currentUser, logout}=useContext(AuthContext);
    const navigate=useNavigate();

    const logoutHandle=()=>{
        logout();
        // navigate("../login");
    }

    return (
        <div className={styles.navbar}>
            <ul className={styles.navbarList} style={{ "height": "50px" }}>
                <div>
                    <li>
                        <Link to={"../frontpage"} className={styles.naslov}>SoundSphere</Link>
                    </li>

                    {currentUser.je_admin==0?
                    <>
                    <li>
                        <Link to={"../library"}>Library</Link>
                    </li>

                    <li>
                        <Link to={"../search"}>Search</Link>
                    </li>
                    </>
                    :
                    <li>
                        <Link to={"../admin"}>ADMIN</Link>
                    </li>
                    }
                </div>

                <>{currentUser? (
                    <><li className={styles.username}>
                    {currentUser.username}
                    </li>
                    <Link className={styles.logout} onClick={logoutHandle}to={"../login"}>LOGOUT</Link>
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