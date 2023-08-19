import React, { useEffect, useState } from "react";

function Drinks({ data, drinksArr, setDrinksArr, reset, payloadEdit }) {
  const [drinksButtonColor, setDrinksButtonColor] = useState("#606060");
  const [drinksButton, setDrinksButton] = useState(false);
  const [qauntity, setQuantity] = useState(1);
  // Handle Drinks
  const handleDrinks = () => {
    if (drinksButton === false) {
      let totalPrice = Number(qauntity) * Number(data.price);
      const drinksObject = {
        drinksCode: data.code,
        drinksName: data.softDrinkName,
        price: data.price,
        qauntity: qauntity,
        totalPrice: totalPrice.toFixed(2),
      };
      setDrinksArr((prev) => [...prev, drinksObject]);
      setDrinksButton(true);
      setDrinksButtonColor("#e40000");
    } else {
      setDrinksButton(false);
      setDrinksButtonColor("#606060");
      setQuantity(1);
      setDrinksArr((prev) =>
        prev.filter((item) => item.drinksCode !== data.code)
      );
    }
  };
  // handle Quantity and TotalPrice
  const handleQuantity = (e) => {
    if (e.target.value > 0) {
      setQuantity(e.target.value);
      const updatedQuantity = drinksArr.map((drinks) => {
        if (drinks.drinksCode === data.code) {
          return {
            ...drinks,
            qauntity: e.target.value,
          };
        }
        return drinks;
      });
      if (updatedQuantity) {
        const updatedTotalPrice = updatedQuantity.map((drinks) => {
          if (drinks.drinksCode === data.code) {
            return {
              ...drinks,
              totalPrice: (
                Number(drinks.qauntity) * Number(drinks.price)
              ).toFixed(2),
            };
          }
          return drinks;
        });
        setDrinksArr(updatedTotalPrice);
      }
    }
  };

  // ---- UseEffect ----
  // UseEffect For Reset
  useEffect(() => {
    if (reset) {
      setQuantity(1);
      setDrinksButton(false);
      setDrinksButtonColor("#606060");
    }
  }, [reset]);
  // Populate - Edit
  useEffect(() => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      payloadEdit?.config?.drinks.map((items) => {
        if (items?.drinksCode === data?.code) {
          setDrinksButton(true);
          setDrinksButtonColor("#e40000");
          setQuantity(items?.qauntity);
        }
      });
    }
  }, [payloadEdit]);

  return (
    <div
      className="p-2 d-flex justify-content-between align-items-center border-bottom"
      key={data.code}
    >
      <span className="mx-2">{data.softDrinkName}</span>
      <div className="w-50 d-flex justify-content-end align-items-center">
        <input
          type="number"
          className="form-control w-25 text-end"
          step={0.0}
          value={qauntity}
          onChange={handleQuantity}
        />
        <span className="mx-4">$ {data.price}</span>
        <button
          type="button"
          className="addbtn btn btn-sm px-4 text-white"
          onClick={handleDrinks}
          style={{
            backgroundColor: drinksButtonColor,
            transition: ".3s",
            width: "100px",
          }}
        >
          {drinksButton === false ? "Add" : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default Drinks;
