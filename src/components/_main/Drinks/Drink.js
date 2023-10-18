import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Drink = ({ data }) => {
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
          <p className="drinksPrice text-dark mb-3">
            Price : <span className="mx-2">$ {data.price}</span>
          </p>
          <Link
            to={`/customize-drink/${data.softdrinkCode}`}
            className="customizedBtn btn btn-sm px-4 py-2 text-white"
          >
            Customize
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Drink;
