import React, { useEffect, useRef, useState } from "react";

function CountAsOne({
  count,
  data,
  pizzaState,
  setPizzaState,
  reset,
  payloadEdit,
}) {
  const oneTpsRef = useRef(null);
  const [tpsButton, setTpsButton] = useState(false);
  const [tpsButtonColor, setTpsButttonColor] = useState("#606060");

  const handleOneToppings = () => {
    if (tpsButton === false) {
      if (oneTpsRef.current) {
        const tpsObject = {
          toppingsCode: data?.toppingsCode,
          toppingsName: data?.toppingsName,
          toppingsPrice: data?.price ? data?.price : 0,
          toppingsPlacement: oneTpsRef.current.value,
          amount: data?.price,
          pizzaIndex: count - 1,
        };
        let arr = [...pizzaState];
        arr[count - 1].toppings.countAsOne = [
          ...arr[count - 1].toppings.countAsOne,
          tpsObject,
        ];
        setPizzaState(arr);
        setTpsButton(true);
        setTpsButttonColor("#e40000");
      }
    } else {
      setTpsButton(false);
      setTpsButttonColor("#606060");
      oneTpsRef.current.value = "Whole";
      const updatedArr = pizzaState[count - 1].toppings.countAsOne.filter(
        (item) => item.toppingsCode !== data.toppingsCode
      );
      let arr = [...pizzaState];
      arr[count - 1].toppings = {
        ...arr[count - 1].toppings,
        countAsOne: updatedArr,
      };
      setPizzaState(arr);
    }
  };

  const handleOneTpsPlacement = () => {
    if (oneTpsRef.current) {
      const filteredArr = pizzaState[count - 1].toppings.countAsOne.map(
        (items) => {
          if (items.toppingsCode === data.toppingsCode) {
            return {
              ...items,
              toppingsPlacement: oneTpsRef.current.value,
            };
          }
          return items;
        }
      );
      let arr = [...pizzaState];
      arr[count - 1].toppings = {
        ...arr[count - 1].toppings,
        countAsOne: filteredArr,
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
      oneTpsRef.current.value = "Whole";
    }
  }, [reset]);
  // Populate - Edit
  useEffect(() => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      payloadEdit?.config?.pizza[count - 1]?.toppings?.countAsOne.map(
        (items) => {
          if (items?.toppingsCode === data?.toppingsCode) {
            setTpsButton(true);
            setTpsButttonColor("#e40000");
            oneTpsRef.current.value = items?.toppingsPlacement;
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
          ref={oneTpsRef}
          onChange={handleOneTpsPlacement}
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
          onClick={handleOneToppings}
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
