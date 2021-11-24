import React from "react";
import useToggle from "../../hooks/useToggle";
import Popup from "reactjs-popup";
import { connect, useDispatch } from "react-redux";
import { setPromptView } from "../../actions/userActions";

import Login from "../Login";
import SignUpContainer from "./SignUpContainer";

const LoginSignUpContainer = ({ loginView, loginSignupPrompt }) => {
  const [modalView, toggleModalView] = useToggle();
  const dispatch = useDispatch();

  return (
    <Popup
      open={loginView}
      modal
      nested
      onClose={() => {
        dispatch({ type: "SET_LOGIN_VIEW", payload: false });
        setPromptView(false);
        toggleModalView(false);
      }}
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">{loginSignupPrompt}</div>

          {modalView ? <SignUpContainer /> : <Login />}

          <button className="toggle-modal" onClick={toggleModalView}>
            {modalView ? "Login" : "Create New Account"}
          </button>
        </div>
      )}
    </Popup>
  );
};

const mapStateToProps = (state) => ({
  loginView: state.userData.loginView,
  loginSignupPrompt: state.userData.loginSignupPrompt,
});

export default connect(mapStateToProps)(LoginSignUpContainer);
