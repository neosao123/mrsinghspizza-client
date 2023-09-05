import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import GlobalContext from "../../../context/GlobalContext";
import { getOrderList } from "../../../services";
import ViewOrder from "./ViewOrder";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function MyOrders() {
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
  const [viewOrder, setViewOrder] = useState(false);
  const [selectedCode, setSelectedCode] = useState();

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
          <button
            className="btn btn-sm viewOrder"
            onClick={(e) => {
              setViewOrder(true);
              setSelectedCode(row?.code);
            }}
          >
            View
          </button>
          <button className="btn btn-sm cancelOrder d-none">Cancel</button>
        </div>
      ),
    },
  ];

  // Handle
  const fetchData = async (page) => {
    try {
      setLoading(true);
      const payload = {
        fromDate: fromDate ? fromDate : "",
        toDate: toDate ? toDate : "",
        paymentOrderId: paymentOrderId,
        customerCode: user?.customerCode,
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
        customerCode: user?.customerCode,
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
    <>
      {viewOrder === false ? (
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
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center py-4 px-2">
          {/* Back Button */}
          <div
            className="w-100 container-fluid p-0 m-0 pt-2 pb-4 px-4 text-start"
            onClick={() => {
              setViewOrder(false);
            }}
          >
            <IoArrowBackCircleOutline
              style={{ width: "1.6rem", height: "1.6rem", cursor: "pointer" }}
              className="text-secondary"
            />
          </div>
          <ViewOrder selectedCode={selectedCode} />
        </div>
      )}
    </>
  );
}

export default MyOrders;
