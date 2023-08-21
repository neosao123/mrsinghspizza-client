import React, { useEffect } from "react";

export const SelectedCrustDropDown = ({ allIngredients, setCrust, crust }) => {
  // handle Crust On Change
  const handleCrust = (e) => {
    if (e.target.value !== null && e.target.value !== "") {
      const selectedCrust = allIngredients?.crust?.find(
        (data) => data.crustCode === e.target.value
      );
      setCrust({
        crustCode: selectedCrust.crustCode,
        crustName: selectedCrust.crustName,
        price: selectedCrust.price,
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <select
        className="form-select form-drop w-100"
        value={crust?.crustCode}
        onChange={handleCrust}
      >
        {allIngredients?.crust?.map((data) => {
          return (
            <option key={data.crustCode} value={data.crustCode}>
              {data.crustName} - $ {data.price}
            </option>
          );
        })}
      </select>
    </>
  );
};

export const SelectedCheeseDropDown = ({
  allIngredients,
  setCheese,
  cheese,
}) => {
  // handle Cheese On Change
  const handleCheese = (e) => {
    if (e.target.value !== null && e.target.value !== "") {
      const selectedCheese = allIngredients?.cheese?.find(
        (data) => data.cheeseCode === e.target.value
      );
      setCheese({
        cheeseCode: selectedCheese.cheeseCode,
        cheeseName: selectedCheese.cheeseName,
        price: selectedCheese.price,
      });
    }
  };
  useEffect(() => {}, []);
  return (
    <select
      className="form-select form-drop w-100"
      onChange={handleCheese}
      value={cheese?.cheeseCode}
    >
      {allIngredients?.cheese?.map((data) => {
        return (
          <option key={data.cheeseCode} value={data.cheeseCode}>
            {data.cheeseName} - $ {data.price}
          </option>
        );
      })}
    </select>
  );
};

export const SelectedSpecialbasesDropDown = ({
  allIngredients,
  setSpecialbases,
  specialbases,
  reset,
}) => {
  // handle Specialbases On Change
  const handleSpecialBases = (e) => {
    if (e.target.value !== null && e.target.value !== "") {
      const selectedSb = allIngredients?.specialbases?.find(
        (data) => data.specialbaseCode === e.target.value
      );
      setSpecialbases({
        specialbaseCode: selectedSb.specialbaseCode,
        specialbaseName: selectedSb.specialbaseName,
        price: selectedSb.price,
      });
    }
  };
  useEffect(() => {
    if (reset) {
      setSpecialbases("");
    }
  }, [reset]);
  return (
    <select
      className="form-select form-drop w-100"
      onChange={handleSpecialBases}
      value={!specialbases ? "" : specialbases?.specialbaseCode}
    >
      <option value={""}>---- Choose Specialbases ----</option>
      {allIngredients?.specialbases?.map((data) => {
        return (
          <option key={data.specialbaseCode} value={data.specialbaseCode}>
            {data.specialbaseName} - $ {data.price}
          </option>
        );
      })}
    </select>
  );
};
