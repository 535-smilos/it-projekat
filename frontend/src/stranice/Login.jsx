import React from 'react'
import styles from "./Login.module.css"
import Navbar from '../komponente/Navbar'

const Login = () => {
  return (
    <body>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
      </style>

      <Navbar/>

      <div className={styles.form_flexcont}>
        <div className={styles.login_form}>
          <form>
            <legend>
              Login:
            </legend>
            <label for="loginmejl" className={styles.labela}>Username</label>
            <input type="email" name="loginmejl" id="loginmejl"/>

              <label for="loginpass" className={styles.labela} >Password</label>
              <input type="password" name="loginpass" id="loginpass"/>

                <button type="button">LOGIN</button>

                <p>Doesn't have an account?  <a href="../register">Register</a></p>

              </form>
            </div>
        </div>

    </body>
  )
}

export default Login