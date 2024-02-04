import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "./sass/main.scss";
import { fetchBlogs } from "./services/blogs";
import { handleAuthStateChange } from "./services/user";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(fetchBlogs());
handleAuthStateChange();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
