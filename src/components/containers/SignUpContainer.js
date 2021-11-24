import React, { Component } from "react";
import { connect } from "react-redux";
import SignUp from "../SignUp";
import axios from "axios";
import { setPromptView } from "../../actions/userActions";
import { API_URL } from "../../actions/types";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios
      .post(`${API_URL}/users`, {
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
      })
      .then((response) => {
        // console.log(response);
        this.props.signupSuccessful(true);
      })
      .then(() => {
        setTimeout(() => {
          return this.props.signupSuccessful(false);
        }, 2500);
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data,
        });
      });
  };

  render() {
    return (
      <div>
        <SignUp
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeWelcomeModal: () => dispatch({ type: "CLOSE_WELCOME_MODAL" }),
    signupSuccessful: (bool) =>
      dispatch(setPromptView("SIGNUP_SUCCESSFUL", bool)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpContainer);
