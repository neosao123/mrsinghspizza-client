import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import bgImage from "../../assets/images/bg-img.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

// Validation Functions
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const ValidateSchema = Yup.object({
  phoneno: Yup.string().required("Rquired"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit")),
  // .matches(/[a-z]/, getCharacterValidationError("lowercase"))
  // .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
});

function Login() {
  const [loginObj, setLoginObj] = new useState({
    phoneno: "",
    password: "",
  });

  const onSubmit = () => {
    //
  };

  // Use Formik
  const formik = useFormik({
    initialValues: loginObj,
    validateOnBlur: true,
    validationSchema: ValidateSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <div
        className="container-fluid vw-100 vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center bg-white loginBox">
          <div className="images">
            <img src={logo} alt="" className="img-fluid" />
          </div>
          <div className="content w-100 d-flex flex-column align-items-center">
            <h3 className="m-3 mb-4">Login</h3>
            <form className="w-100" onSubmit={formik.handleSubmit}>
              <label className="form-label mb-2">Phone Number</label>
              <input
                className="form-control  mb-3"
                type="tel"
                name="phoneno"
                value={formik.values.phoneno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneno && formik.errors.phoneno ? (
                <div className="text-danger mt-2 mb-2">
                  {formik.errors.phoneno}
                </div>
              ) : null}
              <label className="form-label mb-2">Password</label>
              <input
                className="form-control  mb-3"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger mt-2 mb-2">
                  {formik.errors.password}
                </div>
              ) : null}
              <div className="w-100 text-center mb-3 mt-4">
                <button className="w-100 py-2 fw-bold btn btn-md loginBtn">
                  Login
                </button>
              </div>
              <div className="w-100 text-center">
                <Link to="/registration" className="text-dark">
                  Don't have an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
