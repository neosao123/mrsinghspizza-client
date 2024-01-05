import React, { useContext, useEffect, useState } from "react";
import Dips from "../components/_main/Dips/Dips";
import { getDips } from "../services";
import CartFunction from "../components/cart";
import CartList from "../components/_main/Cart/CartList";
import GlobalContext from "../context/GlobalContext";

function DipsMenu() {
  const [dipsData, setDipsData] = useState();
  const [reset, setReset] = useState(false);
  const cartFn = new CartFunction();

  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const [payloadEdit, setPayloadEdit] = globalctx.productEdit;

  const dips = async () => {
    await getDips()
      .then((res) => {
        setDipsData(res.data);
      })
      .catch((err) => {
        console.log("Error From Dips Menu : ", err);
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
    dips();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-xl-9 col-lg-9 row gx-4 d-flex justify-content-xl-center justify-content-start mt-3 mb-3">
          {dipsData?.map((data) => {
            return <Dips key={data.dipsCode} data={data} cartFn={cartFn} />;
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

export default DipsMenu;
