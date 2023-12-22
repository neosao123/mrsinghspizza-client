import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { HelmetProvider, Helmet } from "react-helmet-async";
import MetaTag from "./components/_main/MetaTag";
import { GlobalProvider } from "./context/GlobalContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <MetaTag />
        <GlobalProvider>
          <BrowserRouter basename="/test">
            <App />
          </BrowserRouter>
        </GlobalProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
