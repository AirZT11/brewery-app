import React from "react";
import useToggle from "../../hooks/useToggle";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { setPromptView } from "../../actions/userActions";

import Login from "../Login";
import SignUpContainer from "./SignUpContainer";

const LoginSignUpContainer = ({ loginView, setLoginView, popUpPrompt }) => {
  const [modalView, toggleModalView] = useToggle();

  return (
    <Popup
      open={loginView}
      modal
      nested
      onClose={() => {
        setLoginView(false);
        setPromptView(false);
        toggleModalView(false);
      }}
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">{popUpPrompt}</div>

          {modalView ? <SignUpContainer /> : <Login />}

          <button className="toggle-modal" onClick={toggleModalView}>
            {modalView ? "Login" : "Create New Account"}
          </button>
        </div>
      )}
    </Popup>
  );
};

export default LoginSignUpContainer;
