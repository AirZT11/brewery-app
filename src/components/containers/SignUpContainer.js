import React, { Component } from 'react';
import SignUp from '../SignUp';

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
    })
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