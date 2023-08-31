import React, { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import "../../../assets/styles/MyAccount/viewProfile.css";

function ViewProfile() {
  const globalCtx = useContext(GlobalContext);
  const [user, setUser] = globalCtx.user;

  return (
    <div className="container viewProfile">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 py-1">
          <label className="form-label">First Name</label>
          <input
            className="form-control my-2"
            disabled
            value={user?.firstName}
          />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 py-1">
          <label className="form-label">Last Name</label>
          <input
            className="form-control my-2"
            disabled
            value={user?.lastName}
          />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 py-1">
          <label className="form-label">Mobile Number</label>
          <input
            className="form-control my-2"
            disabled
            value={user?.mobileNumber}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
