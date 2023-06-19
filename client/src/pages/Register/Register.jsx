import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute } from "../../utils/APIRoutes";
import './register.css'

function Register() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    useEffect(() => {
      if (localStorage.getItem("chat-app-current-user")) {
        navigate("/");
      }
    }, []);
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const handleValidation = () => {
      const { password, confirmPassword, username, email } = values;
      if (password !== confirmPassword) {
        alert(
          "Password and confirm password should be same.",
        );
        return false;
      } else if (username.length < 3) {
        alert(
          "Username should be greater than 3 characters.",
        );
        return false;
      } else if (password.length < 8) {
        alert(
          "Password should be equal or greater than 8 characters.",
        );
        return false;
      } else if (email === "") {
        alert("Email is required.");
        return false;
      }
  
      return true;
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (handleValidation()) {
        const { email, username, password } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
  
        if (data.status === false) {
          alert(data.msg);
        }
        if (data.status === true) {
          localStorage.setItem(
            "chat-app-current-user",
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      }
    };
  


  return (
   <>
   <div className="form-container">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Register</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
   </div>
   </>
  )
}

export default Register