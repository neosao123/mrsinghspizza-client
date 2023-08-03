import React, { useEffect, useState } from "react";

function Dips({ data, setCartProduct }) {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);

  const countDec = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  const countInc = () => {
    setCount((count) => count + 1);
  };

  const handleDips = () => {
    const obj = {
      productCode: data.dipsCode,
      productName: data.dipsName,
      productType: "dips",
      quantity: count,
      price: data.price,
    };
    setProduct(obj);
    setCount(1);
  };

  useEffect(() => {
    if (product !== null) {
      let ct = JSON.parse(localStorage.getItem("cart"));
      ct.product.push(product);
      setCartProduct(ct.product);
    }
  }, [product]);

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 mb-3" key={data.dipsCode}>
      <div className="d-flex justify-content-center flex-column p-3 box">
        <div className="d-flex justify-content-center mb-3">
          <div className="image-div d-flex justify-content-center">
            <img
              src={data.image ? data.image : "images/pz.png"}
              alt=""
              className="img-fluid image"
            />
          </div>
        </div>
        <div className="sidesTitle mb-3">
          <h3>{data.dipsName}</h3>
        </div>
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
