import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import LoadingLayout from "../../../layouts/LoadingLayout";
import GlobalContext from "../../../context/GlobalContext";
import { getDrinks } from "../../../services";
import { useParams } from "react-router-dom";
import OrderSummary from "../Cart/OrderSummary";

function SelectedDrink() {
  // Global Context
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [cart, setCart] = globalCtx.cart;
  const [payloadEdit, setPayloadEdit] = globalCtx.productEdit;
  const [selectedDrinks, setSelectedDrinks] = useState({});

  const [loading, setLoading] = useState(false);

  const { did } = useParams();

  const drinks = async () => {
    setLoading(true);
    await getDrinks()
      .then((res) => {
        const selectedObject = res.data.find(
          (data) => data?.softdrinkCode === did
        );
        setSelectedDrinks(selectedObject);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error from Get Drinks Data :", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    drinks();
  }, []);

  return (
    <div>
      <Header />
      {loading === true ? (
        <>
          <LoadingLayout />
        </>
      ) : (
        <>
          <section
            className="container-fluid new-block m-0 p-0 w-100"
            style={{ position: "relative" }}
          >
            {/* Heading */}
            <div className="position-sticky top-0 custmized-main">
              <div className="d-flex flex-wrap justify-content-center bg-dark align-items-center p-3 custmized">
                <h2 className="m-3 text-white">
                  <strong>
                    {payloadEdit && payloadEdit !== undefined
                      ? `${selectedDrinks?.softDrinksName} [ Edit ]`
                      : selectedDrinks?.softDrinksName}
                  </strong>
                </h2>
              </div>
            </div>
            <div className="row m-0 p-0 w-100 justify-content-center">
              {/* Pizza Selection */}
              <div className="col-lg-9 col-md-12 col-sm-12 pizzaSelection py-lg-4 px-lg-3 px-3 py-4"></div>
              <div className="col-lg-3 py-lg-4 px-lg-3 d-lg-block d-none">
                {/* Total Price and Add To Cart - Button */}
                <div className="d-flex w-100 align-items-center justify-content-center flex-column position-relative">
                  <p className="text-dark mb-3">
                    <strong>
                      $
                      {/* {totalPrice
                      ? Number(totalPrice).toFixed(2)
                      : (0.0).toFixed(2)} */}
                    </strong>
                  </p>
                  <button
                    type="button"
                    className="addtocartbtn w-50 btn btn-sm px-3 py-2 text-white"
                    //   onClick={handleAddToCart}
                  >
                    <b>
                      {payloadEdit &&
                      payloadEdit !== undefined &&
                      payloadEdit?.productType === "custom_pizza"
                        ? "Update Pizza"
                        : "Add To Cart"}
                    </b>
                  </button>
                </div>

                {/* Cart List */}
                <div className="cartlist w-100 mt-5">
                  <h2 className="p-3 text-center orderTitle">Your Orders</h2>
                  {cart?.product.map((cData) => {
                    return (
                      // <CartList
                      //   cData={cData}
                      //   key={cData.id}
                      //   setPayloadEdit={setPayloadEdit}
                      //   payloadEdit={payloadEdit}
                      //   resetControls={resetControls}
                      //   setLoading={setLoading}
                      // />
                      <></>
                    );
                  })}
                </div>
                {/* Place Order */}
                <div className="placeorder w-100 mt-5">
                  <OrderSummary cart={cart} />
                  <div className="placeOrderBtn w-100 mt-3">
                    <button
                      className="btn btn-md w-100 py-2 btn-pills"
                      // onClick={handlePlaceOrder}
                    >
                      Place Order{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedDrink;
