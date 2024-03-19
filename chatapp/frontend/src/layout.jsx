import React from "react";
import { Outlet } from "react-router-dom";
import './index.css'
function Layout() {
  return (
    <div className="main__layout__container">
      <Outlet />
    </div>
  );
}

export default Layout;
