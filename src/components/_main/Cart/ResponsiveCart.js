import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalContext from "../../../context/GlobalContext";

function ResponsiveCart({ handleAddToCart, totalPrice, payloadEdit }) {
  // GlobalContext
  const globalCtx = useContext(GlobalContext);
  const [cart, setCart] = globalCtx.cart;
  //
  const navigate = useNavigate();
  const location = useLocation();

  // handle Back Button
  const handleBackButton = () => {
    navigate("/");
  };
  //handle Checkout Button
  const handleCheckout = () => {
    navigate("/addtocart");
  };

  return (
    <div
      className="p-2 d-lg-none"
      style={{
        position: "fixed",
        width: "100%",
        bottom: "0",
        zIndex: "4",
        backgroundColor: "#ef831b",
      }}
    >
      <div className="row gx-3 justify-content-center align-items-center py-1">
        <div className="col-2 text-end text-white">
          {location?.pathname === "/" ? (
            ""
          ) : (
            <i
              class="fa fa-chevron-left"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={handleBackButton}
            ></i>
          )}
        </div>
        <div className="col-3 text-center">
          <span className="text-white mb-3">
            <strong>
              $
              {location?.pathname === "/"
                ? cart?.grandtotal
                : totalPrice
                ? Number(totalPrice).toFixed(2)
                : (0.0).toFixed(2)}
            </strong>
          </span>
        </div>
        <div className="col-7 text-center">
          <button
            type="button"
            className="w-75 top-0 cartBtnBottom btn btn-sm px-3 py-2"
            onClick={
              location?.pathname === "/" ? handleCheckout : handleAddToCart
            }
          >
            <b>
              {location?.pathname === "/" ? (
                "Checkout"
              ) : (
                <>
                  {payloadEdit &&
                  payloadEdit !== undefined &&
                  payloadEdit?.productType === "customized"
                    ? "Update Pizza"
                    : "Add To Cart"}
                </>
              )}
            </b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveCart;
