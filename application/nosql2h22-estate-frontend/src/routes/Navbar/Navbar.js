//React
import React from 'react'
import {
  Link
} from "react-router-dom";
import PropTypes from "prop-types"

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

//Styles
import './../../styles/Navbar.css'

const Navbar = (props) => {

  const adminLink = () => {
    if(props.isAuthorized === 'true'){
      return (
        <Link to="/adminProfile" style={{ textDecoration: 'none' }}>
          <div className="admin-link">
            <span className="icon">
              <FontAwesomeIcon icon={faUserCircle} />{' '}
            </span>
            <span className="item-text">
              Администратор
            </span>
          </div>
        </Link>
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