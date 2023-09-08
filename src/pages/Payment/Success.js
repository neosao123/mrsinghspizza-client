import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import GlobalContext from "../../context/GlobalContext";
import CartFunction from "../../components/cart";
import Header from "../../components/_main/Header";
import Footer from "../../components/_main/Footer";
import { paymentVerified } from "../../services";
import LoadingLayout from "../../layouts/LoadingLayout";
import paymentSuccess from "../../assets/images/payment-success.png";
import paymentCancelled from "../../assets/images/payment-cancel.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Success() {
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const cartFn = new CartFunction();
  const [loading, setLoading] = useState(false);
  const placeOrderData = JSON.parse(localStorage.getItem("placedOrder"));

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
    localStorage.removeItem("placedOrder");
  };

  useEffect(() => {
    localStorage.removeItem("cart");
    setCart();
  }, [placeOrderData]);

  useEffect(() => {
    if (placeOrderData !== null) {
      navigate("/order/verify");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {loading === true ? (
        <LoadingLayout />
      ) : (
        <div className="container-fluid d-flex align-items-center justify-content-center flex-column">
          <div className="w-100 d-flex flex-column align-items-center py-3">
            <img
              src={logo}
              className="card-img-top"
              alt=""
              style={{ width: "3.5rem", height: "3.5rem" }}
            />
            <h2
              className="mt-3"
              style={{ fontSize: "1.3rem", letterSpacing: ".08rem" }}
            >
              <strong>Mr. Singh's Pizza</strong>
            </h2>
          </div>
          <div className="container-fluid row m-0 p-0 px-3 d-flex justify-content-center">
            <div className="card py-2 my-4 col-lg-5 col-md-7 col-sm-10 text-center">
              <div className="d-flex justify-content-center align-items-center my-2 py-2 w-100">
                <img
                  src={paymentSuccess}
                  className="card-img-top"
                  alt=""
                  style={{ width: "2.8rem", height: "2.8rem" }}
                />
              </div>
              <div className="card-body">
                <h5
                  className="card-title text-success fw-bold"
                  style={{
                    fontSize: "1.3rem",
                    textTransform: "capitalize",
                  }}
                >
                  Order Placed Successfully
                </h5>
                <p
                  className="cart-text text-secondary my-1"
                  style={{ fontSize: "1rem" }}
                >
                  <span>Order has been delivered soon.</span>
                </p>
                <h6
                  className="card-subtitle my-2 mt-3 text-secondary d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem", fontWeight: "600" }}
                >
                  <span>Transaction Id :</span>{" "}
                  <span className="mx-2">{placeOrderData?.txnId}</span>
                </h6>
                <hr style={{ borderTop: ".1rem dashed #606060" }}></hr>
                <p
                  className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem" }}
                >
                  <span className="fw-bold">Order Code :</span>
                  <span>{placeOrderData?.orderCode}</span>
                </p>
                <p
                  className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem" }}
                >
                  <span className="fw-bold">Receipt Number :</span>
                  <span>{placeOrderData?.receiptNo}</span>
                </p>
                <p
                  className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem" }}
                >
                  <span className="fw-bold">Order Date :</span>
                  <span>{placeOrderData?.orderDate}</span>
                </p>
                <p
                  className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem" }}
                >
                  <span className="fw-bold">Total Amount :</span>
                  <span className="fw-bold">
                    $ {placeOrderData?.totalAmount}
                  </span>
                </p>
              </div>
              <div className="card-footer bg-white text-center">
                <button
                  className="btn btn-md bg-secondary text-light"
                  onClick={handleBack}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Success;
