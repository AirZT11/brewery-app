import React from "react";

const SignUp = ({ handleChange, handleSubmit, state, errors }) => {
  // const [display, setDisplay] = useState('none')

  // get's keys of all errors and finds specific key
  let errorKey = (error) => {
    let keys = Object.keys(errors);
    let key = keys.find((e) => e === error);
    if (key) {
      let capKey = key.charAt(0).toUpperCase() + key.slice(1);
      return capKey;
    }
  };

  // displays specific error if it exists
  let errorMsg = (key) => {
    if (errors[key]) {
      return errors[key].map((error) => {
        return (
          <p className="errors">
            {errorKey(key)} {error}
          </p>
        );
      });
    }
  };

  return (
    <div className="signup-form">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg("name")}
        <input
          id="name"
          name="name"
          type="text"
          value={state.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <br />
        {errorMsg("email")}
        <input
          id="email"
          name="email"
          type="text"
          value={state.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        {errorMsg("username")}
        <input
          // id="username"
          name="username"
          type="text"
          value={state.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <br />
        {errorMsg("password")}
        <input
          // id="password"
          // name="password"
          type="password"
          value={state.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        {errorMsg("password_confirmation")}
        <input
          id="password-confirmation"
          name="passwordConfirmation"
          type="password"
          value={state.passwordConfirmation}
          placeholder="Password Confirmation"
          onChange={handleChange}
        />
        <br />

        <input className="submit-btn" type="submit" />
        <br />
      </form>
    </div>
  );
};

export default SignUp;
