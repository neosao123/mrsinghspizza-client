import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import CartFunction from "../../cart";
import { useLocation, useNavigate } from "react-router-dom";
import { isEditable } from "@testing-library/user-event/dist/utils";

function MainCartList({ cData, setLoading }) {
  // Global Context
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const [payloadEdit, setPayloadEdit] = globalctx.productEdit;
  const [settings, setSettings] = globalctx.settings;

  // Helper Function
  const cartFn = new CartFunction();
  const navigate = useNavigate();
  // Handle Delete Product
  const handleDelete = () => {
    if (payloadEdit) {
      if (payloadEdit?.id === cData?.id) {
        setPayloadEdit();
        cartFn.deleteCart(cData, cart, setCart, settings);
      }
    } else {
      cartFn.deleteCart(cData, cart, setCart, settings);
    }
  };
  // Handle Edit Product
  const handleEdit = () => {
    if (cData?.productType === "customized" && cData?.id) {
      setPayloadEdit(cData);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/create-your-own");
      }, 1200);
    }
    if (cData?.productType === "special" && cData?.id) {
      setPayloadEdit(cData);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(`/special-pizza/${cData?.productCode}`);
      }, 1200);
    }
  };
  return (
    <li className="list-group-item cartlistitem d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center py-2">
        <div className="mx-4">
          <h5 className="mb-2">{cData.productName}</h5>
          <p className="text-secondary mb-2">
            {cData?.size || cData?.pizzaSize ? (
              <>
                Size :{" "}
                <span className="mx-1">{cData?.size || cData?.pizzaSize}</span>
              </>
            ) : (
              ""
            )}
          </p>
          <p className="text-secondary mb-2">
            Quantity : <span className="mx-1">{cData.quantity}</span>
          </p>
        </div>
      </div>
      <div className="mx-4">
        <h5 className="d-inline text-start mx-4">$ {cData.amount}</h5>
        <div className="d-inline">
          <i
            className="fa fa-trash deleteIcon mx-3"
            aria-hidden="true"
            onClick={handleDelete}
          ></i>
          {cData.productType === "special" ||
          cData.productType === "customized" ? (
            <i
              className="fa fa-edit  editIcon"
              aria-hidden="true"
              onClick={handleEdit}
            ></i>
          ) : (
            <i className="fa fa-edit editIcon d-none" aria-hidden="true"></i>
          )}
        </div>
      </div>
    </li>
  );
}

export default MainCartList;
