import React from "react";

function CartList({ cData }) {
  return (
    <div className="row m-0 px-1 py-3 list-item">
      <div className="col-lg-6 mb-2">
        <strong>{cData.productName}</strong>
      </div>
      <div className="col-lg-6 text-end mb-2">
        <strong>$ {cData.totalPrice}</strong>
      </div>
      <div className="col-lg-6 text-start mb-3">
        <strong>Quantity :</strong> <span className="mx-2">1</span>
      </div>
      <div className="col-lg-6 mb-2 text-end">
        {cData.size ? (
          <>
            <strong className="mx-1">Size : </strong>
            <span>{cData.size}</span>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="col-lg-12 mt-1">
        <i className="fa fa-trash deleteIcon" aria-hidden="true"></i>
        <i className="fa fa-edit editIcon mx-3" aria-hidden="true"></i>
      </div>
    </div>
  );
}

export default CartList;
