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
import Unauthorized from "./Unauthorized";

function Success() {
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const cartFn = new CartFunction();

  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState();
  const [errorMsg, setErrMsg] = useState();
  const [unAuth, setUnAuth] = useState(false);
  const sessionId = localStorage.getItem("sessionId");
  const orderCode = localStorage.getItem("orderCode");

  useEffect(() => {
    setLoading(true);
    if (sessionId === null) {
      setUnAuth(true);
      setLoading(false);
    } else {
      const payload = {
        sessionId: sessionId,
        orderCode: orderCode,
      };
      paymentVerified(payload)
        .then((res) => {
          setResData(res);
          localStorage.removeItem("sessionId");
          localStorage.removeItem("orderCode");
          localStorage.removeItem("OrderID");
          localStorage.removeItem("cart");
          setCart();
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 400 || err.response.status === 500) {
            setErrMsg(err.response.data.message);
          }
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      {loading === true ? (
        <LoadingLayout />
      ) : (
        <>
          <Header />
          {unAuth === false ? (
            <div className="container-fluid row m-0 p-0 px-3 d-flex justify-content-center">
              <div className="card py-2 my-4 col-lg-5 col-md-7 col-sm-10 text-center">
                {errorMsg ? (
                  <>
                    <div>{errorMsg}</div>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-center align-items-center my-2 py-2 w-100">
                      {resData?.data?.txnStatus === "unpaid" ? (
                        <img
                          src={paymentCancelled}
                          className="card-img-top"
                          alt=""
                          style={{ width: "2.8rem", height: "2.8rem" }}
                        />
                      ) : (
                        <img
                          src={paymentSuccess}
                          className="card-img-top"
                          alt=""
                          style={{ width: "2.8rem", height: "2.8rem" }}
                        />
                      )}
                    </div>
                    <div className="card-body">
                      <h5
                        className="card-title text-success fw-bold"
                        style={{
                          fontSize: "1.3rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {resData?.data?.txnStatus === "unpaid"
                          ? "Payment Failed"
                          : "Payment Successful"}
                      </h5>
                      <p
                        className="cart-text text-secondary my-1"
                        style={{ fontSize: "1rem" }}
                      >
                        <span>{resData?.message}</span>
                      </p>
                      <h6
                        className="card-subtitle my-2 mt-3 text-secondary d-flex justify-content-between flex-wrap"
                        style={{ fontSize: ".95rem", fontWeight: "600" }}
                      >
                        <span>Transaction Id :</span>{" "}
                        <span className="mx-2">{resData?.data?.txnId}</span>
                      </h6>
                      <hr style={{ borderTop: ".1rem dashed #606060" }}></hr>
                      <p
                        className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                        style={{ fontSize: ".95rem" }}
                      >
                        <span className="fw-bold">Order Status :</span>
                        <span>{resData?.data?.orderStatus}</span>
                      </p>
                      <p
                        className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                        style={{ fontSize: ".95rem" }}
                      >
                        <span className="fw-bold">Transaction Status :</span>
                        <span>{resData?.data?.txnStatus}</span>
                      </p>
                      <p
                        className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                        style={{ fontSize: ".95rem" }}
                      >
                        <span className="fw-bold">Transaction Date :</span>
                        <span>{resData?.data?.txnDate}</span>
                      </p>
                      <p
                        className="card-text text-secondary my-1 d-flex justify-content-between flex-wrap"
                        style={{ fontSize: ".95rem" }}
                      >
                        <span className="fw-bold">Amount Paid :</span>
                        <span className="fw-bold">
                          $ {resData?.data?.amount}
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <Unauthorized />
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}

export default Success;
