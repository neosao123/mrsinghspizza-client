import React from "react";

export const SpecialCrustDropdown = ({
  getSpecialData,
  pizzaState,
  handleCrust,
  count,
}) => {
  return (
    <>
      <select
        className="form-select form-drop w-100"
        value={pizzaState[count - 1]?.crust?.crustCode}
        onChange={(e) => handleCrust(e, count)}
      >
        {getSpecialData?.crust?.map((data) => {
          return (
            <option key={data.code} value={data.code}>
              {data.crustName} - $ {data.price}
            </option>
          );
        })}
      </select>
    </>
  );
};

export const SpecialCheeseDropdown = ({
  getSpecialData,
  count,
  pizzaState,
  handleCheese,
}) => {
  return (
    <select
      className="form-select form-drop w-100"
      onChange={(e) => handleCheese(e, count)}
      value={pizzaState[count - 1]?.cheese?.cheeseCode}
    >
      {getSpecialData?.cheese?.map((data) => {
        return (
          <option key={data.code} value={data.code}>
            {data.cheeseName} - $ {data.price}
          </option>
        );
      })}
    </select>
  );
};

export const SpecialbasesDropDown = ({
  getSpecialData,
  count,
  pizzaState,
  handleSpecialbases,
}) => {
  return (
    <>
      <select
        className="form-select form-drop w-100"
        onChange={(e) => {
          handleSpecialbases(e, count);
        }}
        value={
          pizzaState[count - 1]?.specialBases?.specialbaseCode
            ? pizzaState[count - 1]?.specialBases?.specialbaseCode
            : ""
        }
      >
        <option value={""}>---- Choose Specialbases ----</option>
        {getSpecialData?.specialbases?.map((data) => {
          return (
            <option key={data.code} value={data.code}>
              {data.specialbaseName} - $ {data.price}
            </option>
          );
        })}
      </select>
    </>
  );
};

export const SpecialSpicesDropdown = ({ getSpecialData }) => {
  return (
    <select
      className="form-select form-drop w-100"
      // onChange={(e) => handleCheese(e, count)}
      // value={pizzaState[count - 1]?.spices?.spicyCode}
    >
      {getSpecialData?.spices?.map((data) => {
        console.log("spicy", data);
        return (
          <option key={data.spicyCode} value={data.spicyCode}>
            {data.spicy} - $ {data.price}
          </option>
        );
      })}
    </select>
  );
};

export const SpecialSauceDropdown = ({ getSpecialData }) => {
  return (
    <select
      className="form-select form-drop w-100"
      // onChange={(e) => handleCheese(e, count)}
      // value={pizzaState[count - 1]?.spices?.spicyCode}
    >
      {getSpecialData?.sauce?.map((data) => {
        return (
          <option key={data.sauceCode} value={data.sauceCode}>
            {data.sauce} - $ {data.price}
          </option>
        );
      })}
    </select>
  );
};

export const SpecialCookDropdown = ({ getSpecialData }) => {
  return (
    <select
      className="form-select form-drop w-100"
      // onChange={(e) => handleCheese(e, count)}
      // value={pizzaState[count - 1]?.spices?.spicyCode}
    >
      {getSpecialData?.cook?.map((data) => {
        return (
          <option key={data.cookCode} value={data.cookCode}>
            {data.cook} - $ {data.price}
          </option>
        );
      })}
    </select>
  );
};
