import React from "react";

function MyOrders() {
  //   order no
  //   order date
  //   order status
  //   payment status
  //   grantotal
  //   payment id
  //   Action - View & Cancel Order

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4">
          <label className="form-label mb-3">From Date</label>
          <input className="form-control" type="date" />
        </div>
        <div className="col-lg-4">
          <label className="form-label mb-3">To Date</label>
          <input className="form-control" type="date" />
        </div>
        <div className="col-lg-4">
          <label className="form-label mb-3">Delivery Type</label>
          <input className="form-control" type="date" />
        </div>
        <div className="col-lg-4">
          <label className="form-label mb-3">Receipt Number</label>
          <input className="form-control" type="date" />
        </div>
        <div className="col-lg-4">
          <label className="form-label mb-3">Order Status</label>
          <input className="form-control" type="date" />
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
