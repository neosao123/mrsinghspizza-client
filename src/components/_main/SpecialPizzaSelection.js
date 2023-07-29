import React from "react";

function SpecialPizzaSelection() {
  return (
    <>
      <div className="text-center w-100">
        <h3 className="mb-3">
          <strong>Pizza 1</strong>
        </h3>
      </div>
      {/* Crust, Cheese, Specialbases */}
      <div className="row mb-3 border-bottom">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div className="d-flex justify-content-start align-items-center w-100">
            <p className="mb-1 ">Crust :</p>
            <select className="form-select form-drop mx-4">
              <option>Large</option>
              <option>Extra Large</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="d-flex justify-content-start align-items-center w-100">
            <p className="mb-1 ">Cheese :</p>
            <select className="form-select form-drop mx-4">
              <option>Large</option>
              <option>Extra Large</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="d-flex justify-content-start align-items-center w-100">
            <p className="mb-1">Specialbases :</p>
            <select className="form-select form-drop mx-4">
              <option>Large</option>
              <option>Extra Large</option>
            </select>
          </div>
        </div>
      </div>
      {/* toppings */}
      <div className="p-2 pizza-heading text-center">
        <h4 className="my-1">Toppings</h4>
      </div>
      <div className="row gx-4 mb-3 mt-4">
        {/* count 2 toppings */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="text-center tps-title pb-3 border-bottom border-3">
            Toppings (Count 2)
          </p>
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div className="d-flex flex-column">
              <span className="mb-3 text-left mx-1">Green Olives</span>
              <select className="form-select w-100">
                <option value="Whole">Whole</option>
                <option value="Left Half">Left Half</option>
                <option value="Left Half">Right Half</option>
              </select>
            </div>
            <div className="d-flex flex-column">
              <span className="mb-3 text-end mx-1">$ 10</span>
              <button
                type="button"
                className="addbtn btn btn-sm px-4 text-white"
              >
                Add
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div className="d-flex flex-column">
              <span className="mb-3 text-left mx-1">Green Olives</span>
              <select className="form-select w-100">
                <option value="Whole">Whole</option>
                <option value="Left Half">Left Half</option>
                <option value="Left Half">Right Half</option>
              </select>
            </div>
            <div className="d-flex flex-column">
              <span className="mb-3 text-end mx-1">$ 10</span>
              <button
                type="button"
                className="addbtn btn btn-sm px-4 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        {/* count 1 toppings */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="text-center tps-title pb-3 border-bottom border-3">
            Toppings (Count 1)
          </p>
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div className="d-flex flex-column">
              <span className="mb-3 text-left mx-1">Green Olives</span>
              <select className="form-select w-100">
                <option value="Whole">Whole</option>
                <option value="Left Half">Left Half</option>
                <option value="Left Half">Right Half</option>
              </select>
            </div>
            <div className="d-flex flex-column">
              <span className="mb-3 text-end mx-1">$ 10</span>
              <button
                type="button"
                className="addbtn btn btn-sm px-4 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        {/* indians toppings (free) */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="text-center tps-title pb-3 border-bottom border-3">
            Indians Toppings (Free)
          </p>
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div className="d-flex flex-column">
              <span className="mb-3 text-left mx-1">Green Olives</span>
              <select className="form-select w-100">
                <option value="Whole">Whole</option>
                <option value="Left Half">Left Half</option>
                <option value="Left Half">Right Half</option>
              </select>
            </div>
            <div className="d-flex flex-column">
              <span className="mb-3 text-end mx-1">$ 10</span>
              <button
                type="button"
                className="addbtn btn btn-sm px-4 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecialPizzaSelection;
