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

function Success() {
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const cartFn = new CartFunction();

  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState();
  const [errorMsg, setErrMsg] = useState();

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
                      class="card-title text-success fw-bold"
                      style={{
                        fontSize: "1.3rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {resData?.message}
                    </h5>
                    <h6
                      class="card-subtitle my-2 mt-3 text-secondary d-flex justify-content-between flex-wrap"
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
                      <span className="fw-bold">$ {resData?.data?.amount}</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Success;
