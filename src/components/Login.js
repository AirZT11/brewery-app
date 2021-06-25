import React, { useState } from 'react';
import '../css/SignUpForm.css';
import { loginUser } from '../actions/userActions';
import { connect } from 'react-redux';

const Login = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const userInputData = {
      username: username,
      password: password
    }
    loginUser(userInputData)
    resetForm();
  }

  const resetForm = () => {
    setUsername('');
    setPassword('');
  }

  return (
    <div className='signup-form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username </label><br />
          <input id='username' name='username' type='text' value={username} placeholder='username' onChange={e => setUsername(e.target.value)} />
          <br /><br />

          <label htmlFor='password'>Password </label><br />
          <input id='password' name='password' type='password' value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
          <br /><br /><br />

          <input className='submit-btn' type='submit' /><br />
      </form>
    </div>
  )
}

export default connect(null, { loginUser })(Login)