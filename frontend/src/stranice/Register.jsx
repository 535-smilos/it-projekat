import React, { useState } from 'react'
import styles from "./Register.module.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../komponente/Navbar"
import axios from "axios";

const Register = () => {

  const [inputs, setInputs]=useState({
    username:"", email:"", password:"", slika:""
  });

  const [err, setError]=useState();

  const handleChange=e=>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  }

  const navigate=useNavigate();

  const handleSubmit= async e=>{
    e.preventDefault();
    try {
      const res=await axios.post("/users/register", inputs);
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  }
  console.log(inputs);

  return (
    <>
      <div className={styles.form_flexcont}>
        <div className={styles.register_form}>
          <form>
            <legend>Register:</legend>

            <label for="registeruser" className={styles.labela}>Username</label>
            <input type="text" name="username" id="registeruser" onChange={handleChange} />
            {/* {errors.username && <span>{errors.username}</span>} */}

            <label for="registermail" className={styles.labela} >Email</label>
            <input type="email" name="email" id="registermail" onChange={handleChange} />
            {/* {errors.email && <span>{errors.email}</span>} */}

            <label for="registerpass" className={styles.labela}>Password</label>
            <input type="password" name="password" id="registerpass" onChange={handleChange} />
            {/* {errors.password && <span>{errors.password}</span>} */}

            <label for="pfp" className={styles.labela}>Upload profile image</label>
            <input type="file" name="slika" id="pfp" onChange={handleChange} />
            {/* {errors.image && <span>{errors.image}</span>} */}
            {err && <p>{err}</p>}
            <button onClick={handleSubmit}>REGISTER</button>
            <p>Have an account?  <Link to={"../login"}>Login</Link></p>
          </form>

        </div>
      </div>

    </>
  )
}

export default Register