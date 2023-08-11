import React, { useContext, useEffect } from "react";
import GlobalContext from "../../../context/GlobalContext";
import CartFunction from "../../cart";

function CartList({ cData, setPayloadEdit, payloadEdit }) {
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const cartFn = new CartFunction();

  const handleDelete = () => {
    cartFn.deleteCart(cData, cart, setCart);
  };

  useEffect(() => {}, [payloadEdit]);
  return (
    <div className="row m-0 px-1 py-3 list-item">
      <div className="col-lg-6 mb-2">
        <strong>{cData.productName}</strong>
      </div>
      <div className="col-lg-6 text-end mb-2">
        <strong>$ {cData.totalPrice}</strong>
      </div>
      <div className="col-lg-5 text-start mb-2">
        <strong>Quantity :</strong> <span className="mx-2">1</span>
      </div>
      {cData.size || cData?.pizzaSize ? (
        <div className="col-lg-12 mb-3 text-start">
          <strong className="">Size : </strong>
          <span className="mx-1">{cData?.size || cData?.pizzaSize}</span>
        </div>
      ) : (
        ""
      )}
      <div className="col-lg-12 mt-1">
        <i
          className="fa fa-trash deleteIcon"
          aria-hidden="true"
          onClick={handleDelete}
        ></i>
        {cData.productType === "special" ||
        cData.productType === "customized" ? (
          <i
            className="fa fa-edit mx-3 editIcon"
            aria-hidden="true"
            onClick={(e) => {
              setPayloadEdit(cData);
            }}
          ></i>
        ) : (
          <i className="fa fa-edit editIcon d-none" aria-hidden="true"></i>
        )}
      </div>
    </div>
  );
}

export default CartList;
