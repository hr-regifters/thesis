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
            <h3 className="pull-right"> My Concoctions </h3>
            <div onClick={() => { this.props.funcs.logout() }}>
              <h3 className="pull-right"> Logout </h3>
            </div>
            <h3 className ="navbar-left"> Regift3d</h3>
          </div>
        </nav>
        <div id="concoctions">
          <div className="container-fluid"> 
            <Row>
              {
                this.props.appState.concoctions !== undefined ?
                this.props.appState.concoctions.map((concoction) => {
                  return (
                    <Col xs={4}>
                      <Concoction concoctionInfo={concoction} />
                    </Col>
                  );
                })
                : null
              }
            </Row>
            <Row>
              <div onClick={() => { this.props.changeViewTo('addConcoction') }} id="newConcoctionButton">
                <h3>Add Concoction</h3>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
