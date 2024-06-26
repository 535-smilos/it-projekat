import React, { useContext, useState } from 'react'
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
 
  
  const [inputs, setInputs]=useState({
    username:"", password:""
  });

  const [error, setError]=useState();

  const handleChange=e=>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  }

  const navigate=useNavigate();

  const {login}=useContext(AuthContext);

  const handleSubmit= async e=>{
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/frontpage");
    } catch (err) {
      setError(err.response.data);
      alert(err.response.data);
    }
  };

  return (
    <body>
      <div className={styles.form_flexcont}>
        <div className={styles.login_form}>
          <form>
            <legend>
              Login:
            </legend>
            <label for="loginmejl" className={styles.labela}>Username</label>
            <input type="text" name="username" id="loginmejl"
              onChange={handleChange} />
            {/* {errors.username && <span>{errors.username}</span>} */}

            <label for="loginpass" className={styles.labela} >Password</label>
            <input type="password" name="password" id="loginpass"
              onChange={handleChange} />
            {/* {errors.password && <span>{errors.password}</span>} */}
            <button onClick={handleSubmit}>LOGIN</button>
            <p>Doesn't have an account?  <Link to={"../register"}>Register</Link></p>
          </form>
        </div>
      </div>
    </body>
  )
}

export default Login