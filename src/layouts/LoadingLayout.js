import React from "react";
import loadingImg from "../assets/images/loading.gif";

function LoadingLayout() {
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <img src={loadingImg} alt="" style={{ width: "2rem", height: "2rem" }} />
    </div>
  );
}

export default LoadingLayout;
