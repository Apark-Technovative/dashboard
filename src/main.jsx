import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
     <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <App />
    </Provider>
  </React.StrictMode>
);