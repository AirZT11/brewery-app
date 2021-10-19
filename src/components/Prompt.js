import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Prompt = ({ promptMessage, promptView }) => {
  return (
    <div>
      <Popup open={promptView} modal nested>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header">{promptMessage}</div>
          </div>
        )}
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  promptView: state.userData.promptView,
  promptMessage: state.userData.promptMessage,
});

export default connect(mapStateToProps)(Prompt);
