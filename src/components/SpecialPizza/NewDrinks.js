import React, { useEffect, useRef, useState } from "react";

function NewDrinks({ reset, payloadEdit, getSpecialData }) {
  const drinksRef = useRef(null);

  const handleDrinks = () => {
    if (drinksRef.current) {
      console.log(drinksRef.current.value);
    }
  };

  // ---- UseEffect ----
  // UseEffect - Reset
  useEffect(() => {
    if (drinksRef.current) {
      console.log(drinksRef.current.value);
    }
    if (reset) {
      //   setCount(0);
    }
  }, [reset]);
  // Populate - Edit
  useEffect(() => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      payloadEdit?.config?.dips.map((items) => {});
    }
  }, [payloadEdit]);

  return (
    <select
      className="form-select mt-3 mb-3"
      ref={drinksRef}
      style={{ width: "200px" }}
      onChange={handleDrinks}
    >
      {getSpecialData?.pops.map((data) => {
        return (
          <option key={data.code} value={data.code}>
            {data?.softDrinkName}
          </option>
        );
      })}
      {getSpecialData?.bottle.map((data) => {
        return (
          <option key={data.code} value={data.code}>
            {data?.softDrinkName}
          </option>
        );
      })}
    </select>
  );
}

export default NewDrinks;
