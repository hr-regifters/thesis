import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, Button } from 'react-bootstrap';
import servicesDetail from '../servicesDetailJSON.js';
import currUrl from './../../../currUrl';

export default class Concoction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableClass: 'disabledBtn',
    };
    this.enable = false;
  }

  transitionToEdit() {
    // css animations
    // change view on app state to concoctionEdit
    // also pass up the id of the concoction to edit
  }

  changeEnable() {
    const context = this;
    fetch(`${currUrl}/api/constructor/toggleEnable`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        concId: context.props.concoctionInfo.id
      })
    })
    .then((res) => {
      if (res.status === 201) {
        context.setState({
          enableClass: context.state.enableClass === 'enableBtn' ? 'disabledBtn' : 'enableBtn',
        });
        context.enable = !context.enable;
      } else {
        console.log('unsuccesful toggle')
      }
    });
  }

  componentWillMount() {
    if (this.props.concoctionInfo.enable) {
      this.state.enableClass = 'enableBtn';
      this.enable = true;
    }
  }

  render() {
    return (
      <div className="concoction animated fadeIn">
        <div className="mainBox">

          <img className='icon round' src={servicesDetail[this.props.concoctionInfo.triggerapi].icon}></img>
          
          <img className='icon round' src={servicesDetail[this.props.concoctionInfo.actionapi].icon}></img>
        
          <p>{this.props.concoctionInfo.description}</p>
        </div>
        <div className="bottomBox">
          <a>Edit</a>
          <a className={this.state.enableClass} onClick={this.changeEnable.bind(this)}>Enable</a>
        </div>
      </div>
    );
  }
}
