import React, { useEffect, useRef, useState } from "react";

function CountAsTwo({
  data,
  count,
  pizzaState,
  setPizzaState,
  reset,
  payloadEdit,
}) {
  const twoTpsRef = useRef(null);
  const [tpsButton, setTpsButton] = useState(false);
  const [tpsButtonColor, setTpsButttonColor] = useState("#606060");

  const handleTwoToppings = () => {
    if (tpsButton === false) {
      if (twoTpsRef.current) {
        const tpsObject = {
          toppingsCode: data?.toppingsCode,
          toppingsName: data?.toppingsName,
          toppingsPrice: data?.price ? data?.price : "0",
          toppingsPlacement: twoTpsRef.current.value,
        };
        let arr = [...pizzaState];
        arr[count - 1].toppings.countAsTwo = [
          ...arr[count - 1].toppings.countAsTwo,
          tpsObject,
        ];
        setPizzaState(arr);
        setTpsButton(true);
        setTpsButttonColor("#e40000");
      }
    } else {
      setTpsButton(false);
      setTpsButttonColor("#606060");
      twoTpsRef.current.value = "Whole";
      const updatedArr = pizzaState[count - 1].toppings.countAsTwo.filter(
        (item) => item.toppingsCode !== data.toppingsCode
      );
      let arr = [...pizzaState];
      arr[count - 1].toppings = {
        ...arr[count - 1].toppings,
        countAsTwo: updatedArr,
      };
      setPizzaState(arr);
    }
  };

  const handleTwoTpsPlacement = () => {
    if (twoTpsRef.current) {
      const filteredArr = pizzaState[count - 1].toppings.countAsTwo.map(
        (items) => {
          if (items.toppingsCode === data.toppingsCode) {
            return {
              ...items,
              toppingsPlacement: twoTpsRef.current.value,
            };
          }
          return items;
        }
      );
      let arr = [...pizzaState];
      arr[count - 1].toppings = {
        ...arr[count - 1].toppings,
        countAsTwo: filteredArr,
      };
      setPizzaState(arr);
    }
  };

  // ---- UseEffect ----
  // UseEffect For Reset
  useEffect(() => {
    if (reset) {
      setTpsButton(false);
      setTpsButttonColor("#606060");
      twoTpsRef.current.value = "Whole";
    }
  }, [reset]);
  // Populate - Edit
  useEffect(() => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      payloadEdit?.config?.pizza[count - 1]?.toppings?.countAsTwo.map(
        (items) => {
          if (items?.toppingsCode === data?.toppingsCode) {
            setTpsButton(true);
            setTpsButttonColor("#e40000");
            twoTpsRef.current.value = items?.toppingsPlacement;
          }
        }
      );
    }
  }, [payloadEdit]);

  return (
    <div
      className="d-flex justify-content-between align-items-center py-3 border-bottom"
      key={data.toppingsCode}
    >
      <div className="d-flex flex-column">
        <span className="mb-3 text-left mx-1">{data.toppingsName}</span>
        <select
          className="form-select w-100"
          ref={twoTpsRef}
          onChange={handleTwoTpsPlacement}
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
          onClick={handleTwoToppings}
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

export default CountAsTwo;
