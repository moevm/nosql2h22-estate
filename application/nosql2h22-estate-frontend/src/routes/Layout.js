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
      <Row md={4}>
        <Col xs={6} md={4}>
          <div className="sidebar">
            <Sidebar />
          </div>
        </Col>
        <Col xs={12} md={8}>
          <Outlet/>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;