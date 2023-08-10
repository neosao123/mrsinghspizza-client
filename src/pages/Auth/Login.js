import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import bgImage from "../../assets/images/bg-img.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/_main/Header";
import Footer from "../../components/_main/Footer";
import GlobalContext from "../../context/GlobalContext";
import { customerLogin } from "../../services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../redux/authProvider/actionType";

// Validation Functions
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};
const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;

const ValidateSchema = Yup.object({
  phoneno: Yup.string()
    .required("Required")
    .matches(
      canadianPhoneNumberRegExp,
      "Invalid Canadian phone number format. Use (XXX) XXX-XXXX."
    ),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit")),
  // .matches(/[a-z]/, getCharacterValidationError("lowercase"))
  // .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
});

function Login() {
  const [loginObj, setLoginObj] = new useState({
    phoneno: "9988776646",
    password: "client@123",
  });
  const globalctx = useContext(GlobalContext);
  const [user, setUser] = globalctx.user;
  const [isAuthenticated, setIsAuthenticated] = globalctx.auth;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user") ?? null;

    if (user != null) {
      const userData = JSON.parse(user);
      if (userData) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [setIsAuthenticated, setUser, navigate]);

  const onSubmit = async (values) => {
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
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
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

  return (
    <>
      <Header />
      <div
        className="container-fluid d-flex justify-content-center align-items-center "
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container row w-100">
          <div className="col-lg-4 col-md-6 col-sm-12 py-5">
            <div className="content p-5 w-100 d-flex flex-column rounded bg-white">
              <h3 className="mb-4">Login</h3>
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
                  <div className="text-danger mt-2 mb-3">
                    {formik.errors.phoneno}
                  </div>
                ) : null}
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
                <div className="w-100 text-center mb-3 mt-4">
                  <button
                    type="submit"
                    className="w-100 py-2 fw-bold btn btn-md loginBtn"
                  >
                    Login
                  </button>
                </div>
                <div className="w-100 text-center">
                  <Link
                    to="/registration"
                    className="text-decoration-none create-acc-txt"
                  >
                    Don't have an account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
