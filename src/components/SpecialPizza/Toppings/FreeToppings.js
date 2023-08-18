import React, { useEffect, useRef, useState } from "react";

function FreeToppings({ data, count, pizzaState, setPizzaState, reset }) {
  const freeTpsRef = useRef(null);
  const [tpsButton, setTpsButton] = useState(false);
  const [tpsButtonColor, setTpsButttonColor] = useState("#606060");

  const handleFreeToppings = () => {
    if (tpsButton === false) {
      if (freeTpsRef.current) {
        const tpsObject = {
          toppingsCode: data?.toppingsCode,
          toppingsName: data?.toppingsName,
          toppingsPrice: data?.price ? data?.price : "0",
          toppingsPlacement: freeTpsRef.current.value,
        };
        let arr = [...pizzaState];
        arr[count - 1].toppings.freeToppings = [
          ...arr[count - 1].toppings.freeToppings,
          tpsObject,
        ];
        setPizzaState(arr);
        setTpsButton(true);
        setTpsButttonColor("#e40000");
      }
    } else {
      setTpsButton(false);
      setTpsButttonColor("#606060");
      freeTpsRef.current.value = "Whole";
      const updatedArr = pizzaState[count - 1].toppings.freeToppings.filter(
        (item) => item.toppingsCode !== data.toppingsCode
      );
      let arr = [...pizzaState];
      arr[count - 1].toppings = {
        ...arr[count - 1].toppings,
        freeToppings: updatedArr,
      };
      setPizzaState(arr);
    }
  };

  const handleFreeTpsPlacement = () => {
    if (freeTpsRef.current) {
      const filteredArr = pizzaState[count - 1].toppings.freeToppings.map(
        (items) => {
          if (items.toppingsCode === data.toppingsCode) {
            return {
              ...items,
              toppingsPlacement: freeTpsRef.current.value,
            };
          }
          return items;
        }
      );
      let arr = [...pizzaState];
      arr[count - 1].toppings = {
        ...arr[count - 1].toppings,
        freeToppings: filteredArr,
      };
      setPizzaState(arr);
    }
  };

  useEffect(() => {
    if (reset) {
      setTpsButton(false);
      setTpsButttonColor("#606060");
      freeTpsRef.current.value = "Whole";
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
          ref={freeTpsRef}
          onChange={handleFreeTpsPlacement}
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
          onClick={handleFreeToppings}
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

export default FreeToppings;
