import React, { useContext, useEffect } from "react";
import bgImage from "../assets/images/bg-img.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import GlobalContext from "../context/GlobalContext";
import { useSelector } from "react-redux";
import { deliverable } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;

const ValidateSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  phoneno: Yup.string()
    .required("Required")
    .matches(
      canadianPhoneNumberRegExp,
      "Invalid Canadian phone number format. Use (XXX) XXX-XXXX."
    ),
  city: Yup.string().required("Rquired"),
  postalcode: Yup.string().required("Rquired"),
  address: Yup.string().required("Required"),
});

function AddressDetails() {
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const payload = {
      zipcode: values.postalcode,
    };
    console.log(payload);
    await deliverable(payload)
      .then((res) => {
        if (res?.deliverable === true) {
          navigate("/card-payment");
        } else {
          toast.error("Not Deliverable for this Postal Code...");
        }
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };
  // Use Formik
  const formik = useFormik({
    initialValues: {
      firstname: data?.firstName,
      lastname: data?.lastName,
      phoneno: data?.mobileNumber,
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
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="container row w-100 ">
          <div className="col-auto py-5 p-4 ">
            <div
              className="content d-flex flex-column align-items-center rounded bg-white p-5 w-100"
              style={{ boxShadow: "rgb(224 224 224 / 17%) 0px 0px 4px 2px" }}
            >
              <h3 className="m-2 mb-5">
                <strong>Address Details For Checkout</strong>
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

                <div className="w-100 text-center mb-3 mt-4">
                  <button
                    className="w-100 py-2 fw-bold btn btn-md regBtn"
                    type="submit"
                  >
                    Checkout
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

export default AddressDetails;
