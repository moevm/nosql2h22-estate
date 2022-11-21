import React from 'react'
import Sidebar from './Sidebar/Sidebar.js'
import './../styles/Layout.css'

import {
  Outlet
} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>  
  );
};

export default Layout;