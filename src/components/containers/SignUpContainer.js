import React, { Component } from 'react';
import SignUp from '../SignUp';
import axios from "axios";

class SignUpContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: []
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state)
    axios.post('http://localhost:3001/api/v1/users', {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    })
    .then(response => {
      console.log(response)
      
    })
    .catch(error => {
      this.setState({
        errors: error.response.data
      })
    })
  }

  render() {
    return (
      <div>
        < SignUp 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
          errors={this.state.errors}
        />
      </div>
    )
  }
}

export default SignUpContainer;