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
      className="row gx-3 m-0 p-0 border-bottom align-items-center py-1 py-md-0"
      key={data.code}
    >
      <span className="col-lg-6 col-md-6 col-sm-12 pb-lg-0 pt-2 pt-md-0">
        {data.sideName}
      </span>
      <div className="col-lg-6 col-md-6 col-sm-12 pb-1">
        <div className="row gx-3 justify-content-lg-end justify-content-between py-2">
          <select
            className="col-lg-8 col-md-6 col-sm-6 mx-2 form-select"
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
            className="col-lg-4 col-md-6 col-sm-6 addbtn btn btn-sm px-4 text-white"
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
    </div>
  );
}

export default Sides;
