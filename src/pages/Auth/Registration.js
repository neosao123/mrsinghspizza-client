import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import bgImage from "../../assets/images/bg-img.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from "../../components/_main/Header";
import Footer from "../../components/_main/Footer";
import { toast } from "react-toastify";
import { customerRegistration, deliverable } from "../../services";
import GlobalContext from "../../context/GlobalContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../redux/authProvider/actionType";
import swal from "sweetalert";

const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;
const canadianPostalCode = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;

const ValidateSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  phoneno: Yup.string()
    .required("Phone number is required")
    .matches(
      canadianPhoneNumberRegExp,
      "Invalid Canadian phone number format. Use (XXX) XXX-XXXX."
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters"),
  city: Yup.string().required("City is required"),
  postalcode: Yup.string()
    .required("Postal Code is required")
    .matches(canadianPostalCode, "Invalid Canadian Postal Code format"),
  address: Yup.string().required("Address is required"),
  passwordconfirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords and Confirm Password must be same"
    )
    .required("Confirm Password is required"),
});

function Registration() {
  // Global Context
  const globalctx = useContext(GlobalContext);
  const [user, setUser] = globalctx.user;
  const [isAuthenticated, setIsAuthenticated] = globalctx.auth;
  const [regUser, setRegUser] = globalctx.regUser;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onSubmit = async (values) => {
    await deliverable({ zipcode: values.postalcode })
      .then(async (res) => {
        if (res?.deliverable === true) {
          let payload = {
            firstName: values.firstname,
            lastName: values.lastname,
            mobileNumber: values.phoneno,
            city: values.city,
            zipcode: values.postalcode,
            password: values.password,
            address: values.address,
          };
          await customerRegistration(payload)
            .then((res) => {
              setIsAuthenticated(true);
              setUser(res.data);
              dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
                token: res.token,
              });
              localStorage.setItem("user", JSON.stringify(res.data));
              localStorage.setItem("token", res.token);
              localStorage.setItem("registeredUser", JSON.stringify(payload));
              setRegUser(payload);
              const redirectTo = localStorage.getItem("redirectTo");
              navigate(redirectTo !== null ? redirectTo : "/");
              localStorage.removeItem("redirectTo");
              localStorage.setItem("prevUrl", location?.pathname);
              toast.success("Account registered successfully...");
            })
            .catch((err) => {
              if (err.response.status === 400 || err.response.status === 500) {
                toast.error(err.response.data.message);
              }
            });
        } else {
          swal({
            title: "Postal Code is Undeliverable",
            text: `Postal code cannot deliverable. Please change the postal code and try again`,
            icon: "warning",
            buttons: {
              ok: "Ok",
            },
            dangerMode: true,
          }).then(async (willOk) => {
            if (willOk) {
            }
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          toast.error(error.response.data.message);
        }
      });
  };
  // Use Formik
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneno: "",
      password: "",
      passwordconfirmation: "",
      city: "",
      postalcode: "",
      address: "",
    },
    validateOnBlur: true,
    validationSchema: ValidateSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user") ?? null;
    if (user != null) {
      const userData = JSON.parse(user);
      if (userData) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container row w-100">
          <div className="col-auto py-5 p-4">
            <div className="content d-flex flex-column align-items-center rounded bg-white p-5 w-100">
              <h3 className="m-2 mb-3">
                <strong>Create An Account</strong>
              </h3>
              <div
                className="w-100 text-center mb-5"
                style={{ fontSize: ".95rem" }}
              >
                <Link
                  to="/login"
                  className="text-decoration-none create-acc-txt"
                >
                  Already you have an account
                </Link>
              </div>

              <form onSubmit={formik.handleSubmit}>
                {/* FirstName */}
                <div className="d-flex flex-row flex-wrap align-items-center mb-3">
                  <label className="form-label">
                    First Name <small className="text-danger">*</small>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div className="text-danger mt-2  mb-2">
                      {formik.errors.firstname}
                    </div>
                  ) : null}
                </div>

                {/* LastName */}
                <div className="d-flex flex-row flex-wrap align-items-center mb-3 ">
                  <label className="form-label">
                    Last Name <small className="text-danger">*</small>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="text-danger mt-2 mb-2">
                      {formik.errors.lastname}
                    </div>
                  ) : null}
                </div>
                {/* Phone Number */}
                <div className="d-flex flex-row flex-wrap align-items-center mb-3">
                  <label className="form-label">
                    Phone Number <small className="text-danger">*</small>
                  </label>
                  <input
                    className=" form-control"
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
                </div>

                {/* Address */}
                <div className="d-flex flex-row flex-wrap align-items-center mb-3">
                  <label className="form-label">
                    Address <small className="text-danger">*</small>
                  </label>
                  <input
                    className=" form-control"
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-danger mt-2 mb-3">
                    {formik.errors.address}
                  </div>
                ) : null}

                {/* City */}
                <div className="d-flex flex-row flex-wrap align-items-center mb-3">
                  <label className="form-label">
                    City <small className="text-danger">*</small>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div className="text-danger mt-2 mb-2">
                      {formik.errors.city}
                    </div>
                  ) : null}
                </div>

                {/* Postal Code */}
                <div className="d-flex flex-row flex-wrap align-items-center mb-3">
                  <label className="form-label">
                    Postal Code <small className="text-danger">*</small>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="postalcode"
                    value={formik.values.postalcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.postalcode && formik.errors.postalcode ? (
                    <div className="text-danger mt-2 mb-2">
                      {formik.errors.postalcode}
                    </div>
                  ) : null}
                </div>

                {/* Password */}
                <div className="d-flex flex-row flex-wrap align-items-center mb-3">
                  <label className="form-label">
                    Password <small className="text-danger">*</small>
                  </label>
                  <input
                    className="form-control"
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
                </div>

                {/* Confirm Password */}
                <div className="d-flex flex-row flex-wrap align-items-center mb-3">
                  <label className="form-label">
                    Confirm Password <small className="text-danger">*</small>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="passwordconfirmation"
                    value={formik.values.passwordconfirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.passwordconfirmation &&
                  formik.errors.passwordconfirmation ? (
                    <div className="text-danger mt-2 mb-2">
                      {formik.errors.passwordconfirmation}
                    </div>
                  ) : null}
                </div>

                <div className="w-100 text-center mb-3 mt-4">
                  <button
                    className="w-100 py-2 fw-bold btn btn-md regBtn"
                    type="submit"
                  >
                    Create An Account
                  </button>
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

export default Registration;
