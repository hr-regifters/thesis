import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, Button } from 'react-bootstrap';

export default class Concoction extends React.Component {
  transitionToEdit() {
    // css animations
    // change view on app state to concoctionEdit
    // also pass up the id of the concoction to edit
  }

  render() {
    return (
      <div className="concoction animated fadeIn">
        <div className="mainBox">
          <img className='icon' src={`https://www.slack.com/favicon.ico`}></img>
          <i className="fa fa-arrow-right fa-1x"></i>
          <img className='icon' src={`https://www.evernote.com/favicon.ico`}></img>
          <p>{this.props.concoctionInfo.description}</p>
        </div>
        <div className="bottomBox">
          <a>Edit</a>
          <a>Enable</a>
        </div>
      </div>
    );
  }
}
