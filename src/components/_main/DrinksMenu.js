import React, { useEffect, useState } from "react";
import { getDrinks } from "../../services";
import { data } from "jquery";

function DrinksMenu() {
  const [drinksData, setDrinksData] = useState();

  const drinks = async () => {
    await getDrinks()
      .then((res) => {
        setDrinksData(res.data);
      })
      .catch((err) => {
        console.log("Error from Get Drinks Data :", err);
      });
  };

  useEffect(() => {
    drinks();
  }, []);

  return (
    <div className="row gx-4 mt-3 mb-3 d-flex justify-content-center align-items-center ">
      {drinksData?.map((data) => {
        return (
          <div
            className="col-lg-3 col-md-4 col-sm-12 mb-3"
            key={data.softdrinkCode}
          >
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
                  <button className="quantityBtn">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                  <p className="quantityText mx-3">1</p>
                  <button className="quantityBtn">
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </button>
                </div>
                <p className="drinksPrice text-dark mb-3">
                  Price : <span className="mx-2">$ {data.price}</span>
                </p>
                <button
                  type="button"
                  className="addtocartBtn btn btn-sm px-4 py-2 text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DrinksMenu;
