import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import { useSelector } from "react-redux";
import { deliverable, getPostalcodeList, orderPlace } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import GlobalContext from "../context/GlobalContext";
import Select from "react-select";
import LoadingLayout from "../layouts/LoadingLayout";

const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;
const canadianPostalCode = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;

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
  city: Yup.string()
    .required("City is required")
    .matches(
      /^[A-Za-z\ ]+$/,
      "City name should only contain alphabetic characters, spaces"
    )
    .min(3, "City must be at least 3 characters")
    .max(50, "City cannot be longer than 50 characters"),
  postalcode: Yup.string().required("Postal Code is required"),
  address: Yup.string()
    .required("Address is required")
    .min(3, "Address must be at least 3 characters")
    .max(50, "Address cannot be longer than 50 characters"),
});

function AddressDetails() {
  const { user } = useSelector((state) => state);
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;

  const [postalCodeOp, setPostalCodeOp] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const postalCodeList = async () => {
    await getPostalcodeList()
      .then((res) => {
        console.log(res);
        const options = res?.data?.map((item) => ({
          value: item.code,
          label: item.zipcode,
        }));
        setPostalCodeOp(options);
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

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
        window.open(response?.paymentUrl, "_self");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          toast.error(error.response.data.message);
        }
        setLoading(false);
      });
  };

  const onSubmit = async (values) => {
    const payload = {
      zipcode: values.postalcode,
    };
    setLoading(true);
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
        setLoading(false);
      });
  };
  // Use Formik
  const formik = useFormik({
    initialValues: {
      firstname: user?.data?.firstName,
      lastname: user?.data?.lastName,
      phoneno: user?.data?.mobileNumber,
      postalcode: "",
      city: "",
      address: "",
    },
    validateOnBlur: true,
    validationSchema: ValidateSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    postalCodeList();
  }, []);

  return (
    <>
      <Header />
      {loading === true ? (
        <>
          <LoadingLayout />
        </>
      ) : (
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="container row w-100">
            <div className="col-lg-6 col-md-12 col-sm-12 p-lg-4 p-md-4 p-sm-1">
              <div className="row gx-3">
                <div className="content col-lg-10 col-md-12 col-sm-12 rounded px-lg-4 px-md-5 px-sm-1 py-4 ">
                  <h3 className="mb-4">
                    <strong>Address Details For Checkout</strong>
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
                          <div className="text-danger mt-2 mb-3">
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
                          <div className="text-danger mt-2 mb-3">
                            {formik.errors.lastname}
                          </div>
                        ) : null}
                      </div>
                      {/* Phone Number */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <label className="form-label">
                          Phone Number <small className="text-danger">*</small>
                        </label>
                        <input
                          className=" form-control mb-3"
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
                        <div className="text-danger mt-1 mb-3">
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
                          <div className="text-danger mt-2 mb-3">
                            {formik.errors.city}
                          </div>
                        ) : null}
                      </div>
                      {/* Postal Code */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <label className="form-label">
                          Postal Code <small className="text-danger">*</small>
                        </label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          isClearable={true}
                          isSearchable={true}
                          name="postalcode"
                          value={selectedOption?.find(
                            (option) =>
                              option.label === formik.values.postalcode
                          )}
                          onChange={(selectedOption) => {
                            const selectedValue = selectedOption
                              ? selectedOption.label
                              : "";
                            formik.setFieldValue("postalcode", selectedValue);
                          }}
                          options={postalCodeOp}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.postalcode &&
                        formik.errors.postalcode ? (
                          <div className="text-danger mt-2 mb-3">
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
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default AddressDetails;
