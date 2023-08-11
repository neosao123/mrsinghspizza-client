import React, { useEffect, useRef, useState } from "react";

function Sides({ data, setSidesArr, sidesArr, reset, payloadEdit }) {
  const sidesRef = useRef(null);
  const [sideButton, setSideButton] = useState(false);
  const [sideButtonColor, setSideButtonColor] = useState("#606060");
  // Handle Sides
  const handleSides = () => {
    if (sideButton === false) {
      if (sidesRef.current) {
        const combinationData = data?.combination?.find(
          (data) => data.lineCode === sidesRef.current.value
        );
        console.log("combinationData :", combinationData);
        const sidesObject = {
          sideCode: data?.sideCode,
          sideName: data?.sideName,
          lineCode: combinationData?.lineCode,
          sidePrice: combinationData?.price,
          sideSize: combinationData?.size,
        };
        setSidesArr((prev) => [...prev, sidesObject]);
        setSideButton(true);
        setSideButtonColor("#e40000");
      }
    } else {
      setSideButton(false);
      setSideButtonColor("#606060");
      sidesRef.current.value = data?.combination[0]?.lineCode;
      setSidesArr((prev) =>
        prev.filter((item) => item.sideCode !== data.sideCode)
      );
    }
  };
  // Handle Combinations
  const handleCombination = () => {
    if (sidesRef.current) {
      const value = data?.combination?.find(
        (code) => code.lineCode === sidesRef.current.value
      );
      const updatedCombination = sidesArr?.map((sides) => {
        console.log("data :", sides);
        if (sides.sideCode === data.sideCode) {
          console.log("combinationData", value);
          return {
            ...sides,
            lineCode: value?.lineCode,
            sidePrice: value?.price,
            sideSize: value?.size,
          };
        }
        return sides;
      });
      setSidesArr(updatedCombination);
    }
  };
  useEffect(() => {
    if (reset) {
      setSideButton(false);
      setSideButtonColor("#606060");
      sidesRef.current.value = data?.combination[0]?.lineCode;
    }
  }, [reset]);

  // Populate - Edit
  useEffect(() => {
    if (payloadEdit) {
      payloadEdit?.config?.sides.map((items) => {
        if (items?.sideCode === data?.sideCode) {
          setSideButton(true);
          setSideButtonColor("#e40000");
          sidesRef.current.value = items?.lineCode;
        }
      });
    }
  }, [payloadEdit]);

  return (
    <div
      className="p-2 d-flex justify-content-between align-items-center border-bottom"
      key={data.sideCode}
    >
      <span className="mx-2">{data.sideName}</span>
      <div className="w-50 d-flex justify-content-end">
        <select
          className="form-select w-50 mx-4 d-inline-block"
          ref={sidesRef}
          onChange={handleCombination}
        >
          {data?.combination?.map((combination) => {
            return (
              <option key={combination.lineCode} value={combination.lineCode}>
                {combination.size} - ${combination.price}
              </option>
            );
          })}
        </select>
        <button
          type="button"
          className="addbtn btn btn-sm px-4 text-white"
          onClick={handleSides}
          style={{
            backgroundColor: sideButtonColor,
            transition: ".3s",
            width: "100px",
          }}
        >
          {sideButton === false ? "Add" : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default Sides;
