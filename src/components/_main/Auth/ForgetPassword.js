import React, { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingLayout from "../../../layouts/LoadingLayout";
import { customerResetPassword } from "../../../services";
import { toast } from "react-toastify";

const ValidateSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      email: values.email,
    };
    await customerResetPassword(payload)
      .then((res) => {
        toast.success(
          "Successfully Send Password Reset Link To Your Email Address"
        );
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
      email: "",
    },
    validateOnBlur: true,
    validationSchema: ValidateSchema,
    onSubmit,
    enableReinitialize: true,
  });
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
          <div className="container row gx-3">
            <div className="col-lg-6 col-md-12 col-sm-12 p-lg-4 p-md-4 p-sm-1">
              <div className="row gx-3">
                <div className="content col-lg-10 col-md-12 col-sm-12 rounded px-lg-4 px-md-5 px-sm-1 py-4">
                  <h3 className="mb-4">
                    <strong>Forget Password</strong>
                  </h3>
                  <form className="w-100" onSubmit={formik.handleSubmit}>
                    <div className="row gx-3">
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
                    </div>
                    <div className="w-100 text-center mb-3 mt-4">
                      <button
                        type="submit"
                        className="w-100 py-2 fw-bold btn btn-md loginBtn"
                      >
                        Reset Password
                      </button>
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

export default ForgetPassword;
