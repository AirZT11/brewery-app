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
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(event.target.value))
  }

  handleSubmit = event => {
    event.preventDefault();
    // const { history } = this.props;
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    // if(this.props.errors === null) this.props.clearErrors();

    console.log(formData)
    axios.post('http://localhost:3001/api/v1/users', formData)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      alert(error)
    })
    // fetch('http://localhost:3001/api/v1/users', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.errors) {
    //     console.log(data.errors)
    //   } else {
    //     console.log('created user!')
    //     // automatically login person after creating account
    //     // history.push('/login')
    //   }
    // })
  }

  render() {
    return (
      <div>
        < SignUp 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
        />
      </div>
    )
  }
}

export default SignUpContainer;