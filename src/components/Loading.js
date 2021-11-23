import React from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

const Loading = ({ loading, type }) => {
  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading">
            <ReactLoading type={type} color="black" height={667} width={200} />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.breweryData.loading,
});

export default connect(mapStateToProps, {})(Loading);
