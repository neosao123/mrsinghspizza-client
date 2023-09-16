import React, { useContext, useEffect, useRef, useState } from "react";
import pizzaimage from "../../../assets/images/pz.png";
import GlobalContext from "../../../context/GlobalContext";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

function Sides({ data, cartFn }) {
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const [settings, setSettings] = globalctx.settings;

  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const sPlacementRef = useRef(null);

  const user = useSelector((state) => state?.user);

  // Count Deacrease
  const countDec = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };
  // Count Increase
  const countInc = () => {
    setCount((count) => count + 1);
  };
  // Handle Sides - Add To Cart Button
  const handleSides = () => {
    let combinationData = {};
    if (sPlacementRef.current) {
      const selectedCode = sPlacementRef.current.value;
      combinationData = data?.combination?.find(
        (code) => code.lineCode === selectedCode
      );
    }
    let taxPer = Number(0).toFixed(2);
    if (settings !== undefined) {
      settings?.map((data) => {
        if (data?.settingCode === "STG_2" && data?.type === "percent") {
          taxPer = data?.settingValue;
        }
      });
    }

    const totalPrice = combinationData?.price * count;
    const obj = {
      id: uuidv4(),
      customerCode: user?.data?.customerCode,
      cashierCode: "#NA",
      productCode: data.sideCode,
      productName: data.sideName,
      productType: "side",
      config: {
        lineCode: combinationData?.lineCode,
        sidesSize: combinationData?.size,
      },
      price: combinationData?.price,
      quantity: count,
      amount: totalPrice,
      taxPer: taxPer,
      pizzaSize: "",
      comments: "",
    };
    setProduct(obj);
    setCount(1);
    sPlacementRef.current.value = data?.combination?.[0]?.lineCode;
  };

  // Create Cart if Cart Key Not Present
  useEffect(() => {
    cartFn.createCart(setCart);
  }, [setCart]);

  // Add to Cart - Logic
  useEffect(() => {
    if (product !== null) {
      let ct = JSON.parse(localStorage.getItem("cart"));
      ct.product.push(product);
      const cartProduct = ct.product;
      cartFn.addCart(cartProduct, setCart, false, settings);
    }
  }, [product]);

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-3" key={data.sideCode}>
      <div className="d-flex justify-content-center flex-column p-3 box">
        <div className="text-end text-black">
          <span
            className="badge bg-secondary px-1"
            style={{
              letterSpacing: ".05rem",
              fontSize: ".8rem",
              textTransform: "capitalize",
            }}
          >
            {data?.type}
          </span>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <div className="image-div d-flex justify-content-center">
            <img
              src={data.image ? data.image : pizzaimage}
              alt=""
              className="img-fluid image"
            />
          </div>
        </div>
        <div className="sidesTitle mb-3">
          <h3
            className="text-truncate"
            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {data.sideName}
          </h3>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center">
          <select
            className="form-select w-75 sideSize mb-3"
            ref={sPlacementRef}
          >
            {data?.combination?.map((combination) => {
              return (
                <option value={combination.lineCode} key={combination.lineCode}>
                  {combination.size} - $ {combination.price}
                </option>
              );
            })}
          </select>
          <div className="mb-3 d-flex align-items-center">
            <button className="quantityBtn" onClick={countDec}>
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <p className="quantityText mx-3">{count}</p>
            <button className="quantityBtn" onClick={countInc}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
          <button
            type="button"
            className="addtocartBtn btn btn-sm px-4 py-2 text-white"
            onClick={handleSides}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sides;
