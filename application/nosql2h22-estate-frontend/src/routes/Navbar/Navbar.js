import React from 'react'
import './../../styles/Navbar.css'


const Navbar = () => {

  return (
    <div>
      <div className="text-content">
        <span className="header-text-theme">
          Каталог жилищного фонда
        </span>
        <p>
          <span className="header-text-description">
            Ниже представлена таблица с информацией о жилых домах
          </span>
        </p>
      </div>
      <div className="admin-link">
        ADMIN
      </div>
    </div>
  );

};

export default Navbar;