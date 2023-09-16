import React, { useContext, useEffect } from "react";
import GlobalContext from "../../../context/GlobalContext";
import CartFunction from "../../cart";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../assets/styles/Cart/CartList.css";

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
  const [settings, setSettings] = globalctx.settings;
  // Helper Function
  const cartFn = new CartFunction();
  //
  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    if (cart?.product?.length === 1) {
      if (payloadEdit) {
        if (payloadEdit?.id === cData?.id) {
          setPayloadEdit();
          resetControls();
          cartFn.deleteCart(cData, cart, setCart, settings);
          localStorage.removeItem("cart");
          setCart();
          cartFn.createCart(setCart);
        }
      } else {
        cartFn.deleteCart(cData, cart, setCart, settings);
        localStorage.removeItem("cart");
        setCart();
        cartFn.createCart(setCart);
      }
    } else {
      if (payloadEdit) {
        if (payloadEdit?.id === cData?.id) {
          setPayloadEdit();
          resetControls();
          cartFn.deleteCart(cData, cart, setCart, settings);
        } else {
          cartFn.deleteCart(cData, cart, setCart, settings);
        }
      } else {
        cartFn.deleteCart(cData, cart, setCart, settings);
      }
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
    if (cData?.productType === "custom_pizza") {
      if (location.pathname === "/create-your-own") {
        handleCurrentEdit();
      } else {
        handleRedirectToEdit("/create-your-own");
      }
    }
    if (cData?.productType === "special_pizza") {
      if (location.pathname === `/special-pizza/${cData?.productCode}`) {
        handleCurrentEdit();
      } else {
        handleRedirectToEdit(`/special-pizza/${cData?.productCode}`);
      }
    }
  };

  // isEmptyObject
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {}, [payloadEdit]);
  return (
    <div className="row m-0 px-1 py-3 list-item">
      {/* Title */}
      <div className="col-lg-6 text-start mb-1 productTitle">
        <span>{cData?.productName}</span>
      </div>
      {/* Price */}
      <div className="col-lg-6 text-end mb-1 productTitle">
        <span>$ {cData?.amount}</span>
      </div>
      {/* Quantity */}
      <div className="col-lg-12 text-start mb-1 qty">
        <p>Quantity :</p> <span className="mx-2">{cData?.quantity}</span>
      </div>
      {/* Pizza Size */}
      {cData?.config?.sidesSize && (
        <div className="w-100 d-flex mb-2 text-start main-cartPizzaSize">
          <p className="">Size : </p>
          <span className="mx-2">
            {cData?.config?.sidesSize ? cData?.config?.sidesSize : ""}
          </span>
        </div>
      )}
      {cData?.pizzaSize && (
        <div className="w-100 d-flex mb-2 text-start main-cartPizzaSize">
          <p className="">Size : </p>
          <span className="mx-2">
            {cData?.pizzaSize !== "" ? cData?.pizzaSize : ""}
          </span>
        </div>
      )}
      {cData?.pizzaPrice && (
        <div className="w-100 d-flex mb-2 text-start main-cartPizzaSize">
          <p className="">Pizza Price : </p>
          <span className="mx-2">
            $ {cData?.pizzaPrice !== "" ? cData?.pizzaPrice : ""}
          </span>
        </div>
      )}

      {cData?.config?.pizza &&
        cData?.config?.pizza.length > 0 &&
        cData?.config?.pizza.map((data, index) => {
          return (
            <div
              className="d-flex justify-content-start flex-column selectedPizza"
              key={index}
            >
              <h4 className="mb-1">
                {cData?.productType === "custom_pizza"
                  ? "Pizza"
                  : "Pizza " + (index + 1)}
              </h4>
              {data?.crust && isEmptyObject(data?.crust) === false && (
                <div className="mb-1">
                  <p>Crust :</p>
                  <span>{data?.crust?.crustName}</span>
                </div>
              )}
              {data?.cheese && isEmptyObject(data?.cheese) === false && (
                <div className="mb-1">
                  <p>Cheese :</p>
                  <span>{data?.cheese?.cheeseName}</span>
                </div>
              )}
              {data?.specialBases &&
                isEmptyObject(data?.specialBases) === false && (
                  <div className="mb-1">
                    <p>Specialbases :</p>
                    <span>{data?.specialBases?.specialbaseName}</span>
                  </div>
                )}
              <div className="mb-1">
                {/* Count As Two */}
                {data?.toppings?.countAsTwoToppings.length > 0 && (
                  <div className="mb-1">
                    <p>Toppings (Count 2) : </p>
                    {data?.toppings?.countAsTwoToppings?.map((data, index) => {
                      return (
                        <span className="mx-1">
                          {data?.toppingsName} (
                          {data?.toppingsPlacement === "whole" && "W"}
                          {data?.toppingsPlacement === "lefthalf" && "L"}
                          {data?.toppingsPlacement === "righthalf" && "R"}
                          {data?.toppingsPlacement === "1/4" && "1/4"}),
                        </span>
                      );
                    })}
                  </div>
                )}
                {/* Count As One */}
                {data?.toppings?.countAsOneToppings?.length > 0 && (
                  <div className="mb-1">
                    <p>Toppings (Count 1) : </p>
                    {data?.toppings?.countAsOneToppings?.map((data, index) => {
                      return (
                        <span className="mx-1">
                          {data?.toppingsName} (
                          {data?.toppingsPlacement === "whole" && "W"}
                          {data?.toppingsPlacement === "lefthalf" && "L"}
                          {data?.toppingsPlacement === "righthalf" && "R"}
                          {data?.toppingsPlacement === "1/4" && "1/4"}),
                        </span>
                      );
                    })}
                  </div>
                )}
                {/* Free Toppings */}
                {data?.toppings?.freeToppings?.length > 0 && (
                  <div>
                    <p>Indian Style Toppings: </p>
                    {data?.toppings?.freeToppings?.map((data, index) => {
                      return (
                        <span className="mx-1">
                          {data?.toppingsName} (
                          {data?.toppingsPlacement === "whole" && "W"}
                          {data?.toppingsPlacement === "lefthalf" && "L"}
                          {data?.toppingsPlacement === "righthalf" && "R"}
                          {data?.toppingsPlacement === "1/4" && "1/4"}),
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

      {/* Sides */}
      {cData?.config?.sides?.length > 0 && (
        <div className="w-100 d-flex justify-content-start flex-wrap align-items-center main-cartPizza mb-1">
          <p>Sides :</p>
          {console.log(cData?.config?.sides)}
          {cData?.config?.sides?.map((data, index) => {
            return (
              <span>
                {data?.sideName} (
                {cData?.productType === "custom_pizza"
                  ? data?.sideSize
                  : data?.lineEntries?.[0]?.size}
                ){cData?.config?.sides?.length === index + 1 ? "" : ","}
              </span>
            );
          })}
        </div>
      )}
      {/* Dips */}
      {cData?.config?.dips?.length > 0 && (
        <div className="w-100 d-flex justify-content-start align-items-center flex-warp main-cartPizza mb-1">
          <p>Dips: </p>
          {cData?.config?.dips?.map((data, index) => {
            console.log(cData?.config?.dips?.length, index);
            return (
              <span>
                {data?.dipsName}
                {cData?.config?.dips?.length === index + 1 ? "" : ","}
              </span>
            );
          })}
        </div>
      )}
      {/* Drinks */}
      {cData?.config?.drinks?.length > 0 && (
        <div className="selectedPizza mb-1">
          <p>Drinks: </p>
          {cData?.config?.drinks?.map((data, index) => {
            return (
              <span>
                {data?.drinksName}
                {cData?.config?.drinks?.length === index + 1 ? "" : ","}
              </span>
            );
          })}
        </div>
      )}

      {/* Edit & Delete */}
      <div className="col-lg-12 mt-1">
        <i
          className="fa fa-trash deleteIcon"
          aria-hidden="true"
          onClick={handleDelete}
        ></i>
        {cData.productType === "special_pizza" ||
        cData.productType === "custom_pizza" ? (
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
