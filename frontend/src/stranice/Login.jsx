import React, { useState } from 'react'
import styles from "./Login.module.css"
import Navbar from '../komponente/Navbar'
import { Link } from 'react-router-dom'
import Validation from '../LoginValidation'

const Login = () => {

  const [values, setValues] = useState({
    email: '', password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if(errors.email==="" && errors.password===""){
      axios.post("http://localhost:8800/api/users", values)
      .then(res=>{
        navigate("/login");
      }).catch(err=>console.log(err));
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
            <input type="email" name="email" id="loginmejl"
              onChange={handleInput} />
            {errors.email && <span>{errors.email}</span>}
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