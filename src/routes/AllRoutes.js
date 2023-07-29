import { HashRouter, Route, Routes } from "react-router-dom";
import CreateYourOwn from "../pages/CreateYourOwn";
import Home from "../pages/Home";
import SpecialMenu from "../pages/SpecialMenu";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact index path="/" Component={Home} />
      <Route exact path="/create-your-own" Component={CreateYourOwn} />
      <Route exact path="/special-pizza/:sid" Component={SpecialMenu} />
    </Routes>
  );
};

export default AllRoutes;
