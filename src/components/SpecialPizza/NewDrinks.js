import React, { useEffect, useRef } from "react";

function NewDrinks({
  reset,
  payloadEdit,
  getSpecialData,
  drinksObj,
  setDrinksObj,
}) {
  const drinksRef = useRef(null);

  // Create Object & setDrinksObj
  const drinksObject = (object) => {
    console.log(object);
    const Obj = {
      drinksCode: object?.code,
      drinksName: object?.softDrinkName,
      price: object?.price,
    };
    setDrinksObj(Obj);
  };

  // Get Current Obj
  const current = () => {
    if (drinksRef.current) {
      const selectedPops = getSpecialData?.pops.find(
        (items) => items?.code === drinksRef.current.value
      );
      const selectedBottle = getSpecialData?.bottle?.find(
        (items) => items?.code === drinksRef.current.value
      );
      if (selectedPops !== undefined) {
        drinksObject(selectedPops);
      } else {
        drinksObject(selectedBottle);
      }
    }
  };

  // handle Drinks
  const handleDrinks = () => {
    current();
  };

  // ---- UseEffect ----
  // UseEffect - Reset
  useEffect(() => {
    if (reset) {
      drinksRef.current.value = getSpecialData?.pops[0].code;
    }
  }, [reset]);
  useEffect(() => {
    current();
  }, []);
  // Populate - Edit
  useEffect(() => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      drinksRef.current.value = payloadEdit?.config?.drinks?.drinksCode;
    }
  }, [payloadEdit]);

  return (
    <select
      className="form-select mt-3 mb-3"
      ref={drinksRef}
      style={{ width: "200px" }}
      onChange={handleDrinks}
      value={drinksObj?.drinksCode}
    >
      {getSpecialData?.pops.map((data) => {
        return (
          <option key={data.code} value={data.code}>
            {data?.softDrinkName} - $ {Number(0.0).toFixed(2)}
          </option>
        );
      })}
      {getSpecialData?.bottle.map((data) => {
        return (
          <option key={data.code} value={data.code}>
            {data?.softDrinkName} - $ {Number(0.0).toFixed(2)}
          </option>
        );
      })}
    </select>
  );
}

export default NewDrinks;
