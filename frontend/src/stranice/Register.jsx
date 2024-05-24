import React from 'react'
import styles from "./Register.module.css"
import { Link } from 'react-router-dom'
import Navbar from "../komponente/Navbar"

const Register = () => {
  return (
    <>
   

    <Navbar/>

    <div className={styles.form_flexcont}>

      <div className={styles.register_form}>
              <form action="">
                  <legend>Register:</legend>

                  <label for="registeruser" className={styles.labela}>Username</label>
                  <input type="text" name="registeruser" id="registeruser"/>

                  <label for="registermail" className={styles.labela} >Email</label>
                  <input type="email" name="registermail" id="registermail"/>
                  
                  <label for="registerpass" className={styles.labela}>Password</label>
                  <input type="password" name="registerpass" id="registerpass"/>
                  
                  <label for="pfp" className={styles.labela}>Upload profile image</label>
                  <input type="file" name="pfp" id="pfp"/>
                  
                  <button type="button">REGISTER</button>
              <p>Have an account?  <a href="../login">Login</a></p>
              </form> 

          </div>
    </div>

  </>
  )
}

export default Register