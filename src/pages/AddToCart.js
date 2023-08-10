import React, { useContext } from "react";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import "../assets/styles/AddToCart/style.css";
import bgImage from "../assets/images/bg-img.jpg";
import GlobalContext from "../context/GlobalContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import MainCartList from "../components/_main/Cart/MainCartList";

function AddToCart() {
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [cart, setCart] = globalCtx.cart;

  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckout = () => {
    if (isAuthenticated) {
      toast.success("Order Placed Successfully..");
    } else {
      localStorage.setItem("redirectTo", location?.pathname);
      navigate("/login");
    }
  };
  return (
    <>
      <Header />
      <section className="new-block mb-3">
        <div className="container-fluid">
          <div className="row gx-4">
            <div className="col-lg-8 col-md-12 col-sm-12 p-4 mt-3">
              <div className="d-flex justify-content-between w-100 productList mb-1">
                <h3 className="mx-2 mb-3">Product Details</h3>
                <h3 className="mx-4 px-3 mb-3">Price</h3>
              </div>
              <ul className="list-group">
                {cart?.product.map((cData) => {
                  return <MainCartList cData={cData} key={cData.productID} />;
                })}
              </ul>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4 col-md-12 col-sm-12 p-4 mt-3">
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
                    <span className="ttl">Discount</span>{" "}
                    <span className="stts">
                      <del>
                        $ {cart?.discount ? cart?.discount : (0.0).toFixed(2)}
                      </del>
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
              <div className="w-100 text-end">
                <button
                  type="submit"
                  className="px-5 rounded my-3 py-3 addtocart"
                  onClick={handleCheckout}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AddToCart;
