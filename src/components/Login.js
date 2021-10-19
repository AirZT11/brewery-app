import React, { useState, useEffect } from "react";

import { loginUser } from "../actions/userActions";
import { connect } from "react-redux";

const Login = ({ loginUser, loginFailed, setLoginView }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const userInputData = {
      username: username,
      password: password,
    };
    const response = await loginUser(userInputData);
    // return response;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin()
      .then((response) => {
        setLoginView(false);
      })
      .catch((err) => console.log(err));
    resetForm();
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="signup-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          // id="username"
          name="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          // id="password"
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <input className="submit-btn" type="submit" />
        <br />
        <div
          className="error"
          style={{ display: loginFailed ? "block" : "none" }}
        >
          Username or Password is Incorrect
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginFailed: state.userData.loginFailed,
});

export default connect(mapStateToProps, { loginUser })(Login);
