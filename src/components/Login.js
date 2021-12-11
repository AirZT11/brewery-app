import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser, setPromptView } from "../actions/userActions";

const Login = ({ loginUser, loginFailed, setPromptView }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const userInputData = {
      username: username,
      password: password,
    };
    await loginUser(userInputData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin()
      .then(() => {
        setPromptView("LOGGED_IN", true);
      })
      .then(() => {
        setTimeout(() => {
          return setPromptView("LOGGED_IN", false);
        }, 2500);
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

        <input className="main-btn-style" type="submit" />
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

export default connect(mapStateToProps, { loginUser, setPromptView })(Login);
