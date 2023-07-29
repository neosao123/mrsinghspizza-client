import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSides } from "../../services";

function SidesMenu() {
  const [sidesData, setSideData] = useState();

  const sides = async () => {
    await getSides()
      .then((res) => {
        setSideData(res.data);
      })
      .catch((err) => {
        console.log("Error From Get Sides :", err);
      });
  };

  useEffect(() => {
    sides();
  }, []);

  return (
    <div className="row gx-4 mt-3 mb-3">
      {sidesData?.map((data) => {
        return (
          <div className="col-lg-3 col-md-4 col-sm-12 mb-3" key={data.sideCode}>
            <div className="d-flex justify-content-center flex-column p-3 box">
              <div className="d-flex justify-content-center mb-3">
                <div className="image-div d-flex justify-content-center">
                  <img
                    src={data.image ? data.image : "/images/pz.png"}
                    alt=""
                    className="img-fluid image"
                  />
                </div>
              </div>
              <div className="sidesTitle mb-3">
                <h3>{data.sideName}</h3>
              </div>
              <div className="d-flex justify-content-center flex-column align-items-center">
                <select className="form-select w-75 sideSize mb-3">
                  {data?.combination?.map((combination) => {
                    return (
                      <option
                        value={combination.lineCode}
                        key={combination.lineCode}
                      >
                        {combination.size} - $ {combination.price}
                      </option>
                    );
                  })}
                </select>
                <div className="mb-3 d-flex align-items-center">
                  <button className="quantityBtn">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                  <p className="quantityText mx-3">1</p>
                  <button className="quantityBtn">
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </button>
                </div>
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

export default SidesMenu;
