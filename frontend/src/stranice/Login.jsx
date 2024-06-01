import React, { useState } from 'react'
import styles from "./Login.module.css"
import Navbar from '../komponente/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../LoginValidation'
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    username: '', password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  const navigate = useNavigate();
  //----------POBRINUTI SE ZA TOKENIZACIJU!!!!!!!!!
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (errors.username === "" && errors.password === "") {
      axios.post("http://localhost:8800/api/users/login", values)
        .then(res => {
          navigate("/frontpage");
        }).catch(err => alert(err.response.data));
    }
  };

  return (
    <body>
      <Navbar />
      <div className={styles.form_flexcont}>
        <div className={styles.login_form}>
          <form onSubmit={handleSubmit}>
            <legend>
              Login:
            </legend>
            <label for="loginmejl" className={styles.labela}>Username</label>
            <input type="text" name="username" id="loginmejl"
              onChange={handleInput} />
            {errors.username && <span>{errors.username}</span>}

            <label for="loginpass" className={styles.labela} >Password</label>
            <input type="password" name="password" id="loginpass"
              onChange={handleInput} />
            {errors.password && <span>{errors.password}</span>}
            <button type="submit">LOGIN</button>
            <p>Doesn't have an account?  <Link to={"../register"}>Register</Link></p>
          </form>
        </div>
      </div>
    </body>
  )
}

export default Login