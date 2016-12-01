"use strict"

import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Concoction from './Concoction.jsx';

export default class HomeView extends React.Component {
  render() {
    return (
      <div id="HomeView">
        <nav className="navbar navbar-default navbar-fixed-top"> 
          <div className="container-fluid Mod">
            <h3>Regift3d</h3>
            <h3>-</h3>
            <h3 onClick={() => { this.props.changeViewTo('home') }}>Concoctions </h3>
            <h3 onClick={() => { this.props.funcs.logout() }}>Logout</h3>
          </div>
        </nav>
        <div id="concoctions">
          <div className="container-fluid"> 
            <Row>
              {
                this.props.appState.concoctions.length !== 0 ?
                this.props.appState.concoctions.map((concoction) => {
                  return (
                    <Col md={3}>
                      <Concoction concoctionInfo={concoction} />
                    </Col>
                  );
                })
                : this.props.appState.message.map(() => {
                  
                  return (
                  <div className='message'>
                  
                  <h4 className='head'>Welcome to Regift3d!</h4>
                
                  <h4 className='bod'>This is a place you can automate all your favorite web services so they work smarter together</h4>
                  <h4 className='bod'>To get started, hit the 'Add Concoction' button to begin brewing</h4>
                  </div>
                  );
                })
              }
            </Row>
            <Row>
              <div onClick={() => { this.props.changeViewTo('addConcoction') }} id="newConcoctionButton">
                <h3 className="newConcoctionTxt">Add Concoction</h3>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
