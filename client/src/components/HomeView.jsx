import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Concoction from './Concoction.jsx';

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
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
          <div className="container-fluid Mod">
          <h3 className="pull-right"> My Apps </h3>
          <h3 className="pull-right"> Profile </h3>
          <h1 className ="navbar-left"> Hack Reactions</h1>

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
