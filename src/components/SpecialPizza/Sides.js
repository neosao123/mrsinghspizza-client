import React, { useEffect, useRef, useState } from "react";

function Sides({ data, sidesArr, setSidesArr, reset, payloadEdit }) {
  const sidesRef = useRef(null);
  const [sidesButton, setSidesButton] = useState(false);
  const [sidesButtonColor, setSidesButtonColor] = useState("#606060");

  // handle Sides
  const handleSides = () => {
    if (sidesButton === false) {
      if (sidesRef.current) {
        const combinationData = data?.lineEntries?.find(
          (data) => data.code === sidesRef.current.value
        );
        const sidesObject = {
          sideCode: data?.code,
          sideName: data?.sideName,
          lineCode: combinationData?.code,
          sidePrice: combinationData?.price,
          sideSize: combinationData?.size,
        };
        setSidesArr((prev) => [...prev, sidesObject]);
        setSidesButton(true);
        setSidesButtonColor("#e40000");
      }
    } else {
      setSidesButton(false);
      setSidesButtonColor("#606060");
      sidesRef.current.value = data?.lineEntries[0]?.code;
      setSidesArr((prev) => prev.filter((item) => item.sideCode !== data.code));
    }
  };
  // Handle Combinations
  const handleCombination = () => {
    if (sidesRef.current) {
      const value = data?.lineEntries?.find(
        (data) => data.code === sidesRef.current.value
      );
      const updatedCombination = sidesArr?.map((sides) => {
        if (sides.sideCode === data.code) {
          return {
            ...sides,
            lineCode: value?.code,
            sidePrice: value?.price,
            sideSize: value?.size,
          };
        }
        return sides;
      });
      setSidesArr(updatedCombination);
    }
  };

  // ---- UseEffect ----
  // UseEffect For Reset
  useEffect(() => {
    if (reset) {
      setSidesButton(false);
      setSidesButtonColor("#606060");
      sidesRef.current.value = data?.lineEntries[0]?.code;
    }
  }, [reset]);
  // Populate - Edit
  useEffect(() => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      payloadEdit?.config?.sides.map((items) => {
        if (items?.sideCode === data?.code) {
          setSidesButton(true);
          setSidesButtonColor("#e40000");
          sidesRef.current.value = items?.lineCode;
        }
      });
    }
  }, [payloadEdit]);
  return (
    <div
      className="p-2 d-flex justify-content-between align-items-center border-bottom"
      key={data.code}
    >
      <span className="mx-2">{data.sideName}</span>
      <div className="w-50 d-flex justify-content-end">
        <select
          className="form-select w-50 mx-4 d-inline-block"
          ref={sidesRef}
          onClick={handleCombination}
        >
          {data.lineEntries.map((combination) => {
            return (
              <option value={combination.code} key={combination.code}>
                {combination.size} - $ {combination.price}
              </option>
            );
          })}
        </select>
        <button
          type="button"
          className="btn btn-sm px-4 text-white"
          onClick={handleSides}
          style={{
            backgroundColor: sidesButtonColor,
            transition: ".3s",
            width: "100px",
          }}
        >
          {sidesButton === false ? "Add" : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default Sides;
