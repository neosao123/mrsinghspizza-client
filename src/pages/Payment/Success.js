import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import GlobalContext from "../../context/GlobalContext";
import CartFunction from "../../components/cart";
import Header from "../../components/_main/Header";
import Footer from "../../components/_main/Footer";
import { paymentVerified } from "../../services";
import LoadingLayout from "../../layouts/LoadingLayout";
import paymentSuccess from "../../assets/images/payment-success.png";

function Success() {
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const cartFn = new CartFunction();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    const orderCode = localStorage.getItem("orderCode");

    const payload = {
      sessionId: sessionId,
      orderCode: orderCode,
    };
    setLoading(false);
    paymentVerified(payload)
      .then((res) => {
        console.log(res);
        localStorage.removeItem("sessionId");
        localStorage.removeItem("orderCode");
        setCart();
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <LoadingLayout />
      ) : (
        <>
          <Header />
          <div className="container-fluid d-flex justify-content-center align-items-center flex-warp">
            <div className="card w-auto p-2 m-5 text-center">
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
                  class="card-title text-success fw-bold"
                  style={{ fontSize: "1.3rem" }}
                >
                  Payment Successful!
                </h5>
                <h6
                  class="card-subtitle my-2 mt-3 text-secondary d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem", fontWeight: "600" }}
                >
                  <span>Transaction Number :</span>{" "}
                  <span className="mx-2">986785765655354</span>
                </h6>
                <hr style={{ borderTop: ".1rem dashed #606060" }}></hr>
                <p
                  className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem" }}
                >
                  <span className="fw-bold">Order Code :</span>
                  <span>6534353</span>
                </p>
                <p
                  className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem" }}
                >
                  <span className="fw-bold">Bank :</span>
                  <span>Testing</span>
                </p>
                <p
                  className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                  style={{ fontSize: ".95rem" }}
                >
                  <span className="fw-bold">Amount Paid :</span>
                  <span className="fw-bold">$ 250</span>
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Success;
