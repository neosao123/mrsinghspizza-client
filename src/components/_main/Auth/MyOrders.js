import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import GlobalContext from "../../../context/GlobalContext";
import { getOrderList } from "../../../services";

function MyOrders() {
  const columns = [
    {
      name: "Order Code",
      selector: (row) => {
        return <span>{row?.orderCode}</span>;
      },
    },
    {
      name: "Order Date",
      selector: (row) => {
        return <span>{row?.created_at}</span>;
      },
    },
    {
      name: "Order Status",
      selector: (row) => {
        return <span>{}</span>;
      },
    },
    {
      name: "Payment Status",
      selector: (row) => {
        return <span>{}</span>;
      },
    },
    {
      name: "GrandTotal",
      selector: (row) => {
        return <span>$ {row?.grandTotal}</span>;
      },
    },
    {
      name: "Payment Id",
      selector: (row) => {
        return <span>{}</span>;
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-dropdown">
          <button className="btn btn-sm viewOrder">View</button>
          <button className="btn btn-sm cancelOrder">Cancel</button>
        </div>
      ),
    },
  ];

  const globalCtx = useContext(GlobalContext);
  const [user, setUser] = globalCtx.user;
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [paymentOrderId, setPaymentOrderId] = useState();
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState();

  // Hand
  const fetchData = async (page) => {
    try {
      setLoading(true);
      const payload = {
        fromDate: fromDate ? fromDate : "",
        toDate: toDate ? toDate : "",
        paymentOrderId: paymentOrderId,
        customerCode: "CST_46", //user?.customerCode,
        page: page,
      };
      await getOrderList(payload)
        .then((response) => {
          setData(response.data);
          setTotalRows(response.totalCount);
          setPerPage(response.perPage);
          setCurrentPage(response.currentPage);
          setLoading(false);
        })
        .catch((err) => {
          console.log("No Data Found", err);
        });
    } catch {
      setLoading(false);
    }
  };
  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    try {
      setLoading(true);
      const payload = {
        fromDate: fromDate ? fromDate : "",
        toDate: toDate ? toDate : "",
        paymentOrderId: paymentOrderId,
        customerCode: "CST_46", //user?.customerCode,
        page: page,
      };
      await getOrderList(payload)
        .then((response) => {
          setData(response.data);
          setTotalRows(response.totalCount);
          setPerPage(response.perPage);
          setCurrentPage(response.currentPage);
          setLoading(false);
        })
        .catch((err) => {
          console.log("No Data Found", err);
        });
    } catch {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(1);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="container py-5">
      <div className="row align-items-end">
        <div className="col-lg-3 col-md-6 col-sm-12 my-1">
          <label className="form-label my-3 searchLabel">From Date</label>
          <input
            className="form-control searchInput"
            type="date"
            onChange={(e) => {
              setFromDate(e.target.value);
            }}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 my-1">
          <label className="form-label my-3 searchLabel">To Date</label>
          <input
            className="form-control searchInput"
            type="date"
            onChange={(e) => {
              setToDate(e.target.value);
            }}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 my-1">
          <label className="form-label my-3 searchLabel">
            Payment Order ID
          </label>
          <input
            className="form-control searchInput"
            type="text"
            onChange={(e) => {
              setPaymentOrderId(e.target.value);
            }}
          />
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 my-1">
          <button
            type="w-100 button"
            className="btn btn-lg searchBtn"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="col-12 pt-4">
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
