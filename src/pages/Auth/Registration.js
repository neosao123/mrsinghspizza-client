import React from "react";
import logo from "../../assets/images/logo.png";
import bgImage from "../../assets/images/bg-img.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from "../../components/_main/Header";
import Footer from "../../components/_main/Footer";

const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;
// Validation Functions
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const ValidateSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  phoneno: Yup.string()
    .required("Required")
    .matches(
      canadianPhoneNumberRegExp,
      "Invalid Canadian phone number format. Use (XXX) XXX-XXXX."
    ),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must have at least 8 characters"),
  city: Yup.string().required("Rquired"),
  postalcode: Yup.string().required("Rquired"),
  address: Yup.string().required("Required"),
  passwordconfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function Registration() {
  const onSubmit = () => {
    //
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
              <h3 className="m-2 mb-5">
                <strong>Create An Account</strong>
              </h3>
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
                  <div className="text-danger mb-2">
                    {formik.errors.address}
                  </div>
                ) : null}
                <div className="w-100 text-center mb-3 mt-4">
                  <button className="w-100 py-2 fw-bold btn btn-md regBtn">
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
