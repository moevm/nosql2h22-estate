import React from 'react'
import './../../styles/Sidebar.css'
import {
  Link
} from "react-router-dom";

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