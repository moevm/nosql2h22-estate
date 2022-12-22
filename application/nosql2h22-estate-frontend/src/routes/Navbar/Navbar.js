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

  const AdminLink = () => {
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
  }

  const LoginLink = () => {
      return (
          <Link to="/auth" style={{ textDecoration: 'none' }}>
              <div className="admin-link">
            <span className="item-text">
              Войти
            </span>
              </div>
          </Link>
      )
  }

  const MakeLink = () => {
      if(props.isAuthorized === 'true'){
          return (
              <>{AdminLink()}</>
          )

      }else{
          return (
              <>{LoginLink()}</>
          )
      }
  }

  const HiddenLink = () => {
      if(props.isAuthorized !== 'hidden') {
          return (
              <>{MakeLink()}</>
          )
      } else {
          return (
              <></>
          )
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
      {HiddenLink()}
    </div>
  );

};

Navbar.propTypes = {
  headerText: PropTypes.string,
  descText: PropTypes.string,
  isAuthorized: PropTypes.string
}

export default Navbar;