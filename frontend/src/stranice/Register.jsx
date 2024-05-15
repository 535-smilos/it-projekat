import React from 'react'
import styles from "./Register.module.css"
import { Link } from 'react-router-dom'
import Navbar from "../komponente/Navbar"

const Register = () => {
  return (
    <body>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
    </style>

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
                  
                  <button type="button">REGISTER</button>
              <p>Have an account?  <a href="../login">Login</a></p>
              </form> 

          </div>
    </div>

  </body>
  )
}

export default Register