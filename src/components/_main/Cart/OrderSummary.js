import React from "react";

function OrderSummary({ cart }) {
  return (
    <>
      <input
        type="number"
        step={0.01}
        defaultValue={0.0}
        className="form-control mb-4 text-end d-none"
      />
      {/* SubTotal, TaxPer, GrandTotal */}
      <div className="row">
        <div className="d-flex justify-content-between">
          <div className="text-start mb-3">
            <strong>Sub Total : </strong>
          </div>
          <div className="text-end mb-3">
            <span className="mx-4">
              $ {cart?.subtotal ? cart?.subtotal : (0.0).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="text-start mb-3">
            <strong>Tax Percentage (%) : </strong>
          </div>
          <div className="text-end mb-3">
            <span className="mx-4">{cart?.taxPer ? cart?.taxPer : 0}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="text-start mb-3">
            <strong>Grand Total : </strong>
          </div>
          <div className="text-end mb-3">
            <span className="mx-4">
              $ {cart?.grandtotal ? cart?.grandtotal : (0.0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
