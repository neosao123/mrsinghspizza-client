import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/_main/Header";
import Footer from "../../components/_main/Footer";
import swal from "sweetalert";
import GlobalContext from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { LOGOUT } from "../../redux/authProvider/actionType";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import ProfileUpdate from "../../components/_main/Auth/ProfileUpdate";
import defaultAvatar from "../../assets/images/avatar.jpg";
import profileUpdateIcon from "../../assets/images/profileUpdateIcon.png";
import "../../assets/styles/MyAccount/profile.css";
import ViewProfile from "../../components/_main/Auth/ViewProfile";
import ChangePassword from "../../components/_main/Auth/ChangePassword";
import MyOrders from "../../components/_main/MyOrders";

function MyAccount() {
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [user, setUser] = globalCtx.user;
  const [cart, setCart] = globalCtx.cart;
  const [url, setUrl] = globalCtx.urlPath;
  const [productType, setProductType] = globalCtx.productType;
  const [userProfile, setUserProfiel] = useState();
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (isAuthenticated !== false) {
      swal({
        title: "Logout Confirmation",
        text: "Do you really want to logout?",
        icon: "warning",
        buttons: ["Cancel", "Logut"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          toast.success("Logged Out successfully");
          dispatch({ type: LOGOUT, payload: null });
          setTimeout(() => {
            setIsAuthenticated(false);
            setUser({});
            navigate("/");
          }, 500);
        } else {
        }
      });
    }
  };

  useEffect(() => {
    if (user != null) {
      if (user) {
        navigate("/my-account");
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <>
      <Header />
      <div className="container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="orderList">
          <Row className="">
            <Col sm={2} md={4} lg={3} className="sideMenu py-5 px-3">
              <div className="profile d-flex justify-content-center align-items-center flex-column">
                <div className="profilePhoto rounded-circle">
                  <img src={defaultAvatar} alt="" width="100%" height="100%" />
                </div>
                <div className="py-2">
                  <strong>{user?.fullName}</strong>
                </div>
              </div>
              <Nav className="flex-column text-start py-4 navMenu">
                <Nav.Item>
                  <Nav.Link
                    eventKey="orderList"
                    className="text-start w-100 py-2 fw-bold btn btn-md pTabs border-bottom"
                  >
                    <i className="fa fa-table icons" aria-hidden="true"></i>
                    <span className="mx-3">My Orders</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="updatedProfile"
                    className="text-start w-100 py-2 fw-bold btn btn-md pTabs border-bottom"
                  >
                    <i className="fa fa-pencil icons" aria-hidden="true"></i>
                    <span className="mx-3">Update Profile</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="changePassword"
                    className="text-start w-100 py-2 fw-bold btn btn-md pTabs border-bottom"
                  >
                    <i className="fa fa-key icons" aria-hidden="true"></i>
                    <span className="mx-3">Change Password</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="fifth"
                    className="text-start w-100 py-2 fw-bold btn btn-md pTabs border-bottom"
                    onClick={handleLogout}
                  >
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    <span className="mx-3">Logout</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="orderList">
                  <MyOrders />
                </Tab.Pane>
                <Tab.Pane eventKey="updatedProfile">
                  <ProfileUpdate />
                </Tab.Pane>
                <Tab.Pane eventKey="changePassword">
                  <ChangePassword />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
      <Footer />
    </>
  );
}

export default MyAccount;
