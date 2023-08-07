import React, { useEffect, useRef, useState } from "react";

function CountAsTwo({ data, setCountTwoToppingsArr, countTwoToppingsArr }) {
  const [tpsButton, setTpsButton] = useState(false);
  const tpsRef = useRef(null);

  // Handle Toppings When Add Button
  const handleTwoToppings = () => {
    if (tpsButton === false) {
      console.log("tpsBtnText : ", data.toppingsCode);
      if (tpsRef.current) {
        const toppingsObject = {
          toppingsCode: data?.toppingsCode,
          toppingsName: data?.toppingsName,
          toppingsPrice: data?.price ? data?.price : "0",
          toppingsPlacement: tpsRef.current.value,
        };
        setCountTwoToppingsArr((prev) => [...prev, toppingsObject]);
        setTpsButton(true);
        console.log("Count After Toppings Added : ", countTwoToppingsArr);
      }
    } else {
      setTpsButton(false);
      tpsRef.current.value = "Whole";
      setCountTwoToppingsArr((prev) =>
        prev.filter((item) => item.toppingsCode !== data.toppingsCode)
      );
      console.log("Count After Toppings Removed : ", countTwoToppingsArr);
    }
  };
  // Handle Placement And Update Array
  const handlePlacement = () => {
    const updatedData = countTwoToppingsArr.map((tps) => {
      if (tps.toppingsCode === data.toppingsCode) {
        return {
          ...tps,
          toppingsPlacement: tpsRef.current.value,
        };
      }
      return tps;
    });
    setCountTwoToppingsArr(updatedData);
  };

  useEffect(() => {
    if (countTwoToppingsArr.length === 0) {
      setTpsButton(false);
      tpsRef.current.value = "Whole";
    }
  }, [tpsButton, countTwoToppingsArr]);
  return (
    <div
      className="d-flex justify-content-between align-items-center py-3 border-bottom"
      key={data.toppingsCode}
    >
      <div className="d-flex flex-column">
        <span className="mb-3 text-left mx-1">{data.toppingsName}</span>
        <select
          className="form-select w-100"
          defaultValue={"Whole"}
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
          className="addbtn btn btn-sm px-4 text-white"
          onClick={(e) => handleTwoToppings(e, data.toppingsCode)}
        >
          {tpsButton === false ? "Add" : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default CountAsTwo;
