import React from "react";
import {
  SpecialCheeseDropdown,
  SpecialCrustDropdown,
  SpecialbasesDropDown,
} from "../SpecialPizza/SelectedDropDown";
import CountAsOne from "../SpecialPizza/Toppings/CountAsOne";
import CountAsTwo from "../SpecialPizza/Toppings/CountAsTwo";
import FreeToppings from "../SpecialPizza/Toppings/FreeToppings";

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
  setFreeTpsCount,
  freeTpsCount,
  additionalTps,
  setAdditionalTps,
  payloadEdit,
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
              <CountAsTwo
                key={data.toppingsCode}
                pizzaState={pizzaState}
                setPizzaState={setPizzaState}
                count={count}
                data={data}
                reset={reset}
                payloadEdit={payloadEdit}
              />
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
                setFreeTpsCount={setFreeTpsCount}
                freeTpsCount={freeTpsCount}
                getSpecialData={getSpecialData}
                additionalTps={additionalTps}
                setAdditionalTps={setAdditionalTps}
                payloadEdit={payloadEdit}
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
              <FreeToppings
                key={data.toppingsCode}
                pizzaState={pizzaState}
                setPizzaState={setPizzaState}
                count={count}
                data={data}
                reset={reset}
                payloadEdit={payloadEdit}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SpecialPizzaSelection;
