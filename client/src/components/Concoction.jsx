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
    const context = this;
    fetch(`${currUrl}/api/constructor/changeEnabled`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        concId: context.props.concoctionInfo.id
      })
    })
    .then((res) => {
      if (res.status === 201) {
        context.setState({
          enabledClass: context.state.enabledClass === 'enabledBtn' ? 'disabledBtn' : 'enabledBtn',
        });
        context.enabled = !context.enabled;
      } else {
        console.log('unsuccesful toggle')
      }
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
