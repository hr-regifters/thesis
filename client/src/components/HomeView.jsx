import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Concoction from './Concoction.jsx';

export default class HomeView extends React.Component {
  componentDidMount() {
    let context = this;
    fetch(`${currUrl}/api/user/concoctions?username=${this.props.appState.user}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(function(res) {
      if (res.status === 200) {
        let res = JSON.parse(res);
        context.props.appState.concoctions = res.body.concoctions;
        res.body.oauths.forEach((api) => 
          context.props.appState.connectedServices[api] = true
        );
      } else {
        console.log('concoctions not received');
      }
    });
  }

  transitionToAddConcoction() {
    // css animations
    // change view on app state to addConcoction
    this.props.changeViewTo('addConcoction');
  }

  render() {
    return (
      <div id="HomeView">
        <nav className="navbar navbar-default navbar-fixed-top"> 
          <div className="container-fluid">
          <h3 className = "navbar-left">Profile</h3>
          <h3 className="navbar-right"> My Apps </h3>
          <h1 className ="navbar"> Hack Reactions</h1>

          </div>
        </nav>
        <div id="concoctions">


          <div className="container-fluid"> 
            <Row>

              {
                this.props.appState.concoctions.map((concoction) => {
                  return (
                    <Col xs={4} key={concoction.id}>
                      <Concoction concoctionInfo={concoction} servicesDetail={this.props.appState.servicesDetail} />
                    </Col>
                  );
                })
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
