import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, Button } from 'react-bootstrap';
import currUrl from './../../../currUrl';

export default class Concoction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabledClass: 'disabledBtn',
    };
    this.enabled = false;
  }

  transitionToEdit() {
    // css animations
    // change view on app state to concoctionEdit
    // also pass up the id of the concoction to edit
  }

  changeEnabled() {
    this.setState({
      enabledClass: this.state.enabledClass === 'enabledBtn' ? 'disabledBtn' : 'enabledBtn',
    });
    this.enabled = this.enabled === true ? false : true;
    fetch(`${currUrl}/api/constructor/changeEnabled`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enabled: this.enabled,
      }),
    });
  }

  componentWillMount() {
    if (this.props.concoctionInfo.enabled) {
      this.state.enabledClass = 'enabledBtn';
      this.enabled = true;
    }
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
          <a className={this.state.enabledClass} onClick={this.changeEnabled.bind(this)}>Enable</a>
        </div>
      </div>
    );
  }
}
