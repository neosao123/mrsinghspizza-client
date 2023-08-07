import React, { useEffect, useState } from "react";

const Drink = ({ data, setCartProduct }) => {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);

  // Count Decrease
  const countDec = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  // Count Decrease
  const countInc = () => {
    setCount((count) => count + 1);
  };

  // Handle Drinks
  const handleDrinks = () => {
    const totalPrice = data?.price * count;
    const obj = {
      productCode: data.softdrinkCode,
      productName: data.softDrinksName,
      productType: "drinks",
      quantity: count,
      price: data.price,
      totalPrice: totalPrice,
    };
    setProduct(obj);
    setCount(1); // count set to 1
  };

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
          }
        });
        setCartProduct(ct.product);
      } else {
        ct.product.push(product);
        setCartProduct(ct.product);
      }
    }
  }, [product]);

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-3" key={data.softdrinkCode}>
      <div className="d-flex justify-content-center flex-column p-3 box">
        {/* Image */}
        <div className="d-flex justify-content-center mb-3">
          <div className="image-div d-flex justify-content-center">
            <img
              src={data.image ? data.image : "images/pz.png"}
              alt=""
              className="img-fluid image"
            />
          </div>
        </div>
        {/* Title */}
        <div className="sidesTitle mb-3">
          <h3>{data.softDrinksName}</h3>
        </div>
        {/* Quantity and Add To Cart - Button */}
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
          <p className="drinksPrice text-dark mb-3">
            Price : <span className="mx-2">$ {data.price}</span>
          </p>
          <button
            type="button"
            onClick={handleDrinks}
            className="addtocartBtn btn btn-sm px-4 py-2 text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drink;
