import React from 'react'
import Sidebar from './Sidebar/Sidebar.js'
import './../styles/Layout.css'

import Cathalog from './../components/pages/Cathalog.js'
import Map from './../components/pages/Map.js'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const Layout = () => {

  return (
    <div>
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="content">  
        <Routes>
          <Route path="/" element={<Cathalog/>}/>
          <Route path="/map" element={<Map/>}/>
        </Routes>
      </div>
    </div>  
  );

};

export default Layout;