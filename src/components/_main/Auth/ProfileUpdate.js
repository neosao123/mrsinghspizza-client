import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { updateProfile } from "../../../services";
import { useFormik } from "formik";
import defaultPhoto from "../../../assets/images/avatar.jpg";
import GlobalContext from "../../../context/GlobalContext";
import { useDispatch } from "react-redux";
import { UPDATEUSER } from "../../../redux/authProvider/actionType";

const canadianPhoneNumberRegExp = /^\d{3}\d{3}\d{4}$/;
// const canadianPostalCode = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  mobileNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      canadianPhoneNumberRegExp,
      "Invalid Canadian phone number format. Use (XXX) XXX-XXXX."
    ),
});

function ProfileUpdate() {
  const globalCtx = useContext(GlobalContext);
  const [user, setUser] = globalCtx.user;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();

  const iniValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    mobileNumber: user?.mobileNumber,
    customerCode: user?.customerCode,
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append("customerCode", user?.customerCode);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("mobileNumber", values.mobileNumber);
    if (selectedFile) {
      formData.append("profilePic", selectedFile);
    }

    try {
      const result = await updateProfile(formData);

      if (result.data) {
        document.getElementById("profilePic").value = null;
        setSelectedFile(null);
        setPreviewUrl(null);

        console.log("api-response", result);
        const data = result.data;
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        dispatch({ type: UPDATEUSER, payload: data });
        setTimeout(() => {
          toast.success("Profile Upadated Successfully.");
        }, 500);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("Exception From RegisterApi", err);
    }
  };

  const formik = useFormik({
    initialValues: iniValues,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div className="container py-5">
      <form className="row w-100" onSubmit={formik.handleSubmit}>
        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name <small className="text-danger">*</small>{" "}
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <small className="text-danger formErrMsg mt-2 mb-3">
              {formik.errors.firstName}
            </small>
          ) : null}
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name <small className="text-danger">*</small>{" "}
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <small className="text-danger formErrMsg mt-2 mb-3">
              {formik.errors.lastName}
            </small>
          ) : null}
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Phone Number <small className="text-danger">*</small>{" "}
          </label>
          <p className="text-secondary noteTxt mb-2">
            Please use a valid phone number. ex. (XXX) XXX-XXXX
          </p>
          <input
            type="tel"
            className="form-control mb-3"
            id="mobileNumber"
            name="mobileNumber"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
            <small className="text-danger formErrMsg mt-2 mb-3">
              {formik.errors.mobileNumber}
            </small>
          ) : null}
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Updated Profile Photo
          </label>
          <p className="text-secondary noteTxt mb-2">
            Format: .jpeg, .jpg, .png
          </p>
          <input
            type="file"
            accept="image/*"
            className="form-control mb-3"
            id="profilePic"
            name="profilePic"
            onChange={handleFileChange}
          />
          {formik.touched.profilePic && formik.errors.profilePic ? (
            <small className="text-danger formErrMsg mt-2 mb-3">
              {formik.errors.profilePic}
            </small>
          ) : null}
        </div>
        <div className="col-lg-6">
          <div
            className="col-12 rounded-circle"
            style={{ width: "4rem", height: "4rem", overflow: "hidden" }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                className="profile-picture"
                alt="Profile Preview"
              />
            ) : (
              <img
                src={user?.profilePhoto ? user?.profilePhoto : defaultPhoto}
                className="profile-picture"
                alt={user?.userName}
              />
            )}
          </div>
        </div>
        <div className="w-100 text-start mb-3 mt-4">
          <button className="py-2 fw-bold btn btn-md regBtn" type="submit">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileUpdate;
