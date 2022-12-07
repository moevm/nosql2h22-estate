import React from 'react'
import PropTypes from 'prop-types'

import Sidebar from './Sidebar/Sidebar.js'
import './../styles/Layout.css'

import {
  Outlet
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Layout = (props) => {

  return (
    <Container fluid>
      <div className="container-content">
        <Row md={4}>
          <Col xs={3} md={2}>
            <div className="sidebar">
              <Sidebar handleAdminExit={props.handleAdminExit} isAuthorized={props.isAuthorized}/>
            </div>
          </Col>
          <Col xs={14} md={10}>
            <Outlet/>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

Layout.propTypes = {
  handleAdminExit: PropTypes.func,
  isAuthorized: PropTypes.string
}

export default Layout;