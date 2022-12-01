import React from 'react'
import './../../styles/Navbar.css'
import PropTypes from "prop-types";

const Navbar = (props) => {

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
      <div className="admin-link">
        ADMIN
      </div>
    </div>
  );

};

Navbar.propTypes = {
  headerText: PropTypes.string,
  descText: PropTypes.string
}

export default Navbar;