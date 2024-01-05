import React, { useContext, useEffect, useState } from "react";
import Sides from "../components/_main/Sides/Sides";
import { getSides } from "../services";
import CartFunction from "../components/cart";
import GlobalContext from "../context/GlobalContext";
import CartList from "../components/_main/Cart/CartList";

function SidesMenu() {
  const [sidesData, setSideData] = useState();
  const [reset, setReset] = useState(false);
  const cartFn = new CartFunction();

  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const [payloadEdit, setPayloadEdit] = globalctx.productEdit;

  const sides = async () => {
    await getSides()
      .then((res) => {
        setSideData(res.data);
      })
      .catch((err) => {
        console.log("Error From Get Sides :", err);
      });
  };

  // Reset Controls
  const resetControls = () => {
    // Reset All Fields
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 200);
  };

  useEffect(() => {
    sides();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xl-9 col-lg-9 row gx-4 mt-3 mb-3">
          {sidesData?.map((data) => {
            return <Sides data={data} key={data.sideCode} cartFn={cartFn} />;
          })}
        </div>
        {/* Cart List */}
        <div className="col-xl-3 col-lg-3 mt-3 d-lg-block d-none">
          <div className="cartlist w-100 text-start">
            <h2 className="p-3 text-center orderTitle">Your Orders</h2>
            {cart?.product.map((cData) => {
              return (
                <CartList
                  cData={cData}
                  key={cData.id}
                  setPayloadEdit={setPayloadEdit}
                  payloadEdit={payloadEdit}
                  resetControls={resetControls}
                  setLoading={false}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SidesMenu;
