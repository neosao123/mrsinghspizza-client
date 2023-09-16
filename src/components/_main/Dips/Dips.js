import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

function Dips({ data, cartFn }) {
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const [settings, setSettings] = globalctx.settings;

  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);

  const user = useSelector((state) => state?.user);

  let taxPer = Number(0).toFixed(2);
  if (settings !== undefined) {
    settings?.map((data) => {
      if (data?.settingCode === "STG_2" && data?.type === "percent") {
        taxPer = data?.settingValue;
      }
    });
  }

  // Count Decrease
  const countDec = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };
  // Count Increase
  const countInc = () => {
    setCount((count) => count + 1);
  };
  // Handle Dips
  const handleDips = () => {
    const totalPrice = data?.price * count;
    const obj = {
      id: uuidv4(),
      customerCode: user?.data?.customerCode,
      cashierCode: "#NA",
      productCode: data.dipsCode,
      productName: data.dipsName,
      productType: "dips",
      config: {},
      price: Number(data.price).toFixed(2),
      quantity: count,
      amount: Number(totalPrice).toFixed(2),
      taxPer: taxPer,
      pizzaSize: "",
      comments: "",
    };
    setProduct(obj);
    setCount(1);
  };

  useEffect(() => {
    cartFn.createCart(setCart);
  }, [setCart]);

  useEffect(() => {
    if (product !== null) {
      let ct = JSON.parse(localStorage.getItem("cart"));
      const pCode = ct?.product.find(
        (code) => code.productCode === product.productCode
      );
      if (pCode) {
        ct?.product.map((data) => {
          if (data.productCode === pCode.productCode) {
            pCode.quantity = pCode.quantity + product.quantity;
            pCode.amount = Number(pCode.amount) + Number(product.amount);
          }
        });
        const cartProduct = ct.product;
        cartFn.addCart(cartProduct, setCart, true, settings);
      } else {
        ct.product.push(product);
        const cartProduct = ct.product;
        cartFn.addCart(cartProduct, setCart, false, settings);
      }
    }
  }, [product]);

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-3" key={data.dipsCode}>
      <div className="d-flex justify-content-center flex-column p-3 box">
        {/* Images */}
        <div className="d-flex justify-content-center mb-3">
          <div className="image-div d-flex justify-content-center">
            <img
              src={data.image ? data.image : "images/pz.png"}
              alt=""
              className="img-fluid image"
            />
          </div>
        </div>
        {/* Product Title */}
        <div className="sidesTitle mb-3">
          <h3>{data.dipsName}</h3>
        </div>
        {/* Quantity & Add To Cart Button */}
        <div className="d-flex justify-content-center flex-column align-items-center">
          <div className="mb-3 d-flex align-items-center">
            <button className="quantityBtn" onClick={countDec}>
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <p className="quantityText mx-3">{count}</p>
            <button className="quantityBtn" onClick={countInc}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
          <p className="dipsPrice text-dark mb-3">
            Price : <span className="mx-2">$ {data.price}</span>
          </p>
          <button
            type="button"
            className="addtocartBtn btn btn-sm px-4 py-2 text-white"
            onClick={handleDips}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dips;
