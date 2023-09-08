import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import GlobalContext from "../../../context/GlobalContext";
import { customerLogin } from "../../../services";
import { LOGIN_SUCCESS } from "../../../redux/authProvider/actionType";
import LoadingLayout from "../../../layouts/LoadingLayout";

// Validation Functions
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};
const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;

const ValidateSchema = Yup.object({
  phoneno: Yup.string()
    .required("Phone Number is Required")
    .matches(
      canadianPhoneNumberRegExp,
      "Invalid Canadian phone number format. Use (XXX) XXX-XXXX."
    ),
  password: Yup.string()
    .required("Password is Required")
    .min(6, "Password must have at least 6 characters")
    .max(20, "Password cannot be longer than 20 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
});

function Login({ setLoading }) {
  const [loginObj, setLoginObj] = new useState({
    phoneno: "9767040364",
    password: "Client@123",
  });
  const globalctx = useContext(GlobalContext);
  const [user, setUser] = globalctx.user;
  const [isAuthenticated, setIsAuthenticated] = globalctx.auth;
  const [url, setUrl] = globalctx.urlPath;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setLoading(true);
    let payload = {
      username: values.phoneno,
      password: values.password,
    };
    await customerLogin(payload)
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data, token: res.token });
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.token);
        const redirectTo = localStorage.getItem("redirectTo");
        navigate(redirectTo !== null ? redirectTo : "/");
        localStorage.removeItem("redirectTo");
        toast.success("Successfully Login");
        setLoading(true);
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
        setLoading(false);
      });
  };

  // Use Formik
  const formik = useFormik({
    initialValues: loginObj,
    validateOnBlur: true,
    validationSchema: ValidateSchema,
    onSubmit,
    enableReinitialize: true,
  });

  // Set Url Location
  useEffect(() => {
    setUrl(location?.pathname);
  }, [location]);
  return (
    <>
      <div className="row gx-3">
        <div className="content col-lg-10 col-md-12 col-sm-12 rounded px-lg-4 px-md-5 px-sm-1 py-4">
          <h3 className="mb-4">
            <strong>Login</strong>
          </h3>
          <form className="w-100" onSubmit={formik.handleSubmit}>
            <div className="row gx-3">
              <div className="col-lg-12 col-md-12 col-sm-12">
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
                  <div className="text-danger mt-2 mb-3">
                    {formik.errors.phoneno}
                  </div>
                ) : null}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className=" form-label mb-2">Password</label>
                <input
                  className="form-control  mb-3"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger mt-2 mb-3">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-100 text-center mb-3 mt-4">
              <button
                type="submit"
                className="w-100 py-2 fw-bold btn btn-md loginBtn"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
