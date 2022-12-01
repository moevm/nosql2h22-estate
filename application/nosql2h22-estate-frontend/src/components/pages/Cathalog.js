import React from 'react'
import Navbar from './../../routes/Navbar/Navbar.js'
import './../../styles/Cathalog.css'

import CathalogComponent from './Cathalog/CathalogComponent.js'

const Cathalog = () => {
  
  return (
    <div>
      <div className="navbar">
        <Navbar headerText={"Каталог жилищного фонда"} descText={"Ниже представлена таблица с информацией о жилых домах"}/>
      </div>
      <div className="cathalog-component">
        <CathalogComponent/>
      </div>
    </div>
  );

};

export default Cathalog;