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
    if (payloadEdit) {
      if (payloadEdit?.id === cData?.id) {
        console.log("Deleted If Condition...");
        setPayloadEdit();
        resetControls();
        cartFn.deleteCart(cData, cart, setCart, settings);
      } else {
        cartFn.deleteCart(cData, cart, setCart, settings);
      }
    } else {
      cartFn.deleteCart(cData, cart, setCart, settings);
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
  console.log(cData);
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
      <div className="col-lg-12 mb-1 text-start pSize">
        <p className="">Size : </p>
        <span className="mx-1">
          {cData?.config?.size ? cData?.config?.size : ""}
          {cData?.pizzaSize !== "" ? cData?.pizzaSize : ""}
        </span>
      </div>

      {cData?.config?.pizza &&
        cData?.config?.pizza.length > 0 &&
        cData?.config?.pizza.map((data, index) => {
          return (
            <div
              className="d-flex justify-content-start flex-column selectedPizza"
              key={index}
            >
              <h4 className="mb-1">Pizza {index + 1}</h4>
              {data?.crust && (
                <div className="mb-1">
                  <p>Crust :</p>
                  <span>{data?.crust?.crustName}</span>
                </div>
              )}
              {data?.cheese && (
                <div className="mb-1">
                  <p>Cheese :</p>
                  <span>{data?.cheese?.cheeseName}</span>
                </div>
              )}
              {data?.specialbases && (
                <div className="mb-1">
                  <p>Specialbases :</p>
                  <span>{data?.specialbases?.specialbaseName}</span>
                </div>
              )}
              <div className="mb-1">
                {/* Count As Two */}
                {data?.toppings?.countAsTwo.length > 0 && (
                  <div className="mb-1">
                    <p>Toppings (Count 2) : </p>
                    {data?.toppings?.countAsTwo?.map((data) => {
                      return (
                        <span className="mx-1">
                          {data?.toppingsName} ({data?.toppingsPlacement}),
                        </span>
                      );
                    })}
                  </div>
                )}
                {/* Count As One */}
                {data?.toppings?.countAsOne?.length > 0 && (
                  <div className="mb-1">
                    <p>Toppings (Count 1) : </p>
                    {data?.toppings?.countAsOne?.map((data) => {
                      return (
                        <span className="mx-1">
                          {data?.toppingsName} ({data?.toppingsPlacement}),
                        </span>
                      );
                    })}
                  </div>
                )}
                {/* Free Toppings */}
                {data?.toppings?.freeToppings?.length > 0 && (
                  <div>
                    <p>Indian Style Toppings: </p>
                    {data?.toppings?.freeToppings?.map((data) => {
                      return (
                        <span className="mx-1">
                          {data?.toppingsName} ({data?.toppingsPlacement}),
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
        <div className="selectedPizza mb-1">
          <p>Sides :</p>
          {cData?.config?.sides?.map((data) => {
            return (
              <span>
                {data?.sideName} ({data?.sideSize}),
              </span>
            );
          })}
        </div>
      )}
      {/* Dips */}
      {cData?.config?.dips?.length > 0 && (
        <div className="selectedPizza mb-1">
          <p>Dips: </p>
          {cData?.config?.dips?.map((data) => {
            return <span>{data?.dipsName},</span>;
          })}
        </div>
      )}
      {/* Drinks */}
      {cData?.productType === "customized" &&
        cData?.config?.drinks?.length > 0 && (
          <div className="selectedPizza mb-1">
            <p>Drinks: </p>
            {cData?.config?.drinks?.map((data) => {
              return <span>{data?.drinksName},</span>;
            })}
          </div>
        )}
      {cData?.productType === "special" && (
        <div className="selectedPizza mb-1">
          <p>Drinks: </p>
          <span>{cData?.config?.drinks?.drinksName}</span>
        </div>
      )}

      {/* Edit & Delete */}
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
