import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import { useSelector } from "react-redux";
import { deliverable, getPostalcodeList, orderPlace } from "../services";
import { toast } from "react-toastify";
import { json, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import GlobalContext from "../context/GlobalContext";
import Select from "react-select";
import LoadingLayout from "../layouts/LoadingLayout";

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
    .min(20, "Address must be at least 20 characters")
    .max(50, "Address cannot be longer than 50 characters"),
});

function AddressDetails() {
  const user = useSelector((state) => state.user);
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;

  const [postalCodeOp, setPostalCodeOp] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    firstname: user?.data?.firstName,
    lastname: user?.data?.lastName,
    phoneno: user?.data?.mobileNumber,
    postalcode: "",
    city: "",
    address: "",
  });

  const navigate = useNavigate();

  let arr = [];

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

  const paymentGateway = (values) => {
    let custFullName = values.firstname + " " + values?.lastname;
    const payload = {
      customerCode: user?.data?.customerCode,
      deliveryType: "delivery",
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

    console.log("place order", payload);
    orderPlace(payload)
      .then((response) => {
        localStorage.setItem("placedOrder", JSON.stringify(response));
        navigate("/order/verify");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          if (error.response.data.isStoreError === true) {
            swal({
              title: "Store has been closed.",
              text: `Unfortunately, placing an order is not possible at the moment. You can not place order right now.`,
              icon: "warning",
              buttons: "Ok",
              dangerMode: true,
            }).then(async (willOk) => {
              if (willOk) {
                navigate("/address-details");
              }
            });
          } else {
            toast.error(error.response.data.message);
          }
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
              navigate("/checkout-page");
              setLoading(false);
            } else {
              navigate("/");
            }
          });
        }
      })
      .catch((err) => {
        setLoading(false);

        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  const handleUseAddress = () => {
    formik.setValues({
      ...formik.values,
      address: user?.data?.address,
      city: user?.data?.city,
      postalcode: user?.data?.zipcode,
    });
  };
  // Use Formik
  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    postalCodeList();
  }, [formik.values.postalcode]);

  return (
    <>
      {loading === true ? (
        <>
          <LoadingLayout />
        </>
      ) : (
        <div
          className="container-fluid d-flex justify-content-start align-items-start flex-column p-0 m-0"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="row checkout_pg text-start">
            <h1 className="titleColor mb-3">Delivery</h1>
            <p className="subTitleColor mb-4">Address Details For Checkout :</p>
          </div>
          <div className="container-fluid row w-100 p-0 m-0">
            <div className="col-lg-6 col-md-12 col-sm-12 p-0 m-0">
              <div className="row gx-3">
                <div className="content col-lg-12 col-md-12 col-sm-12 rounded">
                  <form className="w-100" onSubmit={formik.handleSubmit}>
                    <div className="row gx-3">
                      <div className="mb-4 py-1 p-0 m-0 row justify-content-center align-items-center">
                        <div className="col-lg-8 col-md-7 col-7 text-wrap">
                          <span className="fw-bolder text-secondary delivery_addressTxt">
                            {user?.data?.address}, {user?.data?.city},{" "}
                            {user?.data?.zipcode}
                          </span>
                        </div>
                        <div className="col-lg-4 col-md-5 col-5 text-end">
                          <button
                            className="btn btn-sm btn-secondary shadow-sm fw-bold"
                            type="button"
                            onClick={handleUseAddress}
                            style={{
                              fontSize: "0.82rem",
                            }}
                          >
                            Use This Address
                          </button>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <label className="form-label">
                          Address <small className="text-danger">*</small>
                        </label>
                        {console.log(formik.values.address)}
                        <input
                          className="form-control mb-3"
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
                            return (
                              <option
                                key={option.code}
                                value={option.zipcode}
                              />
                            );
                          })}
                        </datalist>

                        {formik.touched.postalcode &&
                        formik.errors.postalcode ? (
                          <div className="text-danger mt-2 mb-3">
                            {formik.errors.postalcode}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-3 d-flex justify-content-start align-items-center flex-row">
                        <strong className="mb-2 me-4">Payment Mode : </strong>
                        <span className="mb-2 fw-bolder text-danger">
                          Pay on Delivery
                        </span>
                      </div>
                      <div className="w-100 text-center mb-3 mt-4">
                        <button
                          className="w-100 py-2 fw-bold btn btn-md regBtn"
                          type="submit"
                        >
                          Confirm & Place Order
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
    </>
  );
}

export default AddressDetails;
