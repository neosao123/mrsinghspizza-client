import React, { useEffect, useState } from "react";
import Header from "../../components/_main/Header";
import Footer from "../../components/_main/Footer";
import bgImage from "../../assets/images/bg-img.jpg";
import Registration from "../../components/_main/Auth/Registration";
import Login from "../../components/_main/Auth/Login";
import { useNavigate } from "react-router-dom";
import LoadingLayout from "../../layouts/LoadingLayout";

function LoginReg() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user") ?? null;
    if (user != null) {
      const userData = JSON.parse(user);
      if (userData) {
        navigate("/");
      } else {
        navigate("/login-registration");
      }
    } else {
      navigate("/login-registration");
    }
  }, [navigate]);
  return (
    <>
      {loading === true ? (
        <>
          <LoadingLayout />
        </>
      ) : (
        <>
          <Header />
          <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="container row gx-3">
              <div className="col-lg-6 col-md-12 col-sm-12 p-lg-4 p-md-4 p-sm-1">
                <Registration setLoading={setLoading} />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 p-lg-4 p-md-4 p-sm-1">
                <Login setLoading={setLoading} />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default LoginReg;
