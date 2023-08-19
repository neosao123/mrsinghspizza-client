import React, { useContext, useEffect } from "react";
import GlobalContext from "../../../context/GlobalContext";
import CartFunction from "../../cart";
import { useLocation, useNavigate } from "react-router-dom";

function CartList({
  cData,
  setPayloadEdit,
  payloadEdit,
  resetControls,
  setLoading,
}) {
  // GlobalContext
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  // Helper Function
  const cartFn = new CartFunction();
  //
  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    if (payloadEdit) {
      if (payloadEdit?.productID === cData?.productID) {
        console.log("Deleted If Condition...");
        setPayloadEdit();
        resetControls();
        cartFn.deleteCart(cData, cart, setCart);
      } else {
        cartFn.deleteCart(cData, cart, setCart);
      }
    } else {
      cartFn.deleteCart(cData, cart, setCart);
    }
  };

  const handleCurrentEdit = () => {
    if (payloadEdit === undefined) {
      setPayloadEdit(cData);
    } else {
      setPayloadEdit();
      resetControls();
      setLoading(true);
      setTimeout(() => {
        setPayloadEdit(cData);
        setLoading(false);
      }, 1200);
    }
  };
  const handleRedirectToEdit = (pathUrl) => {
    if (payloadEdit === undefined) {
      navigate(pathUrl);
      setPayloadEdit(cData);
    } else {
      setPayloadEdit();
      resetControls();
      setLoading(true);
      setTimeout(() => {
        navigate(pathUrl);
      }, 800);
      setTimeout(() => {
        setPayloadEdit(cData);
        setLoading(false);
      }, 1200);
    }
  };

  const handleEdit = () => {
    if (cData?.productType === "customized") {
      if (location.pathname === "/create-your-own") {
        handleCurrentEdit();
      } else {
        handleRedirectToEdit("/create-your-own");
      }
    }
    if (cData?.productType === "special") {
      if (location.pathname === `/special-pizza/${cData?.productCode}`) {
        handleCurrentEdit();
      } else {
        handleRedirectToEdit(`/special-pizza/${cData?.productCode}`);
      }
    }
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
      <div className="col-lg-12 text-start mb-2">
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
            onClick={handleEdit}
          ></i>
        ) : (
          <i className="fa fa-edit editIcon d-none" aria-hidden="true"></i>
        )}
      </div>
    </div>
  );
}

export default CartList;
