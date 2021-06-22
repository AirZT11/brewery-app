import React from 'react';

const SignUp = ({handleChange, handleSubmit, state}) => {

  return (
    <div>
      <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name </label><br />
          <input id='name' name='name' type='text' value={state.name} placeholder="name" onChange={handleChange} />
          <br /><br />
          <label htmlFor='email'>Email </label><br />
          <input id='email' name='email' type='text' value={state.email} placeholder="email" onChange={handleChange} />
          <br /><br />
          <label htmlFor='username'>Username </label><br />
          <input id='username' name='username' type='text' value={state.username} placeholder='username' onChange={handleChange}/>
          <br /><br />
          <label htmlFor='password'>Password </label><br />
          <input id='password' name='password' type='password' value={state.password} onChange={handleChange}/>
          <br /><br />
          <input type='submit' /><br />
        </form>
    </div>
  )
}

export default SignUp;
