import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import { useSelector } from "react-redux";
import { deliverable, orderPlace } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import GlobalContext from "../context/GlobalContext";

const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;
const canadianPostalCode = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;

const ValidateSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  phoneno: Yup.string()
    .required("Required")
    .matches(
      canadianPhoneNumberRegExp,
      "Invalid Canadian phone number format. Use (XXX) XXX-XXXX."
    ),
  city: Yup.string().required("Required"),
  postalcode: Yup.string()
    .required("Required")
    .matches(canadianPostalCode, "Invalid Canadian Postal Code format"),
  address: Yup.string().required("Required"),
});

function AddressDetails() {
  const { user } = useSelector((state) => state);
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;

  const navigate = useNavigate();

  const paymentGateway = (values) => {
    let custFullName = values.firstname + " " + values?.lastname;
    console.log(process.env.REACT_APP_CALLBACKURL);
    const payload = {
      callbackUrl: process.env.REACT_APP_CALLBACKURL,
      cancelUrl: process.env.REACT_APP_CANCEL,
      customerCode: user?.data?.customerCode,
      customerName: custFullName,
      mobileNumber: values?.phoneno,
      address: values?.address,
      zipCode: values?.postalcode,
      products: cart?.product,
      subTotal: cart?.subtotal,
      discountAmount: cart?.discountAmount,
      taxPer: cart?.taxPer,
      taxAmount: cart?.taxAmount,
      deliveryCharges: cart?.deliveryCharges,
      extraDeliveryCharges: cart?.extraDeliveryCharges,
      grandTotal: cart?.grandtotal,
    };
    orderPlace(payload)
      .then((response) => {
        localStorage.setItem("OrderID", response.orderCode);
        localStorage.setItem("sessionId", response.sessionId);
        window.open(response?.paymentUrl, "_blank");
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          toast.error(error.response.data.message);
        }
      });
  };
  const onSubmit = async (values) => {
    const payload = {
      zipcode: values.postalcode,
    };
    await deliverable(payload)
      .then((res) => {
        if (res?.deliverable === true) {
          paymentGateway(values);
        } else {
          swal({
            title: "Postal Code is Undeliverable",
            text: `Postal code cannot deliverable. Please change the postal code and try again`,
            icon: "warning",
            buttons: ["Cancel", "Ok"],
            dangerMode: true,
          }).then(async (willOk) => {
            if (willOk) {
              navigate("/address-details");
            } else {
              navigate("/");
            }
          });
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
      firstname: user?.data?.firstName,
      lastname: user?.data?.lastName,
      phoneno: user?.data?.mobileNumber,
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
