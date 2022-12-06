import React from 'react'
import './../../styles/Navbar.css'

import PropTypes from "prop-types";

const Navbar = (props) => {

  const adminLink = () => {
    if(props.isAuthorized === 'true'){
      return (
        <div className="admin-link">
          ADMIN
        </div>
      )
    }else{
      return <div></div>
    }
  }

  return (
    <div>
      <div className="text-content">
        <span className="header-text-theme">
          {props.headerText}
        </span>
        <p>
          <span className="header-text-description">
            {props.descText}
          </span>
        </p>
      </div>
      {adminLink()}
    </div>
  );

};

Navbar.propTypes = {
  headerText: PropTypes.string,
  descText: PropTypes.string,
  isAuthorized: PropTypes.string
}

export default Navbar;