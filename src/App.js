import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import "animate.css";
import "./assets/styles/style.css";
import "./assets/styles/colors.css";
import "./assets/styles/custom.css";
import "./assets/styles/responsive.css";
import Home from "./pages/Home";
import MetaTag from "./components/_main/MetaTag";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <>
      <div id="wrapper">
        <AllRoutes />
      </div>
      <ToastContainer hideProgressBar={true} />
    </>
  );
}

export default App;
