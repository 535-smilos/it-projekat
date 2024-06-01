import React, { useState } from 'react'
import styles from "./Register.module.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../komponente/Navbar"
import Validation from '../RegisterValidation'
import axios from "axios";

const Register = () => {

  const [values, setValues] = useState({
    username: '', email: '', password: '', image: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if(errors.username==="" && errors.email==="" && errors.password===""){
      axios.post("http://localhost:8800/api/users/register", values)
      .then(res=>{
        navigate("/login");
      }).catch(err=>console.log(err));
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.form_flexcont}>
        <div className={styles.register_form}>
          <form onSubmit={handleSubmit}>
            <legend>Register:</legend>

            <label for="registeruser" className={styles.labela}>Username</label>
            <input type="text" name="username" id="registeruser" onChange={handleInput} />
            {errors.username && <span>{errors.username}</span>}

            <label for="registermail" className={styles.labela} >Email</label>
            <input type="email" name="email" id="registermail" onChange={handleInput} />
            {errors.email && <span>{errors.email}</span>}

            <label for="registerpass" className={styles.labela}>Password</label>
            <input type="password" name="password" id="registerpass" onChange={handleInput} />
            {errors.password && <span>{errors.password}</span>}

            <label for="pfp" className={styles.labela}>Upload profile image</label>
            <input type="file" name="image" id="pfp" onChange={handleInput} />
            {errors.image && <span>{errors.image}</span>}

            <button type="submit">REGISTER</button>
            <p>Have an account?  <Link to={"../login"}>Login</Link></p>
          </form>

        </div>
      </div>

    </>
  )
}

export default Register