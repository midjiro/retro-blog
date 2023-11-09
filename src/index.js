import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./components/styled/GlobalStyles.styled";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>
);
