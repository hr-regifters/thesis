"use strict"

import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Concoction from './Concoction.jsx';
import currUrl from './../../../currUrl';

export default class HomeView extends React.Component {
  logout() {
    let context = this;
    fetch(`${currUrl}/api/user/logout`, {
      method: 'GET',
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('Successful logout');
        localStorage.removeItem('regiftUsername');
        context.props.changeViewTo('verify');
        sessionStorage.setItem('appState', '{}');
      } else {
        throw new Error('Cannot log out');
      }
    })
    .catch((err) => { console.log(err) });
  }

  transitionToAddConcoction() {
    // css animations
    // change view on app state to addConcoction
    this.props.changeViewTo('addConcoction');
  }

  render() {
    // <h3 className="pull-right"> Profile </h3>
    return (
      <div id="HomeView">
        <nav className="navbar navbar-default navbar-fixed-top"> 
          <div className="container-fluid Mod">
          <h3 className="pull-right"> My Concoctions </h3>
          <div onClick={() => { this.logout() }}>
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
                      <Concoction concoctionInfo={concoction} servicesDetail={this.props.appState.servicesDetail} />
                    </Col>
                  );
                })
                : null
              }
            </Row>
            <Row>
              <div onClick={() => { this.transitionToAddConcoction() }} id="newConcoctionButton">
                <h3>Add Concoction</h3>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
