import React from 'react'
import Sidebar from './Sidebar/Sidebar.js'
import Navbar from './Navbar/Navbar.js'
import './../styles/Layout.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Layout = () => {

  return (
    <div>
      <div className="sidebar">
        <Sidebar/>
      </div>

      <div className="navbar">
        <Navbar/>
      </div>

      <div className="content">
        Content
      </div>
    </div>  
  );

};

export default Layout;