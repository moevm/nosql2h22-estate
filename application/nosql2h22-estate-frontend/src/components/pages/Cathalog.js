//React
import React from 'react'
import PropTypes from 'prop-types'

//Components
import Navbar from './../../routes/Navbar/Navbar.js'
import CathalogComponent from './Cathalog/CathalogComponent.js'

//Styles
import './../../styles/Cathalog.css'
import { propTypes } from 'react-bootstrap/esm/Image.js'

const Cathalog = (props) => {

  return (
    <div>
      <div className="navbar">
        <Navbar headerText={"Каталог жилищного фонда"} descText={"Ниже представлена таблица с информацией о жилых домах"} isAuthorized={props.isAuthorized}/>
      </div>
      <div className="cathalog-component">
        <CathalogComponent/>
      </div>
    </div>
  );

};

Cathalog.propTypes = {
  isAuthorized: PropTypes.string,
  token: PropTypes.string
}

export default Cathalog;