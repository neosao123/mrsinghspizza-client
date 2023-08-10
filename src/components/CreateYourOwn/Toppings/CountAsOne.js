import React, { useEffect, useRef, useState } from "react";

function CountAsOne({
  data,
  countOneToppingsArr,
  setCountOneToppingsArr,
  reset,
}) {
  const tpsRef = useRef(null);
  const [tpsButton, setTpsButton] = useState(false);
  const [tpsButtonColor, setTpsButttonColor] = useState("#606060");

  // Handle Toppings When Add Button
  const handleTwoToppings = () => {
    if (tpsButton === false) {
      if (tpsRef.current) {
        const toppingsObject = {
          toppingsCode: data?.toppingsCode,
          toppingsName: data?.toppingsName,
          toppingsPrice: data?.price ? data?.price : "0",
          toppingsPlacement: tpsRef.current.value,
        };
        setCountOneToppingsArr((prev) => [...prev, toppingsObject]);
        setTpsButton(true);
        setTpsButttonColor("#e40000");
      }
    } else {
      setTpsButton(false);
      setTpsButttonColor("#606060");
      tpsRef.current.value = "Whole";
      setCountOneToppingsArr((prev) =>
        prev.filter((item) => item.toppingsCode !== data.toppingsCode)
      );
    }
  };
  // Handle Placement And Update Array
  const handlePlacement = () => {
    const updatedData = countOneToppingsArr.map((tps) => {
      if (tps.toppingsCode === data.toppingsCode) {
        return {
          ...tps,
          toppingsPlacement: tpsRef.current.value,
        };
      }
      return tps;
    });
    setCountOneToppingsArr(updatedData);
  };

  useEffect(() => {
    if (reset) {
      setTpsButton(false);
      setTpsButttonColor("#606060");
      tpsRef.current.value = "Whole";
    }
  }, [reset]);

  return (
    <div
      className="d-flex justify-content-between align-items-center py-3 border-bottom"
      key={data.toppingsCode}
    >
      <div className="d-flex flex-column">
        <span className="mb-3 text-left mx-1">{data.toppingsName}</span>
        <select
          className="form-select w-100"
          ref={tpsRef}
          onChange={handlePlacement}
        >
          <option value="Whole">Whole</option>
          <option value="Left Half">Left Half</option>
          <option value="Right Half">Right Half</option>
        </select>
      </div>
      <div className="d-flex flex-column">
        <span className="mb-3 text-end mx-1">$ {data.price}</span>
        <button
          type="button"
          className="btn btn-sm px-4 text-white"
          onClick={(e) => handleTwoToppings(e, data.toppingsCode)}
          style={{
            backgroundColor: tpsButtonColor,
            transition: ".3s",
            width: "100px",
          }}
        >
          {tpsButton === false ? "Add" : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default CountAsOne;