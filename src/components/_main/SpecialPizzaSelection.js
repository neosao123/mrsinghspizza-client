import React, { useEffect, useRef, useState } from "react";
import {
  SpecialCheeseDropdown,
  SpecialCrustDropdown,
  SpecialbasesDropDown,
} from "../SpecialPizza/SelectedDropDown";
import CountAsOne from "../SpecialPizza/Toppings/CountAsOne";

function SpecialPizzaSelection({
  getSpecialData,
  count,
  toppingsData,
  pizzaState,
  setPizzaState,
  handleCrust,
  handleCheese,
  handleSpecialbases,
  reset,
}) {
  return (
    <>
      <div className="text-center w-100">
        <h3 className="mb-3">
          <strong>Pizza {count}</strong>
        </h3>
      </div>
      {/* Crust, Cheese, Specialbases */}
      <div className="row mb-3 border-bottom">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div className="d-flex justify-content-start align-items-center w-100">
            <p className="mb-1 ">Crust :</p>
            <SpecialCrustDropdown
              getSpecialData={getSpecialData}
              count={count}
              pizzaState={pizzaState}
              handleCrust={handleCrust}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="d-flex justify-content-start align-items-center w-100">
            <p className="mb-1 ">Cheese :</p>
            <SpecialCheeseDropdown
              getSpecialData={getSpecialData}
              count={count}
              pizzaState={pizzaState}
              handleCheese={handleCheese}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="d-flex justify-content-start align-items-center w-100">
            <p className="mb-1">Specialbases :</p>
            <SpecialbasesDropDown
              getSpecialData={getSpecialData}
              count={count}
              pizzaState={pizzaState}
              handleSpecialbases={handleSpecialbases}
            />
          </div>
        </div>
      </div>
      {/* toppings */}
      <div className="p-2 pizza-heading text-center">
        <h4 className="my-1">Toppings</h4>
      </div>
      <div
        className="row gx-4 mb-3 mt-4"
        style={{ maxHeight: "450px", overflowY: "scroll" }}
      >
        {/* count 2 toppings */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="text-center tps-title pb-3 border-bottom border-3">
            Toppings (Count 2)
          </p>
          {toppingsData?.toppings?.countAsTwo.map((data) => {
            return (
              <div
                className="d-flex justify-content-between align-items-center py-3 border-bottom"
                key={data.toppingsCode}
              >
                <div className="d-flex flex-column">
                  <span className="mb-3 text-left mx-1">
                    {data.toppingsName}
                  </span>
                  <select className="form-select w-100">
                    <option value="Whole">Whole</option>
                    <option value="Left Half">Left Half</option>
                    <option value="Left Half">Right Half</option>
                  </select>
                </div>
                <div className="d-flex flex-column">
                  <span className="mb-3 text-end mx-1">$ {data.price}</span>
                  <button
                    type="button"
                    className="addbtn btn btn-sm px-4 text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* count 1 toppings */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="text-center tps-title pb-3 border-bottom border-3">
            Toppings (Count 1)
          </p>
          {toppingsData?.toppings?.countAsOne.map((data) => {
            return (
              <CountAsOne
                key={data.toppingsCode}
                pizzaState={pizzaState}
                setPizzaState={setPizzaState}
                count={count}
                data={data}
                reset={reset}
              />
            );
          })}
        </div>
        {/* indians toppings (free) */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="text-center tps-title pb-3 border-bottom border-3">
            Indians Toppings (Free)
          </p>
          {toppingsData?.toppings?.freeToppings.map((data) => {
            return (
              <div
                className="d-flex justify-content-between align-items-center py-3 border-bottom"
                key={data.toppingsCode}
              >
                <div className="d-flex flex-column">
                  <span className="mb-3 text-left mx-1">
                    {data.toppingsName}
                  </span>
                  <select className="form-select w-100">
                    <option value="Whole">Whole</option>
                    <option value="Left Half">Left Half</option>
                    <option value="Left Half">Right Half</option>
                  </select>
                </div>
                <div className="d-flex flex-column">
                  <span className="mb-3 text-end mx-1">$ {data.price}</span>
                  <button
                    type="button"
                    className="addbtn btn btn-sm px-4 text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SpecialPizzaSelection;
