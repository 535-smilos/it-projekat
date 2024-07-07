import React, { useState } from 'react'
import styles from "./Register.module.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Register = () => {

  const [inputs, setInputs]=useState({
    username:"", email:"", password:"", slika:"http://localhost:8800/public/slike/default.png"
  });

  const [err, setError]=useState();
  const navigate=useNavigate();

  const handleSubmit= async e=>{
    e.preventDefault();
    try {
      const res=await axios.post("/auth/register", inputs);
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      alert(err.response.data);
    }
  }

  const handleChange=(e)=>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  }


  return (
    <>
      <div className={styles.form_flexcont}>
        <div className={styles.register_form}>
          <form>
            <legend>Register:</legend>

            <label for="registeruser" className={styles.labela}>Username</label>
            <input type="text" name="username" id="registeruser" onChange={handleChange} />

            <label for="registermail" className={styles.labela} >Email</label>
            <input type="email" name="email" id="registermail" onChange={handleChange} />

            <label for="registerpass" className={styles.labela}>Password</label>
            <input type="password" name="password" id="registerpass" onChange={handleChange} />

            <button onClick={handleSubmit}>REGISTER</button>
            <p>Have an account?  <Link to={"../login"}>Login</Link></p>
          </form>

        </div>
      </div>

    </>
  )
}

export default Register