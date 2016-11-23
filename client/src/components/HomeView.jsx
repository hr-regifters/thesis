"use strict"

import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Concoction from './Concoction.jsx';
import currUrl from './../../../currUrl';

export default class HomeView extends React.Component {
  componentDidMount() {
    let context = this;
    console.log(this.props.appState, 'line 12');
    fetch(`${currUrl}/api/user/concoctions?username=${this.props.appState.user}`, {
      method: 'GET',
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Cannot retrieve concoctions');
      }
    })
    .then((concObj) => {
      console.log(concObj);
      context.props.changeState('concoctions', concObj.concoctions);
      concObj['oauths'].forEach((api) => 
        context.props.appState.connectedServices[api] = true
      )
      context.props.changeState('connectedServices', context.props.appState.connectedServices)
    })
    .catch((err) => { console.log(err) });
  }

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
