import React from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import "../css/Loading.css";

const Loading = ({ loading, type }) => {
  return (
    <div className="loading">
      {loading && (
        <ReactLoading
          type={type}
          color="black"
          // height={"20%"}
          // width={"20%"}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.breweryData.loading,
});

export default connect(mapStateToProps, {})(Loading);
