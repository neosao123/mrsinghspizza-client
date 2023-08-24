import React, { useContext, useEffect, useState } from "react";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import "../assets/styles/Cart/MainCartList.css";
import bgImage from "../assets/images/bg-img.jpg";
import GlobalContext from "../context/GlobalContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import MainCartList from "../components/_main/Cart/MainCartList";
import LoadingLayout from "../layouts/LoadingLayout";
import { useSelector } from "react-redux";
import swal from "sweetalert";

function Cart() {
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [cart, setCart] = globalCtx.cart;
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckout = () => {
    if (cart?.product?.length > 0) {
      if (isAuthenticated && user !== null) {
        navigate("/address-details");
      } else {
        localStorage.setItem("redirectTo", location?.pathname);
        navigate("/registration");
      }
    } else {
      toast.error("Cart is Empty...");
    }
  };

  const handleCancelOrder = () => {
    if (cart?.product?.length > 0) {
      swal({
        title: "Order Cancellation",
        text: "Do you really want to cancel order?",
        icon: "warning",
        buttons: ["Cancel", "Ok"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          localStorage.removeItem("cart");
          setCart();
        }
      });
    } else {
      toast.error("Cart is already empty");
    }
  };
  return (
    <>
      <Header />
      {loading ? (
        <LoadingLayout />
      ) : (
        <section className="new-block mb-3">
          <div className="container-fluid">
            <div className="row gx-4">
              <div className="col-lg-12 col-md-12 col-sm-12 px-4 py-2 mt-3">
                <div className="d-flex justify-content-start align-items-center w-100 productList mb-1">
                  <h3 className="mx-2">Your Cart</h3>
                </div>
              </div>
              <div className="col-lg-8 col-md-12 col-sm-12 px-4 py-2 mt-1 mb-3">
                <ul className="list-group">
                  {cart?.product?.map((cData) => {
                    return (
                      <MainCartList
                        cData={cData}
                        key={cData.id}
                        setLoading={setLoading}
                      />
                    );
                  })}
                </ul>
              </div>
              {/* Order Summary */}
              <div className="col-lg-4 col-md-12 col-sm-12 px-4 py-2 mt-1 mb-3">
                <div className="block-stl10 odr-summary">
                  <h3>Order Summary :</h3>
                  <ul className="list-unstyled">
                    <li>
                      <span className="ttl">Sub Total</span>{" "}
                      <span className="stts">
                        $ {cart?.subtotal ? cart?.subtotal : (0.0).toFixed(2)}
                      </span>
                    </li>
                    <li>
                      <span className="ttl">Tax Percentage (%)</span>{" "}
                      <span className="stts">
                        {cart?.taxPer ? cart?.taxPer : 0}
                      </span>
                    </li>
                    <li>
                      <span className="ttl">Tax Amount</span>{" "}
                      <span className="stts">
                        ${" "}
                        {cart?.taxAmount
                          ? cart?.taxAmount
                          : Number(0).toFixed(2)}
                      </span>
                    </li>
                    <li>
                      <span className="ttl">Convinence Charges (%)</span>{" "}
                      <span className="stts">
                        {cart?.convinenceCharges ? cart?.convinenceCharges : 0}
                      </span>
                    </li>
                    <li>
                      <span className="ttl">Delivery Charges</span>{" "}
                      <span className="stts">
                        ${" "}
                        {cart?.deliveryCharges
                          ? cart?.deliveryCharges
                          : Number(0).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                  <div className="ttl-all">
                    <span className="ttlnm">Grand Total</span>
                    <span className="odr-stts">
                      $ {cart?.grandtotal ? cart?.grandtotal : (0.0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="w-100 text-end d-flex justify-content-center flex-wrap align-items-center">
                  <div className="row w-100">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <button
                        type="button"
                        className="w-100 px-5 rounded my-3 py-3 cancelCart"
                        onClick={handleCancelOrder}
                      >
                        Cancel Order
                      </button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <button
                        type="submit"
                        className="w-100 px-5 rounded my-3 py-3 addtocart"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Cart;
