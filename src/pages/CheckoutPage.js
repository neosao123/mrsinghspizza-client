import React, { useContext, useEffect, useState } from "react";
import Header from "../components/_main/Header";
import LoadingLayout from "../layouts/LoadingLayout";
import Footer from "../components/_main/Footer";
import { useNavigate } from "react-router";
import { getStoreLocation, orderPlace } from "../services";
import { toast } from "react-toastify";
import GlobalContext from "../context/GlobalContext";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import AddressDetails from "./AddressDetails";
import PickupOrder from "../components/PickupOrder";

// Developer: Shreyas Mahamuni, Working Date: 23-12-2023

function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const [isAuthenticated, setIsAuthenticated] = globalctx.auth;
  const { user } = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.product?.length > 0) {
      if (isAuthenticated && user !== null) {
        setLoading(false);
        window.scrollTo(0, 0);
      } else {
        navigate("/login-registration");
        setLoading(false);
      }
    } else {
      toast.error("Cart is Empty...");
    }
  }, []);

  return (
    <>
      <>
        <Header />
        {loading === true ? (
          <>
            <LoadingLayout />
          </>
        ) : (
          <div className="container">
            <div
              className="container-fluid d-flex flex-column justify-content-center align-items-center p-0"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="container-fluid py-4 px-lg-5 px-2">
                <div className="row gx-3 justify-content-center align-items-center">
                  <div className="col-lg-3 col-md-4 text-start">
                    <h1 className="fw-bolder text-secondary h5 mb-md-0 mb-3">
                      Choose One
                    </h1>
                  </div>
                  <nav className="col-lg-9 col-md-8 col-sm-12 placeorderTab">
                    <div
                      className="nav nav-tabs w-100"
                      id="nav-tab"
                      role="tablist"
                      style={{ border: "none" }}
                    >
                      <button
                        className="nav-link me-4 active py-2 px-5"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Pickup
                      </button>

                      <button
                        className="nav-link py-2 px-5"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Delivery
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="container-fluid px-lg-5 px-2">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <PickupOrder />
                  </div>
                  <div
                    className="tab-pane fade mb-3"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <AddressDetails />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </>
    </>
  );
}

export default CheckoutPage;
