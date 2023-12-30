import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import {
  customerRegistration,
  deliverable,
  getPostalcodeList,
} from "../../../services";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GlobalContext from "../../../context/GlobalContext";
import { toast } from "react-toastify";
import { LOGIN_SUCCESS } from "../../../redux/authProvider/actionType";
import Select from "react-select";
import LoadingLayout from "../../../layouts/LoadingLayout";

// Validation Functions
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str}`;
};
const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;
const canadianPostalCode = Yup.string().test(
  "is-canadian-postal-code",
  "Invalid Canadian Postal Code",
  (value) => {
    if (!value) return true;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
    return postalCodeRegex.test(value);
  }
);

const ValidateSchema = Yup.object({
  firstname: Yup.string()
    .required("First name is required")
    .matches(
      /^[A-Za-z\ ]+$/,
      "First name should only contain alphabetic characters, spaces"
    )
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name cannot be longer than 50 characters"),
  lastname: Yup.string()
    .required("Last name is required")
    .matches(
      /^[A-Za-z\ ]+$/,
      "Last name should only contain alphabetic characters, spaces"
    )
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name cannot be longer than 50 characters"),
  phoneno: Yup.string()
    .required("Phone number is required")
    .matches(
      canadianPhoneNumberRegExp,
      "Invalid Canadian phone number format. Use (XXX) XXX-XXXX."
    ),
  email: Yup.string()
    .email("Invalid email address...")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email Address"
    )
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters")
    .max(20, "Password cannot be longer than 20 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  city: Yup.string()
    .required("City is required")
    .matches(
      /^[A-Za-z\ ]+$/,
      "City name should only contain alphabetic characters, spaces"
    )
    .min(3, "City must be at least 3 characters")
    .max(50, "City cannot be longer than 50 characters"),
  postalcode: canadianPostalCode.required("Postal Code is Required"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(100, "Address cannot be longer than 100 characters"),
  passwordconfirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password must be same"
    )
    .required("Confirm Password is required"),
});

function Registration({ setLoading }) {
  // Global Context
  const globalctx = useContext(GlobalContext);
  const [user, setUser] = globalctx.user;
  const [isAuthenticated, setIsAuthenticated] = globalctx.auth;
  const [regUser, setRegUser] = globalctx.regUser;

  const [postalCodeOp, setPostalCodeOp] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const postalCodeList = async () => {
    if (formik.values.postalcode.length >= 3) {
      await getPostalcodeList({
        search: formik.values.postalcode,
      })
        .then((res) => {
          setTimeout(() => {
            setPostalCodeOp(res.data);
          }, 200);
        })
        .catch((err) => {
          if (err.response.status === 400 || err.response.status === 500) {
            toast.error(err.response.data.message);
          }
        });
    } else {
      setPostalCodeOp([]);
    }
  };

  const onSubmit = async (values) => {
    await deliverable({ zipcode: values.postalcode })
      .then(async (res) => {
        if (res?.deliverable === true) {
          setLoading(true);
          let payload = {
            firstName: values.firstname,
            lastName: values.lastname,
            mobileNumber: values.phoneno,
            email: values.email,
            city: values.city,
            zipcode: values.postalcode,
            password: values.password,
            password_confirmation: values.passwordconfirmation,
            address: values.address,
            profilePhoto: "",
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
              // localStorage.setItem("prevUrl", location?.pathname);
              toast.success("Account registered successfully...");
              setLoading(false);
            })
            .catch((err) => {
              if (err.response.status === 400 || err.response.status === 500) {
                toast.error(err.response.data.message);
              }
              setLoading(false);
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
      email: "",
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
    postalCodeList();
  }, [formik.values.postalcode]);
  return (
    <>
      <div className="row gx-3">
        <div className="content col-lg-10 col-md-12 col-sm-12 rounded px-lg-4 px-md-5 px-sm-1 py-4 ">
          <h3 className="mb-4">
            <strong>Create An Account</strong>
          </h3>

          <form className="w-100" onSubmit={formik.handleSubmit}>
            <div className="row gx-3">
              {/* FirstName */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  First Name <small className="text-danger">*</small>
                </label>
                <input
                  className="form-control mb-3"
                  type="text"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="text-danger formErrMsg mt-2 mb-3">
                    {formik.errors.firstname}
                  </div>
                ) : null}
              </div>

              {/* LastName */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  Last Name <small className="text-danger">*</small>
                </label>
                <input
                  className="form-control mb-3"
                  type="text"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="text-danger formErrMsg mt-2 mb-3">
                    {formik.errors.lastname}
                  </div>
                ) : null}
              </div>
              {/* Phone Number */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  Phone Number <small className="text-danger">*</small>
                </label>
                <p className="text-secondary noteTxt mb-2">
                  Please use a valid phone number. ex. (XXX) XXX-XXXX
                </p>
                <input
                  className=" form-control mb-3"
                  type="tel"
                  name="phoneno"
                  value={formik.values.phoneno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phoneno && formik.errors.phoneno ? (
                  <div className="text-danger formErrMsg mt-2 mb-3">
                    {formik.errors.phoneno}
                  </div>
                ) : null}
              </div>

              {/* Email */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  Email <small className="text-danger">*</small>
                </label>
                <p className="text-secondary noteTxt mb-2">
                  Please use a valid email address
                </p>
                <input
                  className=" form-control mb-3"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger formErrMsg mt-2 mb-3">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* Address */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  Address <small className="text-danger">*</small>
                </label>
                <input
                  className=" form-control mb-3"
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.address && formik.errors.address ? (
                <div className="text-danger formErrMsg mt-2 mb-3">
                  {formik.errors.address}
                </div>
              ) : null}

              {/* City */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  City <small className="text-danger">*</small>
                </label>
                <input
                  className="form-control mb-3"
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-danger formErrMsg mt-2 mb-3">
                    {formik.errors.city}
                  </div>
                ) : null}
              </div>

              {/* Postal Code */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  Postal Code <small className="text-danger">*</small>
                </label>
                <p className="text-secondary noteTxt mb-2">Format: A1A1A1</p>
                <input
                  className="form-control mb-3"
                  type="text"
                  id="postalcode"
                  name="postalcode"
                  list="options"
                  placeholder="Select Option"
                  onChange={formik.handleChange}
                  value={formik.values.postalcode}
                  autoComplete="off"
                />
                <datalist id="options">
                  {postalCodeOp?.map((option) => {
                    return <option key={option.code} value={option.zipcode} />;
                  })}
                </datalist>
                {formik.touched.postalcode && formik.errors.postalcode ? (
                  <div className="text-danger formErrMsg mt-2 mb-3">
                    {formik.errors.postalcode}
                  </div>
                ) : null}
              </div>

              {/* Password */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  Password <small className="text-danger">*</small>
                </label>
                <p className="text-secondary noteTxt mb-2">
                  Password must 6 characters. Characters must contain atleast 1
                  digit, 1 uppercase, 1 lowercase
                </p>
                <input
                  className="form-control mb-3"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger formErrMsg mt-2 mb-3">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              {/* Confirm Password */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label className="form-label">
                  Confirm Password <small className="text-danger">*</small>
                </label>
                <input
                  className="form-control mb-3"
                  type="password"
                  name="passwordconfirmation"
                  value={formik.values.passwordconfirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.passwordconfirmation &&
                formik.errors.passwordconfirmation ? (
                  <div className="text-danger formErrMsg mt-2 mb-3">
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;
