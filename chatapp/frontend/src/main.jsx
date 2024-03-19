import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./layout.jsx";
import { chatLoader } from "./loaders/chatLoader.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route loader={chatLoader} path="" element={<App />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
