import React from "react";
import logo from "../../assets/images/logo.png";
import bgImage from "../../assets/images/bg-img.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";

const ValidateSchema = Yup.object({
  phoneno: Yup.string().required("Rquired"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must have at least 8 characters"),
  city: Yup.string().required("Rquired"),
  postalcode: Yup.string().required("Rquired"),
});

function Registration() {
  const onSubmit = () => {
    //
  };

  // Use Formik
  const formik = useFormik({
    initialValues: {
      phoneno: "",
      password: "",
      city: "",
      postalcode: "",
    },
    validateOnBlur: true,
    validationSchema: ValidateSchema,
    onSubmit,
    enableReinitialize: true,
  });
  return (
    <div
      className="container-fluid vh-100 regPage p-5 d-flex justify-content-center align-items-center flex-column"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="d-flex w-50 justify-content-center align-items-center flex-column bg-white p-4">
        <div className="images">
          <img src={logo} alt="" className="img-fluid" />
        </div>
        <div className="content d-flex flex-column align-items-center">
          <h3 className="m-3 mb-5">
            <strong>Create An Account</strong>
          </h3>
        </div>
        <div className="row w-100 p-2 d-flex align-items-center regForm">
          {/* FirstName */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3 ">
            <label className="form-label">First Name</label>
            <input className=" form-control" type="text" />
          </div>
          {/* LastName */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3 ">
            <label className="form-label">Last Name</label>
            <input className=" form-control" type="text" />
          </div>
          {/* Phone Number */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
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
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label className="form-label">City</label>
            <input
              className="form-control"
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-danger mt-2 mb-2">{formik.errors.city}</div>
            ) : null}
          </div>

          {/* Postal Code */}
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <label className="form-label">Postal Code</label>
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
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
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
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <label className="form-label">
              Confirm Password <small className="text-danger">*</small>
            </label>
            <input className="form-control" type="password" />
          </div>
          {/* Address */}
          <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
            <label className="form-label">Address</label>
            <input className=" form-control" type="text" />
          </div>
          <div className="w-100 text-center mb-3 mt-4">
            <button className="w-50 py-2 fw-bold btn btn-md regBtn">
              Create An Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
