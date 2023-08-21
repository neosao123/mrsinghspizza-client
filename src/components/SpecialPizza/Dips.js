import React, { useEffect, useState } from "react";

function Dips({ data, dipsArr, setDipsArr, reset, payloadEdit }) {
  const [count, setCount] = useState(0);

  const handleDips = (isAdd) => {
    const dipsObject = {
      dipsCode: data.dipsCode,
      dipsName: data.dipsName,
      price: data?.price,
      qauntity: "1",
      amount: data?.price,
    };
    if (isAdd === true) {
      setDipsArr((prev) => [...prev, dipsObject]);
    } else {
      const removedArr = dipsArr.filter((items) => {
        if (items?.dipsCode === data?.dipsCode) {
          return items;
        }
      });
      const filteredArr = dipsArr?.filter(
        (items) => items.dipsCode !== data?.dipsCode
      );
      const mergedArr = removedArr.slice(0, -1).concat(filteredArr);
      setDipsArr(mergedArr);
    }
  };

  // Count Decrease
  const countDec = () => {
    if (count > 0) {
      setCount((count) => count - 1);
      handleDips(false);
    }
  };
  // Count Increase
  const countInc = () => {
    setCount((count) => count + 1);
    handleDips(true);
  };

  // ---- UseEffect ----
  // UseEffect - Reset
  useEffect(() => {
    if (reset) {
      setCount(0);
    }
  }, [reset]);
  // Populate - Edit
  useEffect(() => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      let qty = 0;
      payloadEdit?.config?.dips.map((items) => {
        if (items?.dipsCode === data?.dipsCode) {
          qty += Number(items.qauntity);
          setCount(qty);
        }
      });
    }
  }, [payloadEdit]);

  return (
    <>
      <div
        className="p-2 my-2 d-flex justify-content-between align-items-center border-bottom"
        key={data.dipsCode}
      >
        <span className="mx-2">{data.dipsName}</span>
        <div className="mx-1 d-flex align-items-center">
          <button className="quantityBtn mx-2" onClick={countDec}>
            <i className="fa fa-minus" aria-hidden="true"></i>
          </button>
          <span className="mx-1">{count}</span>
          <button className="quantityBtn mx-2" onClick={countInc}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
          <span className="mx-3"> $ {data?.price}</span>
        </div>
      </div>
    </>
  );
}

export default Dips;
