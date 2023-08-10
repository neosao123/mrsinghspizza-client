import React, { useEffect, useState } from "react";

function Dips({ data, reset, setDipsArr, dipsArr }) {
  const [dispButtonColor, setDispButtonColor] = useState("#606060");
  const [dipsButton, setDipsButton] = useState(false);
  const [qauntity, setQuantity] = useState(1);
  // Handle Drinks
  const handleDrinks = () => {
    if (dipsButton === false) {
      let totalPrice = Number(qauntity) * Number(data.price);
      const drinksObject = {
        dipsCode: data.dipsCode,
        dipsName: data.dipsName,
        price: data.price,
        qauntity: qauntity,
        totalPrice: totalPrice.toFixed(2),
      };
      setDipsArr((prev) => [...prev, drinksObject]);
      setDipsButton(true);
      setDispButtonColor("#e40000");
    } else {
      setDipsButton(false);
      setDispButtonColor("#606060");
      setQuantity(1);
      setDipsArr((prev) =>
        prev.filter((item) => item.drinksCode !== data.softdrinkCode)
      );
    }
  };
  // handle Quantity and TotalPrice
  const handleQuantity = (e) => {
    if (e.target.value > 1) {
      setQuantity(e.target.value);
      const updatedQuantity = dipsArr.map((dips) => {
        if (dips.dipsCode === data.dipsCode) {
          return {
            ...dips,
            qauntity: e.target.value,
          };
        }
        return dips;
      });
      if (updatedQuantity) {
        const updatedTotalPrice = updatedQuantity.map((dips) => {
          if (dips.dipsCode === data.dipsCode) {
            return {
              ...dips,
              totalPrice: (Number(dips.qauntity) * Number(dips.price)).toFixed(
                2
              ),
            };
          }
          return dips;
        });
        setDipsArr(updatedTotalPrice);
      }
    }
  };

  useEffect(() => {
    if (reset) {
      setQuantity(1);
      setDipsButton(false);
      setDispButtonColor("#606060");
    }
  }, [reset]);

  return (
    <div
      className="p-2 d-flex justify-content-between align-items-center border-bottom"
      key={data.dipsCode}
    >
      <span className="mx-2">{data.dipsName}</span>
      <div className="w-50 d-flex justify-content-end align-items-center">
        <input
          type="number"
          className="form-control text-end w-25"
          step={0.0}
          value={qauntity}
          onChange={handleQuantity}
        />
        <span className="mx-4">$ {data.price}</span>
        <button
          type="button"
          className="addbtn btn btn-sm px-4 text-white text-center"
          onClick={(e) => handleDrinks(e, data.softdrinkCode)}
          style={{
            backgroundColor: dispButtonColor,
            transition: ".3s",
            width: "100px",
          }}
        >
          {dipsButton === false ? "Add" : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default Dips;
