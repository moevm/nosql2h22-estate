import React from 'react'
import Sidebar from './Sidebar/Sidebar.js'
import './../styles/Layout.css'

import {
  Outlet
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Layout = () => {
  return (
    <Container fluid>
      <div className="container-content">
        <Row md={4}>
          <Col xs={3} md={2}>
            <div className="sidebar">
              <Sidebar />
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

export default Layout;