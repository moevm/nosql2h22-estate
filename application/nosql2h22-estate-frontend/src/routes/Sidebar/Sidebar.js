import React from 'react'
import './../../styles/Sidebar.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Cathalog from './../../components/pages/Cathalog.js'
import Map from './../../components/pages/Map.js'

const Sidebar = () => {

  return (
    <div>
      <div>
        <Link to="/">Каталог</Link>
      </div>
      <div>
        <Link to="/map">Карта</Link>
      </div>
    </div>
  );

};

export default Sidebar;